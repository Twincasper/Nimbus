import {fetchHandler} from "@/utils/fetchHandler.ts";
import {postOptions, patchOptions, deleteOptions} from "@/utils/requestOptions.ts";

const baseUrl = '/api';

interface Comment {
    body: string;
    userId: number;
    postId: number;
}

export const createComment = async(comment: Comment) => {
    return fetchHandler(`${baseUrl}/comments`, postOptions(comment));
}

export const getCommentsByPost = async(postId: number) => {
    return fetchHandler(`${baseUrl}/comments/post/${postId}`);
}

export const updateComment = async(id: number, comment: Comment) => {
    return fetchHandler(`${baseUrl}/comments/${id}`, patchOptions(comment));
}

export const deleteComment = async(id: number) => {
    return fetchHandler(`${baseUrl}/comments/${id}`, deleteOptions);
}


