import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';


const LandingPage = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch trending books on component mount
    const fetchTrendingBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trending');
        setTrendingBooks(response.data);
      } catch (error) {
        setError('Failed to fetch trending books.');
        console.error('Error fetching trending books:', error);
      }
    };
    fetchTrendingBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white relative">
      {/* Search Bar */}
      <div className="absolute w-2/3  top-10  left-64 p-4 z-50">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen text-center px-4 relative">
      <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
          <div className="w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse delay-200"></div>

         
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-lg animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-15 blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 left-1/5 w-56 h-56 bg-blue-200 rounded-full opacity-20 blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/3 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-2xl animate-float"></div>
        </div>

        {/* Content */}
        <div className="z-10 mb-0">
          <h1 className="text-7xl weight-extrabold font-thin flex justify-center animate-none -mb-4">Google Book Store</h1>
          <p className="mt-16 text-2xl max-w-3xl font-thin">
            Step into the world of stories, knowledge, and imagination.
            Explore trending books, find hidden gems, and let
            your next great adventure begin here.
          </p>
        </div>

        <Link
          to="trending-books"
          smooth={true}
          duration={500}
          className="mt-20 bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-300 z-10"
        >
          Read Now
        </Link>
      </div>

      {/* Trending Books Section */}
      <div id="trending-books" className="bg-white py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Trending Books</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
          {trendingBooks.length > 0 ? (
            trendingBooks.map((book, index) => (
              <img
                key={index}
                src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt="Trending Book"
                className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              />
            ))
          ) : (
            !error && <p className="col-span-full text-center text-gray-500">No trending books available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;