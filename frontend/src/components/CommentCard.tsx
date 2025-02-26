import React from "react";
import DOMPurify from "dompurify";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import SpotlightCard from "./SpotlightCard.tsx";

interface CommentCardProps {
    userId?: number;
    username: string;
    avatarUrl: string;
    content: string;
    pronouns?: string;
    date: string;
    onClick?: () => void;
    currentUserUsername?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    isDetailView?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
    userId,
    username,
    avatarUrl,
    content,
    pronouns,
    date,
    onClick,
    currentUserUsername,
    onEdit,
    onDelete,
    isDetailView = false,
}) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const showActions = currentUserUsername === username;

    return (
        <SpotlightCard className="custom-spotlight-card">
        <div 
            className={`bg-neutral rounded-xl shadow-sm p-4 mb-4 border border-neutral-focus ${isDetailView ? 'p-6' : 'p-4'}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border-2 border-accent rounded-full box-border overflow-visible">
                    <AvatarImage
                        className="rounded-full w-full h-full aspect-square"
                        src={avatarUrl}
                        alt={username}
                    />
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        {userId ? (
                            <Link
                                to={`/user/${userId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-block font-medium text-neutral-content"
                            >
                                {username}
                            </Link>
                        ) : (
                            <h3 className="font-medium text-neutral-content">{username}</h3>
                        )}
                        {pronouns && (
                            <span className="text-sm text-neutral-content/70">
                              ({pronouns})
                            </span>
                        )}
                        <span className="text-sm text-neutral-content/70">{date}</span>
                    </div>
                    <div
                        className="text-neutral-content prose"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                    {showActions && (
                        <div className="flex gap-2 mt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-content hover:bg-accent/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.();
                                }}
                            >
                                <Edit className="w-4 h-4 text-accent" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-content hover:bg-error/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                            >
                                <Trash2 className="w-4 h-4 text-error" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </SpotlightCard>
    );
};

export default CommentCard;
