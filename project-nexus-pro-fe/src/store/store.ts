import { configureStore } from '@reduxjs/toolkit';

// I will add the product "slice" here soon.
export const store = configureStore({
  reducer: {
    // products: productsReducer
  },
});

// Define types for RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;