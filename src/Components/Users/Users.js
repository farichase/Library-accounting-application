import React, { Component } from 'react'
import './Users.css'
import Searchbar from '../Searchbar/Searchbar';


class Users extends Component {
    state = {
        exData: [],
        users: []
    }

    getusers = async () => {
        const res = await fetch('http://localhost:8080/employee/users/')
        if (!res.ok) {
            throw Error('Could not get all users')
        }
        return await res.json()
    }
    componentDidMount() {
        this.getusers().then(response => {
            this.setState({
                users: response.data,
                exData: response.data,
            })
        })
    }
    updateData = (newData, query) => {
        if (query.length === 0){
            this.setState({
                users: this.state.exData,
            })
        } else {
            this.setState({
                users: newData,
            })
        }
    }
    render() {

        return (
            <main className="app-wrapper">
                <Searchbar data={this.state.users} updateData={this.updateData} />
                <div className="items list">
                    {
                        this.state.users.map(item => 
                            <div className="item" key={item.id}>
                                <div>E-mail: {item.email}</div>
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

export default Users