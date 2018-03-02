// Libs
import React from "react";




// Components
import * as BooksAPI from "./BooksAPI";
import SearchBooksList from "./SearchBooksList";

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

  render() {
    return (
      <SearchBooksList
        query={this.state.query}
        searchedBooks={this.state.searchedBooks}
        books={this.props.books}
        handleChange={this.handleChange}
        handleBookShelfChange={this.props.handleBookShelfChange}
      />
    );
  }
}

export default SearchBooks;
