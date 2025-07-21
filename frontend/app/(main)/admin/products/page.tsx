// frontend/app/admin/products/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

// Definimos el tipo para un producto
interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products);
    } catch (error) {
      toast.error("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    // El window.confirm es una forma simple de pedir confirmación
    if (window.confirm("¿Estás seguro de que quieres borrar este producto?")) {
      try {
        toast.loading("Borrando producto...");
        // Se envía la petición DELETE al endpoint correcto
        await api.delete(`/products/${id}`);
        toast.dismiss();
        toast.success("Producto borrado exitosamente");
        // Volvemos a cargar los productos para que la lista se actualice
        fetchProducts();
      } catch (error) {
        toast.dismiss();
        toast.error("Error al borrar el producto.");
      }
    }
  };

  if (loading)
    return (
      <AdminRoute>
        <p>Cargando productos...</p>
      </AdminRoute>
    );

  return (
    <AdminRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestionar Productos
          </h1>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            + Añadir Producto
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="text-sm text-gray-900">
                    {" "}
                    {/* <-- Añadimos color base a la fila */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminRoute>
  );
}
