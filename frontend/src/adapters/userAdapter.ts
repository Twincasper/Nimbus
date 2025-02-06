// src/adapters/userAdapter.ts
import { fetchHandler } from '@/utils/fetchHandler'
import { postOptions } from '@/utils/requestOptions';

const baseUrl = "http://localhost:8080/api";

// Authentication
// export const login = async (username: string, password: string) => {
//     return fetchHandler(`${baseUrl}/login`, postOptions({ username, password }));
// };
//
// export const register = async (username: string, password: string) => {
//     return fetchHandler(`${baseUrl}/users`, postOptions({ username, password }));
// };

// User management
export const getCurrentUser = async () => {
    return fetchHandler(`${baseUrl}/users/me`);
};

export const updateUser = async (id: number, updates: unknown) => {
    return fetchHandler(`${baseUrl}/users/${id}`, postOptions(updates));
};

export const checkUsername = async (username: string): Promise<boolean> => {
    const [available] = await fetchHandler(`${baseUrl}/users/check/${username}`);
    return Boolean(available);
};