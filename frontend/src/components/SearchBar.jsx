import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10`);
        setSearchResults(response.data.items || []);
        setIsSearchActive(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const handleExit = () => {
    setIsSearchActive(false);
    setSearch('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <motion.div
        initial={false}
        animate={{
          width: isSearchActive ? '100%' : '66.666667%',
        }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto"
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            placeholder="Search for books..."
            className="w-full px-6 py-3 text-lg text-blue-50 bg-white bg-opacity-20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-blue-200"
          />
        </form>
        {!isSearchActive && (
          <button
            onClick={() => setIsSearchActive(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
        {isSearchActive && (
          <button
            onClick={handleExit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {isSearchActive && search && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-gradient-to-b from-blue-600 to-indigo-900 rounded-lg overflow-hidden mt-2 z-0"
            style={{
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <div className="p-4">
              <h3 className="text-xl font-thin weight-bold text-white mb-4">Search Results</h3>
              <div className="relative mb-8">
                <button
                  onClick={() => handleScroll('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md text-blue-500 hover:text-blue-700 transition-colors duration-200 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
                  style={{ maxWidth: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {searchResults.map((book, index) => (
                    <div key={index} className="flex-shrink-0 w-32 space-y-2">
                      <div className="bg-transparent rounded-lg transition-transform duration-200 hover:scale-105 flex flex-col items-center">
                        <img
                          src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'}
                          alt={book.volumeInfo?.title}
                          className="w-32 h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="mt-2 text-center w-full px-2">
                          <h4 className="text-sm font-semibold text-white truncate">{book.volumeInfo?.title}</h4>
                          <p className="text-xs text-gray-300 truncate">{book.volumeInfo?.authors?.[0] || 'Unknown Author'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleScroll('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md text-blue-500 hover:text-blue-700 transition-colors duration-200 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Similar Books Section */}
              <div>
                <h3 className="text-xl font-thin weight-bold text-white mb-4">Similar Books</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.slice(0, 5).map((book, index) => (
                    <div key={`similar-${index}`} className="flex flex-col items-center">
                      <img
                        src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'}
                        alt={book.volumeInfo?.title}
                        className="w-24 h-36 object-cover rounded-lg shadow-md mb-2"
                      />
                      <div className="w-full px-2">
                        <h4 className="text-sm font-semibold text-white text-center truncate">{book.volumeInfo?.title}</h4>
                        <p className="text-xs text-gray-300 text-center truncate">{book.volumeInfo?.authors?.[0] || 'Unknown Author'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;