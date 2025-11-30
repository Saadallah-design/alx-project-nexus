// Base API URL - use environment variable for flexibility
const API_BASE_URL = import.meta.env.VITE_API_URL;

// API client configuration
export const apiClient = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            credentials: 'include', // Ensure cookies are sent for session persistence
            headers: {
                'Content-Type': 'application/json',
                //  auth token
                // 'Authorization': `Bearer ${getToken()}`,
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return {} as T; // DELETE usually returns 204 No Content
    },
};