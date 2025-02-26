import { useState, useEffect, useContext } from 'react';
import DOMPurify from 'dompurify';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost, getPost, } from '@/adapters/postAdapter';
import { getCommentsByPost, createComment, deleteComment } from '@/adapters/commentAdapter';
import ForumPostCard from '@/components/ForumPostCard';
import CommentCard from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import CurrentUserContext from '@/context/current-user-context';
import ReactQuill from 'react-quill';
import toast from 'react-hot-toast';
import EditPostModal from '@/components/EditPostModal';
import EditCommentModal from '@/components/EditCommentModal';
import { Post } from '@/types/post';

interface Comment {
    id: number;
    body: string;
    createdAt: string;
    username: string;
    profilePicture: string;
    pronouns?: string;
    userId: number;
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postData, error] = await getPost(Number(id));
                if (postData) {
                    setPost(postData as Post);
                } else {
                    console.error('Error fetching post:', error);
                }

                const [commentsData, commentsError] = await getCommentsByPost(Number(id));
                if (commentsData) {
                    setComments(commentsData as Comment[]);
                } else {
                    console.error('Error fetching comments:', commentsError);
                }
            } catch (error) {
                console.error('Error fetching data, both post and comments:', error);
                navigate('/not-found');
            }
        };
        fetchData();
    }, [id, navigate]);


    const handleDeletePost = async (postId: number) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await deletePost(postId);
            toast.success('Post deleted successfully!', {
                duration: 3000,
                style: {
                    background: 'oklch(var(--in))',
                    color: 'oklch(var(--inc))'
                }
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post. Please try again.', {
            });
        }
    };

    const handleSavePost = async (updatedPost: Post[]) => {
        try {
            console.log('Updated post', updatedPost);
            setPost(updatedPost[0]);
            setEditingPost(null);
            toast.success('Post updated successfully!', {
                duration: 3000,
                style: {
                    background: 'oklch(var(--in))',
                    color: 'oklch(var(--inc))'
                }
            });
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Failed to update post. Please try again.', {
            });
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        try {
            await createComment({
                body: newComment,
                userId: currentUser.id,
                postId: Number(id),
            });

            const updatedComments = await getCommentsByPost(Number(id));
            setComments((updatedComments[0] as Comment[]));
            setNewComment('');
            toast.success('Comment submitted successfully!', {
                duration: 3000,
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error('Failed to submit comment. Please try again.', {
            });
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await deleteComment(commentId);
            const updatedComments = await getCommentsByPost(Number(id));
            setComments((updatedComments[0] as Comment[]));
            toast.success('Comment deleted successfully!', {
                duration: 3000,
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Failed to delete comment. Please try again.', {
            });
        }
    };

    const handleSaveComment = async (updatedComment: Comment) => {
        try {
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === updatedComment.id ? updatedComment : comment
                )
            );

            const refreshedComments = await getCommentsByPost(Number(id));
            setComments((refreshedComments[0] as Comment[]));

            setEditingComment(null);
            toast.success('Comment updated successfully!', {
                duration: 3000,
                style: {
                    background: 'oklch(var(--in))',
                    color: 'oklch(var(--inc))'
                }
            });
        } catch (error) {
            console.error('Error saving comment:', error);
            toast.error('Failed to update comment. Please try again.', {
            });
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Post Section */}
            <div className="mb-8">
                <ForumPostCard
                    username={post.username}
                    userId={post.userId}
                    postId={post.id}
                    pronouns={post.pronouns}
                    categoryName={post.categoryName}
                    avatarUrl={post.profilePicture}
                    title={post.title}
                    content={DOMPurify.sanitize(post.body)}
                    date={new Date(post.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    likes={post.likes}
                    comments={post.comments}
                    currentUserUsername={currentUser?.username}
                    onEdit={() => setEditingPost(post)}
                    onDelete={() => handleDeletePost(post.id)}
                    onClick={undefined}
                    isDetailView={true}
                />
            </div>

            {/* Comment Section */}
            <div className="rounded-lg shadow-md p-2 bg-accent/80">
                <h2 className="text-2xl font-bold mb-4 bg-neutral text-neutral-content border border-neutral-focus rounded-xl p-2 inline-block">Comments ({comments.length})</h2>

                {currentUser && (
                    <div className="mb-6">
                        <ReactQuill
                            theme="snow"
                            value={newComment}
                            onChange={setNewComment}
                            className="bg-white rounded-md text-black"
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['blockquote', 'code-block'],
                                    [{ header: 1 }, { header: 2 }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    [{ script: 'sub' }, { script: 'super' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                        />
                        <Button
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim()}
                        >
                            Post Comment
                        </Button>
                    </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map(
                        (comment) =>
                            comment && (
                                <CommentCard
                                    userId={comment.userId}
                                    key={comment.id}
                                    username={comment.username}
                                    pronouns={comment.pronouns}
                                    avatarUrl={comment.profilePicture}
                                    content={comment.body}
                                    date={new Date(comment.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    currentUserUsername={currentUser?.username}
                                    onEdit={() => setEditingComment(comment)}
                                    onDelete={() => handleDeleteComment(comment.id)}
                                />
                            )
                    )}
                </div>
            </div>

            {/* Edit Post Modal */}
            {editingPost && (
                <EditPostModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onSave={handleSavePost}
                />
            )}

            {/* Edit Comment Modal */}
            {editingComment && (
                <EditCommentModal
                    comment={editingComment}
                    onClose={() => setEditingComment(null)}
                    onSave={handleSaveComment}
                />
            )}
        </div>
    );
};

export default PostDetail;