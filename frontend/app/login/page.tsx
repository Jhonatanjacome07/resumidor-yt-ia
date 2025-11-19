"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useUserStore } from "@/stores/useUserStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const setUser = useUserStore((state) => state.login);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // 1. Cookie CSRF
      await api.get("/sanctum/csrf-cookie");

      // 2. Login (Autentica la cookie)
      await api.post("/api/login", {
        email,
        password,
      });

      // 3. Obtener datos del usuario
      const userResponse = await api.get("/api/user");

      // 4. Zustand
      setUser(userResponse.data);
      router.push("/dashboard");
    } catch (error) {
      // debug error
      console.error("❌ Error en login:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          // Errores de validación (ej. email no válido)
          setErrors(error.response.data.errors || {});
        } else if (error.response?.status === 401) {
          // Error 401 es "No autorizado" - credenciales incorrectas
          setErrors({ email: ["Las credenciales son incorrectas"] });
        } else if (error.response?.status === 429) {
          // Demasiados intentos
          setErrors({ email: ["Demasiados intentos. Espera un momento."] });
        } else {
          setErrors({
            email: [error.response?.data?.message || "Error al iniciar sesión"],
          });
        }
      } else {
        // Error de red
        setErrors({ email: ["Error de conexión con el servidor"] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-800 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled={loading}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled={loading}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}
