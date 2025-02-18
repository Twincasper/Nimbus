// src/adapters/userAdapter.ts
import { fetchHandler } from '@/utils/fetchHandler'
import {patchOptions, postOptions, putOptions, deleteOptions} from '@/utils/requestOptions';

const baseUrl = "http://localhost:8080/api";

export const getCurrentUser = async () => {
    return fetchHandler(`${baseUrl}/users/me`);
};

export const deleteUser = async (id: number) => {
    return fetchHandler(`${baseUrl}/users/${id}`, deleteOptions);
}

export const updateUser = async (id: number, data: {
    username: string,
    pronouns: string,
    profilePicture: string,
    bio: string
}) => {
    return fetchHandler(`${baseUrl}/users/${id}`, putOptions(data));
};

export const checkUsername = async (username: string): Promise<boolean> => {
    const [available] = await fetchHandler(`${baseUrl}/users/check/${username}`);
    return Boolean(available);
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string, confirmPassword: string) => {
    return fetchHandler(`/api/users/${userId}/change-password`, postOptions({
        currentPassword,
        newPassword,
        confirmPassword
    }));
};