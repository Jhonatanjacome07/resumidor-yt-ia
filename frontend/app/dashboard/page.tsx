"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios"; 
import axios from "axios"; 

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Navbar con Logout */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">SafeSolutions AI Analyzer</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-150"
        >
          Cerrar Sesión ({user.name})
        </button> 
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Ingresar Video</h2>
        
        {/* FORMULARIO DE ENTRADA */}
        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-6">
            <input
                type="url"
                placeholder="Pega la URL de YouTube aquí..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-grow p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loadingAnalysis}
            />
            <button
                type="submit"
                disabled={loadingAnalysis}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition duration-150"
            >
                {loadingAnalysis ? 'Analizando...' : 'Analizar Video'}
            </button>
        </form>

        {/* MENSAJES DE ESTADO */}
        {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}
        {loadingAnalysis && (
            <p className="text-yellow-400 mb-4">Iniciando análisis (puede tardar hasta 90 segundos)...</p>
        )}

        {/* RESULTADO DEL ANÁLISIS */}
        {analysisResult && (
            <div className="mt-8 pt-4 border-t border-gray-700">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Resultado del Análisis</h3>
                
                {/* Mostrar el resumen limpio */}
                <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">Resumen del Video</h4>
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {cleanAnalysisText(analysisResult.summary || analysisResult.fullAnalysis || '')}
                    </div>
                </div>
                
            </div>
        )}
      </div>
      
      {/* Sección del historial aquí */}

    </div>
  );
}