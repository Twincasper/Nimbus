import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CommentCard = ({username, avatarUrl, content, date }) => {
    return (
        <Card className="shadow-none border-0">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>
                        {username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{username || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-gray-700">{content}</p>
            </CardContent>
        </Card>
    );
};

export default CommentCard;