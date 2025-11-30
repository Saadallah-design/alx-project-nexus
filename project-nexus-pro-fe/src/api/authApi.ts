// src/api/authApi.ts
import { apiClient } from './client';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}

export interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

export const authApi = {
    // Login - POST /api/auth/token/
    login: (credentials: LoginCredentials) =>
        apiClient.post<TokenResponse>('/auth/token/', credentials),

    // Register - POST /api/auth/register/
    register: (data: RegisterData) =>
        apiClient.post<UserProfile>('/auth/register/', data),

    // Logout - POST /api/auth/token/blacklist/
    logout: (refreshToken: string) =>
        apiClient.post('/auth/token/blacklist/', { refresh: refreshToken }),

    // Refresh Token - POST /api/auth/token/refresh/
    refreshToken: (refreshToken: string) =>
        apiClient.post<TokenResponse>('/auth/token/refresh/', { refresh: refreshToken }),

    // Get Profile - GET /api/auth/me/
    getProfile: () =>
        apiClient.get<UserProfile>('/auth/me/'),

    // Update Profile - PATCH /api/auth/me/
    updateProfile: (data: Partial<UserProfile>) =>
        apiClient.patch<UserProfile>('/auth/me/', data),
};
