import React, { Component } from 'react'
import './PublishingHouses.css'
import Searchbar from '../Searchbar/Searchbar';


class PublishingHouses extends Component {
    state = {
        exData: [],
        authors: []
    }

    getauthors = async () => {
        const res = await fetch('http://localhost:8080/employee/publishingHouses/')
        if (!res.ok) {
            throw Error('Could not get all authors')
        }
        return await res.json()
    }
    componentDidMount() {
        this.getauthors().then(response => {
            this.setState({
                authors: response.data,
                exData: response.data,
            })
        })
    }
    updateData = (newData, query) => {
        if (query.length === 0){
            this.setState({
                authors: this.state.exData,
            })
        } else {
            this.setState({
                authors: newData,
            })
        }
    }
    render() {

        return (
            <main className="app-wrapper">
                <Searchbar data={this.state.authors} updateData={this.updateData} />
                <div className="items list">
                    {
                        this.state.authors.map(item => 
                            <div className="item" key={item.id}>
                                <div>Name: {item.name}</div>
                                <div>Phone number: {item.phoneNumber}</div>
                                <div>Address: {item.address}</div>
                            </div>
                        )
                    }
                </div>
            </main>
        )
    }
}

export default PublishingHouses