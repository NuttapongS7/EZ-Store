export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface CartItem extends Product {
  quantity: number;
}

// Interfaces to support the flattened export requirements
export interface CartFilters {
  searchTerm: string;
  category: string;
  priceRange: string;
  sortBy: string;
}

export interface CartMetadata {
  timestamp: string;
  itemCount: number;
}

export interface NestedCartState {
  items: CartItem[];
  filters: CartFilters;
  metadata: CartMetadata;
}
