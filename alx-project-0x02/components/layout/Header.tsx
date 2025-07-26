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
          <Link href="/" className="text-2xl font-bold hover:text-blue-200">
            ALX Project 2
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/home" 
                  className={`hover:text-blue-200 transition-colors duration-200 ${
                    isActive('/home') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`hover:text-blue-200 transition-colors duration-200 ${
                    isActive('/about') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;