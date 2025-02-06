import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForumPostCard from "../components/ForumPostCard";
import Sidebar from "../components/Sidebar";
import RecentPosts from "../components/RecentPosts";
import {
    createPost,
    deletePost,
    getPostByUser,
    getPostsByCategory,
    getRecentPosts,
    updatePost
} from "@/adapters/postAdapter.ts";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
    categoryId: number;
    username: string;
    avatarUrl: string;
}

// Define communities here (or import from a shared file)
const communities = [
    { id: 1, name: "Rainy Days & Silver Linings", description: "Depression & Hope" },
    { id: 2, name: "Calm in the Storm", description: "Anxiety & Stress Relief" },
    { id: 3, name: "Fluff Therapy", description: "Self-Care & Comfort" },
    { id: 4, name: "Cloud Nine Creations", description: "Hobbies & Creativity" },
    { id: 5, name: "Cumulus Care", description: "Physical & Mental Health Tips" },
    { id: 6, name: "Rainbows", description: "For the good days. The victories, big and small. You deserve to feel good about yourself."}
];

const Community: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let data;
                if (selectedCategoryId) {
                    data = await getPostsByCategory(selectedCategoryId);
                } else {
                    data = await getRecentPosts();
                }
                console.log("Fetched data:", data);
                setPosts(data[0]); // Fixed: Remove [0]
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [selectedCategoryId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar onSelectCategory={setSelectedCategoryId} />
            <main className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {selectedCategoryId
                        ? `${communities.find(c => c.id === selectedCategoryId)?.name || ''} Community`
                        : "All Communities"}
                </h1>
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id}>
                            <ForumPostCard
                                username={post.username || "Anonymous"}
                                avatarUrl={post.avatarUrl || "/default-avatar.png"}
                                title={post.title || "No Title"}
                                content={post.body || "No content available."}
                                date={new Date(post.createdAt).toLocaleDateString() || "Unknown date"}
                                likes={post.likes || 0}
                                comments={post.comments || 0}
                                onClick={() => {
                                    console.log(JSON.stringify(post, null, 2));
                                    navigate(`/post/${post.id}`);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </main>
            <RecentPosts posts={posts.slice(0, 5)} />
        </div>
    );
};

export default Community;