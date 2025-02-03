import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen">
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/altinay-dinc-LluELtL5mK4-unsplash.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-start h-screen px-16">
                <div className="max-w-xl text-white">
                    <h1 className="text-6xl font-bold mb-6 leading-tight">
                        let go at nimbus
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Find your peace, share your journey, and connect with others who understand.
                    </p>
                    <Button
                        size="lg"
                        className="text-lg px-8 py-6 rounded-2xl"
                        onClick={() => navigate('/login')}
                    >
                        Join Our Community
                    </Button>
                </div>
            </div>
        </div>
    );
}