// // frontend/components/auth/AdminRoute.tsx
// "use client";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AdminRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user } = useAuthStore();
//   const router = useRouter();
//   const [isAllowed, setIsAllowed] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     } else if (user.role !== "admin") {
//       router.push("/");
//     } else {
//       setIsAllowed(true);
//     }
//   }, [user, router]);

//   if (!isAllowed) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Cargando...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

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
    // Si aún no estamos en el cliente (no se ha hidratado), no hacemos nada.
    if (!hydrated) {
      return;
    }

    // Ahora que sabemos que estamos en el cliente y el estado es fiable:
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router, hydrated]); // Añadimos hydrated a las dependencias

  // Mientras no se haya hidratado, o si el usuario no es válido, mostramos un loader.
  // Esto previene el "parpadeo" del contenido.
  if (!hydrated || !user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Verificando permisos...</p>
      </div>
    );
  }

  // Si todo está bien, mostramos el contenido protegido.
  return <>{children}</>;
}
