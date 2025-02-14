import React from 'react';
import DOMPurify from 'dompurify';
import {Edit, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";

interface CommentCardProps {
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
    username,
    avatarUrl,
    content,
    pronouns,
    date,
    onClick,
    currentUserUsername,
    onEdit,
    onDelete,
    isDetailView = false
    }) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const showActions = currentUserUsername === username;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
            <div className="flex items-start gap-4">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt={username} />
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{username}</h3>
                        {pronouns && <span className="text-sm text-gray-500">({pronouns})</span>}
                        <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    <div
                        className="text-gray-700 prose"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                    {showActions && (
                        <div className="flex gap-2 mt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.();
                                }}
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};