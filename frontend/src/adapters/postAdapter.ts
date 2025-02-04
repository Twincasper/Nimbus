import {fetchHandler} from "@/utils/fetchHandler.ts";
import {postOptions, patchOptions, deleteOptions} from "@/utils/requestOptions.ts";

const baseUrl = "http://localhost:8080/api";

interface Post {
    title: string;
    body: string;
    userId: number;
    categoryId: number;
}

export const getAllPosts = async () => {
    return fetchHandler(`${baseUrl}/posts`);
};

export const getPostsByCategory = async(categoryId: number) => {
    return fetchHandler(`${baseUrl}/posts/category/${categoryId}`);
}

export const getPost = async(id: number) => {
    return fetchHandler(`${baseUrl}/{id}`)
}

export const getPostByUser = async(userId: number) => {
    return fetchHandler(`${baseUrl}/posts/user/${userId}`)
}

export const createPost = async(post: Post) => {
    return fetchHandler(`${baseUrl}/posts`, postOptions(post))
}

export const updatePost = async(id: number, post: Post) => {
    return fetchHandler(`${baseUrl}/posts/${id}`, patchOptions(post))
}

export const deletePost = async(id: number) => {
    return fetchHandler(`${baseUrl}/posts/${id}`, deleteOptions)
}

export const getRecentPosts = async () => {
    return fetchHandler(`${baseUrl}/posts/recent`);
}
