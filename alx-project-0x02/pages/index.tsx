import Header from '../components/layout/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to ALX Project 2
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A Next.js project with TypeScript and Tailwind CSS
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Project Features</h2>
            <ul className="text-left space-y-2">
              <li>✅ Next.js with TypeScript</li>
              <li>✅ Tailwind CSS for styling</li>
              <li>✅ ESLint for code quality</li>
              <li>✅ Component-based architecture</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
