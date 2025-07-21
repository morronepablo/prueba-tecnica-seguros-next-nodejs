// frontend/lib/api.ts - CÓDIGO COMPLETO Y CORREGIDO

import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Importamos el store

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    // Obtenemos el token directamente del estado de Zustand
    const token = useAuthStore.getState().token;

    // Si tenemos un token, lo añadimos a la cabecera de Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    // Hacemos algo con el error de la petición
    return Promise.reject(error);
  }
);

export default api;
