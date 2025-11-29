import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';

import filterReducer from './slices/filterSlice';

// Configure the store with all reducers
export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
  },
});

// Define types for RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;