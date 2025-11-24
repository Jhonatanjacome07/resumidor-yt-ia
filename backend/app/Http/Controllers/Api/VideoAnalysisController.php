<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use App\Models\Summary;

class VideoAnalysisController extends Controller
{
    public function analyze(Request $request)
    {
        $user = auth()->user();

        // 1. Check if email is verified
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Por favor verifica tu correo electrónico antes de usar este servicio.',
                'error' => 'EMAIL_NOT_VERIFIED'
            ], 403);
        }

        // 2. Check usage limits (only for free users)
        if ($user->subscription_status !== 'premium') {
            // Check if we need to reset monthly usage
            $now = now();
            $lastReset = $user->last_usage_reset_date ? \Carbon\Carbon::parse($user->last_usage_reset_date) : null;
            
            // Reset if it's a new month or first time
            if (!$lastReset || $lastReset->month !== $now->month || $lastReset->year !== $now->year) {
                $user->update([
                    'monthly_usage_count' => 0,
                    'last_usage_reset_date' => $now,
                ]);
            }

            // Check if user has exceeded free limit
            if ($user->monthly_usage_count >= 3) {
                return response()->json([
                    'message' => 'Has alcanzado el límite de 3 análisis gratuitos este mes.',
                    'error' => 'USAGE_LIMIT_REACHED',
                    'usage_count' => $user->monthly_usage_count,
                    'limit' => 3,
                ], 403);
            }
        }

        //3. Validación de Requerimientos 
        $request->validate([
            'video_url' => [
                'required', 
                'string', 
                'max:255', 
                'url', Rule::prohibitedIf(!preg_match('/(youtube\.com\/watch\?v=|youtu\.be\/)/', $request->video_url))
              ] 
        ]);

        // Extract video ID from URL to check for duplicates
        $videoId = null;
        if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/', $request->video_url, $matches)) {
            $videoId = $matches[1];
        }

        // Check if user already analyzed this video
        if ($videoId) {
            $existingSummary = Summary::where('user_id', $user->id)
                ->where('video_id', $videoId)
                ->first();

            if ($existingSummary) {
                return response()->json([
                    'message' => 'Ya has analizado este video anteriormente. Aquí tienes el resultado.',
                    'analysis_id' => $existingSummary->id,
                    'video_title' => $existingSummary->video_title,
                    'analysis' => $existingSummary->analysis_data,
                    'remaining_free_uses' => $user->subscription_status === 'premium' ? 'unlimited' : (3 - $user->monthly_usage_count),
                    'from_cache' => true
                ], 200);
            }
        }

        //4. Preparación de la llamada a n8n
        $webhookUrl = env('N8N_WEBHOOK_URL');
        $apiKey = env('N8N_API_KEY'); 
        
        $payload = [
            'videoUrl' => $request->video_url,
            // Enviamos el ID del usuario autenticado (CLAVE)
            'userId' => auth()->id(), 
            // Añade un ID único para rastrear la petición en n8n
            'requestId' => \Illuminate\Support\Str::uuid(), 
        ];

        // 5. Llamada al Webhook (Motor de n8n)
        try {
            $response = Http::withHeaders([
                // Pasamos la clave de seguridad que configuraste en n8n
                'X-API-KEY' => $apiKey, 
            ])
            ->timeout(90) // Esperamos hasta 90 segundos por el análisis de Gemini
            ->post($webhookUrl, $payload);

            // 6. Manejo de la Respuesta de n8n
            $responseData = $response->json();

            // Log para debugging (puedes comentar esto en producción)
            Log::info('n8n Response', ['data' => $responseData, 'status' => $response->status()]);

            // Validar que la respuesta tenga la estructura esperada
            if (!$response->successful()) {
                Log::error('n8n request failed', ['status' => $response->status(), 'data' => $responseData]);
                return response()->json([
                    'message' => 'Error en la comunicación con el motor de análisis.',
                    'error' => $responseData['message'] ?? 'Error desconocido',
                ], $response->status());
            }

            // Verificar que exista la clave 'success'
            if (!isset($responseData['success'])) {
                Log::error('n8n response missing success key', ['data' => $responseData]);
                return response()->json([
                    'message' => 'Respuesta inválida del motor de análisis.',
                    'error' => 'El flujo de n8n no está devolviendo el formato correcto. Verifica que hayas agregado el nodo "Formatear Respuesta Final".',
                    'debug' => $responseData
                ], 500);
            }

            if ($responseData['success'] === true) {
                
                // Validar que existan las claves necesarias
                if (!isset($responseData['analysis']) || !isset($responseData['video']) || !isset($responseData['userId'])) {
                    Log::error('n8n response missing required keys', ['data' => $responseData]);
                    return response()->json([
                        'message' => 'Respuesta incompleta del motor de análisis.',
                        'error' => 'Faltan datos necesarios en la respuesta de n8n.',
                    ], 500);
                }

                // === LÓGICA DE GUARDADO EN LA BASE DE DATOS ===
                
                // Extraer datos antes de la transacción para usarlos en la respuesta
                $analysis = $responseData['analysis'];
                $videoInfo = $responseData['video'];
                $transcriptInfo = $responseData['transcript'] ?? [];
                
                // Usamos una transacción para asegurar que el guardado sea atómico
                $savedSummary = DB::transaction(function () use ($responseData, $analysis, $videoInfo, $transcriptInfo, $user) {
                    // Increment usage count for free users
                    if ($user->subscription_status !== 'premium') {
                        $user->increment('monthly_usage_count');
                    }

                    return Summary::create([
                        'user_id' => $responseData['userId'],
                        'request_id' => $responseData['requestId'] ?? null,
                        'video_id' => $videoInfo['id'],
                        'video_title' => $videoInfo['title'],
                        'video_author' => $videoInfo['author'] ?? null,
                        'thumbnail_url' => $videoInfo['thumbnail'] ?? null,
                        'video_url' => $videoInfo['url'] ?? null,
                        'summary' => $analysis['summary'] ?? $analysis['fullAnalysis'] ?? 'Sin resumen',
                        'analysis_data' => $analysis, // Guardamos el JSON completo para el detalle
                        'transcript_length' => $transcriptInfo['length'] ?? 0,
                    ]);
                });

                return response()->json([
                    'message' => 'Análisis completado y guardado con éxito.',
                    'analysis_id' => $savedSummary->id,
                    'video_title' => $videoInfo['title'],
                    'analysis' => $analysis,
                    'remaining_free_uses' => $user->subscription_status === 'premium' ? 'unlimited' : (3 - $user->fresh()->monthly_usage_count),
                ], 200);

            } else {
                // Si n8n devolvió un error de negocio o falló la seguridad
                $message = $responseData['message'] ?? $responseData['error'] ?? 'Error desconocido del motor de n8n.';
                Log::warning('n8n returned success=false', ['data' => $responseData]);
                return response()->json([
                    'message' => 'Fallo en el análisis del video.',
                    'error' => $message,
                ], $responseData['statusCode'] ?? 400);
            }

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            // Error si el webhook está apagado o hay un timeout
            return response()->json([
                'message' => 'El motor de automatización (n8n) no responde. Por favor, verifica que esté corriendo.',
                'details' => $e->getMessage()
            ], 503); // 503 Service Unavailable
        }
    }

    /**
     * Get user's analysis history
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $summaries = Summary::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->select('id', 'video_title', 'summary', 'video_url', 'created_at')
            ->get();

        return response()->json([
            'summaries' => $summaries,
            'user_info' => [
                'subscription_status' => $user->subscription_status,
                'monthly_usage_count' => $user->monthly_usage_count,
                'remaining_free_uses' => $user->subscription_status === 'premium' ? 'unlimited' : (3 - $user->monthly_usage_count),
            ]
        ], 200);
    }

    /**
     * Delete a specific summary
     */
    public function destroy($id)
    {
        $summary = Summary::find($id);

        // Check if summary exists
        if (!$summary) {
            return response()->json([
                'message' => 'Análisis no encontrado.'
            ], 404);
        }

        // Check if user owns this summary
        if ($summary->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar este análisis.'
            ], 403);
        }

        $summary->delete();

        return response()->json([
            'message' => 'Análisis eliminado con éxito.'
        ], 200);
    }
}