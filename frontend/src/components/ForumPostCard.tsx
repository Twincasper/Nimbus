import React, { useState } from 'react';
import DOMPurify from "dompurify";
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from "./ui/avatar.tsx"
import { Button } from "./ui/button.tsx"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card.tsx"
import { ThumbsUp, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { likePost, unlikePost } from "@/adapters/postAdapter";
import SpotlightCard from './SpotlightCard.tsx';

interface ForumPostCardProps {
  postId: number;
  userId?: number;
  username: string;
  avatarUrl: string;
  title: string;
  content: string;
  pronouns?: string;
  date: string;
  likes: number;
  comments: number;
  categoryName: string;
  onClick?: () => void
  currentUserUsername?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDetailView?: boolean;
  initiallyLiked?: boolean;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({
  postId,
  userId,
  username,
  avatarUrl,
  title,
  content,
  pronouns,
  date,
  likes,
  comments,
  categoryName,
  onClick,
  currentUserUsername,
  onEdit,
  onDelete,
  isDetailView = false,
  initiallyLiked = false
}) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  const truncatedContent = sanitizedContent.length > 200
      ? `${sanitizedContent.substring(0, 200)}...`
      : sanitizedContent;

  const displayContent = isDetailView ? sanitizedContent : truncatedContent;

  const showActions = currentUserUsername === username;

  const [liked, setLiked] = useState<boolean>(initiallyLiked);
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (liked) {
        await unlikePost(postId);
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        await likePost(postId);
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };


  return (
    <SpotlightCard className="custom-spotlight-card">
      <Card className="w-full max-w-2xl mx-auto my-4 bg-neutral hover:bg-neutral-focus transition-colors duration-200 cursor-pointer shadow-md" onClick={onClick}>
        <CardHeader className="flex flex-row items-center gap-4">
          {userId ? (
            <Link to={`/user/${userId}`} onClick={(e) => e.stopPropagation()}>
              <Avatar className="border-2 border-accent">
                <AvatarImage src={avatarUrl} alt={username} />
              </Avatar>
            </Link>
          ) : (
            <Avatar className="border-2 border-accent">
              <AvatarImage src={avatarUrl} alt={username} />
            </Avatar>
          )}
          <div>
            <h2 className="text-lg font-semibold text-neutral-content">
              {username} {pronouns && <span className="text-accent">({pronouns})</span>}
            </h2>
            <p className="text-sm text-neutral-content/70">{`${categoryName}`}</p>
            <p className="text-sm text-neutral-content/70">{date}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
          <div
              className="prose text-neutral-content"
              dangerouslySetInnerHTML={{__html: displayContent}}
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-neutral-content hover:bg-accent/10" onClick={handleLikeToggle} aria-label={liked ? "Unlike this post" : "Like this post"} aria-pressed={liked}>
              <ThumbsUp className={`w-4 h-4 ${liked ? "text-accent" : "text-gray-400"}`} />
              <span className="text-neutral-content">{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-neutral-content hover:bg-accent/10">
              <MessageCircle className="w-4 h-4 text-accent" />
              <span className="text-neutral-content">{comments}</span>
            </Button>
          </div>
          {showActions && (
              <div className="flex gap-2">
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
        </CardFooter>
      </Card>
    </SpotlightCard>
  );
};

export default ForumPostCard;

