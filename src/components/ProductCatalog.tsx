'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductGrid from './ProductGrid';
import { useDebounce } from '../hooks/useDebounce';

interface ProductCatalogProps {
  initialProducts: Product[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState(''); // 'under-50', '50-200', 'over-200', ''
  const [sortBy, setSortBy] = useState(''); // 'price-asc', 'price-desc', 'name-asc', 'name-desc', ''

  // 1. Debounce Search
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 2. Extract unique categories dynamically based on initial products
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    return Array.from(cats);
  }, [initialProducts]);

  // 3. Filter and Sort (Execute efficiently with useMemo based on debounced term)
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (debouncedSearchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (priceRange) {
      if (priceRange === 'under-50') result = result.filter(p => p.price < 50);
      else if (priceRange === '50-200') result = result.filter(p => p.price >= 50 && p.price <= 200);
      else if (priceRange === 'over-200') result = result.filter(p => p.price > 200);
    }

    if (sortBy) {
      if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
      else if (sortBy === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));
      else if (sortBy === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [initialProducts, debouncedSearchTerm, category, priceRange, sortBy]);


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-gray-900 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <div className="space-y-3 mt-3">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="radio" className="mr-2 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300" name="price" value="" checked={priceRange === ''} onChange={(e) => setPriceRange(e.target.value)} />
                All Prices
              </label>
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="radio" className="mr-2 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300" name="price" value="under-50" checked={priceRange === 'under-50'} onChange={(e) => setPriceRange(e.target.value)} />
                Under $50
              </label>
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="radio" className="mr-2 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300" name="price" value="50-200" checked={priceRange === '50-200'} onChange={(e) => setPriceRange(e.target.value)} />
                $50 - $200
              </label>
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="radio" className="mr-2 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300" name="price" value="over-200" checked={priceRange === 'over-200'} onChange={(e) => setPriceRange(e.target.value)} />
                Over $200
              </label>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-gray-900 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Product Grid */}
      <div className="flex-grow">
        <div className="mb-4 text-sm text-gray-500 flex justify-between items-center bg-white p-3 rounded-md border border-gray-100 shadow-sm">
          <span>Showing <strong className="text-gray-900">{filteredProducts.length}</strong> results</span>

          {(searchTerm || category || priceRange || sortBy) && (
            <button
              onClick={() => {
                setSearchTerm(''); setCategory(''); setPriceRange(''); setSortBy('');
              }}
              className="text-gray-500 hover:text-gray-900 font-semibold underline text-sm transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
