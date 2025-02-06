// src/adapters/authAdapter.ts
import { fetchHandler } from "@/utils/fetchHandler";
import { postOptions } from "@/utils/requestOptions";

const baseUrl = "http://localhost:8080/api/auth";

export const login = async (username: string, password: string) => {
    return fetchHandler(`${baseUrl}/login`, postOptions({ username, password }));
};

export const register = async (
    username: string,
    password: string,
    pronouns: string,
    profilePicture: string
) => {
    return fetchHandler(
        `${baseUrl}/register`,
        postOptions({ username, password, pronouns, profilePicture })
    );
};