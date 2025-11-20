"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import api from "@/lib/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner"; 

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGeneralError("");

    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/login", { email, password });
      
      const userResponse = await api.get("/api/user");
      setUser(userResponse.data);
      
      // 1. Notificación elegante en lugar de alert()
      toast.success(`Bienvenido de nuevo, ${userResponse.data.name}`);
      
      router.push("/dashboard");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 422) {
          // Error de validación (campos vacíos o mal formato)
          setFieldErrors(error.response?.data.errors || {});
          toast.error("Por favor revisa los campos marcados.");
        
        } else if (status === 401) {
          // Error de credenciales (Contraseña incorrecta)
          setGeneralError("El correo o la contraseña son incorrectos.");
          toast.error("No pudimos iniciar sesión.");
        
        } else if (status === 429) {
          setGeneralError("Demasiados intentos. Espera unos minutos.");
        
        } else {
          setGeneralError("Ocurrió un error inesperado en el servidor.");
        }
      } else {
        setGeneralError("Error de conexión. Revisa tu internet o el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 flex items-center justify-center relative overflow-hidden p-4">
      {/* Fondo con Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" /> Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Ingresa a tu cuenta para continuar</p>
        </div>

        <Card className="bg-white/80 dark:bg-slate-900/60 border-slate-300 dark:border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* ALERTA DE ERROR GENERAL (401, 500, Conexión) */}
              {generalError && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              )}

              {/* CAMPO EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email" className={fieldErrors.email ? "text-red-400" : ""}>
                  Correo Electrónico
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Si hay error, pintamos el borde rojo
                  className={`bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700 focus:border-blue-500 ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={loading}
                />
                {/* Mensaje de error pequeño debajo del input */}
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs font-medium">{fieldErrors.email[0]}</p>
                )}
              </div>

              {/* CAMPO PASSWORD */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className={fieldErrors.password ? "text-red-400" : ""}>
                    Contraseña
                  </Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700 focus:border-blue-500 ${fieldErrors.password ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={loading}
                />
                {fieldErrors.password && (
                  <p className="text-red-400 text-xs font-medium">{fieldErrors.password[0]}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-10" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</> : "Ingresar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-300 dark:border-slate-800 pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ¿No tienes cuenta? <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Regístrate gratis</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}