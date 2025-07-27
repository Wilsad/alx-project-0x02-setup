import Header from '@/components/layout/Header';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to ALX Project 2
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            A Next.js project with TypeScript and Tailwind CSS
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Home Page Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Home</h2>
              <p className="text-gray-600 mb-6">
                Visit the home page to see the main content and features.
              </p>
              <Link 
                href="/home"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Go to Home
              </Link>
            </div>
            
            {/* About Page Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">About</h2>
              <p className="text-gray-600 mb-6">
                Learn more about this project and its implementation.
              </p>
              <Link 
                href="/about"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">Project Features</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✅ Next.js Pages Router</li>
              <li>✅ TypeScript integration</li>
              <li>✅ Tailwind CSS styling</li>
              <li>✅ Client-side navigation</li>
              <li>✅ Active link highlighting</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}