"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/lib/axios";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logout);

  // Protección: Si no hay usuario, redirigir al login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // FUNCIÓN DE LOGOUT
  const handleLogout = async () => {
    try {
      // 1. Llama al endpoint de logout (destruye la sesión/cookie en el backend)
      await api.post("/api/logout");

      // 2. Limpia el estado global del frontend
      logoutUser();

      // 3. Redirige al login
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      logoutUser();
      router.push("/login");
    }
  };

  if (!user)
    return <div className="text-white p-10">Verificando sesión...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard de {user.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-150"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-xl">
          Bienvenido,{" "}
          <span className="text-blue-400 font-bold">{user.name}</span>
        </p>
        <p className="text-gray-400 mt-2">Email: {user.email}</p>

        <div className="mt-8 border-t border-gray-700 pt-4">
          <p>
            Aquí comenzaremos a construir la funcionalidad del Resumidor de
            YouTube.
          </p>
        </div>
      </div>
    </div>
  );
}
