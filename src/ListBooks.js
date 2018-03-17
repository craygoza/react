import React, {Component} from 'react';
import Book from './Book'

class ListBooks extends Component {

    state = {
        query: '',
        bookClassifications:{'0':'None', '1':'Want to Read', '2':'Currently Reading', '3':'Read'},
        bookStatus: {}
    }

    constructor(props) {
        super(props)
    }

    render(){
       const { listOfBooks } = this.props
       const { bookClassifications } = this.state

       return (
           <div className="list-books">
               <div className="list-books-title">
                   <h1>MyReads</h1>
               </div>
               <div className="list-books-content">
                   <div>
                       {listOfBooks.map((books, index) => {

                           return index !== 0 ?
                               <div className="bookshelf">
                                   <h2 className="bookshelf-title">{bookClassifications[index]}</h2>

                                   <div className="bookshelf-books">
                                       <ol className="books-grid">
                                           {books.map((book) => (
                                               <li key={book.id}>
                                                   <Book moveBookStatus={this.props.moveBookStatus} book={book}
                                                         currentBookCategory={index}/>
                                               </li>
                                           ))}
                                       </ol>
                                   </div>

                               </div> : null
                       })}
                   </div>
               </div>

           </div>
        )
    }
}

export default ListBooks