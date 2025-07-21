// frontend/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Importamos el Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tienda Online Avanzada",
  description: "Prueba técnica de una tienda online full-stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
