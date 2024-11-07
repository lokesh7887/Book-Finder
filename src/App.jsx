import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Book Finder</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="book-grid">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="book-card">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="book-cover"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">
                  Author: {book.author_name?.join(", ") || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
