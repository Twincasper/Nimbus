import React, {useContext, useEffect} from "react";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import communities from '@/utils/communities.ts'
import ForumPostCard from "../components/ForumPostCard";
import Sidebar from "../components/Sidebar";
import RecentPosts from "../components/RecentPosts";
import {
    deletePost,
    getPostsByCategory,
    getRecentPosts,
} from "@/adapters/postAdapter.ts";
import NewPostButton from "@/components/NewPostButton.tsx";
import CurrentUserContext from "@/context/current-user-context.ts";
import EditPostModal from "@/components/EditPostModal.tsx";
import toast from "react-hot-toast";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    createdAt: string;
    likes: number;
    comments: number;
    categoryId: number;
    username: string;
    profilePicture: string;
    pronouns: string;
    categoryName: string;
}

const Community: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const { categoryId } = useParams<{ categoryId: string }>();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            setSelectedCategoryId(Number(categoryId));
        }
    }, [categoryId]);

    const handleDeletePost = async (postId: number) => {
        if (!window.confirm('You actually wanna delete your post? :(')) return;

        try {
            await deletePost(postId);
            setPosts(prev => prev.filter(post => post.id !== postId));
            toast.success('Post deleted!', {
                duration: 3000,
                style: {
                    background: 'oklch(var(--in))',
                    color: 'oklch(var(--inc))'
                }
            });
        } catch (error) {
            console.error('There was an issue deleting your post!: ', error);
            toast.error('Failed to update post. Please try again.', {
            });
        }
    };

    const handleSavePost = (updatedPost: Post) => {
        setPosts(prev => prev.map(post =>
            post.id === updatedPost.id ? updatedPost : post
        ));
        toast.success('Post updated successfully!', {
            duration: 3000,
            style: {
                background: 'oklch(var(--in))',
                color: 'oklch(var(--inc))'
            }
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = categoryId 
                    ? await getPostsByCategory(Number(categoryId))
                    : await getRecentPosts();
                
                if (data && Array.isArray(data) && data.length > 0) {
                    setPosts(data[0] as Post[]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [categoryId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-base-100/80 max-w-7xl mx-auto">
            <Sidebar onSelectCategory={(id) => {
                navigate(id ? `/community/${id}` : '/community');
            }} />
            <div className="flex-1 p-4">
                <div className="flex justify-between items-center">
                    <div className="py-8 mb-6 rounded-lg flex-1">
                        <h1 className="text-2xl font-bold text-base-content text-center">
                            {selectedCategoryId
                                ? `${communities.find((c) => c.id === selectedCategoryId)?.name || ""}`
                                : "All Communities"}
                        </h1>

                        {selectedCategoryId && (
                            <p className="text-sm font-semibold text-base-content text-center mt-2 max-w-2xl mx-auto">
                                {communities.find((c) => c.id === selectedCategoryId)?.description}
                            </p>
                        )}
                    </div>
                    <NewPostButton />
                </div>
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id}>
                            <ForumPostCard
                                postId={post.id}
                                userId={post.userId}
                                username={post.username || "Anonymous"}
                                categoryName={post.categoryName}
                                pronouns={post.pronouns}
                                avatarUrl={post.profilePicture || "/default-avatar.png"}
                                title={post.title || "No Title"}
                                content={post.body || "No content available."}
                                date={new Date(post.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                likes={post.likes || 0}
                                comments={post.comments || 0}
                                onClick={() => {
                                    console.log(JSON.stringify(post, null, 2));
                                    navigate(`/posts/${post.id}`);
                                }}
                                currentUserUsername={currentUser?.username}
                                onEdit={() => setEditingPost(post)}
                                onDelete={() => handleDeletePost(post.id)}
                                isDetailView={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <RecentPosts posts={posts.slice(0, 10)} />
            {editingPost && (
                <EditPostModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onSave={handleSavePost}
                />
            )}
        </div>
    );
};

export default Community;