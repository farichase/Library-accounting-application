import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar';
import Books from './Components/Books/Books';
import LoginPage from './Components/LoginPage/LoginPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import { Fragment } from 'react';
import MyBooks from './Components/MyBooks/MyBooks';
import Forms from './Components/Forms/Forms';
import UserPage from './Components/UserPage/UserPage';
import AdminPage from './Components/AdminPage/AdminPage';
import AddInf from './Components/AddInf/AddInf';
import Authors from './Components/Authors/Authors';
import PublishingHouses from './Components/PublishingHouses/PublishingHouses';
import Users from './Components/Users/Users';

class App extends Component {

  state = {
    isAuth: false,
    isEmployee: false,
    isAdmin: false,
    email: '',
    username: '',
    books: [],
  }
  getInf = async() => {
    const res = await fetch('http://localhost:8080/auth', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email
      }),
    })
    return await res.json()
  }
  constructor() {
    super()
    const email = localStorage.getItem('email')
    const isAuthStr = localStorage.getItem('isAuth')
    let isAuth = false, isEmployee = false, isAdmin = false
    if (isAuthStr === "true"){
      isAuth = true
    }
    const isAdminStr = localStorage.getItem('isAdmin')
    if (isAdminStr === "true"){
      isAdmin = true
    }
    const isEmployeeStr = localStorage.getItem('isEmployee')
    if (isEmployeeStr === "true"){
      isEmployee = true
    }
    const username = localStorage.getItem('username')
    if (!email && !isAuth && !isAdmin && !isEmployee && !username){
      return
    }
    this.state.isAuth = isAuth
    this.state.isAdmin = isAdmin
    this.state.isEmployee = isEmployee
    this.state.email = email
    this.state.username = username
    console.log(this.state)
  } 
  logging = ({ email, token }) => {
    localStorage.setItem('email', email);
    this.setState({
      isAuth: true,
      email
    })
    this.getInf().then(res => {
      localStorage.setItem('isAuth', true)
      localStorage.setItem('isAdmin', res.isAdmin)
      localStorage.setItem('isEmployee', res.isEmployee)
      localStorage.setItem('username', res.username);
      this.setState({username:  res.username, isAdmin: res.isAdmin, isEmployee: res.isEmployee})
    })
  }
  logOut = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isEmployee')
    this.setState({
      isAdmin: false,
      isAuth: false,
      isEmployee: false
    })
  }
  render() {
    let auth = this.state.isAuth !== true && (
      <Fragment>
        <Route path="/login"> 
          <LoginPage logging={this.logging} />
        </Route>
        <Route path="/signup" component={SignUpPage} />
      </Fragment>
    )

    return (
      <Router>
        <NavBar logOut={this.logOut} username={this.state.username} isAuth={this.state.isAuth} isEmployee={this.state.isEmployee} isAdmin={this.state.isAdmin}/>
        <Switch>
          <Route path="/books">
            <Books isEmployee={this.state.isEmployee}/>
          </Route>
          {this.state.isAuth === true && this.state.isEmployee !== true && (
            <Route path='/myBooks'>
              <MyBooks email={this.state.email}/>
            </Route>
          )}
          {this.state.isAuth === true && (
            <Route path='/userPage'>
              <UserPage email={this.state.email}/>
            </Route>
          )}
          {
            this.state.isEmployee === true && this.state.isAuth === true &&(
              <Route path='/copyForms'>
                <Forms/>
              </Route>
            )
          }
          {
            this.state.isEmployee === true && this.state.isAuth === true &&(
              <Route path='/addInf'>
                <AddInf/>
              </Route>
            )
          }
          {
            this.state.isEmployee === true && this.state.isAuth === true &&(
              <Route path='/authors'>
                <Authors/>
              </Route>
            )
          }
          {
            this.state.isEmployee === true && this.state.isAuth === true &&(
              <Route path='/users'>
                <Users/>
              </Route>
            )
          }
          {
            this.state.isEmployee === true && this.state.isAuth === true &&(
              <Route path='/publishingHouses'>
                <PublishingHouses/>
              </Route>
            )
          }
          {
            this.state.isAdmin === true && this.state.isAuth === true && (
              <Route path='/admin'>
                <AdminPage/>
              </Route>
            )
          }
          {auth}
        </Switch>
      </Router>
    )
  }
}

export default App