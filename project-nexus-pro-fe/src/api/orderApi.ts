import { apiClient } from './client';

export interface OrderItem {
    id: string;
    product_id: string;
    product_name: string;
    product_image?: string;
    quantity: number;
    price: string;
    extended_price: string;
}

export interface Order {
    id: string;
    status: string;
    items: OrderItem[];
    total_price: string;
    created_at: string;
    // Additional fields for detail view
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    shipping_address?: string;
    shipping_address_line_2?: string | null;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country?: string;
    payment_method?: string;
    paid_at?: string | null;
}

export const orderApi = {
    // Get User Orders - GET /api/cart/orders/
    getUserOrders: () =>
        apiClient.get<Order[]>('/cart/orders/'),

    // Get Order Details - GET /api/cart/orders/{id}/
    getOrderDetails: (orderId: string) =>
        apiClient.get<Order>(`/cart/orders/${orderId}/`),
};
