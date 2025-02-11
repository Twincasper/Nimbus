import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CurrentUserContext  from '@/context/current-user-context';
import { createPost } from '@/adapters/postAdapter';

const NewPostButton = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const communities = [
        { id: 1, name: "Rainy Days & Silver Linings" },
        { id: 2, name: "Calm in the Storm" },
        { id: 3, name: "Fluff Therapy" },
        { id: 4, name: "Cloud Nine Creations" },
        { id: 5, name: "Cumulus Care" },
        { id: 6, name: "Rainbows" }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setIsSubmitting(true);
        try {
            const newPost = await createPost({
                title,
                body: content,
                userId: currentUser.id,
                categoryId
            });

            if (newPost) {
                navigate(`/posts/${newPost.id}`);
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
                New Post +
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Title Input */}
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


                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewPostButton;