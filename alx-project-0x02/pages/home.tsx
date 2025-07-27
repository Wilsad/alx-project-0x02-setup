import Header from '@/components/layout/Header';
import Card from '@/components/common/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Home Page
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to the Home page of ALX Project 2
          </p>
        </div>

        {/* Grid of Cards */}
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

        {/* Featured Card with Different Styling */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Content</h2>
          <Card
            title="🚀 Project Showcase"
            content="This ALX Project 2 demonstrates the power of modern web development with Next.js, TypeScript, and Tailwind CSS. Built with reusable components, clean architecture, and responsive design principles, it serves as a solid foundation for scalable web applications. The component-based approach ensures maintainability while the TypeScript integration provides type safety and better developer experience."
            className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white"
          />
        </div>
      </main>
    </div>
  );
}