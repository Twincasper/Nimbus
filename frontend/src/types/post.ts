export interface Post {
    id: number;
    postId: number;
    userId: number;
    title: string;
    body: string;
    createdAt: string;
    likes: number;
    comments: number;
    username: string;
    profilePicture: string;
    categoryId: number;
    pronouns?: string;
    categoryName: string;
} 