import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const GenreSelector = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: 'subject:',
            maxResults: 40
          }
        });
        const fetchedGenres = [...new Set(response.data.items.flatMap(item => item.volumeInfo.categories || []))];
        setGenres(fetchedGenres.slice(0, 10)); // Limit to 10 genres for this example
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    onGenreSelect(genre);
    setIsOpen(false);
  };

  const buttonVariants = {
    closed: { width: '120px' },
    open: { width: '200px' }
  };

  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="mt-16 ml-12 bg-blue-600 text-white rounded-3xl overflow-hidden"
      variants={buttonVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full py-2 px-4 text-left flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{isOpen ? 'Select Genre' : 'Genres'}</span>
        
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="mt-2 space-y-2 p-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {genres.map((genre, index) => (
              <motion.li key={index} variants={itemVariants}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedGenre === genre ? 'bg-blue-700' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GenreSelector;