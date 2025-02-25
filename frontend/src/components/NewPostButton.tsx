import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import communities from "@/utils/communities.ts";
import CurrentUserContext from "@/context/current-user-context";
import { createPost } from "@/adapters/postAdapter";
import toast from "react-hot-toast";

const NewPostButton = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setIsSubmitting(true);
        try {
            const newPost = await createPost({
                title,
                body: content,
                userId: currentUser.id,
                categoryId,
            });

            if (newPost && Array.isArray(newPost) && newPost[0]?.id) {
                toast.success("Post created successfully!", {
                    duration: 3000,
                    position: "top-right",
                });

                navigate(`/posts/${newPost[0].id}`);
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post. Please try again.", {
                className: "bg-error text-light",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setShowModal(true)}
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-neutral transition-colors"
            >
                New Post +
            </button>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 text-black">
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

                            {/* Community Dropdown */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Community
                                </label>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                    className="w-full p-2 border rounded-md"
                                >
                                    {communities.map((community) => (
                                        <option key={community.id} value={community.id}>
                                            {community.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Rich Text Editor */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">
                                    Content
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    className="bg-white rounded-md"
                                    modules={{
                                        toolbar: [
                                            ["bold", "italic", "underline", "strike"],
                                            ["blockquote", "code-block"],
                                            [{ header: 1 }, { header: 2 }],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            [{ script: "sub" }, { script: "super" }],
                                            ["link", "image"],
                                            ["clean"],
                                        ],
                                    }}
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Posting..." : "Create Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewPostButton;
