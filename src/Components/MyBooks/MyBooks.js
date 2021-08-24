import React, { Component } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import MyBook from './MyBook/MyBook'
import './MyBooks.css'

class MyBooks extends Component {

    state = {
        books: [], 
        exBooks: []
    }

    getBooks = async () => {
        const res = await fetch('http://localhost:8080/books/mybooks/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.props.email
            })
        })
        if(!res.ok) {
            throw Error('Could not get all books')
        }
        return await res.json()
    }
    componentDidMount() {
        this.getBooks().then(response => {
            this.setState({
                books: response.data,
                exBooks: response.data
            })
        })
    }
    updateData = (newData, query) => {
        if (query.length === 0){
            this.setState({
                books: this.state.exBooks
            })
        } else {
            this.setState({
                books: newData
            })
        }
    }
    render() {
        return (
            <main className="app-wrapper">
                <Searchbar data={this.state.books} updateData={this.updateData}/>
                
                <div className="items">
                    {
                        this.state.books.map(item => {
                            return (
                                <MyBook
                                    key={item.formNumber}
                                    bookId={item.id}
                                    name={item.name}
                                    authors={item.authors}
                                    genre = {item.genre}
                                    formNumber={item.formNumber}
                                    houses={item.houses}
                                    returnDate={item.returnDate}
                                />
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}


export default MyBooks;