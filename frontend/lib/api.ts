// // frontend/lib/api.ts
// import axios from "axios";

// // ¡¡AÑADE ESTA LÍNEA!!
// // Esto nos mostrará el valor en la terminal del frontend Y en la consola del navegador.
// console.log(
//   "--- VALOR DE LA API URL USADA --- :",
//   process.env.NEXT_PUBLIC_API_URL
// );

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

// frontend/lib/api.ts - CÓDIGO COMPLETO Y CORREGIDO

import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Importamos el store

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Ya no necesitamos headers aquí, los manejaremos dinámicamente
});

// --- INTERCEPTOR DE PETICIONES ---
// Esta función se ejecuta ANTES de que cada petición sea enviada.
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token directamente del estado de Zustand
    const token = useAuthStore.getState().token;

    // Si tenemos un token, lo añadimos a la cabecera de Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Es importante que el content-type se ajuste dinámicamente.
    // Si no es FormData, lo ponemos como application/json.
    // Axios es suficientemente inteligente para poner el content-type correcto para FormData.
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
