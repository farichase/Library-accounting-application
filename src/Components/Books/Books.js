import React, { Component } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import Book from './Book/Book'
import './Books.css'

class Books extends Component {

    state = {
        books: [], 
        exBooks: []
    }

    getBooks = async () => {
        const res = await fetch('http://localhost:8080/books/')
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
    updateBooks = () => {
        this.componentDidMount()
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
                                <Book
                                    key={item.id}
                                    bookId={item.id}
                                    name={item.name}
                                    authors={item.authors}
                                    genre = {item.genre}
                                    houses={item.houses}
                                    quantityInStock={item.quantityInStock}
                                    isEmployee={this.props.isEmployee}
                                    updateBooks={this.updateBooks}
                                />
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}


export default Books;