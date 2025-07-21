// // frontend/app/(main)/page.tsx
// export default function HomePage() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="text-4xl font-bold text-gray-800">
//         Bienvenido a Nuestra Tienda
//       </h1>
//     </main>
//   );
// }

// frontend/app/(main)/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: { url: string };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        const { data } = await api.get("/products", { params });
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to first page
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Nuestro Catálogo
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Explora nuestra colección de productos
        </p>
      </div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <>
          {/* Cuadrícula de productos */}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: pages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 text-sm font-medium ${
                      page === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    } ${pageNumber === 1 ? "rounded-l-md" : ""} ${
                      pageNumber === pages ? "rounded-r-md" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
