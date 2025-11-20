"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios"; 
import axios from "axios"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Badge } from "@/components/ui/badge"; 
import { Loader2, Search, FileText, List, Tag } from "lucide-react";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logout);

  // Nuevo estado para la URL de YouTube, la carga y el resultado
  const [videoUrl, setVideoUrl] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null); 
  const [error, setError] = useState('');

  // --- LÓGICA DE PROTECCIÓN DE RUTA Y LOGOUT ---
  useEffect(() => {
    if (!user) {
        router.push("/login");
    }
  }, [user, router]);
  
  const handleLogout = async () => {
    try {
      await api.post('/logout'); 
      logoutUser(); 
      router.push('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      logoutUser(); 
      router.push('/login');
    }
  };

  // --- LÓGICA DE ANÁLISIS DE VIDEO ---
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAnalysis(true);
    setError('');
    setAnalysisResult(null);

    try {
        // Validación básica de URL antes de llamar al backend
        if (!videoUrl || !videoUrl.includes('youtube.com')) {
            setError('Por favor, ingresa una URL de YouTube válida.');
            setLoadingAnalysis(false);
            return;
        }

        // 1. Obtener el CSRF cookie de Laravel Sanctum (IMPORTANTE para autenticación)
        await api.get('/sanctum/csrf-cookie');

        // 2. Llamada al endpoint de Laravel (que a su vez llama a n8n)
        const response = await api.post('/api/analyze-video', {
            video_url: videoUrl, 
        });

        // 3. Si es exitoso (código 200)
        setAnalysisResult(response.data.analysis); // Guarda el JSON completo de n8n
        alert(response.data.message);

    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Maneja errores de validación de Laravel o errores devueltos por n8n
            const message = err.response.data.message || 'Error desconocido en el análisis.';
            setError(message);
        } else {
            setError('Error de red. Asegúrate de que los servidores estén activos.');
        }
    } finally {
        setLoadingAnalysis(false);
    }
  };

  // Función para limpiar el texto del análisis
  const cleanAnalysisText = (text: string) => {
    if (!text) return '';
    
    // Remover bloques de código markdown ```json...```
    let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Intentar parsear si es JSON
    try {
      const parsed = JSON.parse(cleaned);
      return parsed.summary || cleaned;
    } catch {
      return cleaned;
    }
  };

  // Mostrar mensaje de carga mientras se verifica o redirige
  if (!user) return <div className="text-white p-10">Verificando sesión...</div>;

 return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header del Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Panel de Análisis</h1>
            <p className="text-slate-400">Bienvenido de nuevo, {user.name}</p>
          </div>
        </div>

        {/* Sección de Entrada */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="text-blue-400" size={20} />
              Nuevo Análisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input
                  type="url"
                  placeholder="Pega la URL de YouTube aquí (ej. https://youtube.com/watch?v=...)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={loadingAnalysis}
                  className="bg-slate-950 border-slate-700 text-white pl-4 py-6 text-base"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loadingAnalysis}
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white py-6 px-8"
              >
                {loadingAnalysis ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analizando...
                  </>
                ) : (
                  'Generar Resumen'
                )}
              </Button>
            </form>
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

             {/* Aviso de tiempo */}
            {loadingAnalysis && (
               <p className="mt-4 text-sm text-yellow-500/80 animate-pulse">
                 Esto puede tomar hasta 90 segundos mientras la IA procesa el video...
               </p>
            )}
          </CardContent>
        </Card>

        {/* Sección de Resultados */}
        {analysisResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Resumen Principal */}
            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-blue-400" /> Resumen Ejecutivo
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {analysisResult.summary}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Puntos Clave */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <List className="text-teal-400" /> Puntos Clave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.keyPoints?.map((point: string, index: number) => (
                      <li key={index} className="flex gap-3 text-slate-300">
                        <span className="text-teal-400 font-bold">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Metadatos / Palabras Clave */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="text-purple-400" /> Palabras Clave y Tono
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Etiquetas</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords?.map((keyword: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Tono Detectado</h4>
                    <p className="text-slate-300 italic">"{analysisResult.tone}"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}