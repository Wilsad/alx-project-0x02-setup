import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">ALX Project 2</h1>
        <nav>
          <ul className="flex space-x-4 mt-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;