"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import api from "@/lib/axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    // Solo verificar si hay un usuario en localStorage
    if (user) {
      // Verificar si la sesión sigue válida en el backend
      const verifySession = async () => {
        try {
          const response = await api.get("/api/user");
          // Si la respuesta es exitosa, actualizar el usuario por si cambió algo
          login(response.data);
        } catch (error) {
          // Si falla (401, 403, etc.), significa que la sesión expiró
          // Silenciar para evitar exposición en consola
          logout();
        }
      };

      verifySession();
    }
  }, []); // Solo ejecutar una vez al montar

  return <>{children}</>;
}
