import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen">
            {/* Background Image takes up the full viewport */}
            <div className="absolute inset-0">
                <img
                    src="/altinay-dinc-LluELtL5mK4-unsplash.jpg"
                    alt="Background"
                    className="w-full h-full object-cover filter brightness-75"
                />
            </div>

            {/* Transparent Navbar on top of the background image */}
            <div className="relative z-20">
                <Navbar onSelectCategory={() => {}} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-start h-screen px-16">
                <div className="max-w-xl text-white">
                    <h1 className="text-6xl font-bold mb-6 leading-tight">
                      Clear Skies Start Here 🌤️
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Find your peace, share your journey, and connect with others who understand.
                    </p>
                    <button
                        className="btn btn-lg px-8 py-6 rounded-2xl"
                        onClick={() => navigate('/login')}
                    >
                        Join Our Community
                    </button>
                </div>
            </div>
        </div>
    );
}