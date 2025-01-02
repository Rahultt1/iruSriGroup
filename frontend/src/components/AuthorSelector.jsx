import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthorSelector = ({ onAuthorSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authorInput, setAuthorInput] = useState('');

  const handleAuthorSubmit = (e) => {
    e.preventDefault();
    if (authorInput.trim()) {
      onAuthorSelect(authorInput.trim());
      setIsOpen(false);
    }
  };

  const buttonVariants = {
    closed: { width: '120px' },
    open: { width: '200px' }
  };

  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div
      className="mt-2 ml-12 bg-blue-600 text-white rounded-3xl overflow-hidden"
      variants={buttonVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full py-2 px-1 text-left flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{isOpen ? 'Enter Author' : 'Author'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.form
            className="mt-2 p-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onSubmit={handleAuthorSubmit}
          >
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              placeholder="Author name"
              className="w-5/6 justify-center flex mx-auto px-3 py-2 rounded-3xl text-black"
            />
            <button
              type="submit"
              className="w-full mt-2 bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-3xl transition-colors"
            >
              Search
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthorSelector;