import React from 'react';
import DOMPurify from 'dompurify';

interface CommentCardProps {
    username: string;
    avatarUrl: string;
    content: string;
    date: string;
}

const CommentCard: React.FC<CommentCardProps> = ({username, avatarUrl, content, date}) => {
    const cleanContent = DOMPurify.sanitize(content);

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={avatarUrl || '/default-avatar.png'}
                    alt={username}
                    className="w-8 h-8 rounded-full"
                />
                <div>
                    <h3 className="font-medium">{username}</h3>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
        </div>
    );
};

export default CommentCard;