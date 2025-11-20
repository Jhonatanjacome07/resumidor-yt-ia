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
        //1. Validación de Requerimientos 
        $request->validate([
            'video_url' => [
                'required', 
                'string', 
                'max:255', 
                'url', Rule::prohibitedIf(!preg_match('/(youtube\.com\/watch\?v=|youtu\.be\/)/', $request->video_url))
              ] 
        ]);
        //2. Preparación de la llamada a n8n
        $webhookUrl = env('N8N_WEBHOOK_URL');
        $apiKey = env('N8N_API_KEY'); 
        
        $payload = [
            'videoUrl' => $request->video_url,
            // Enviamos el ID del usuario autenticado (CLAVE)
            'userId' => auth()->id(), 
            // Añade un ID único para rastrear la petición en n8n
            'requestId' => \Illuminate\Support\Str::uuid(), 
        ];

        // 3. Llamada al Webhook (Motor de n8n)
        try {
            $response = Http::withHeaders([
                // Pasamos la clave de seguridad que configuraste en n8n
                'X-API-KEY' => $apiKey, 
            ])
            ->timeout(90) // Esperamos hasta 90 segundos por el análisis de Gemini
            ->post($webhookUrl, $payload);

            // 4. Manejo de la Respuesta de n8n
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
                $savedSummary = DB::transaction(function () use ($responseData, $analysis, $videoInfo, $transcriptInfo) {
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
                    'analysis' => $analysis
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
}