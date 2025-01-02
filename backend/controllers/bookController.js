const axios = require('axios');

// Google Books API URL
const googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes';

exports.searchBooks = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Fetch data from Google Books API
    const response = await axios.get(googleBooksAPI, {
      params: {
        q: search,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });

    // Log the Google Books API response to debug
    console.log('Google Books API Response:', response.data);

    // Send the items (books) to the frontend
    res.json(response.data.items || []); // Ensure response is an array
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getTrendingBooks = async (req, res) => {
  try {
    const response = await axios.get(
      `${googleBooksAPI}?q=trending&maxResults=12&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching trending books:', error);
    res.status(500).send('Failed to fetch trending books');
  }
};

exports.getBooksByGenre = async (req, res) => {
  const { genre } = req.params;
  
  if (!genre) {
    return res.status(400).json({ error: 'Genre is required' });
  }

  try {
    const response = await axios.get(googleBooksAPI, {
      params: {
        q: `subject:${genre}`,
        maxResults: 40,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: 'No books found for this genre' });
    }

    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching books by genre:', error);
    res.status(500).json({ error: 'Failed to fetch books by genre' });
  }
};
