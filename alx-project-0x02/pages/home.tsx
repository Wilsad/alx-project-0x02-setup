import Header from '../components/layout/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Home Page
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to the Home page of ALX Project 2
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">What's on this page?</h2>
            <p className="text-gray-700">
              This is the main home page where users can find the latest updates 
              and featured content.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}