import React from 'react';
import Header from '../components/Header';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[420px] animate-pulse">
              <div className="h-48 sm:h-64 bg-gray-200"></div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
