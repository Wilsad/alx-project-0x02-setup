import React, { useState, useEffect } from 'react';
import { type PostProps, type ApiUser } from '@/interfaces';
import Button from './Button';

interface PostCardProps extends PostProps {
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  id, 
  title, 
  content, 
  userId, 
  onDelete,
  showActions = false 
}) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Truncate content for preview
  const truncatedContent = content.length > 150 
    ? content.substring(0, 150) + '...' 
    : content;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          {showActions && onDelete && (
            <Button
              size="small"
              shape="rounded-full"
              variant="danger"
              onClick={() => onDelete(id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 ml-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          )}
        </div>

        {/* User Information */}
        <div className="flex items-center mb-4">
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="ml-3">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-3 bg-gray-200 rounded animate-pulse mt-1"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {user?.name.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Unknown User'}
                </p>
                <p className="text-xs text-gray-500">
                  @{user?.username || 'username'} • Post #{id}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {isExpanded ? content : truncatedContent}
          </p>
        </div>

        {/* Expand/Collapse Button */}
        {content.length > 150 && (
          <div className="mt-4">
            <Button
              size="small"
              shape="rounded-md"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          </div>
        )}
      </div>

      {/* Post Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.219-4.57c-.4-.8-.6-1.676-.6-2.6a8 8 0 018-8 8.001 8.001 0 017.219 4.57c.4.8.6 1.676.6 2.6z" />
              </svg>
              0 comments
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              0 likes
            </span>
          </div>

          {/* User Contact Info */}
          {user && (
            <div className="flex items-center space-x-2">
              {user.email && (
                
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  title={`Email ${user.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {user.website && (
                
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  title={`Visit ${user.name}'s website`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;