import type React from "react"
import communities from "@/utils/communities.ts";
import { Button } from "@/components/ui/button"

interface SidebarProps {
    onSelectCategory: (categoryId: number | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
    return (
        <aside className="w-64 p-4 shadow-md">
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

