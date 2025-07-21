// frontend/app/admin/products/new/page.tsx - CÓDIGO COMPLETO

import AdminRoute from "@/components/auth/AdminRoute";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <AdminRoute>
      {/* Contenedor principal de la página con un fondo gris claro */}
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        {/* Contenedor del formulario con fondo blanco, padding y sombra */}
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            Añadir Nuevo Producto
          </h1>
          <ProductForm />
        </div>
      </div>
    </AdminRoute>
  );
}
