import { fetchHandler, postOptions, patchOptions } from '../lib/api-utils';

const baseUrl = '/api/users';

export const createUser = async ({ username, password }: { username: string; password: string }) => {
    return fetchHandler(baseUrl, postOptions({ username, password }));
};

export const getAllUsers = async () => {
    const users = await fetchHandler(baseUrl);
    return users || [];
};

export const getUser = async (id: number) => {
    return fetchHandler(`${baseUrl}/${id}`);
};

export const updateUsername = async ({ id, username }: { id: number; username: string }) => {
    return fetchHandler(`${baseUrl}/${id}`, patchOptions({ username }));
};