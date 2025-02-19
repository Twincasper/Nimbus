import React, {useContext, useEffect, useState} from 'react';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { useNavigate } from 'react-router-dom';
import {UploadWidget} from "@/components/UploadWidget.tsx";
import CurrentUserContext from "@/context/current-user-context.ts";
import {changePassword, deleteUser, updateUser} from "@/adapters/userAdapter.ts";
import { getCurrentUser } from '@/adapters/authAdapter';

export default function Settings() {
const { currentUser, refreshUser } = useContext(CurrentUserContext);
const [profileUrl, setProfileUrl] = useState(currentUser?.profilePicture || "");
const [selectedPronouns, setSelectedPronouns] = useState(currentUser?.pronouns || "");
const navigate = useNavigate();


useEffect(() => {
    const fetchCurrentUser = async () => {
        const user = await getCurrentUser();
        console.log("This is the current user just simply invoking getCurrentUser", user);
    };
    fetchCurrentUser();
}, []);

    useEffect(() => {
        if (currentUser?.pronouns === "other") {
            setSelectedPronouns("other");
        }
    }, [currentUser]);

    const handlePronounsChange = (e) => {
        setSelectedPronouns(e.target.value);
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) return;

        try {
            await deleteUser(currentUser.id);

            toast.success('Account deleted successfully!', {
                duration: 3000,
            });

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Delete failed:', error);

            toast.error('Failed to delete account. Please try again.', {
                duration: 3000,
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Handle password change if any password fields are filled
        const currentPassword = formData.get('current-password');
        const newPassword = formData.get('new-password');
        const confirmPassword = formData.get('confirm-password');

        await toast.promise(
            (async () => {
                // Regular profile update
                const pronouns = formData.get('pronouns') === "other"
                    ? formData.get('customPronouns')
                    : formData.get('pronouns');

                const data = {
                    username: formData.get('username'),
                    pronouns: pronouns,
                    profilePicture: profileUrl,
                    bio: formData.get('bio')
                };

                await updateUser(currentUser.id, data);

                if (currentPassword || newPassword || confirmPassword) {
                    if (newPassword !== confirmPassword) {
                        throw new Error('New passwords do not match');
                    }
                    await changePassword(currentUser.id, currentPassword, newPassword, confirmPassword);
                }
            })(),
            {
                loading: 'Saving changes...',
                success: <b>Profile updated successfully!</b>,
                error: (err) => <b>{err.message || 'Failed to update profile.'}</b>,
            }
        );

        refreshUser();
    };


    return (
        <form onSubmit={onSubmit}>
            {/* Profile Image Section */}
            <div className="col-span-full flex flex-col items-center gap-y-4 my-4">
                <div role="img" aria-label="Current profile photo">
                    <img
                        src={profileUrl || currentUser?.profilePicture}
                        alt="Current profile photo"
                        className="h-24 w-24 flex-none rounded-full bg-base-300 object-cover border-2 border-accent"
                    />
                </div>
                <div className="text-center">
                    <label htmlFor="avatar-upload" className="sr-only">Choose profile photo</label>
                    <input
                        type="file"
                        id="avatar-upload"
                        name="avatar"
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                        aria-describedby="file-restrictions"
                    />
                    <UploadWidget onUpload={(url: string) => setProfileUrl(url)}/>
                    <input
                        type="hidden"
                        name="profilePicture"
                        value={profileUrl}
                    />
                    <p id="file-restrictions" className="mt-2 text-sm leading-5 text-neutral-content opacity-75">
                        JPG, GIF or PNG. 1MB max.
                    </p>
                </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-1">
                <div>
                    <h2 className="text-lg font-semibold text-base-content">Profile Details</h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-content font-semibold">
                        Update your account's profile information
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-semibold text-base-content">
                                Username
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-base-200 pl-3 outline outline-1 outline-base-content/20 focus-within:outline focus-within:outline-2 focus-within:outline-primary">
                                    <div className="shrink-0 select-none text-sm text-primary">
                                        nimbus.com/
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        defaultValue={currentUser?.username}
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base-content bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="bio" className="block text-sm font-semibold text-base-content">
                                Bio
                            </label>
                            <div className="mt-2">
                            <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base-content placeholder:text-primary focus:outline focus:outline-2 focus:outline-primary"
                                defaultValue={currentUser?.bio}
                            />
                            </div>
                            <p className="mt-3 text-sm text-neutral-content font-mediukm">
                                Write a few sentences about yourself.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pronouns Section */}
                <div className="pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="pronouns" className="block text-sm font-medium text-base-content">
                                Pronouns
                            </label>
                            <div className="mt-2">
                                <select
                                    id="pronouns"
                                    name="pronouns"
                                    value={selectedPronouns}
                                    onChange={handlePronounsChange}
                                    // ... rest of select props
                                    className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base-content focus:outline focus:outline-2 focus:outline-primary"
                                >
                                    <option value="" disabled>Select pronouns</option>
                                    <option value="they/them">They/Them</option>
                                    <option value="she/her">She/Her</option>
                                    <option value="he/him">He/Him</option>
                                    <option value="other">Other (please specify)</option>
                                </select>
                                {selectedPronouns === "other" && (
                                    <input
                                        type="text"
                                        name="customPronouns"
                                        placeholder="Please enter your preferred pronouns"
                                        defaultValue={currentUser?.pronouns || ""}
                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Section */}
            <div>
                <h2 className="text-lg font-semibold text-base-content">Change password</h2>
                <p className="mt-1 text-sm leading-6 text-neutral-content">
                    Update your password associated with your account.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="current-password" className="block text-sm/6 font-medium text-neutral-content">
                        Current password
                    </label>
                    <div className="mt-2">
                        <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="new-password" className="block text-sm/6 font-medium text-neutral-content">
                        New password
                    </label>
                    <div className="mt-2">
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-neutral-content">
                        Confirm password
                    </label>
                    <div className="mt-2">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="confirm-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 my-8">
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    className="btn btn-error"
                    onClick={handleDeleteAccount}
                >
                    Yes, delete my account
                </button>
            </div>
        </form>
    )
}
