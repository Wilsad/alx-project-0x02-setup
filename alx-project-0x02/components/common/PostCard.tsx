import React from 'react';
import Button from '@/components/common/Button';
import { type PostProps } from '@/interfaces';

interface PostCardProps extends Omit<PostProps, 'createdAt'> {
  onDelete: (postId: number) => void;
  showActions: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  userId,
  onDelete,
  showActions
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        {content}
      </p>
      {showActions && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            User ID: {userId}
          </span>
          <Button
            size="small"
            shape="rounded-md"
            variant="danger"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostCard;