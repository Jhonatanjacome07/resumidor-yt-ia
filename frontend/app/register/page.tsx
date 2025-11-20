"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner"; 

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGeneralError("");

    try {
      // 1. Obtener CSRF cookie
      await api.get("/sanctum/csrf-cookie");

      // 2. Registrar usuario
      await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      // 3. Mostrar mensaje de éxito y redirigir al login
      toast.success("¡Cuenta creada exitosamente!");
      router.push("/login");
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 422) {
          // Errores de validación
          setFieldErrors(error.response?.data.errors || {});
          toast.error("Por favor revisa los campos marcados.");
        } else if (status === 429) {
          setGeneralError("Demasiados intentos. Por favor espera un momento.");
        } else {
          setGeneralError(error.response?.data?.message || "Ocurrió un error al registrarse.");
        }
      } else {
        setGeneralError("Error de conexión con el servidor.");
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Crear cuenta</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Regístrate para comenzar a usar la plataforma</p>
        </div>

        <Card className="bg-white/80 dark:bg-slate-900/60 border-slate-300 dark:border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white">Registro</CardTitle>
            <CardDescription>Completa los datos para crear tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* ALERTA DE ERROR GENERAL */}
              {generalError && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              )}

              {/* CAMPO NOMBRE */}
              <div className="space-y-2">
                <Label htmlFor="name" className={fieldErrors.name ? "text-red-400" : ""}>
                  Nombre Completo
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700 focus:border-blue-500 ${fieldErrors.name ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={loading}
                />
                {fieldErrors.name && (
                  <p className="text-red-400 text-xs font-medium">{fieldErrors.name[0]}</p>
                )}
              </div>

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
                  className={`bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700 focus:border-blue-500 ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs font-medium">{fieldErrors.email[0]}</p>
                )}
              </div>

              {/* CAMPO PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password" className={fieldErrors.password ? "text-red-400" : ""}>
                  Contraseña
                </Label>
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

              {/* CAMPO CONFIRMAR PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">
                  Confirmar Contraseña
                </Label>
                <Input 
                  id="password_confirmation" 
                  type="password" 
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700 focus:border-blue-500"
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-10" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...</> : "Registrarse"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-300 dark:border-slate-800 pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ¿Ya tienes cuenta? <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Inicia sesión</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}