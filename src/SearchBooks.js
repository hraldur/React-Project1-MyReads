// Libs
import React from 'react'
import { Link } from 'react-router-dom'

// Components
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component {
	state = { 
		query: '',
		searchedBooks: []
	}

	handleChange = (query) => {
		this.setState({ query: query.trim() })
		if (query === '') {
			this.setState ({
        			searchedBooks: [],
      			})
		}
		if (query && query.length > 1){
			BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
				if (searchedBooks === undefined || searchedBooks.error) {
          			searchedBooks = []
        		}
				this.setState ({
        			searchedBooks: searchedBooks,
      			})
			})
		}
		
	}

	// get book image if exists
	getImg = (book) => {
		if(book.imageLinks){
			return `url(${book.imageLinks.thumbnail})`
		}
		else {

			return ''}
	}
	
	render() {
		console.log(this.state.searchedBooks)

		return(	
           <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">           																						
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>this.handleChange(event.target.value)}/>
              </div>
            </div>

            <div className="search-books-results">
	              <ol className="books-grid">
	              	{this.state.searchedBooks.map(book=>
	              	   	<li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.getImg(book) }}></div>
	                            <div className="book-shelf-changer"> 					
	                            <select value="none" onChange={(event)=>this.props.updateShelf(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
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
                  	)}
	              </ol>
	            </div>
          </div>
          )
			
	}
}


export default SearchBooks;