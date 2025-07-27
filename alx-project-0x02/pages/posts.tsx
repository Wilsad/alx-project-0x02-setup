import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import PostModal from '@/components/common/PostModal';
import { type Post } from '@/interfaces';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample posts data (in a real app, this would come from an API)
  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: '1',
        title: 'Getting Started with Next.js',
        content: 'Next.js is a powerful React framework that enables you to build full-stack web applications. It provides many features out of the box including server-side rendering, static site generation, and API routes.',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'TypeScript Best Practices',
        content: 'TypeScript adds static typing to JavaScript, making your code more reliable and easier to maintain. Here are some best practices for writing clean, maintainable TypeScript code in your projects.',
        createdAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        title: 'Tailwind CSS for Rapid Styling',
        content: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without writing custom CSS. Learn how to use Tailwind effectively in your Next.js projects.',
        createdAt: new Date('2024-01-25'),
      },
      {
        id: '4',
        title: 'Component Architecture in React',
        content: 'Building reusable components is essential for scalable React applications. This post covers patterns and best practices for creating maintainable component architectures.',
        createdAt: new Date('2024-01-30'),
      },
      {
        id: '5',
        title: 'State Management Solutions',
        content: 'Managing state in complex React applications can be challenging. Explore different state management solutions including React Context, Redux, and Zustand.',
        createdAt: new Date('2024-02-05'),
      },
    ];

    // Simulate API loading delay
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle new post submission
  const handlePostSubmit = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date(),
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  // Handle post deletion
  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">Loading posts...</span>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No posts found' : 'No posts yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No posts match "${searchTerm}". Try a different search term.`
                    : 'Be the first to create a post and share your knowledge!'
                  }
                </p>
                {searchTerm && (
                  <Button
                    size="medium"
                    shape="rounded-md"
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <p className="text-gray-600">
                    {searchTerm 
                      ? `Found ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                      : `Showing ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`
                    }
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="relative group">
                      <Card
                        title={post.title}
                        content={post.content}
                        className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      />
                      
                      {/* Post Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          size="small"
                          shape="rounded-full"
                          variant="danger"
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>

                      {/* Post Metadata */}
                      <div className="mt-3 text-sm text-gray-500 text-center">
                        <span>Posted on {post.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Quick Actions */}
        {!loading && posts.length > 0 && (
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
                <Button
                  size="medium"
                  shape="rounded-md"
                  variant="outline"
                  onClick={() => window.location.href = '/home'}
                  className="w-full"
                >
                  Back to Home
                </Button>
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