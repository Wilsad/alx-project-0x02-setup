import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Button from '@/components/common/Button';

export default function About() {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setClickedButton(buttonName);
    setTimeout(() => setClickedButton(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Page
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn more about ALX Project 2
          </p>
        </div>

        {/* Button Showcase Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Button Component Showcase
          </h2>
          
          {/* Three Featured Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Button
              size="small"
              shape="rounded-sm"
              variant="primary"
              onClick={() => handleButtonClick('Small Primary')}
            >
              Small & Sharp
            </Button>

            <Button
              size="medium"
              shape="rounded-md"
              variant="secondary"
              onClick={() => handleButtonClick('Medium Secondary')}
            >
              Medium & Rounded
            </Button>

            <Button
              size="large"
              shape="rounded-full"
              variant="outline"
              onClick={() => handleButtonClick('Large Outline')}
            >
              Large & Full Round
            </Button>
          </div>

          {/* Click Feedback */}
          {clickedButton && (
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-md border border-green-200">
                You clicked: <strong>{clickedButton}</strong> button!
              </div>
            </div>
          )}

          {/* Complete Button Grid */}
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              All Size & Shape Combinations
            </h3>
            
            <div className="space-y-8">
              {/* Small Buttons */}
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-700">Small Buttons</h4>
                <div className="flex flex-wrap gap-4">
                  <Button size="small" shape="rounded-sm" variant="primary">
                    Small + Sharp
                  </Button>
                  <Button size="small" shape="rounded-md" variant="secondary">
                    Small + Medium
                  </Button>
                  <Button size="small" shape="rounded-full" variant="outline">
                    Small + Full
                  </Button>
                  <Button size="small" shape="rounded-sm" variant="danger">
                    Small Danger
                  </Button>
                </div>
              </div>

              {/* Medium Buttons */}
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-700">Medium Buttons</h4>
                <div className="flex flex-wrap gap-4">
                  <Button size="medium" shape="rounded-sm" variant="primary">
                    Medium + Sharp
                  </Button>
                  <Button size="medium" shape="rounded-md" variant="secondary">
                    Medium + Medium
                  </Button>
                  <Button size="medium" shape="rounded-full" variant="outline">
                    Medium + Full
                  </Button>
                  <Button size="medium" shape="rounded-md" variant="danger">
                    Medium Danger
                  </Button>
                </div>
              </div>

              {/* Large Buttons */}
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-700">Large Buttons</h4>
                <div className="flex flex-wrap gap-4">
                  <Button size="large" shape="rounded-sm" variant="primary">
                    Large + Sharp
                  </Button>
                  <Button size="large" shape="rounded-md" variant="secondary">
                    Large + Medium
                  </Button>
                  <Button size="large" shape="rounded-full" variant="outline">
                    Large + Full
                  </Button>
                  <Button size="large" shape="rounded-md" variant="danger">
                    Large Danger
                  </Button>
                </div>
              </div>

              {/* Special States */}
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-700">Special States</h4>
                <div className="flex flex-wrap gap-4">
                  <Button size="medium" shape="rounded-md" variant="primary" disabled>
                    Disabled Button
                  </Button>
                  <Button 
                    size="medium" 
                    shape="rounded-full" 
                    variant="outline"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
                  >
                    Custom Gradient
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">About This Project</h2>
          <div className="text-left space-y-3 text-gray-700">
            <p>
              ALX Project 2 is a Next.js application built with TypeScript and 
              styled with Tailwind CSS.
            </p>
            <p>
              This project demonstrates:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Next.js Pages Router implementation</li>
              <li>TypeScript integration with proper interfaces</li>
              <li>Reusable component architecture</li>
              <li>Dynamic modal components with form handling</li>
              <li>Responsive design with Tailwind CSS</li>
              <li>Client-side navigation and state management</li>
              <li>Flexible Button component with multiple variants</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button 
              size="medium" 
              shape="rounded-md" 
              variant="primary"
              onClick={() => window.location.href = '/home'}
            >
              Go to Home
            </Button>
            <Button 
              size="medium" 
              shape="rounded-md" 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Back to Landing
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}