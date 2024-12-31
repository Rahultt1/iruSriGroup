import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const BookList = () => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('title');

  const fetchBooks = async () => {
    if (!search) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/books?search=${search}&filter=${filter}`);
      console.log('Fetched Books:', response.data);

      if (response.data && response.data.length === 0) {
        setError('No books found for this search. Please try a different keyword.');
      } else {
        setBooks(response.data);
        setFilteredBooks(response.data);
      }
    } catch (error) {
      setError('An error occurred while fetching the books. Please try again later.');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterAndSortBooks();
  }, [books, filter, sort]);

  const filterAndSortBooks = () => {
    let result = [...books];

    // Sort
    result.sort((a, b) => {
      if (sort === 'title') {
        return (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '');
      } else if (sort === 'author') {
        return (a.volumeInfo?.authors?.[0] || '').localeCompare(b.volumeInfo?.authors?.[0] || '');
      }
      return 0;
    });

    setFilteredBooks(result);
  };

  return (
    <div className="container mx-auto -mt-48 px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
       
        <div className="flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Search for books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={fetchBooks}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Search
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row">
        {/* <div className="md:w-1/4 mb-6 md:mb-0 md:mr-6">
          <FilterPanel filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </div> */}

        <div className="md:w-3/4">
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600"
            >
              Loading...
            </motion.div>
          )}
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500"
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="md:w-1/4 p-4">
                  <img
                    src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo?.title || 'No title available'}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="md:w-3/4 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.volumeInfo?.title || 'No title available'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Authors:</span> {book.volumeInfo?.authors?.join(', ') || 'No author listed'}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Categories:</span> {book.volumeInfo?.categories?.join(', ') || 'No categories listed'}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {book.volumeInfo?.description || 'No description available'}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookList;