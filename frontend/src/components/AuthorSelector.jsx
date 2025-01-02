import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthorSelector = ({ onAuthorSelect }) => {
  const [authors] = useState([
    "William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain",
    "Ernest Hemingway", "Virginia Woolf", "F. Scott Fitzgerald", "George Orwell",
    "J.K. Rowling", "Stephen King", "Agatha Christie", "Gabriel García Márquez"
  ]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  useEffect(() => {
    setFilteredAuthors(
      authors.filter(author => 
        author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, authors]);

  const handleAuthorSelect = (author, e) => {
    e.preventDefault();
    setSelectedAuthor(author);
    onAuthorSelect(author);
    setIsOpen(false);
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
    <div className="flex flex-col items-center mt-16 mr-12">
      <motion.div
        className="backdrop-brightness-150 bg-gray-900 text-white rounded-3xl overflow-hidden w-48"
        variants={buttonVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <button
          className="w-full py-2 px-4 text-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedAuthor || 'Authors'}</span>
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
                placeholder="Search authors..."
                className="w-full px-3 py-2 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.ul className="space-y-2 max-h-60 overflow-y-auto">
                {filteredAuthors.map((author, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-2xl transition-colors ${
                        selectedAuthor === author
                          ? 'bg-white text-black'
                          : 'text-white hover:bg-white hover:text-black'
                      }`}
                      onClick={(e) => handleAuthorSelect(author, e)}
                    >
                      {author}
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

export default AuthorSelector;