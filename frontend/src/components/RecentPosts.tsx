import type React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Post {
    id: number;
    title: string;
    username?: string;
    pronouns?: string;
}

interface RecentPostsProps {
    posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handlePostClick = (postId: number) => {
        navigate(`/posts/${postId}`); // Navigate to the post detail page
    };

    return (
        <aside className="w-64 p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <div className="space-y-2">
                {posts.map((post) => (
                    <Card
                        className="bg-neutral cursor-pointer hover:bg-neutral-focus transition-colors" // Add hover effect
                        key={post.id}
                        onClick={() => handlePostClick(post.id)} // Make the card clickable
                    >
                        <CardHeader className="p-2 text-neutral-content">
                            <h3 className="text-sm font-semibold">{post.title}</h3>
                        </CardHeader>
                        <CardContent className="p-2">
                            <p className="text-xs text-neutral-content">
                                by {post.username}{" "}
                                {post.pronouns && <span className="text-accent">({post.pronouns})</span>}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </aside>
    );
};

export default RecentPosts;