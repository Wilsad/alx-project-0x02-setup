import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import PostCard from '@/components/common/PostCard';
import Button from '@/components/common/Button';
import PostModal from '@/components/common/PostModal';
import { type Post, type ApiPost, type PostProps } from '@/interfaces';

export async function getStaticProps() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    
    // Transform API data to match our PostProps interface
    const initialPosts = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.body,
      userId: post.userId
    }));

    return {
      props: {
        initialPosts,
      },
      // Re-generate the page at most once every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching posts in getStaticProps:', error);
    return {
      props: {
        initialPosts: [],
      },
      // Try again in 1 minute if there was an error
      revalidate: 60,
    };
  }
}

export default function Posts({ initialPosts = [] }: { initialPosts?: Array<{ id: number; title: string; content: string; userId: number }> }) {
  const [apiPosts, setApiPosts] = useState<PostProps[]>(initialPosts);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialize with server-side props or fetch client-side if needed
  useEffect(() => {
    if (apiPosts.length === 0) {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          
          const data: ApiPost[] = await response.json();
          
          // Transform API data to match our PostProps interface
          const transformedPosts: PostProps[] = data.map(post => ({
            id: post.id,
            title: post.title,
            content: post.body,
            userId: post.userId
          }));
          
          setApiPosts(transformedPosts);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch posts');
          console.error('Error fetching posts:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [apiPosts.length]);

  // Handle new post submission (for user-created posts)
  const handlePostSubmit = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date(),
    };
    
    setUserPosts(prev => [newPost, ...prev]);
  };

  // Handle post deletion (only for user-created posts)
  const handleDeleteUserPost = (postId: string | number) => {
    setUserPosts(prev => prev.filter(post => post.id !== String(postId)));
  };

  // Handle API post deletion (simulated)
  const handleDeleteApiPost = (postId: number) => {
    setApiPosts(prev => prev.filter(post => post.id !== Number(postId)));
  };

  // Filter API posts based on search term
  const filteredApiPosts = apiPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter user posts based on search term
  const filteredUserPosts = userPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Posts
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover and share knowledge through our community posts
          </p>

          {/* Search and Create Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <Button
              size="medium"
              shape="rounded-md"
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Post
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">
                <strong>Error:</strong> {error}
              </p>
            </div>
            <Button
              size="small"
              shape="rounded-md"
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-3"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">Loading posts from API...</span>
          </div>
        )}

        {/* User Posts Section */}
        {!loading && filteredUserPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredUserPosts.map((post) => (
                <div key={post.id} className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {post.createdAt.toLocaleDateString()}
                      </span>
                      <Button
                        size="small"
                        shape="rounded-md"
                        variant="danger"
                        onClick={() => handleDeleteUserPost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Posts Section */}
        {!loading && !error && (
          <>
            {filteredApiPosts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-500 mb-4">
                  No posts match "{searchTerm}". Try a different search term.
                </p>
                <Button
                  size="medium"
                  shape="rounded-md"
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Community Posts
                  </h2>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? `Found ${filteredApiPosts.length} post${filteredApiPosts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                      : `Showing ${filteredApiPosts.length} post${filteredApiPosts.length !== 1 ? 's' : ''} from our community`
                    }
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {filteredApiPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      userId={post.userId}
                      onDelete={handleDeleteApiPost}
                      showActions={true}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Quick Actions */}
        {!loading && !error && (filteredApiPosts.length > 0 || filteredUserPosts.length > 0) && (
          <div className="mt-12 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  size="medium"
                  shape="rounded-md"
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full"
                >
                  Create New Post
                </Button>
                <div className="flex space-x-2">
                  <Button
                    size="medium"
                    shape="rounded-md"
                    variant="outline"
                    onClick={() => window.location.href = '/home'}
                    className="flex-1"
                  >
                    Back to Home
                  </Button>
                  <Button
                    size="medium"
                    shape="rounded-md"
                    variant="secondary"
                    onClick={() => window.location.reload()}
                    className="flex-1"
                  >
                    Refresh Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Post Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
}