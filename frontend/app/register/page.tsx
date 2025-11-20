"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // 1. Obtener CSRF cookie
      await api.get("/sanctum/csrf-cookie");

      // 2. Registrar usuario
      const response = await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      // 3. Mostrar mensaje de éxito y redirigir al login
      alert("¡Registro exitoso! Por favor inicia sesión.");
      
      // Redirigir al login
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          // Errores de validación
          setErrors(error.response.data.errors || {});
        } else if (error.response?.status === 429) {
          // Rate limit excedido
          alert("Demasiados intentos. Por favor espera un momento.");
        } else {
          alert(
            `Error: ${error.response?.data?.message || "Error desconocido"}`
          );
        }
      } else {
        alert("Error de conexión con el servidor.");
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
          Crear Cuenta
        </h2>

        {/* Campo de Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled={loading}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* Campo de Email */}
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

        {/* Campo de Password */}
        <div className="mb-4">
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
            minLength={8}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        {/* Campo de Confirmación de Password */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="password_confirmation"
          >
            Confirmar Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled={loading}
            required
            minLength={8}
          />
        </div>

        {/* Botón de Registro */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
