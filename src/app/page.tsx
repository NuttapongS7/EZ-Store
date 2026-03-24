import React from 'react';
import { Product } from '../types';
import ProductCatalog from '../components/ProductCatalog';
import Header from '../components/Header';

// Next.js App Router Server Component fetching mock data
async function getProducts(): Promise<Product[]> {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store', // Prevent caching so the skeleton always renders
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
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
