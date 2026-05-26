'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {category.name || 'Sin nombre'}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {category.description || 'Sin descripción'}
        </p>
      </div>
    </Link>
  );
}
