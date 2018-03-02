import React from "react";

import { Link } from "react-router-dom";
import * as _ from "underscore";
import { getImg, getShelf } from "../utils/helpers";

export default function SearchBooksList({
  query,
  searchedBooks,
  books,
  handleChange,
  handleBookShelfChange
}) {
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
            value={query}
            onChange={event =>
              _.debounce(
                handleChange(event.target.value, books),
                500
              )
            }
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: getImg(book)
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={getShelf(book)}
                      onChange={event =>
                        handleBookShelfChange(
                          book,
                          event.target.value
                        )
                      }
                    >
                      <option value="" disabled>
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
