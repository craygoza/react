import React, {Component} from 'react';

class Book extends Component {
     state = {
         bookClassifications:{'0':'None', '1':'Want to Read', '2':'Currently Reading', '3':'Read'},
     }

    render(){

        const { book, currentBookCategory, moveBookStatus } = this.props
        const { bookClassifications } = this.state

        return (
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event)=> moveBookStatus(currentBookCategory, event.target.value, book)}>

                                <option value="0" disabled>Move to...</option>
                                <option value={currentBookCategory}>{bookClassifications[currentBookCategory]}</option>

                                {Object.values(bookClassifications).map((key, value) => {
                                         return value == currentBookCategory ? null :
                                                <option key={value} value={value}>{bookClassifications[value]}</option>
                                    }
                                )}

                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
        )
    }
}

export default Book