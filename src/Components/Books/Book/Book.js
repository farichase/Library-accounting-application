import React, { Component } from 'react'
import './Book.css'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import * as Yup from 'yup'


class Book extends Component {
    state = {
        forms: [],
        deleteFormId: ""
    }
    getForms = async () => {
        const res = await fetch('http://localhost:8080/books/forms', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.bookId,
            }),
        })
        if (!res.ok) {
            throw Error('Could not get all forms')
        }
        return await res.json()
    }
    componentDidMount() {
        this.getForms().then(forms => {
            this.setState({forms: forms.data})
        })
    }
    addForm = () => {
        fetch('http://localhost:8080/books/forms/addForm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.bookId,
            })
        }).then(res => {
            return res.json()
        }).then (res => {
            this.setState({
                forms: res.data
            })
            this.componentDidMount()
        })
    }
    deleteForm = (value) => {
        fetch('http://localhost:8080/books/forms/deleteForm', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: value.formNumber,
                bookId: this.props.bookId,
            })
        }).then(res => {
            return res.json()
        }).then (res => {
            this.setState({
                forms: res.data
            })
            this.componentDidMount()
        })
    }
    addBookToReader = (values) => {
        const{email, formNumber} = values
        fetch('http://localhost:8080/books/forms/addBookToReader', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: formNumber,
                email: email,
                bookId: this.props.bookId
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            alert(res.msg)
            this.componentDidMount()
        })
    }
    addCopyOfBook = () => {
        fetch('http://localhost:8080/books/forms/addCopyOfBook', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.bookId
            })
        }).then(res => {
            console.log("Button works")
            this.props.updateBooks()
        })
    }
    render() {
        return (
            <div className="book">
                
                <div className="content">
                    <div className="title">Name: {this.props.name}</div>
                    <div className="title">Authors: {
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
                    {
                        this.props.isEmployee === true && (
                            <div className="title">Quantity in stock: {this.props.quantityInStock}</div>
                        )
                    }
                    {
                        this.props.isEmployee === true && (
                            <div className="bt">
                                <button className="button" onClick={this.addCopyOfBook}>Add a copy of the book</button>   
                            </div>                     
                        )
                    }

                </div>
                {
                    this.props.isEmployee === true && (
                        <div className="block animated">
                            <div className="title">
                                <div>Add a book to the reader</div>
                                <hr />
                            </div>
                            <Formik
                                initialValues={{
                                    email: '',
                                    formNumber: '',
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .email('Invalid email address')
                                        .required('required'),
                                    formNumber: Yup.string()
                                        .required('required'),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    this.addBookToReader(values)
                                    setSubmitting(true)
                                }}
                            >
                                {formik => (
                                    <form className="form" onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <p>Reader e-mail:</p>
                                            <TextField
                                                {...formik.getFieldProps('email')}
                                                className="myinput"
                                                name="email"
                                                error={formik.errors.email ? true : false}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <p>Form number:</p>
                                            <TextField
                                                {...formik.getFieldProps('formNumber')}
                                                name="formNumber"
                                                className="myinput"
                                                error={formik.errors.formNumber ? true : false}
                                            />
                                        </div>
                                        <button className="but" type="submit">Add</button>

                                    </form>
                                )
                                }

                            </Formik>
                        </div>

                    )
                }
                {
                    this.props.isEmployee === true && (
                        <div className="block animated">
                            <div className="title">
                                <div>Book forms:</div>
                                <hr />
                            </div>
                            <button className="but" onClick={this.addForm}>Add new form</button> 
                            <div className="list">
                                {
                                    
                                    this.state.forms.map(item => {
                                        return (
                                            <li className="oneForm"key={item.id}>
                                                <div>{item.number}</div>
                                            </li>
                                        )
                                    })
                                }    
                            </div>
                            <Formik
                                initialValues={{
                                    formNumber: '',
                                }}
                                validationSchema={Yup.object({
                                    formNumber: Yup.string()
                                        .required('required')
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    this.deleteForm(values)
                                    setSubmitting(true)
                                }}
                            >
                                {formik => (
                                    <form className="form" onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <p>Form number:</p>
                                            <TextField
                                                {...formik.getFieldProps('formNumber')}
                                                name="formNumber"
                                                className="myinput"
                                                error={formik.errors.formNumber ? true : false}
                                            />
                                        </div>
                                        <button className="but" type="submit">Delete</button>

                                    </form>
                                )
                                }

                            </Formik>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Book
