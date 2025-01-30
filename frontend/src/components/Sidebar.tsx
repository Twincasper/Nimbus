import type React from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
    onSelectCommunity: (community: string | null) => void
}

const communities = ["General", "Technology", "Sports", "Entertainment", "Science"]

const Sidebar: React.FC<SidebarProps> = ({ onSelectCommunity }) => {
    return (
        <aside className="w-64 bg-white p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Communities</h2>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => onSelectCommunity(null)}>
                            All Communities
                        </Button>
                    </li>
                    {communities.map((community) => (
                        <li key={community}>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => onSelectCommunity(community)}>
                                {community}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar

