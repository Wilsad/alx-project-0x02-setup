import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/common/Card';
import PostModal from '@/components/common/PostModal';
import { type Post } from '@/interfaces';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // Handle new post submission
  const handlePostSubmit = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date(),
    };
    
    setUserPosts(prev => [newPost, ...prev]);
  };

  // Handle post deletion
  const handleDeletePost = (postId: string) => {
    setUserPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Home Page
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to the Home page of ALX Project 2
          </p>
          
          {/* Add Post Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Post
          </button>
        </div>

        {/* User Posts Section */}
        {userPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {userPosts.map((post) => (
                <div key={post.id} className="relative">
                  <Card
                    title={post.title}
                    content={post.content}
                    className="border-l-4 border-green-500"
                  />
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                    aria-label="Delete post"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Created: {post.createdAt.toLocaleDateString()} at {post.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Static Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card
              title="Welcome"
              content="This is the main home page where users can find the latest updates and featured content. Explore our features and discover what makes this project special."
            />
            
            <Card
              title="Latest Updates"
              content="Stay informed with our newest features, bug fixes, and improvements. We're constantly working to enhance your experience with regular updates."
            />
            
            <Card
              title="Getting Started"
              content="New to our platform? This card will guide you through the basics and help you get up and running quickly with our intuitive interface."
            />
            
            <Card
              title="Features Overview"
              content="Discover the powerful features that make this application stand out. From responsive design to seamless navigation, we've got you covered."
              className="md:col-span-2 lg:col-span-1"
            />
            
            <Card
              title="Community"
              content="Join our growing community of developers and users. Share your experiences, get help, and contribute to making this project even better."
            />
            
            <Card
              title="Support"
              content="Need help? Our comprehensive support system is here to assist you. From documentation to direct support, we're committed to your success."
            />
          </div>
        </div>

        {/* Project Showcase */}
        <div className="max-w-4xl mx-auto">
          <Card
            title="🚀 Project Showcase"
            content="This ALX Project 2 demonstrates the power of modern web development with Next.js, TypeScript, and Tailwind CSS. Built with reusable components, clean architecture, and responsive design principles, it serves as a solid foundation for scalable web applications. The component-based approach ensures maintainability while the TypeScript integration provides type safety and better developer experience."
            className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white"
          />
        </div>
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