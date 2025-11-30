import { apiClient } from './client';
import type { Product } from '../types/product';

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ProductsParams {
    page?: number;
    page_size?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export const productsApi = {
    // Fetch all products (backwards compatibility)
    fetchAll: () => apiClient.get<Product[]>('/catalog/products/'),

    // Fetch paginated products
    fetchPaginated: (params: ProductsParams = {}) => {
        const { page = 1, page_size = 12, ...filters } = params;

        const queryParams = new URLSearchParams({
            page: String(page),
            page_size: String(page_size),
            ...Object.fromEntries(
                Object.entries(filters)
                    .filter(([_, v]) => v !== undefined && v !== '')
                    .map(([k, v]) => [k, String(v)])
            ),
        }).toString();

        return apiClient.get<PaginatedResponse<Product>>(`/catalog/products/?${queryParams}`);
    },

    // Fetch with filters (optional)
    fetchFiltered: (params: { category?: string; minPrice?: number }) => {
        const queryString = new URLSearchParams(
            Object.entries(params)
                .filter(([_, v]) => v !== undefined)
                .map(([k, v]) => [k, String(v)])
        ).toString();

        return apiClient.get<Product[]>(`/catalog/products/?${queryString}`);
    },

    // Fetch single product
    fetchById: (id: number) => apiClient.get<Product>(`/catalog/products/${id}/`),
};