// src/hooks/useAppSelector.ts
import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store/store';

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
