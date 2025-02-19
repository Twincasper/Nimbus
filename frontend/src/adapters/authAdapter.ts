import { fetchHandler } from "@/utils/fetchHandler";
import {getOptions, postOptions} from "@/utils/requestOptions";
import { CurrentUser } from "@/context/current-user-context";

const baseUrl = "http://localhost:8080/api/auth";

// Note: Replace `CurrentUser` with the appropriate type if needed.

export const login = async (username: string, password: string): Promise<CurrentUser> => {
    const [data, error] = await fetchHandler<CurrentUser>(
        `${baseUrl}/login`,
        postOptions({ username, password })
    );

    if (error) {
        throw error;
    }

    // At this point, data is guaranteed to be non-null (assuming a successful response)
    return data!;
};

export const logout = async (): Promise<void> => {
    const [_, error] = await fetchHandler<void>(
        `${baseUrl}/logout`,
        postOptions()
    );

    if (error) {
        throw error;
    }
};

export const register = async (
    username: string,
    password: string,
    pronouns: string,
    profilePicture: string
): Promise<CurrentUser> => {
    const [data, error] = await fetchHandler<CurrentUser>(
        `${baseUrl}/register`,
        postOptions({ username, password, pronouns, profilePicture })
    );

    if (error) {
        throw error;
    }

    return data!;
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
    const [data, error] = await fetchHandler<CurrentUser>(`${baseUrl}/me`, getOptions);

    console.log("This is the data fetched from getCurrentUser",data);

    if (error) {
        console.error('Failed to fetch current user:', error);
        return null; // Return null if there's an error
    }

    return data;
};

