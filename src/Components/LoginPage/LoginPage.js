import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import * as Yup from 'yup'


class LoginPage extends Component {
    
    handleSubmit = (values) => {
        const { email, password } = values;
        
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) =>{
            if (response.ok){
                return response.json()
            }
        }).then(res => {
            if (res.msg){
                alert(res.msg)
            } else this.props.logging(res);
        })
    }
    render() {
        
        return (

            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>Sign in</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .min(2, 'At least 7 characters')
                                .required('required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('required')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
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
                                    <p>Password:</p>
                                    <TextField 
                                        {...formik.getFieldProps('password')}
                                        name="password" 
                                        className="myinput" 
                                        type="password" 
                                        error={formik.errors.password ? true : false}  
                                        />
                                </div>
                                <button type="submit">Submit</button>

                            </form>
                            )
                        }

                    </Formik>
                    <div className="title">
                        <p>Don't have an account? Create it <Link to="/register">here</Link></p>
                    </div>
                </div>
            </main>
        )
    }
}

export default LoginPage