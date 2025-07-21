// frontend/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definimos la estructura (la "forma") de los datos del usuario
interface User {
  _id: string;
  name: string;
  email: string;
  role: "cliente" | "admin";
}

// Definimos la estructura del estado y las acciones que lo modifican
interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Creamos el store
export const useAuthStore = create<AuthState>()(
  // `persist` es un middleware que guarda automáticamente el estado en el localStorage del navegador.
  // Así, si el usuario recarga la página, su sesión no se pierde.
  persist(
    (set) => ({
      user: null, // Estado inicial: no hay usuario
      token: null, // Estado inicial: no hay token
      // Acción para guardar el usuario y el token al hacer login
      login: (user, token) => set({ user, token }),
      // Acción para limpiar los datos al hacer logout
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // Nombre de la clave en el localStorage
    }
  )
);
