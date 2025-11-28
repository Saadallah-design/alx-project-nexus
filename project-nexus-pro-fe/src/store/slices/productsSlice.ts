import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../../types/product';
import { productsApi } from '../../api/productsApi';

// Initial state of the slice
const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    totalCount: 0,
};

// Async thunk for fetching products from API (backend)
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    return await productsApi.fetchAll();
  }
);

// Create the slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Synchronous actions (in case I need to clear the products or set an error)
        clearProducts: (state) => {
            state.items = [];
            state.totalCount = 0;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handle async thunk states
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { clearProducts, setError } = productsSlice.actions;

export default productsSlice.reducer;

