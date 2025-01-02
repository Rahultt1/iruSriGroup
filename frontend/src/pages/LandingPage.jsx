
import { Link } from 'react-scroll';
import SearchBar from '../components/SearchBar';
import BookTabs from '../components/BookTabs';
import "../index.css";

const LandingPage = () => {
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white relative">
      {/* Search Bar */}
      <div className="absolute w-2/3 top-10 left-64 p-4 z-50">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative py-20"
        style={{
          backgroundColor:'black',
          backgroundSize: 'cover',
          backgroundPosition: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background animations */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-56 w-48 h-48 bg-purple-400 rounded-full opacity-20 delay-1000 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-20 top-10 w-72 h-72 bg-blue-500 rounded-full delay-1000 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 left-1/5 w-56 h-56 bg-blue-200 rounded-full opacity-20 blur-2xl delay-1000 animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/3 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-float"></div>
        </div>

        {/* Content */}
        <div className="z-10 mb-8">
          <h1 className="text-7xl font-semibold flex justify-center animate-none mt-20 mb-4">
            Google Book Store
          </h1>
          <p className="mt-10 text-2xl max-w-3xl font-thin">
            Step into the world of stories, knowledge, and imagination.
            Explore trending books, find hidden gems, and let your next great adventure begin here.
          </p>
        </div>

        {/* New section: Reading Quote */}
        <div className="z-10 mt-2 max-w-2xl">
          <blockquote className="text-2xl italic font-thin">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </blockquote>
          <p className="mt-2 text-xl">- George R.R. Martin</p>
        </div>

        {/* Call to Action */}
        <div className="z-10 mt-20 space-y-6">
          <Link
            to="trending-books"
            smooth={true}
            duration={500}
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          >
            Explore Books
          </Link>
          <p className="text-xl mb-10 font-thin">Ready to embark on your reading journey?</p>
        </div>
      </div>

      {/* Book Tabs Section */}
      <div id="trending-books" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <BookTabs />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
