import React, { Component } from 'react'
import './MyBook.css'


class MyBook extends Component {
    
    render() {
        return (
            <div className="book">
                <div className="content">
                <div className="title">Form number: {this.props.formNumber}</div>
                    <div className="title">Name: {this.props.name}</div>
                    <div className="title">Return date: {this.props.returnDate}</div>
                    <div className="list title">Authors: {
                        this.props.authors.map(author => {
                            return(<li key={author}>{author}</li>)
                        })
                    }
                    </div>
                    <div className="title">Genre: {this.props.genre}</div>
                    <div className="list title">Publishing house: {
                        this.props.houses.map(house => {
                            return(<li key={house}>{house}</li>)
                        })}
                    </div>
                    
                </div>  
            </div>
        )
    }
}

export default MyBook