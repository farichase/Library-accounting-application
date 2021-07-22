import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import './AddInf.css'
import * as Yup from 'yup'


class AddInf extends Component {
    
    addAuthor = (values) => {
        const { name, phoneNumber, address } = values;
        console.log(values)
        fetch('http://localhost:8080/employee/addAuthor', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, phoneNumber: phoneNumber, address: address
            }),
        }).then((response) =>{
            if (response.ok){
                return response.json()
            } 
        }).then(res => {
            alert(res.msg)
        })
    }
    addPublishingHouse = (values) => {
        const { name, phoneNumber, address } = values;
        fetch('http://localhost:8080/employee/addPublishingHouse', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, phoneNumber: phoneNumber, address: address
            }),
        }).then((response) =>{
            if (response.ok){
                return response.json()
            } 
        }).then(res => {
            alert(res.msg)
        })
    }
    addBook = (values) => {
        const { name, genre, author, house } = values; 
        console.log(name, genre, author, house)
        let arrayOfAuthors = []
        if (author.indexOf(',') === -1) arrayOfAuthors.push(author)
        else arrayOfAuthors = author.split(',')
        console.log(arrayOfAuthors)
        fetch('http://localhost:8080/employee/addBook', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, genre: genre, authors: arrayOfAuthors, house: house
            }),
        }).then((response) =>{
            if (response.ok){
                return response.json()
            } 
        }).then(res => {
            alert(res.msg)
        })
    }
    render() {
        
        return (

            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>Add author</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            phoneNumber: '',
                            address: ""
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(2, 'Invalid name')
                                .required('required'),
                            phoneNumber: Yup.string()
                                .required('required'),   
                            address: Yup.string()
                                .required('required'), 
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.addAuthor(values)
                            setSubmitting(true)
                        }}
                    >
                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <p>Name:</p>
                                    <TextField
                                        {...formik.getFieldProps('name')} 
                                        className="myinput" 
                                        name="name"
                                        error={formik.errors.name ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>PhoneNumber:</p>
                                    <TextField
                                        {...formik.getFieldProps('phoneNumber')} 
                                        className="myinput" 
                                        name="phoneNumber"
                                        error={formik.errors.phoneNumber ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Address:</p>
                                    <TextField
                                        {...formik.getFieldProps('address')} 
                                        className="myinput" 
                                        name="address"
                                        error={formik.errors.address ? true : false}
                                        />
                                </div>
                                <button type="submit">Add</button>

                            </form>
                            )
                        }

                    </Formik>
                    <div className="title">
                        <h2>Add publishing house</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            phoneNumber: '',
                            address: ""
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(2, 'Invalid name')
                                .required('required'),
                            phoneNumber: Yup.string()
                                .required('required'),   
                            address: Yup.string()
                                .required('required'), 
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.addPublishingHouse(values)
                            setSubmitting(true)
                        }}
                    >
                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <p>Name:</p>
                                    <TextField
                                        {...formik.getFieldProps('name')} 
                                        className="myinput" 
                                        name="name"
                                        error={formik.errors.name ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>PhoneNumber:</p>
                                    <TextField
                                        {...formik.getFieldProps('phoneNumber')} 
                                        className="myinput" 
                                        name="phoneNumber"
                                        error={formik.errors.phoneNumber ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Address:</p>
                                    <TextField
                                        {...formik.getFieldProps('address')} 
                                        className="myinput" 
                                        name="address"
                                        error={formik.errors.address ? true : false}
                                        />
                                </div>
                                <button type="submit">Add</button>

                            </form>
                            )
                        }

                    </Formik>
                    <div className="title">
                        <h2>Add book</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            genre: '',
                            author: '',
                            house: ''
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(2, 'Invalid name')
                                .required('required'),
                            genre: Yup.string()
                                .required('required'),
                            author: Yup.string()
                                .required('required'),  
                            house: Yup.string()
                                .required('required'),     
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            this.addBook(values)
                            setSubmitting(true)
                        }}
                    >
                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <p>Name:</p>
                                    <TextField
                                        {...formik.getFieldProps('name')} 
                                        className="myinput" 
                                        name="name"
                                        error={formik.errors.name ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Genre:</p>
                                    <TextField
                                        {...formik.getFieldProps('genre')} 
                                        className="myinput" 
                                        name="genre"
                                        error={formik.errors.genre ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Author:</p>
                                    <TextField
                                        {...formik.getFieldProps('author')} 
                                        className="myinput" 
                                        name="author"
                                        error={formik.errors.author ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Publishing house:</p>
                                    <TextField
                                        {...formik.getFieldProps('house')} 
                                        className="myinput" 
                                        name="house"
                                        error={formik.errors.house ? true : false}
                                        />
                                </div>
                                <button type="submit">Add</button>

                            </form>
                            )
                        }

                    </Formik>
                </div>
            </main>
        )
    }
}

export default AddInf