// src/hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

// Typed dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
