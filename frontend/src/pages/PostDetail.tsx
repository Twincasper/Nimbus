// src/pages/PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ForumPostCard from "@/components/ForumPostCard";
import CommentCard from "@/components/CommentCard";
import Sidebar from "@/components/Sidebar";
import { getPost } from "@/adapters/postAdapter";
import { createComment, getCommentsByPost } from "@/adapters/commentAdapter";
import { Button } from "@/components/ui/button";
import { Modal, TextArea } from "@/components/ui/modal"; // Assuming you have these components

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await getPost(Number(id));
                setPost(postData);

                const commentsData = await getCommentsByPost(Number(id));
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmitComment = async () => {
        try {
            await createComment({
                body: commentBody,
                userId: 1, // Replace with actual user ID from auth context
                postId: Number(id)
            });
            // Refresh comments
            const updatedComments = await getCommentsByPost(Number(id));
            setComments(updatedComments);
            setShowCommentModal(false);
            setCommentBody("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar onSelectCategory={(id) => navigate(`/community/${id}`)} />

            <main className="flex-1 p-4">
                <div className="max-w-3xl mx-auto">
                    {/* Post Display */}
                    <div className="mb-8">
                        <ForumPostCard
                            username={post.user.username}
                            avatarUrl={post.user.avatarUrl}
                            title={post.title}
                            content={post.body}
                            date={new Date(post.created_at).toLocaleDateString()}
                            likes={post.likes}
                            comments={post.comments}
                        />
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
                            <Button
                                className="mt-2"
                                onClick={() => setShowCommentModal(true)}
                            >
                                Add Comment
                            </Button>
                        </div>

                        <div className="p-4 space-y-4">
                            {comments.map(comment => (
                                <CommentCard
                                    key={comment.id}
                                    username={comment.user.username}
                                    avatarUrl={comment.user.avatarUrl}
                                    content={comment.body}
                                    date={new Date(comment.created_at).toLocaleDateString()}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comment Modal */}
                {showCommentModal && (
                    <Modal
                        title="Add Comment"
                        onClose={() => setShowCommentModal(false)}
                        actions={[
                            <Button key="cancel" variant="secondary" onClick={() => setShowCommentModal(false)}>
                                Cancel
                            </Button>,
                            <Button key="submit" onClick={handleSubmitComment}>
                                Submit
                            </Button>
                        ]}
                    >
                        <TextArea
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            placeholder="Write your comment..."
                            rows={4}
                        />
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default PostDetail;