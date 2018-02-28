// Libs
import React from "react";
import { Link } from "react-router-dom";
import * as _ from "underscore";

// Components
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends React.Component {
  state = {
    query: "",
    searchedBooks: []
  };

  handleChange = (query, books) => {
    this.setState({ query: query });
    if (query === "") {
      this.setState({
        searchedBooks: []
      });
    }
    if (query && query.length > 1) {
      BooksAPI.search(this.state.query, 20).then(searchedBooks => {
        if (searchedBooks === undefined || searchedBooks.error) {
          searchedBooks = [];
        }
        searchedBooks.forEach((book, bookIndex) => {
          if (!book.shelf) {
            for (let i = 0; i < books.length; i++) {
              if (book.id === books[i].id) {
                book.shelf = books[i].shelf;
              }
            }
          }
        });

        this.setState({
          searchedBooks: searchedBooks
        });
      });
    }
  };

  getImg = book => {
    if (book.imageLinks) {
      return `url(${book.imageLinks.thumbnail})`;
    } else {
      return "";
    }
  };

  getShelf = book => {
    if (book.shelf) {
      return book.shelf;
    } else {
      return "none";
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event =>
                _.debounce(
                  this.handleChange(event.target.value, this.props.books),
                  500
                )
              }
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: this.getImg(book)
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={this.getShelf(book)}
                        onChange={event =>
                          this.props.handleBookShelfChange(
                            book,
                            event.target.value
                          )
                        }
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>

                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
