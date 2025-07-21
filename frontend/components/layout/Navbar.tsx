// // frontend/components/layout/Navbar.tsx
// "use client";

// import Link from "next/link";
// import { useAuthStore } from "@/store/authStore"; // Importamos nuestro store

// export default function Navbar() {
//   // Usamos el store para obtener el estado actual
//   const { user, logout } = useAuthStore();

//   return (
//     <nav className="bg-gray-800 text-white shadow-lg">
//       <div className="container mx-auto px-6 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo o Nombre de la Tienda */}
//           <div className="text-xl font-semibold">
//             <Link href="/" className="hover:text-gray-300">
//               MiTienda
//             </Link>
//           </div>

//           {/* Enlaces de Navegación */}
//           <div className="flex items-center space-x-4">
//             <Link href="/" className="hover:text-gray-300">
//               Inicio
//             </Link>
//             {/* Mostramos enlaces condicionales basados en si el usuario está logueado */}
//             {user ? (
//               <>
//                 {/* Si el usuario es admin, muestra el enlace al Dashboard */}
//                 {user.role === "admin" && (
//                   <Link href="/admin/dashboard" className="hover:text-gray-300">
//                     Dashboard
//                   </Link>
//                 )}
//                 <span className="font-medium">Hola, {user.name}</span>
//                 <button
//                   onClick={logout}
//                   className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium"
//                 >
//                   Cerrar Sesión
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* Si no hay usuario, muestra enlaces de Login y Registro */}
//                 <Link href="/login" className="hover:text-gray-300">
//                   Iniciar Sesión
//                 </Link>
//                 <Link href="/register" className="hover:text-gray-300">
//                   Registrarse
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// frontend/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Menu, Transition } from "@headlessui/react"; // Importamos Menu y Transition
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"; // Un icono de flecha

// Necesitamos instalar heroicons: npm install @heroicons/react
// ¡Asegúrate de ejecutar 'npm install @heroicons/react' en la terminal del frontend!

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold">
            <Link href="/" className="hover:text-gray-300">
              MiTienda
            </Link>
          </div>

          {/* Enlaces */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        Gestión
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin/dashboard"
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin/products"
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Gestionar Productos
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                <span className="font-medium">Hola, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-300">
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="hover:text-gray-300">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
