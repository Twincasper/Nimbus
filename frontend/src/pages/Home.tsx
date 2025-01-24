import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen">
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://img.freepik.com/free-vector/watercolor-sugar-cotton-clouds-background_23-2149231324.jpg?t=st=1737752744~exp=1737756344~hmac=2082b084151fa2ed52356c3e5e721f90ebed3a72b6edc092e9406135d0be7281&w=2000")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.8)'
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
                        className="text-lg px-8 py-6"
                        onClick={() => navigate('/community')}
                    >
                        Join Our Community
                    </Button>
                </div>
            </div>
        </div>
    );
}