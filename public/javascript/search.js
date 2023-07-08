document.addEventListener('DOMContentLoaded', function() {
  // HTML elements
  const searchForm = document.querySelector('#searchForm');
  const searchInput = document.querySelector('#searchQuery');
  const searchResults = document.querySelector('#searchResults');

  // Event listener for form submission
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const searchTerm = searchInput.value; // Get the search term

    // Clear previous search results
    searchResults.innerHTML = '';

    // Perform API request
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  // Display search results
  function displayResults(data) {
    const books = data.docs.filter(book => {
      return (
        book.cover_i && // Has cover image
        book.language && book.language.includes('eng') && // Is in English
        book.type === 'work' // Is a book (work)
      );
    });

    if (books.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
    } else {
      const bookList = document.createElement('ul');
      bookList.classList.add('book-list'); // Add CSS class to the book list

      books.forEach(book => {
        const listItem = document.createElement('li');
        const bookTitle = document.createElement('span');
        const bookAuthor = document.createElement('span');
        const bookCover = document.createElement('img');
        const bookISBN = document.createElement('span'); // Create a new element for the ISBN

        bookTitle.textContent = book.title;

        if (book.author_name && book.author_name.length > 0) {
          bookAuthor.textContent = 'Author: ' + book.author_name[0];
        } else {
          bookAuthor.textContent = 'Author: Unknown';
        }

        const coverID = book.cover_i;
        const coverURL = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
        bookCover.src = coverURL;
        bookCover.alt = book.title;

        if (book.isbn && book.isbn.length > 0) {
          bookISBN.textContent = 'ISBN: ' + book.isbn[0]; // Display the first ISBN
        } else {
          bookISBN.textContent = 'ISBN: Unknown';
        }

        listItem.style.height = '500px';
        listItem.style.width = '300px';

        listItem.appendChild(bookCover);
        listItem.appendChild(bookTitle);
        listItem.appendChild(bookAuthor);
        listItem.appendChild(bookISBN); // Append the ISBN element
        bookList.appendChild(listItem);
      });

      searchResults.appendChild(bookList);
    }
  }
});
