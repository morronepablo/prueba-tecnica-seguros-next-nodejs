// frontend/components/products/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: {
    url: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
   console.log('Datos recibidos por ProductCard:', product);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-h-1 aspect-w-1 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-60">
        <Image
          src={product.image.url}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}
