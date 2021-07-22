import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import logo from '../logo.png'
import './NavBar.css'
class Navbar extends Component {
    state = {
        responsive: false
    }

    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    render() {
        let { username, isAuth, isEmployee, isAdmin } = this.props
        const MyLink = ({ to, label }) => {
            return (
                <NavLink
                    exact={to === '/' ? true : false}
                    to={to} activeClassName="selected"
                >{label}</NavLink>
            )
        }

        return (

            <div className={['topnav', this.state.responsive ? 'responsive' : ''].join(' ')}>
                <NavLink className="logo" to="/books" activeClassName="selected">
                    <img src={logo} height="90" width="270" alt="logo" />
                </NavLink>

                <div className="links" ref={this.ref}>

                    <MyLink to="/books" label="Books" />
                    {
                        (isAuth === true && isEmployee !== true) && (
                            <MyLink to={'/myBooks'} label="My books" />
                        )
                    }
                    {
                        (isEmployee === true && isAuth === true) && (
                            <Fragment>
                                <MyLink to="copyForms" label="Copy forms"/>
                                <MyLink to="addInf" label="Add information"/>
                                <MyLink to="authors" label="Authors"/>
                                <MyLink to="users" label="Users"/>
                                <MyLink to="publishingHouses" label="Publishing houses"/>
                            </Fragment>
                        )
                    }
                    {
                        (isAuth !== true) && (
                            <Fragment>
                                <MyLink to="/login" label="Log In" />
                                <MyLink to="/signup" label="Sign Up" />
                            </Fragment>
                        )
                    }
                    {
                        (isAdmin === true && isAuth === true) &&(
                            <Fragment>
                                <MyLink to="/admin" label="Admin page"></MyLink>
                            </Fragment>
                        )
                    }
                    {
                        isAuth === true && (
                            <Fragment>
                                <MyLink to="/userPage" label={username}></MyLink>
                                <a href="s" style={{cursor: 'pointer'}}
                                onClick={this.props.logOut}>Log out</a>
                            </Fragment>
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar)
