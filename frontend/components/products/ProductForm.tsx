// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import toast from "react-hot-toast";

// export default function ProductForm() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!image) {
//       toast.error("Por favor, selecciona una imagen para el producto.");
//       return;
//     }
//     setLoading(true);
//     toast.loading("Creando producto...");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("stock", stock);
//     formData.append("category", category);
//     formData.append("image", image);

//     try {
//       await api.post("/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.dismiss();
//       toast.success("¡Producto creado exitosamente!");

//       // REDIRECCIÓN CORREGIDA: Volvemos a la lista de productos del admin
//       router.push("/admin/products");
//     } catch (error: any) {
//       toast.dismiss();
//       const errorMessage =
//         error.response?.data?.message || "Error al crear el producto";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // ESTILOS DE FONDO Y SOMBRA ELIMINADOS DE AQUÍ
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Columna Izquierda: Campos de Texto */}
//         <div className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Nombre
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="price"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Precio
//             </label>
//             <input
//               type="number"
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="stock"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Stock
//             </label>
//             <input
//               type="number"
//               id="stock"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Categoría
//             </label>
//             <input
//               type="text"
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
//             />
//           </div>
//         </div>

//         {/* Columna Derecha: Descripción e Imagen */}
//         <div className="space-y-4">
//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Descripción
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Imagen del Producto
//             </label>
//             <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
//               <div className="space-y-1 text-center">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Vista previa"
//                     className="mx-auto h-48 w-auto object-contain"
//                   />
//                 ) : (
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
//                       strokeWidth={2}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//                 <div className="flex justify-center text-sm text-gray-600">
//                   <label
//                     htmlFor="image-upload"
//                     className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 px-1"
//                   >
//                     <span>Sube un archivo</span>
//                     <input
//                       id="image-upload"
//                       name="image-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                     />
//                   </label>
//                   <p className="pl-1">o arrastra y suelta</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, JPEG hasta 10MB
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Botón de envío */}
//       <div className="pt-5">
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full md:w-auto rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
//           >
//             {loading ? "Guardando..." : "Guardar Producto"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// frontend/components/products/ProductForm.tsx - VERSIÓN FINAL (CREAR Y EDITAR)
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

// 1. Definimos los tipos para las props que el componente puede recibir
interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: { url: string };
}

interface ProductFormProps {
  productData?: ProductData | null;
  productId?: string;
}

export default function ProductForm({
  productData,
  productId,
}: ProductFormProps) {
  // 2. Determinamos si estamos en modo edición
  const isEditMode = !!productId;

  // 3. Inicializamos el estado con los datos existentes si estamos en modo edición
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price?.toString() || "");
  const [stock, setStock] = useState(productData?.stock?.toString() || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    productData?.image?.url || null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect para actualizar el estado si las props cambian (buena práctica)
  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price.toString());
      setStock(productData.stock.toString());
      setCategory(productData.category);
      setImagePreview(productData.image?.url || null);
    }
  }, [productData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // En modo edición, la imagen es opcional
    if (!isEditMode && !image) {
      toast.error("Por favor, selecciona una imagen para el producto.");
      return;
    }
    setLoading(true);
    toast.loading(
      isEditMode ? "Actualizando producto..." : "Creando producto..."
    );

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEditMode) {
        // 4. Si estamos en modo edición, hacemos una petición PUT
        await api.put(`/products/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.dismiss();
        toast.success("¡Producto actualizado exitosamente!");
      } else {
        // 5. Si no, hacemos una petición POST para crear
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.dismiss();
        toast.success("¡Producto creado exitosamente!");
      }
      router.push("/admin/products");
    } catch (error: any) {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || "Ocurrió un error";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // El JSX es el mismo, solo que ahora los 'value' se rellenan automáticamente
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagen del Producto
            </label>
            <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mx-auto h-48 w-auto object-contain"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex justify-center text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 px-1"
                  >
                    <span>
                      {isEditMode ? "Cambiar imagen" : "Sube un archivo"}
                    </span>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400"
          >
            {loading
              ? isEditMode
                ? "Actualizando..."
                : "Guardando..."
              : isEditMode
              ? "Actualizar Producto"
              : "Guardar Producto"}
          </button>
        </div>
      </div>
    </form>
  );
}
