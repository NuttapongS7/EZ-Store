'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { state, dispatch, totalQuantity, totalPrice, isSidebarOpen, setIsSidebarOpen, exportCartData } = useCart();

  // Determine if there are active items rendering
  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Your Cart <span className="text-gray-400 text-sm ml-1">({totalQuantity})</span></h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-black transition-colors p-2 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-500">Your cart is empty.</p>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition text-sm font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-lg relative shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)]">
                  <div className="h-16 w-16 bg-white p-1 rounded-md flex-shrink-0 flex items-center justify-center border border-gray-50">
                     <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1" title={item.title}>{item.title}</h4>
                    <p className="text-sm font-bold text-blue-600 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    
                    <div className="flex items-center mt-3 space-x-3 bg-gray-50 border border-gray-200 w-fit rounded-md px-2 py-1">
                      <button 
                        className="text-gray-500 hover:text-black font-semibold text-sm px-2 leading-none"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 }})}
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        className="text-gray-500 hover:text-black font-semibold text-sm px-2 leading-none"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 }})}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-1 bg-white rounded-full transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Checkout
            </button>
            <button 
              onClick={() => exportCartData({ searchTerm: '', category: '', priceRange: '', sortBy: '' })} 
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-md transition-colors flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              Export JSON to Console
            </button>
          </div>
        )}
      </div>
    </>
  );
}
