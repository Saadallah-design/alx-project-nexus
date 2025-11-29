// src/store/slices/filterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    category: string | null; // category slug or name
    priceRange: [number, number]; // [min, max]
    search: string; // text search query
}

const initialState: FilterState = {
    category: null,
    priceRange: [0, 1000], // default range, adjust later based on data
    search: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string | null>) {
            state.category = action.payload;
        },
        setPriceRange(state, action: PayloadAction<[number, number]>) {
            state.priceRange = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        clearFilters(state) {
            state.category = null;
            state.priceRange = [0, 1000];
            state.search = '';
        },
    },
});

export const { setCategory, setPriceRange, setSearch, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
