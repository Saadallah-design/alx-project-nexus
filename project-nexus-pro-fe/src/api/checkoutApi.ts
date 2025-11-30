import { apiClient } from './client';

// Checkout payload matching backend API v1.1
export interface CheckoutPayload {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    shipping_address?: string;
    shipping_address_line_2?: string | null;
    shipping_city: string;
    shipping_state?: string;
    shipping_postal_code: string;
    shipping_country?: string;
}

// Backend response
export interface CheckoutResponse {
    message: string;
    order_id: string;
    total: number;
}

// Payment response
export interface PaymentResponse {
    message: string;
    order_id: string;
    status: string;
    paid_at: string;
}

export const checkoutApi = {
    // POST /api/cart/checkout/ (Authenticated)
    createOrder: (payload: CheckoutPayload) =>
        apiClient.post<CheckoutResponse>('/cart/checkout/', payload),

    // POST /api/cart/guest/checkout/ (Guest)
    createGuestOrder: (payload: CheckoutPayload) =>
        apiClient.post<CheckoutResponse>('/cart/guest/checkout/', payload),

    // POST /api/cart/orders/<order-id>/pay/
    processPayment: (orderId: string) =>
        apiClient.post<PaymentResponse>(`/cart/orders/${orderId}/pay/`, {}),

    // GET /api/cart/orders/
    getOrderHistory: () =>
        apiClient.get('/cart/orders/'),

    // GET /api/cart/orders/<order-id>/
    getOrderDetails: (orderId: string) =>
        apiClient.get(`/cart/orders/${orderId}/`),
};
