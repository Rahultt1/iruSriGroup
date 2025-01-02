import  { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import GenreSelector from './GenreSelector';

const BookTabs = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
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

  //Handle genre select
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
            className="mt-4 bg-transparent text-sm   text-black font-semibold px-2 py-2 rounded hover'bg-black transition-colors"
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
      <div className="w-1/4 pr-4 sticky -mt-12 mr-10 -ml-6 self-start">
        <GenreSelector onGenreSelect={handleGenreSelect} />
        
      </div>
      <div className="w-3/4 bg-blue-50 rounded-3xl shadow-2xl overflow-hidden relative">
       
        {/* Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#3B82F6"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Heading Section */}
        <div className="text-center p-6 relative z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Discover Your Next Favorite Book
          </h2>
          <p className="text-gray-600 mt-2">
            Browse through the latest trends, new arrivals, and genre-specific books from our collection.
          </p>
        </div>

        {/* Tabs */}
        <div className="font-sans p-4 relative z-10">
          <ul className="flex justify-center gap-2 w-max mx-auto bg-white p-1 rounded-full shadow-[0_2px_8px_-1px_rgba(6,81,237,0.4)]" role="tablist">
            <li
              role="tab"
              aria-selected={activeTab === 'trending'}
              aria-controls="trending-tab"
              className={`tab text-sm font-bold py-3 px-6 rounded-full cursor-pointer ${
                activeTab === 'trending' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
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
                activeTab === 'newArrivals' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
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
                  activeTab === 'genre' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setActiveTab('genre')}
              >
                {selectedGenre}
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
            className="p-6 relative z-10"
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