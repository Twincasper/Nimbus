import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Post {
    id: number
    title: string
    username?: string
    pronouns?: string
}

interface RecentPostsProps {
    posts: Post[]
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
    return (
        <aside className="w-64 bg-base-100 p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-base-100">Recent Posts</h2>
            <div className="space-y-2">
                {posts.map((post) => (
                    <Card className="bg-primary" key={post.id}>
                        <CardHeader className="p-2 text-base-100">
                            <h3 className="text-sm font-semibold">{post.title}</h3>
                        </CardHeader>
                        <CardContent className="p-2">
                            <p className="text-xs text-base-100">by {post.username} {post.pronouns && <span className="text-base-100">({post.pronouns})</span>}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </aside>
    )
}

export default RecentPosts

