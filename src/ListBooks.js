import React, {Component} from 'react';
import Book from './Book'

class ListBooks extends Component {

    render(){
       const { books } = this.props

        var bookClassifications = [
            {
                name:'wantToRead',
                description:'Want to Read'
            },
            {
                name:'currentlyReading',
                description:'Currently Reading'
            },
            {
                name:'read',
                description:'Read'
            }
        ]

       return (
           <div className="list-books">
               <div className="list-books-title">
                   <h1>MyReads</h1>
               </div>
               <div className="list-books-content">

                   <div>
                       {
                        bookClassifications.map((shelf) => (
                               <div className="bookshelf">
                                   <h2 className="bookshelf-title">{shelf.description}</h2>
                                   {
                                       <div className="bookshelf-books">
                                           <ol className="books-grid">
                                               {books.filter((book) => {return book.shelf == shelf.name}).map((book) => (
                                                       <li key={book.id}>
                                                           <Book moveBookStatus={this.props.moveBookStatus} book={book}
                                                                 currentBookCategory={book.shelf}/>
                                                       </li>
                                                 ))}
                                           </ol>
                                       </div>
                                   }
                               </div>
                        ))
                       }
                   </div>
               </div>

           </div>
        )
    }
}

export default ListBooks