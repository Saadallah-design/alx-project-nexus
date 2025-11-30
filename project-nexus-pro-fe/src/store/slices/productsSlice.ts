// src/store/slices/productsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../../types/product';
import { productsApi } from '../../api/productsApi';

// Initial state of the slice
const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    hasMore: true,
    pageSize: 12,
};

// Async thunk for fetching initial products
export const fetchProducts = createAsyncThunk<Product[], void>(
    'products/fetchProducts',
    async () => {
        const response = await productsApi.fetchPaginated({ page: 1, page_size: 12 });
        return response.results;
    }
);

// Async thunk for loading more products (infinite scroll)
export const loadMoreProducts = createAsyncThunk<
    Product[],
    void,
    { state: { products: ProductsState } }
>(
    'products/loadMore',
    async (_, { getState }) => {
        const { currentPage, pageSize } = getState().products;
        const response = await productsApi.fetchPaginated({
            page: currentPage + 1,
            page_size: pageSize
        });
        return response.results;
    }
);

// Create the slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Synchronous actions
        clearProducts: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.currentPage = 1;
            state.hasMore = true;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        resetPagination: (state) => {
            state.currentPage = 1;
            state.hasMore = true;
            state.items = [];
        },
    },

    extraReducers: (builder) => {
        builder
            // Fetch initial products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
                state.currentPage = 1;
                state.hasMore = action.payload.length === state.pageSize;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            // Load more products (infinite scroll)
            .addCase(loadMoreProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadMoreProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;

                // Append new products, avoiding duplicates
                const existingIds = new Set(state.items.map(p => p.id));
                const newProducts = action.payload.filter(p => !existingIds.has(p.id));

                state.items = [...state.items, ...newProducts];
                state.currentPage += 1;
                state.totalCount = state.items.length;

                // If we received fewer products than page size, we've reached the end
                state.hasMore = action.payload.length === state.pageSize;
            })
            .addCase(loadMoreProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load more products';
            });
    },
});

export const { clearProducts, setError, resetPagination } = productsSlice.actions;

// Selectors
export const selectProducts = (state: { products: ProductsState }) => state.products.items;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectHasMore = (state: { products: ProductsState }) => state.products.hasMore;
export const selectCurrentPage = (state: { products: ProductsState }) => state.products.currentPage;

export default productsSlice.reducer;
