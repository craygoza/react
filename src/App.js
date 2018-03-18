import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import Search from './Search'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
      showSearchPage: false,
      searchedBooks:[],
      currentBookStatus:{},
      books:[]
  }

  searchBooks = (query) => {
      var {newState} = this.state

      if (query) {

          BooksAPI.search(query).then((searchedBooks) => {
            newState = Object.assign(this.state, {searchedBooks: (searchedBooks.length == 0
                                                || searchedBooks.error ? [] : searchedBooks)})

              this.setState(newState);
          })
      }
      else {
        newState = Object.assign(this.state, {searchedBooks: [] })
          this.setState(newState);

      }
  }

  moveBookStatus = (sourceCategory, targetCategory, book) => {
      if (book.shelf !== targetCategory) {
          BooksAPI.update(book, targetCategory).then(() => {
              book.shelf = targetCategory

              var {currentBookStatus} = this.state
              currentBookStatus[book.id] = targetCategory

              this.setState(state => ({
                  books: state.books.filter(b => b.id !== book.id).concat([ book ]),
                  currentBookStatus: currentBookStatus
              }))
          })
      }
  }

    setSearchPageStatus = (value) => {
        this.setState({showSearchPage:value});
    }

  componentDidMount() {
    var list = [];

    BooksAPI.getAll().then((books) => {
        var {currentBookStatus} = this.state

        books.map((book) => {
            currentBookStatus[book.id] = book.shelf
        })

        this.setState(state => ({

            books: books,
            currentBookStatus: currentBookStatus
        }))

    })
  }

  render() {
    return (
      <div className="app">

          {this.state.showSearchPage ? (
            <Route path="/search" render={() => (
                <Search searchBooks={this.searchBooks} moveBookStatus={this.moveBookStatus} books={this.state.searchedBooks} setSearchStatus={this.setSearchPageStatus}  currentBookStatus={this.state.currentBookStatus} />
             )} />
          ):(
              <Route exact path="/" render={() => (
                <ListBooks moveBookStatus={this.moveBookStatus} books={this.state.books}/>
              )} />
            )
          }

          <div className="open-search">
              <Link to="/search" onClick={() => this.setState({showSearchPage: true})}>Add a book</Link>
          </div>
      </div>
    )
  }
}

export default BooksApp
