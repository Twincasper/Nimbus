import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ForumPostCard from "../components/ForumPostCard";
import Sidebar from "../components/Sidebar";
import RecentPosts from "../components/RecentPosts"

// Mock data (replace with actual data fetching logic)
const mockPosts = [
    {
        id: 1,
        username: "User1",
        avatarUrl: "/login-clouds.png",
        title: "Post 1",
        content: "Content 1",
        date: "2023-06-15",
        likes: 10,
        comments: 5,
        community: "General",
    },
    {
        id: 2,
        username: "User2",
        avatarUrl: "/login-clouds.png",
        title: "Post 2",
        content: "Content 2",
        date: "2023-06-16",
        likes: 15,
        comments: 8,
        community: "Technology",
    },
    // Add more mock posts...
]

const Community: React.FC = () => {
    const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null)
    const navigate = useNavigate()

    const filteredPosts = selectedCommunity ? mockPosts.filter((post) => post.community === selectedCommunity) : mockPosts

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar onSelectCommunity={setSelectedCommunity} />
            <main className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {selectedCommunity ? `${selectedCommunity} Community` : "All Communities"}
                </h1>
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <div key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                            <ForumPostCard {...post} />
                        </div>
                    ))}
                </div>
            </main>
            <RecentPosts posts={mockPosts.slice(0, 5)} />
        </div>
    )
}

export default Community;

