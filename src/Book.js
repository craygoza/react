import React, {Component} from 'react';

class Book extends Component {

    render(){

        var { book, currentBookCategory, moveBookStatus } = this.props

        var bookClassifications = [
            {
                name:'none',
                description:'None'
            },
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

        let index = bookClassifications.map((shelf) => { return shelf.name }).indexOf(currentBookCategory)

        if (index == -1){
            index = 0
            currentBookCategory = 'none'
        }

        console.log(this.props)

        return (
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event)=> moveBookStatus(currentBookCategory, event.target.value, book)}>

                                <option value="0" disabled>Move to...</option>
                                <option value={currentBookCategory}>{bookClassifications[index].description}</option>

                                {
                                    bookClassifications.map((shelf) => {
                                        return  shelf.name === currentBookCategory  ? null :
                                            <option key={shelf.name} value={shelf.name}>{shelf.description}</option>
                                    })

                                }

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