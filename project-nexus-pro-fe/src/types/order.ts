import type { Address } from './checkout';

// Defines the line item structure the backend expects
export interface OrderItemPayload {
    product_id: string;
    quantity: number;
}

// NOTE: These field names are ASSUMED to be the structure your Django Order API expects.
// YOU MUST VERIFY these names against your Django Order API.
export interface OrderCreationPayload {
    order_items: OrderItemPayload[];

    // Assuming your serializer expects the address as a nested dictionary under this key
    shipping_address: Address;

    shipping_rate_id: string;
    payment_method: 'COD' | 'Card';

    user_id?: string; // Included only for registered users
}