import { fetchHandler } from "@/utils/fetchHandler";
import { postOptions } from "@/utils/requestOptions";
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
