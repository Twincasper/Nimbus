export default function LoginPage() {
    return (
        <div className="max-w-md w-full" style={{ opacity: 1, transform: "none" }}>
            <button className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                     strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to home
            </button>
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4" style={{ transform: "none" }}>
                    <div className="relative md" tabIndex={0}>
                        <div className="absolute inset-0" style={{ transform: "rotate(126.288deg)" }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></div>
                        </div>
                        <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"
                             style={{ backgroundColor: "rgb(17, 24, 39)" }}>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-4/6 h-4/6 text-indigo-600 dark:text-indigo-400"
                                 style={{ transform: "none" }}>
                                <path fill="currentColor"
                                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Create your account</h1>
                <p className="text-gray-600 dark:text-gray-300">Join GroupPay and start splitting bills with friends</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6"
                 style={{ opacity: 1, transform: "none" }}>
                <form className="space-y-4">
                    {/* Form fields */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                 strokeLinecap="round" strokeLinejoin="round"
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" height="1em"
                                 width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                                value=""
                            />
                        </div>
                    </div>
                    {/* Password strength indicator */}
                    <div className="mt-2">
                        <div className="flex gap-1 h-1">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700"
                                    style={{ transform: "scaleX(0)" }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        tabIndex={0}
                    >
                        Create Account
                    </button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="flex items-center justify-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        tabIndex={0}>
                        <img src="" alt="Google" className="w-5 h-5"/>
                        Google
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        tabIndex={0}>
                        <img src="" alt="Apple" className="w-5 h-5"/>
                        Apple
                    </button>
                </div>
            </div>
            <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <a className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium" href="/login">
                    Log in
                </a>
            </p>
        </div>
    );
}