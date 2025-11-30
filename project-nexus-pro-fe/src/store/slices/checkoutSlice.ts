import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { CheckoutState, Address, ShippingRate } from '../../types/checkout';

// --- 1. Initial State ---
const initialState: CheckoutState = {
    currentStep: 1, // Start at Shipping/Delivery
    status: 'idle',
    error: null,
    shippingAddress: null,
    billingAddress: null,
    selectedShippingRate: null,
    paymentMethod: null,
    paymentIntentId: null,
};

// --- 2. The Slice Definition ---
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        // Step Navigation
        setCurrentStep: (state, action: PayloadAction<CheckoutState['currentStep']>) => {
            state.currentStep = action.payload;
        },
        goToNextStep: (state) => {
            if (state.currentStep < 4) {
                state.currentStep = (state.currentStep + 1) as CheckoutState['currentStep'];
            }
        },

        // Data Management
        setShippingAddress: (state, action: PayloadAction<Address>) => {
            state.shippingAddress = action.payload;
            // Default billing address to shipping address for simplicity
            state.billingAddress = action.payload;
        },
        setBillingAddress: (state, action: PayloadAction<Address>) => {
            state.billingAddress = action.payload;
        },
        setShippingRate: (state, action: PayloadAction<ShippingRate>) => {
            state.selectedShippingRate = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<CheckoutState['paymentMethod']>) => {
            state.paymentMethod = action.payload;
        },

        // Submission Status
        setCheckoutStatus: (state, action: PayloadAction<CheckoutState['status']>) => {
            state.status = action.payload;
        },
        setCheckoutError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        // Reset state after a successful order
        resetCheckout: () => initialState,
    },
});

// --- 3. Exports ---
export const {
    setCurrentStep,
    goToNextStep,
    setShippingAddress,
    setBillingAddress,
    setShippingRate,
    setPaymentMethod,
    setCheckoutStatus,
    setCheckoutError,
    resetCheckout,
} = checkoutSlice.actions;

// Export the State interface so RootState can use it
export type { CheckoutState };

// Selectors
// Use RootState type from your store for accurate typing
const selectCheckoutState = (state: { checkout: CheckoutState }) => state.checkout;

export const selectCurrentStep = createSelector(
    [selectCheckoutState],
    (checkout) => checkout.currentStep
);

export const selectCheckoutData = createSelector(
    [selectCheckoutState],
    (checkout) => ({
        shippingAddress: checkout.shippingAddress,
        selectedShippingRate: checkout.selectedShippingRate,
        paymentMethod: checkout.paymentMethod,
    })
);

export default checkoutSlice.reducer;