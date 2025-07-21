// frontend/app/(main)/admin/products/edit/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import AdminRoute from "@/components/auth/AdminRoute";
import ProductForm from "@/components/products/ProductForm"; // ¡Reutilizamos el formulario!
import toast from "react-hot-toast";

// Definimos el tipo para los datos iniciales del producto
interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: { url: string };
}

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string; // Obtenemos el ID de la URL
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          setProduct(data);
        } catch (error) {
          toast.error("No se pudo cargar el producto.");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <AdminRoute>
        <p>Cargando datos del producto...</p>
      </AdminRoute>
    );
  }

  if (!product) {
    return (
      <AdminRoute>
        <p>Producto no encontrado.</p>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            Editar Producto
          </h1>
          {/* Le pasamos los datos del producto y el ID al formulario */}
          <ProductForm productData={product} productId={id} />
        </div>
      </div>
    </AdminRoute>
  );
}
