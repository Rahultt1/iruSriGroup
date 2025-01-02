require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookController = require('./controllers/bookController');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());


app.get('/api/books', bookController.searchBooks);


app.get('/api/trending', bookController.getTrendingBooks);


app.get('/api/books/genre/:genre', bookController.getBooksByGenre);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; 