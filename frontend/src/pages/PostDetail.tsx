import React, { useState, useEffect, useContext } from 'react';
import DOMPurify from "dompurify";
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '@/adapters/postAdapter';
import { getCommentsByPost, createComment } from "@/adapters/commentAdapter.ts";
import ForumPostCard from '@/components/ForumPostCard';
import CommentCard from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import Textarea from '@/components/Textarea';
import CurrentUserContext from '@/context/current-user-context';
import ReactQuill from "react-quill";

interface Comment {
    id: number;
    body: string;
    createdAt: string;
    username: string;
    profilePicture: string;
    userId: number;
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);

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
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        setCommentLoading(true);

        try {
            const tempComment = {
                id: Date.now(),
                body: newComment,
                createdAt: new Date().toISOString(),
                username: currentUser.username,
                profilePicture: currentUser.profilePicture,
                userId: currentUser.id
            };

            // Optimistically update comments before actual post request
            setComments(prev => [...prev, tempComment]);

            const createdComment = await createComment({
                body: newComment,
                userId: currentUser.id,
                postId: Number(id)
            });

            setComments(prev => [
                ...prev.filter(comment => comment.id !== tempComment.id),
                {
                    id: createdComment.id,
                    body: createdComment.body || newComment,
                    username: createdComment.username || currentUser.username,
                    profilePicture: createdComment.profilePicture || currentUser.profilePicture,
                    createdAt: createdComment.createdAt || new Date().toISOString(),
                    userId: currentUser.id
                }
            ]);

            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Rollback optimistic update if error posting
            setComments(prev => prev.filter(comment => comment.id !== tempComment.id));
        } finally {
            setCommentLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Post Section */}
            {post && (
                <div className="mb-8">
                    <ForumPostCard
                        username={post.username}
                        avatarUrl={post.profilePicture}
                        title={post.title}
                        content={DOMPurify.sanitize(post.body)}
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
                        <ReactQuill
                            theme="snow"
                            value={newComment}
                            onChange={setNewComment}
                            className="bg-white rounded-md"
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['blockquote', 'code-block'],
                                    [{ 'header': 1 }, { 'header': 2 }],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    [{ 'script': 'sub'}, { 'script': 'super' }],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                        />
                        <Button onClick={handleCommentSubmit} disabled={commentLoading || !newComment.trim()}>
                            {commentLoading ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map(comment => comment && (
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