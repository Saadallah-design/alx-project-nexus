import { apiClient } from './client';

export interface CartItemResponse {
    id: number;
    product_name: string;
    quantity: number;
    price: string;
    extended_price: number;
}

export interface CartResponse {
    id: string;
    status: string;
    items: CartItemResponse[];
    total_price: number;
}

export const cartApi = {
    // GET /api/cart/
    getCart: () => apiClient.get<CartResponse>('/cart/'),

    // POST /api/cart/items/
    addToCart: (productId: string, quantity: number) =>
        apiClient.post<CartItemResponse>('/cart/items/', { product_id: productId, quantity }),

    // PATCH /api/cart/items/<item-id>/
    updateItem: (itemId: number, quantity: number) =>
        apiClient.patch<CartItemResponse>(`/cart/items/${itemId}/`, { quantity }),

    // DELETE /api/cart/items/<item-id>/
    removeItem: (itemId: number) =>
        apiClient.delete(`/cart/items/${itemId}/`),
};
