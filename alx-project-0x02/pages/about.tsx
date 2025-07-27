import Header from '@/components/layout/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Page
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn more about ALX Project 2
          </p>
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
                <li>TypeScript integration</li>
                <li>Component-based architecture</li>
                <li>Responsive design with Tailwind CSS</li>
                <li>Client-side navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}