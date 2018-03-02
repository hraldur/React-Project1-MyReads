import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

export default function ListBooks({
  currentlyReading,
  wantToRead,
  read,
  handleBookShelfChange
}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div>
        <BookShelf
          name="Currently Reading"
          shelf={currentlyReading}
          selectedShelf="currentlyReading"
          handleBookShelfChange={handleBookShelfChange}
        />
        <BookShelf
          name="Want to Read"
          shelf={wantToRead}
          selectedShelf="wantToRead"
          handleBookShelfChange={handleBookShelfChange}
        />
        <BookShelf
          name="Read"
          shelf={read}
          selectedShelf="read"
          handleBookShelfChange={handleBookShelfChange}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
