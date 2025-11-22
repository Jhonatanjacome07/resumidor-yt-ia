import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Definimos la "forma" de los datos de un usuario
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

// 2. Definimos qué tendrá nuestro "almacén" (datos + funciones)
interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// 3. Creamos el almacén con persistencia
export const useUserStore = create<UserState>()((set) => ({
  user: null,

  // Acción de Login: actualiza el estado con el usuario recibido
  login: (user) => set({ user }),

  // Acción de Logout: devuelve el estado a null
  logout: () => set({ user: null }),
}));
