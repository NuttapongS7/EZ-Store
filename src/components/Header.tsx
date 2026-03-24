'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalQuantity, setIsSidebarOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">EZ-Store</h1>

        <div
          className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
              {totalQuantity}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
