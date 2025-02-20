import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
// Need to import checkForLoggedInUser function here from auth adapter or some other way to check if user is logged in

// Components and Pages
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import Settings from "@/pages/Settings.tsx";
import UserProfile from "@/pages/UserProfile";

import NotFoundPage from "@/pages/NotFoundPage";

import Navbar from "@/components/Navbar";
import Community from "@/pages/Community.tsx";
import PostDetail from "@/pages/PostDetail.tsx";
import { RequireAuth } from "@/components/RequireAuth.tsx";
import ThemePalettePage from "@/pages/ThemePalettePage.tsx";

export default function App() {
    const location = useLocation();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    return (
        <div
            className="flex flex-col min-h-screen bg-base-100"
            style={{
                ...(location.pathname !== "/" && {
                    backgroundImage: `
                        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.5)),
                        url("/adobe-cloud.png")
                    `,
                    backgroundSize: "cover, cover",
                    backgroundPosition: "center, center",
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundAttachment: "fixed, fixed",
                }),
                ...(location.pathname === "/" && {
                    backgroundColor: "black",
                }),
            }}
        >
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: "oklch(var(--su))",
                            color: "oklch(var(--suc))",
                        },
                        iconTheme: {
                            primary: "oklch(var(--a))",
                            secondary: "oklch(var(--ac))",
                        },
                    },
                    error: {
                        style: {
                            background: "oklch(var(--er))",
                            color: "oklch(var(--erc))",
                        },
                        iconTheme: {
                            primary: "red",
                            secondary: "white",
                        },
                    },
                }}
            />

            {location.pathname !== "/login" && location.pathname !== "/" && (
                <Navbar onSelectCategory={setSelectedCategoryId} />
            )}
            <main
                className={location.pathname === "/settings" ? "mx-auto" : "flex-grow"}
            >
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/palette" element={<ThemePalettePage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/settings"
                        element={
                            <RequireAuth>
                                <Settings />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/user/:userId"
                        element={
                            <RequireAuth>
                                <UserProfile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/community"
                        element={
                            <RequireAuth>
                                <Community />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/community/:categoryId"
                        element={
                            <RequireAuth>
                                <Community />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/posts/:id"
                        element={
                            <RequireAuth>
                                <PostDetail />
                            </RequireAuth>
                        }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}
