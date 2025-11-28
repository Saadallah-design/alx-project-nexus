// types/product.ts
// Category nested object
export interface Category {
    id: string;
    name: string;
    slug: string;
}

// Product interface matching backend API
export interface Product {
    id: string;  // UUID from backend
    category: Category;  // Nested category object
    name: string;
    description: string;
    base_price: string;  // Decimal as string from Django
    sale_price: string;
    discount_percentage: string;
    stock_quantity: number;
    is_available: boolean;
    is_featured: boolean;
    created_at: string;  // ISO datetime string
    updated_at: string;
    images?: string[]; 
}

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    totalCount: number;
}
