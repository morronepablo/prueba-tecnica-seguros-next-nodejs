// frontend/next.config.mjs (o next.config.ts) - CÓDIGO COMPLETO

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Añadimos la configuración para permitir imágenes de Cloudinary
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // El puerto y la ruta pueden omitirse si quieres permitir todo
        // port: '',
        // pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
