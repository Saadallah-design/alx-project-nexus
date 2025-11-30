import { getAccessToken } from '../utils/localStorage';

// Base API URL - use environment variable for flexibility
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper to get headers with auth token
const getHeaders = () => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const token = getAccessToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// API client configuration
export const apiClient = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            credentials: 'include', // Ensure cookies are sent for session persistence
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent for session persistence
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let errorMessage = `API Error: ${response.statusText}`;
            try {
                const errorData = await response.json();
                console.error('API Error Details:', errorData);
                // If the backend returns field-specific errors (Django style), format them
                if (typeof errorData === 'object' && errorData !== null) {
                    const messages = Object.entries(errorData)
                        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                        .join('\n');
                    if (messages) errorMessage = messages;
                }
            } catch (e) {
                // Could not parse JSON, stick to status text
            }
            throw new Error(errorMessage);
        }

        return response.json();
    },

    patch: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return {} as T; // DELETE usually returns 204 No Content
    },
};