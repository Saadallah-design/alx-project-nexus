import { apiClient } from './client';
import type { Product } from '../types/product';

export const productsApi = {
  // Fetch all products
//   endpoint: /catalog/
  fetchAll: () => apiClient.get<Product[]>('/products/'),

  // Fetch with filters (optional)
  fetchFiltered: (params: { category?: string; minPrice?: number }) => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    
    return apiClient.get<Product[]>(`/products/?${queryString}`);
  },

  // Fetch single product
  fetchById: (id: number) => apiClient.get<Product>(`/products/${id}/`),
};