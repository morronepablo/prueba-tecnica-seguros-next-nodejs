// frontend/app/(main)/layout.tsx - CÓDIGO COMPLETO Y CORREGIDO

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tienda Online",
  description: "Bienvenido a nuestra tienda online",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {/* Aquí podríamos añadir un Footer más tarde */}
    </div>
  );
}
