import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';

const GenreSelector = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGenres = async (query = '') => {
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query ? `subject:${query}` : 'subject:',
          maxResults: 40,
          fields: 'items(volumeInfo/categories)'
        }
      });
      const fetchedGenres = response.data.items
        ?.flatMap(item => item.volumeInfo.categories || [])
        .filter(Boolean) || [];
      const uniqueGenres = [...new Set(fetchedGenres)];
      setGenres(uniqueGenres.slice(0, 10)); 
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const debouncedFetchGenres = useCallback(
    debounce((query) => fetchGenres(query), 300),
    []
  );

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const trendingSection = document.getElementById('trending-books');
      if (trendingSection) {
        const rect = trendingSection.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedFetchGenres(query);
  };

  const handleGenreSelect = (genre, e) => {
    e.preventDefault(); // Prevent default behavior that may cause page scroll
    setSelectedGenre(genre);
    onGenreSelect(genre);
    setIsOpen(true); 
  };
  
  

  const buttonVariants = {
    open: { height: 'auto' },
    closed: { height: '40px' }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center mt-16 ml-12">
      <motion.div
        className="mb-4 backdrop-brightness-150 bg-gray-900 text-white rounded-3xl overflow-hidden"
        variants={buttonVariants}
        initial="closed"
        animate="closed"
        transition={{ duration: 0.3 }}
      >
       
      </motion.div>

      <motion.div
        className="backdrop-brightness-150 bg-gray-900 text-white rounded-3xl overflow-hidden"
        variants={buttonVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <button
          className="w-full py-2 px-4 text-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{isOpen ? 'Select Genre' : 'Genres'}</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mt-2 space-y-2 p-2"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search genres..."
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.ul className="space-y-2">
                {genres.map((genre, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-2xl transition-colors ${
                        selectedGenre === genre
                          ? 'bg-white text-black'
                          : 'text-white hover:bg-white hover:text-black'
                      }`}
                      onClick={(e) => handleGenreSelect(genre, e)}
                    >
                      {genre}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GenreSelector;