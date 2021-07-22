import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Searchbar.css'

class Searchbar extends Component {

    handleInputChange = event => {
        const query = event.target.value.toLowerCase();
        const filteredData = this.props.data.filter(element => {
            if (element.houses) {
                for (let i = 0; i < element.houses.length; i++){
                    if (element.houses[i].toLowerCase().includes(query)) {
                        return true;
                    }
                }
            }
            if (element.authors) {
                for (let i = 0; i < element.authors.length; i++){
                    if (element.authors[i].toLowerCase().includes(query)) {
                        return true;
                    }
                }
            }
            if (element.name) {
                if (element.name.toLowerCase().includes(query)){
                    return true
                }
            }
            if (element.genre) {
                if (element.genre.toLowerCase().includes(query)){
                    return true
                }
            }
            if (element.book) {
                if (element.book.toLowerCase().includes(query)){
                    return true
                }
            }
            if (element.user) {
                if (element.user.toLowerCase().includes(query)){
                    return true
                }
            }
            if (element.number){
                let num = element.number + ""
                console.log(num.includes(query), num, query)
                if (num.includes(query)){
                    return true
                }
            }
            return false
        });
        this.props.updateData(filteredData,query)
    };

    render() {
        return (
            <div className="searchForm">
                <form>
                    <input className="inputForm"
                        placeholder="Search for..."
                        onChange={this.handleInputChange}
                    />
                </form>
            </div>
        );
    }
}

export default withRouter(Searchbar)
