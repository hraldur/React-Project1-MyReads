import React from "react";

import { getImg } from "../utils/helpers";

export default function BookShelf({
  name,
  shelf,
  selectedShelf,
  handleBookShelfChange
}) {
  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{name}</h2>
        </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.map(book => (
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
                        value={selectedShelf}
                        onChange={event =>
                          handleBookShelfChange(book, event.target.value)
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
    </div>
  );
}
