require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookController = require('./controllers/bookController');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());

// Route to fetch books from Google Books API
app.get('/api/books', bookController.searchBooks);

// Route to fetch trending books from Google Books API
app.get('/api/trending', bookController.getTrendingBooks);

// Route to fetch books by genre
app.get('/api/books/genre/:genre', bookController.getBooksByGenre);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; 