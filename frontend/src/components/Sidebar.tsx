import type React from "react"
import { Button } from "@/components/ui/button"

interface Category {
    id: number;
    name: string;
    description: string;
}

interface SidebarProps {
    onSelectCategory: (categoryId: number | null) => void;
}

const communities = [
    { id: 1, name: "Rainy Days & Silver Linings", description: "Depression & Hope" },
    { id: 2, name: "Calm in the Storm", description: "Anxiety & Stress Relief" },
    { id: 3, name: "Fluff Therapy", description: "Self-Care & Comfort" },
    { id: 4, name: "Cloud Nine Creations", description: "Hobbies & Creativity" },
    { id: 5, name: "Cumulus Care", description: "Physical & Mental Health Tips" },
    { id: 6, name: "Rainbows", description: "For the good days. The victories, big and small. You deserve to feel good about yourself."}
];

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
    return (
        <aside className="w-64 bg-white p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Communities</h2>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => onSelectCategory(null)}
                        >
                            All Communities
                        </Button>
                    </li>
                    {communities.map((category) => (
                        <li key={category.id}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => onSelectCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar

