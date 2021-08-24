import React, { Component } from 'react'
import './Forms.css'
import Searchbar from '../Searchbar/Searchbar';


class Forms extends Component {
    state = {
        exData: [],
        copyForms: []
    }

    getCopyForms = async () => {
        const res = await fetch('http://localhost:8080/copyForms/')
        if (!res.ok) {
            throw Error('Could not get all copyForms')
        }
        return await res.json()
    }
    componentDidMount() {
        this.getCopyForms().then(response => {
            this.setState({
                copyForms: response.data,
                exData: response.data,
            })
        })
    }
    updateData = (newData, query) => {
        if (query.length === 0){
            this.setState({
                copyForms: this.state.exData,
            })
        } else {
            this.setState({
                copyForms: newData,
            })
        }
    }
    returnBook = async(id) => {
        const res = await fetch('http://localhost:8080/copyForms/returnBook/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id
            }),
        })
        if (!res.ok) {
            throw Error('Could not return the book')
        }
        this.componentDidMount() 
    }
    render() {

        return (
            <main className="app-wrapper">
                <Searchbar data={this.state.copyForms} updateData={this.updateData} />
                <div className="items list">
                    {
                        this.state.copyForms.map(item => 
                            <div className="item" key={item.id}>
                                <div>Number: {item.number}</div>
                                <div>Book name: {item.book}</div>
                                <div>Current reader: {item.user}</div>
                                <div>Date of issue: {item.dateOfIssue}</div>
                                <div>Return date: {item.returnDate}</div>
                                <button className="button" onClick={this.returnBook.bind(this, item.id)}>Return of the book</button>
                            </div>
                        )
                    }
                </div>
            </main>
        )
    }
}

export default Forms