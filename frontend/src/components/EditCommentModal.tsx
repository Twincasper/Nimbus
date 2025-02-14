import {updateComment} from "@/adapters/commentAdapter.ts";
import ReactQuill from "react-quill";
import {Button} from "@/components/ui/button.tsx";
import React, {useContext, useState} from "react";
import CurrentUserContext from "@/context/current-user-context.ts";
import {useParams} from "react-router-dom";

interface EditCommentModalProps {
    comment: {
        id: number;
        body: string;
    };
    onClose: () => void;
    onSave: (updatedComment: any) => void;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({ comment, onClose, onSave }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const { id } = useParams<{ id: string }>(); // Get post ID from URL
    const [content, setContent] = useState(comment.body);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !id) return;

        setIsSubmitting(true);

        try {
            const updatedComment = await updateComment(comment.id, {
                body: content,
                userId: currentUser.id,
                postId: Number(id),
            });
            onSave(updatedComment);
            onClose();
        } catch (error) {
            console.error('Error updating comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Comment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="bg-white rounded-md"
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['blockquote', 'code-block'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCommentModal;