// Libs
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.bookShelf();
  };

  bookShelf() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books,
        currentlyReading: books.filter(
          book => book.shelf === "currentlyReading"
        ),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      });
    });
  };

  handleBookShelfChange = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(books => this.bookShelf());
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                handleBookShelfChange={this.handleBookShelfChange}
              />
            )}
          />
          <Route
            path="/search"
            render={({ history }) => (
              <SearchBooks
                books={this.state.books}
                handleBookShelfChange={this.handleBookShelfChange}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
