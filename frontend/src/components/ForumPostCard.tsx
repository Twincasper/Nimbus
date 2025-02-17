import React from 'react';
import DOMPurify from "dompurify";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx"
import { Button } from "./ui/button.tsx"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card.tsx"
import { ThumbsUp, MessageCircle, Share2, Edit, Trash2 } from 'lucide-react';

interface ForumPostCardProps {
  username: string;
  avatarUrl: string;
  title: string;
  content: string;
  pronouns?: string;
  date: string;
  likes: number;
  comments: number;
  onClick?: () => void
  currentUserUsername?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDetailView?: boolean;
}

const ForumPostCard: React.FC<ForumPostCardProps & { onClick?: () => void }> = ({
  username,
  avatarUrl,
  title,
  content,
  pronouns,
  date,
  likes,
  comments,
  onClick,
  currentUserUsername,
  onEdit,
  onDelete,
  isDetailView = false
}) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  const truncatedContent = sanitizedContent.length > 200
      ? `${sanitizedContent.substring(0, 200)}...`
      : sanitizedContent;

  const displayContent = isDetailView ? sanitizedContent : truncatedContent;

  const showActions = currentUserUsername === username;

  return (
      <Card className="w-full max-w-2xl mx-auto my-4 bg-primary hover:bg-neutral transition-colors duration-200 cursor-pointer shadow-md" onClick={onClick}>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="border-2 border-accent">
            <AvatarImage src={avatarUrl} alt={username} />
            {/*<AvatarFallback className="bg-neutral text-neutral-content">{username[0].toUpperCase()}</AvatarFallback>*/}
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-base-100">
              {username} {pronouns && <span className="text-base-100">({pronouns})</span>}
            </h2>
            <p className="text-sm text-base-content/70">{date}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-2 text-base-100">{title}</h3>
          <div
              className="prose text-neutral-content"
              dangerouslySetInnerHTML={{__html: displayContent}}
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-base-content hover:bg-accent/10">
              <ThumbsUp className="w-4 h-4 text-base-100" />
              <span className="text-base-content">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-base-content hover:bg-accent/10">
              <MessageCircle className="w-4 h-4 text-base-100" />
              <span className="text-base-content">{comments}</span>
            </Button>
          </div>
          {showActions && (
              <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-base-content hover:bg-accent/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                    }}
                >
                  <Edit className="w-4 h-4 text-info" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-base-content hover:bg-error/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                >
                  <Trash2 className="w-4 h-4 text-base-100" />
                </Button>
              </div>
          )}
        </CardFooter>
      </Card>
  );
};

export default ForumPostCard;

