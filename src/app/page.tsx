import React from 'react';
import { Product } from '../types';
import ProductCatalog from '../components/ProductCatalog';
import Header from '../components/Header';

// Next.js App Router Server Component fetching mock data
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      // ดึงข้อมูลใหม่ทุกๆ 3600 วินาที
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductCatalog initialProducts={products} />
      </div>
    </main>
  );
}
