import React, {useContext, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { updatePost } from '@/adapters/postAdapter';
import CurrentUserContext from '@/context/current-user-context';

interface EditPostModalProps {
    post: {
        id: number;
        title: string;
        body: string;
        categoryId: number;
    };
    onClose: () => void;
    onSave: (updatedPost: any) => void;
}

const communities = [
    { id: 1, name: "Rainy Days & Silver Linings", description: "Depression & Hope" },
    { id: 2, name: "Calm in the Storm", description: "Anxiety & Stress Relief" },
    { id: 3, name: "Fluff Therapy", description: "Self-Care & Comfort" },
    { id: 4, name: "Cloud Nine Creations", description: "Hobbies & Creativity" },
    { id: 5, name: "Cumulus Care", description: "Physical & Mental Health Tips" },
    { id: 6, name: "Rainbows", description: "For the good days. The victories, big and small. You deserve to feel good about yourself."}
];

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onSave }) => {
    const { currentUser } = useContext((CurrentUserContext));
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.body);
    const [categoryId, setCategoryId] = useState(post.categoryId);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setIsSubmitting(true);

        try {
            const updatedPost = await updatePost(post.id, {
                title,
                body: content,
                userId: currentUser.id,
                categoryId
            });

            onSave(updatedPost);
            onClose();
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Community</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
                            className="w-full p-2 border rounded-md"
                        >
                            {communities.map(community => (
                                <option key={community.id} value={community.id}>
                                    {community.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="bg-white rounded-md"
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['blockquote', 'code-block'],
                                    [{ 'header': 1 }, { 'header': 2 }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'script': 'sub' }, { 'script': 'super' }],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;