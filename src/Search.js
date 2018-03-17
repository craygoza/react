import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book';
{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
class Search extends Component {
    state = {
        query:''
    }

    updateQuery = (query) => {
        let escapedQuery = escapeRegExp(query);
        this.setState({ query: query})
        this.props.searchBooks(escapedQuery);
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render(){
        const { books } = this.props
        const { query } = this.state
        const { currentBookStatus } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={() => this.props.setSearchStatus(false)}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {books && (
                            books.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} moveBookStatus={this.props.moveBookStatus} currentBookCategory={(currentBookStatus[book.id] ? currentBookStatus[book.id] : 0)}/>
                                </li>
                            ))
                    )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search