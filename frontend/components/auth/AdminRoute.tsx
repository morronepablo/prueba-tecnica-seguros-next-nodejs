// frontend/components/auth/AdminRoute.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHydration } from "@/hooks/useHydration"; // Importamos nuestro nuevo hook

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const hydrated = useHydration(); // Usamos el hook

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router, hydrated]); // Añadimos hydrated a las dependencias

  if (!hydrated || !user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Verificando permisos...</p>
      </div>
    );
  }

  return <>{children}</>;
}
