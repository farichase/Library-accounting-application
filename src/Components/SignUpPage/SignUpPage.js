import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import './SignUpPage.css'
import * as Yup from 'yup'

class SignUpPage extends Component {
    handleSubmit = (values) => {
        const body = values;
        fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => {
            return res.json()
        }).then(res => {
            alert(res.msg)
        })

    }
    render() {
        
        return (
            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>Sign up</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            username: '',
                            phoneNumber: '',
                            address: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('required'),
                            username: Yup.string()
                                .required('required'),
                            phoneNumber: Yup.string()
                                .required('required'),
                            address: Yup.string()
                                .required('required'),
                            password: Yup.string()
                                .min(2, 'At least 7 characters')
                                .required('required'),
                                confirmPassword: Yup.string()
                                .oneOf([Yup.ref("password")], "Paswords must match")
                                .required('required'),
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            this.handleSubmit(values)
                            setSubmitting(true)
                        }}
                    >
                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <p>E-mail:</p>
                                    <TextField
                                        {...formik.getFieldProps('email')} 
                                        className="myinput" 
                                        name="email"
                                        error={formik.errors.email ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Name:</p>
                                    <TextField
                                        {...formik.getFieldProps('username')} 
                                        className="myinput" 
                                        name="username"
                                        error={formik.errors.username ? true : false}
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Phone number:</p>
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
                                <div className="form-group">
                                    <p>Password:</p>
                                    <TextField 
                                        {...formik.getFieldProps('password')}
                                        name="password" 
                                        className="myinput" 
                                        type="password" 
                                        error={formik.errors.password ? true : false}  
                                        />
                                </div>
                                <div className="form-group">
                                    <p>Repeat password:</p>
                                    <TextField 
                                        {...formik.getFieldProps('confirmPassword')}
                                        name="confirmPassword" 
                                        className="myinput" 
                                        type="password" 
                                        error={formik.errors.confirmPassword ? true : false}  
                                        />
                                </div>
                                <button type="submit">Submit</button>

                            </form>
                            )
                        }

                    </Formik>
                    <div className="title">
                        <p>Do have an account? Sign in <Link to="/login">here</Link></p>
                    </div>
                </div>
            </main>
        )
    }
}

export default SignUpPage