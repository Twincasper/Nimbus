import React, {useContext, useEffect, useState} from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {UploadWidget} from "@/components/UploadWidget.tsx";
import CurrentUserContext from "@/context/current-user-context.ts";
import {updateUser} from "@/adapters/userAdapter.ts";

export default function Profile() {
const { currentUser } = useContext(CurrentUserContext);
const [profileUrl, setProfileUrl] = useState(currentUser?.profilePicture || "");

    const [selectedPronouns, setSelectedPronouns] = useState(currentUser?.pronouns || "");

    useEffect(() => {
        if (currentUser?.pronouns === "other") {
            setSelectedPronouns("other");
        }
    }, [currentUser]);

    const handlePronounsChange = (e) => {
        setSelectedPronouns(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let pronouns = formData.get('pronouns');

        if (pronouns === "other") {
            pronouns = formData.get('customPronouns');
        }

        const data = {
            username: formData.get('username'),
            pronouns: pronouns,
            profilePicture: profileUrl,
            bio: formData.get('bio')
        };

        try {
            await updateUser(currentUser.id, data);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };




    return (
        <form onSubmit={onSubmit}>
            <div className="col-span-full flex flex-col items-center gap-y-4 my-4">
                <div role="img" aria-label="Current profile photo">
                    <img
                        src={profileUrl || currentUser?.profilePicture}
                        alt="Current profile photo"
                        className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover border-2 border-accent"
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
                    <p id="file-restrictions" className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB
                        max.</p>
                </div>
            </div>

            <div className="space-y-1">
                <div>
                    <h2 className="text-base/7 font-semibold text-gray-900">Profile Details</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">Update your account&#39;s profile
                        information</p>
                    <p className="mt-1 text-sm/6 text-gray-600">
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div
                                        className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">nimbus.com/
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        defaultValue={currentUser?.username}
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="bio" className="block text-sm/6 font-medium text-gray-900">
                            Bio
                            </label>
                            <div className="mt-2">
                <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={currentUser?.bio}
                />
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>
                    </div>
                </div>

                <div className="pb-12">
                    {/*<h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>*/}
                    {/*<p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>*/}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="pronouns" className="block text-sm/6 font-medium text-gray-900">
                                Pronouns
                            </label>
                            <div className="mt-2">
                                <select
                                    id="pronouns"
                                    name="pronouns"
                                    value={selectedPronouns} // Bind the local state to the dropdown
                                    onChange={handlePronounsChange} // Handle dropdown changes
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="" disabled>Select pronouns</option>
                                    <option value="they/them">They/Them</option>
                                    <option value="she/her">She/Her</option>
                                    <option value="he/him">He/Him</option>
                                    <option value="other">Other (please specify)</option>
                                </select>

                                {/* Input field for "Other" pronouns */}
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

            <div>
                <h2 className="text-base font-semibold leading-7 text-black">Change password</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your password associated with your account.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="current-password" className="block text-sm/6 font-medium text-gray-900">
                        Current password
                    </label>
                    <div className="mt-2">
                        <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="new-password" className="block text-sm/6 font-medium text-gray-900">
                        New password
                    </label>
                    <div className="mt-2">
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
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

            <button
                type="submit"
                className="rounded-full bg-blue-500 px-3 py-2 my-2 ml-8 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
            >
                Save Changes
            </button>

            <div>
                <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400 max-w-xl mx-auto">
                    You can delete your account here. This action is not reversible.
                    All information related to this account will be deleted permanently.
                </p>
            </div>

            <button
                type="submit"
                className="rounded-full bg-red-500 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
                Yes, delete my account
            </button>



            {/*    Stretch feature would be to add a mental health break button here that voluntarily suspends the account,
               we could store that as a boolean on the user's profile*/}

        </form>
    )
}
