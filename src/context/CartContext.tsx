'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Product, CartItem, NestedCartState } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
         return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalQuantity: number;
  totalPrice: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  exportCartData: (filters: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Phase 5: Recursive utility function to flatten a nested object into dot-notation keys
const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      obj[k].forEach((item: any, i: number) => {
        if (typeof item === 'object' && item !== null) {
           Object.assign(acc, flattenObject(item, `${pre}${k}.${i}`));
        } else {
           acc[`${pre}${k}.${i}`] = item;
        }
      });
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load from localStorage on mount (Solves Hydration Mismatch safely)
  useEffect(() => {
    const savedCart = localStorage.getItem('ecom_cart_state');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } catch (e) {
        console.error('Failed to parse cart state');
      }
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('ecom_cart_state', JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Phase 5: Transform nested Cart State to flattened Dot-notation
  const exportCartData = (currentFilters: any) => {
    const exportState: NestedCartState = {
      items: state.items,
      filters: currentFilters || {
        searchTerm: '', category: '', priceRange: '', sortBy: ''
      },
      metadata: {
        timestamp: new Date().toISOString(),
        itemCount: totalQuantity
      }
    };
    
    console.log("Original Nested Cart State:", exportState);
    const flattened = flattenObject(exportState);
    console.log("Flattened Export Object:", flattened);
    alert("Export successful! Check the browser console to see the flattened data log.");
  };

  return (
    <CartContext.Provider value={{ 
      state: isMounted ? state : initialState, 
      dispatch, 
      totalQuantity: isMounted ? totalQuantity : 0, 
      totalPrice: isMounted ? totalPrice : 0, 
      isSidebarOpen, 
      setIsSidebarOpen, 
      exportCartData 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
