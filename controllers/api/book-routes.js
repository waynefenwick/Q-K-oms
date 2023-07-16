// const fetch = require("node-fetch");
const router = require("express").Router();
const Book = require('../../models/Book');
// ... Other routes ...
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.searchQuery;
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodedSearchTerm}`);
    const data = await response.json();
    const books = data.items;
    res.render('search', { books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
