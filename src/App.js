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
      listOfBooks:[]
  }

  searchBooks = (query) => {
      var {newState} = {}

      if (query) {

          BooksAPI.search(query).then((searchedBooks) => {
            newState = Object.assign(this.state, {searchedBooks: (searchedBooks.length == 0
                                                || searchedBooks.error ? [] : searchedBooks)})
          })
      }
      else {
        newState = Object.assign(this.state, {searchedBooks: [] })

      }

      this.setState(newState);

  }

  moveBookStatus = (sourceCategory, targetCategory, book) => {
      var {listOfBooks} = this.state
      var {currentBookStatus} = this.state

      listOfBooks[targetCategory].push(book)

      let tempList = listOfBooks[sourceCategory].filter((c) => c.id !== book.id)
      listOfBooks[sourceCategory] = tempList;

      currentBookStatus[book.id] = targetCategory

      let newState = Object.assign(this.state, {listOfBooks: listOfBooks})
      newState = Object.assign(newState, {currentBookStatus: currentBookStatus})

      this.setState(newState);
  }

    setSearchPageStatus = (value) => {
        this.setState({showSearchPage:value});
    }

  componentDidMount() {
    var list = [];

    BooksAPI.getAll().then((books) => {
        list.push([]);
        list.push(books);
        list.push([]);
        list.push([]);

        this.setState({listOfBooks:list});
    })
  }

  render() {
    return (
      <div className="app">

          {this.state.showSearchPage == true ? (
            <Route path="/search" render={() => (
                <Search searchBooks={this.searchBooks} moveBookStatus={this.moveBookStatus} books={this.state.searchedBooks} setSearchStatus={this.setSearchPageStatus}  currentBookStatus={this.state.currentBookStatus} />
             )} />
          ):(
              <Route exact path="/" render={() => (
                <ListBooks moveBookStatus={this.moveBookStatus} listOfBooks={this.state.listOfBooks}/>
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
