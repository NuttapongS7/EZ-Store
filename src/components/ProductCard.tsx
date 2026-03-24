'use client';

import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch, setIsSidebarOpen } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">

      {/* Image Section - fixed height */}
      <div className="relative h-48 w-full p-6 bg-white flex-shrink-0 flex items-center justify-center border-b border-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content Section - flex-grow เต็ม */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
          {product.category}
        </p>

        {/* flex-grow ดัน rating + button ลงล่าง */}
        <h3
          className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-grow"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-sm mr-1">★</span>
          <span className="text-xs text-gray-600 font-medium">
            {product.rating.rate}{' '}
            <span className="text-gray-400">({product.rating.count})</span>
          </span>
        </div>

        {/* Price + Button ติดล่างสุดเสมอ */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95 whitespace-nowrap"
            onClick={() => {
              dispatch({ type: 'ADD_ITEM', payload: product });
              setIsSidebarOpen(true);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}