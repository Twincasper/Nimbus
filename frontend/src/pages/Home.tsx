import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GridDistortion from '@/components/GridDistortion';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0">
                <GridDistortion
                    imageSrc="/cloud-bg-adobe.jpeg"
                    grid={10}
                    mouse={0.1}
                    strength={0.15}
                    relaxation={0.9}
                    className="w-full h-full object-cover filter brightness-75"
                />
            </div>

            <div className="relative z-20">
                <Navbar onSelectCategory={() => {}} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-start h-screen px-16">
                <div className="max-w-xl text-white">
                    <h1 className="text-6xl font-bold mb-6 leading-tight">
                      Clear Skies Start Here 🌤️
                    </h1>
                    <button
                        className="btn btn-lg px-8 py-6 rounded-2xl bg-sky-400 hover:bg-sky-300 text-white"
                        onClick={() => navigate('/login')}
                    >
                        Join Our Community
                    </button>
                </div>
            </div>
        </div>
    );
}