import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import GenreSelector from './GenreSelector';
import AuthorSelector from './AuthorSelector';

const BookTabs = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleBooks, setVisibleBooks] = useState(8);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [trendingResponse, newArrivalsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/trending'),
          axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
              q: 'newest',
              orderBy: 'newest',
              maxResults: 20,
            },
          })
        ]);
        setTrendingBooks(trendingResponse.data);
        setNewArrivals(newArrivalsResponse.data.items);
      } catch (error) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: `subject:${genre}`,
          maxResults: 20,
        },
      });
      setGenreBooks(response.data.items);
      setActiveTab('genre');
    } catch (error) {
      setError('Failed to fetch genre books. Please try again later.');
      console.error('Error fetching genre books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorSelect = async (author) => {
    setSelectedAuthor(author);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: `inauthor:${author}`,
          maxResults: 20,
        },
      });
      setAuthorBooks(response.data.items);
      setActiveTab('author');
    } catch (error) {
      setError('Failed to fetch author books. Please try again later.');
      console.error('Error fetching author books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const defaultImage = 'https://via.placeholder.com/100x150';

  const renderBooks = () => {
    let books;
    switch (activeTab) {
      case 'trending':
        books = trendingBooks;
        break;
      case 'newArrivals':
        books = newArrivals;
        break;
      case 'genre':
        books = genreBooks;
        break;
      case 'author':
        books = authorBooks;
        break;
      default:
        books = [];
    }

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.slice(0, visibleBooks).map((book, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
              <img
                src={book.volumeInfo?.imageLinks?.thumbnail || defaultImage}
                alt={book.volumeInfo?.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h3 className="text-sm font-semibold text-gray-800 truncate">{book.volumeInfo?.title}</h3>
              <p className="text-xs text-gray-600 truncate">{book.volumeInfo?.authors?.[0]}</p>
              {book.volumeInfo?.averageRating && (
                <div className="absolute bottom-1.5 ml-32 bg-blue-50 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
                  {book.volumeInfo.averageRating.toFixed(1)}
                </div>
              )}
            </div>
          ))}
        </div>
        {visibleBooks < books.length && (
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setVisibleBooks(prev => Math.min(prev + 8, books.length))}
          >
            View More
          </button>
        )}
      </>
    );
  };

  return (
    <div className="w-full max-w-6xl ml-6 mt-4 flex">
      <div className="w-1/4 pr-4 sticky top-4 self-start">
        <GenreSelector onGenreSelect={handleGenreSelect} />
        <AuthorSelector onAuthorSelect={handleAuthorSelect} />
      </div>
      <div className="w-3/4 bg-blue-50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Heading Section */}
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Discover Your Next Favorite Book
          </h2>
          <p className="text-gray-600 mt-2">
            Browse through the latest trends, new arrivals, and genre-specific books from our collection.
          </p>
        </div>

        {/* Tabs */}
        <div className="font-sans p-4">
          <ul className="flex justify-center gap-2 w-max mx-auto bg-white p-1 rounded-full shadow-[0_2px_8px_-1px_rgba(6,81,237,0.4)]" role="tablist">
            <li
              role="tab"
              aria-selected={activeTab === 'trending'}
              aria-controls="trending-tab"
              className={`tab text-sm font-bold py-3 px-6 rounded-full cursor-pointer ${
                activeTab === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </li>
            <li
              role="tab"
              aria-selected={activeTab === 'newArrivals'}
              aria-controls="new-arrivals-tab"
              className={`tab text-sm font-bold py-3 px-6 rounded-full cursor-pointer ${
                activeTab === 'newArrivals' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setActiveTab('newArrivals')}
            >
              New Arrivals
            </li>
            {selectedGenre && (
              <li
                role="tab"
                aria-selected={activeTab === 'genre'}
                aria-controls="genre-tab"
                className={`tab text-sm font-bold py-3 px-6 rounded-full cursor-pointer ${
                  activeTab === 'genre' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setActiveTab('genre')}
              >
                {selectedGenre}
              </li>
            )}
            {selectedAuthor && (
              <li
                role="tab"
                aria-selected={activeTab === 'author'}
                aria-controls="author-tab"
                className={`tab text-sm font-bold py-3 px-6 rounded-full cursor-pointer ${
                  activeTab === 'author' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setActiveTab('author')}
              >
                {selectedAuthor}
              </li>
            )}
          </ul>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {isLoading ? (
              <div className="text-center">
                <p>Loading books...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              renderBooks()
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookTabs;