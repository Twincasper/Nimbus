import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '@/adapters/postAdapter';
import { getCommentsByPost, createComment } from "@/adapters/commentAdapter.ts";
import ForumPostCard from '@/components/ForumPostCard';
import CommentCard from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import Textarea from '@/components/Textarea';
import CurrentUserContext from '@/context/current-user-context';

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await getPost(Number(id));
                const commentsData = await getCommentsByPost(Number(id));
                setPost(postData[0]);
                setComments(commentsData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        try {
            await createComment({
                body: newComment,
                userId: currentUser.id,
                postId: Number(id)
            });

            // Refresh comments
            const updatedComments = await getCommentsByPost(Number(id));
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Post Section */}
            {post && (
                <div className="mb-8">
                    <ForumPostCard
                        username={post.username}
                        avatarUrl={post.profilePicture}
                        title={post.title}
                        content={post.body}
                        date={new Date(post.createdAt).toLocaleDateString()}
                        likes={post.likes}
                        comments={post.comments}
                        // Disable click behavior
                        onClick={undefined}
                    />
                </div>
            )}

            {/* Comment Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>

                {/* Comment Input */}
                {currentUser && (
                    <div className="mb-6">
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            rows={3}
                            className="mb-2"
                        />
                        <Button onClick={handleCommentSubmit}>
                            Post Comment
                        </Button>
                    </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map(comment => (
                        <CommentCard
                            key={comment.id}
                            username={comment.username}
                            avatarUrl={comment.profilePicture}
                            content={comment.body}
                            date={new Date(comment.createdAt).toLocaleDateString()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;