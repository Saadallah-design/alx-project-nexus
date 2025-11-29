// src/store/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

// Load initial state from localStorage if available
const loadCartFromStorage = (): CartItem[] => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error("Could not load cart from localStorage", err);
        return [];
    }
};

const initialState: CartState = {
    items: loadCartFromStorage(),
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        toggleCart: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + (parseFloat(item.sale_price) * item.quantity), 0);
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;

export default cartSlice.reducer;
