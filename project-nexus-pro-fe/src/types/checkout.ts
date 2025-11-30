// src/types/checkout.ts

// --- 1. Address Interface ---
// NOTE: These field names (snake_case) are ASSUMED to match your Django Address Serializer.
// YOU MUST VERIFY these names against your Django Order API's required input fields.
export interface Address {
    id?: string; // Optional if using saved addresses

    // Contact Details
    first_name: string; 
    last_name: string;
    phone_number: string;
    email: string;

    // Location Details
    address_line_1: string; 
    address_line_2: string | null; 
    city: string;
    state_province: string; // Keep this generic
    postal_code: string;
    country: string;
}

// --- 2. Shipping Rate Interface ---
export interface ShippingRate {
    // This ID is CRITICAL; the final order submission uses this to identify the rate.
    id: string; 
    carrier_name: string; // e.g., "Amana Express"
    price: string; // Decimal as string, e.g., "50.00"
    delivery_estimate: string; // e.g., "3-5 days"
}

// --- 3. Checkout State Interface (The Flow Manager) ---
export interface CheckoutState {
    // Flow Management
    currentStep: 1 | 2 | 3 | 4; 
    status: 'idle' | 'loading' | 'submitting' | 'succeeded' | 'failed';
    error: string | null;

    // Data Collected
    shippingAddress: Address | null;
    billingAddress: Address | null; 
    selectedShippingRate: ShippingRate | null;
    paymentMethod: 'COD' | 'Card' | null; 
    paymentIntentId: string | null; 
}