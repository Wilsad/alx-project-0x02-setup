import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  
  // Helper function to check if link is active
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors duration-200">
            ALX Project 2
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/home" 
                  className={`hover:text-blue-200 transition-colors duration-200 ${
                    isActive('/home') ? 'text-blue-200 font-semibold border-b-2 border-blue-200' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`hover:text-blue-200 transition-colors duration-200 ${
                    isActive('/about') ? 'text-blue-200 font-semibold border-b-2 border-blue-200' : ''
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/posts" 
                  className={`hover:text-blue-200 transition-colors duration-200 ${
                    isActive('/posts') ? 'text-blue-200 font-semibold border-b-2 border-blue-200' : ''
                  }`}
                >
                  Posts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile menu button (optional enhancement) */}
        <div className="md:hidden">
          <button className="text-white hover:text-blue-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;