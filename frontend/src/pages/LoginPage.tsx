import React, {useContext, useEffect, useState} from 'react';
import CurrentUserContext from '@/context/current-user-context';
import { UploadWidget } from '@/components/UploadWidget';

export default function LoginPage() {
    const { currentUser, login, register } = useContext(CurrentUserContext);
    // Track whether we’re in sign in or sign up mode.
    const [isSignUp, setIsSignUp] = useState(false);

    // Common fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Extra sign-up fields:
    const [pronouns, setPronouns] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Current user updated:", currentUser);
    }, [currentUser]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (isSignUp) {
                // Call register with the extra data.
                await register(username, password, pronouns, avatarUrl);
            } else {
                await login(username, password);
            }
            // After a successful call, the context’s currentUser is updated.
        } catch (err) {
            console.error('Authentication error:', err);
            setError(
                isSignUp
                    ? 'Sign up failed. Please try again.'
                    : "Login failed. Hope you didn't forget your password."
            );
        }
    };

    return (
        <div className="flex flex-1 min-h-screen">
            <div
                className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
                style={{
                    background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(248,131,121,1) 100%)'
                }}
            >
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        {/* Logo SVG */}
                        <svg className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                fill="#74C0FC"
                                d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4
                c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96
                103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"
                            />
                        </svg>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {isSignUp ? 'Sign up for an account' : 'Sign in to your account'}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {isSignUp ? 'Already have an account? ' : 'Not a member? '}
                            <button
                                type="button"
                                className="font-semibold text-red-300 hover:text-red-200"
                                onClick={() => {
                                    setError(null);
                                    setIsSignUp(!isSignUp);
                                }}
                            >
                                {isSignUp ? 'Sign in' : 'Sign up'}
                            </button>
                        </p>
                    </div>

                    <div className="mt-10">
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete={isSignUp ? "new-password" : "current-password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {isSignUp && (
                                <>
                                    <div>
                                        <label htmlFor="pronouns" className="block text-sm font-medium leading-6 text-gray-900">
                                            Pronouns
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="pronouns"
                                                type="text"
                                                required
                                                value={pronouns}
                                                onChange={(e) => setPronouns(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Profile Picture
                                        </label>
                                        <div className="mt-2">
                                            <UploadWidget onUpload={(url: string) => setAvatarUrl(url)} />
                                            {avatarUrl && (
                                                <img src={avatarUrl} alt="Profile" className="mt-2 h-16 w-16 rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {!isSignUp && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-red-400 focus:ring-red-400"
                                        />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <a href="#" className="font-semibold text-red-300 hover:text-red-200">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white
                    shadow-sm hover:bg-red-400 hover:border-red-200 focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    {isSignUp ? 'Sign up' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-red-200 to-transparent z-10" />
                <img
                    className="absolute inset-0 h-full w-full object-cover animate-move"
                    src="/laura-vinck-Hyu76loQLdk-unsplash.jpg"
                    alt="Pink and blue clouds"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-red-200 to-transparent z-10" />
            </div>
        </div>
    );
}