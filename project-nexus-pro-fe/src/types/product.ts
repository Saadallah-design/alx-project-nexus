// types/product.ts
// Category nested object
export interface Category {
    id: string;
    name: string;
    slug: string;
}

// Product Image interface (matches Django ProductImage model)
export interface ProductImage {
    id: number;              // Primary key from Django
    image: string;           // Relative path (e.g., "/media/product_images/...")
    image_url: string;       // Full URL (e.g., "http://localhost:8000/media/...")
    alt_text: string;        // Accessibility text
    order: number;           // Display order
    is_primary: boolean;     // Whether this is the main image
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

    // Image handling (backward compatible)
    images?: ProductImage[];  // New: Array of image objects
    image?: string;  // Old: Single image URL (deprecated, for backward compatibility)
}

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    totalCount: number;
}
