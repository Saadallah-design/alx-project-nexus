import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/localStorage';

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

// Helper to refresh access token
const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            saveTokens(data.access, data.refresh || refreshToken); // Update tokens
            return data.access;
        } else {
            clearTokens(); // Refresh failed, clear tokens
            return null;
        }
    } catch (error) {
        clearTokens();
        return null;
    }
};

// Generic request handler with retry logic
const request = async <T>(
    endpoint: string,
    options: RequestInit,
    retry = true
): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = getHeaders();

    const config: RequestInit = {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
        credentials: 'include',
    };

    let response = await fetch(url, config);

    // Handle 401 Unauthorized (Token Expired)
    if (response.status === 401 && retry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            // Retry request with new token
            const newHeaders = {
                ...config.headers,
                'Authorization': `Bearer ${newToken}`,
            };
            response = await fetch(url, { ...config, headers: newHeaders });
        }
    }

    if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        try {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            if (typeof errorData === 'object' && errorData !== null) {
                const messages = Object.entries(errorData)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join('\n');
                if (messages) errorMessage = messages;
            }
        } catch (e) {
            // Could not parse JSON
        }
        throw new Error(errorMessage);
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
};

// API client configuration
export const apiClient = {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, data: unknown) =>
        request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),

    patch: <T>(endpoint: string, data: unknown) =>
        request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),

    delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};