// Defining the structure of a single product item
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Defining the structure of the entire state slice for products
export interface ProductsState {
  items: Product[]; // All products fetched from the API
  filteredItems: Product[]; // Products displayed after filtering/sorting
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // State for controls:
  activeCategory: string | null;
  sortBy: 'price-asc' | 'price-desc' | null;
}