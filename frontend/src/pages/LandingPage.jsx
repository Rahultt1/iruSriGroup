import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import BookTabs from '../components/BookTabs';
import "../index.css";

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

  const bookQuotes = [
    {
      text: "A reader lives a thousand lives before he dies.",
      author: "George R.R. Martin",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      text: "Reading is essential for those who seek to rise above the ordinary.",
      author: "Jim Rohn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white relative">
      {/* Search Bar */}
      <div className="absolute w-2/3 top-10 left-64 p-4 z-50">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Hero Section */}
<div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative py-20">
  {/* Background animations */}
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
    <div className="w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse delay-200"></div>
    <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-lg animate-pulse"></div>
    <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-15 blur-xl animate-pulse"></div>
    <div className="absolute top-3/4 left-1/5 w-56 h-56 bg-blue-200 rounded-full opacity-20 blur-2xl animate-pulse"></div>
    <div className="absolute bottom-1/2 right-1/3 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-2xl animate-float"></div>
  </div>

    
  {/* Content */}
  <div className="z-10 mb-8">
    <h1 className="text-7xl font-semibold  flex justify-center animate-none mt-20 mb-4">Google Book Store</h1>
    <p className="mt-10 text-2xl max-w-3xl font-thin">
      Step into the world of stories, knowledge, and imagination.
      Explore trending books, find hidden gems, and let
      your next great adventure begin here.
    </p>
  </div>
   {/* New section: Reading Quote */}
   <div className="z-10 mt-2 max-w-2xl">
    <blockquote className="text-2xl italic font-thin">
      "A reader lives a thousand lives before he dies. The man who never reads lives only one."
    </blockquote>
    <p className="mt-2 text-xl">- George R.R. Martin</p>
  </div>

  {/* New section: Book Categories */}
  {/* <div className="z-10 mb-12">
    <h2 className="text-3xl font-bold mb-4">Discover Your Next Read</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography'].map((category) => (
        <button key={category} className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition duration-300">
          {category}
        </button>
      ))}
    </div>
  </div> */}

  {/* New section: Reading Benefits */}
  {/* <div className="z-10 mb-12 max-w-4xl">
    <h2 className="text-3xl font-bold mb-4">Why Reading Matters</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[
        'Expands Knowledge', 
        'Reduces Stress', 
        'Improves Vocabulary', 
        'Enhances Creativity', 
        'Boosts Memory', 
        'Develops Empathy'
      ].map((benefit) => (
        <div key={benefit} className="bg-white bg-opacity-10 p-4 rounded-lg">
          <p className="text-lg font-semibold">{benefit}</p>
        </div>
      ))}
    </div>
  </div> */}

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
    <p className="text-xl mb-10 font-thin">
      Ready to embark on your reading journey?
    </p>
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