// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import authReducer, { type AuthState } from './slices/authSlice';


// 2. Import State Interfaces (assuming you define them near their reducers or in types/)
import type { ProductsState } from '../types/product'; // Assuming you have ProductsState here
import type { FilterState } from './slices/filterSlice'; // Assuming FilterState is defined here
import type { CartState } from './slices/cartSlice'; // Assuming CartState is defined here
import type { CheckoutState } from './slices/checkoutSlice'; // Assuming CheckoutState is defined here

// Configure the store with all reducers
export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    auth: authReducer,
  },
});

// 3. Define the explicit RootState Type
export type RootState = {
  products: ProductsState;
  filters: FilterState;
  cart: CartState; // <-- Explicitly defined type
  checkout: CheckoutState; // <-- Explicitly defined type
  auth: AuthState;
};

// 4. Define AppDispatch (using ReturnType is standard here)
export type AppDispatch = typeof store.dispatch;

// Note: To make this work, ensure you are exporting the 
// state interfaces (like CartState, CheckoutState, FilterState) 
// from their respective slice files!
// Define types for RootState and AppDispatch for TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;