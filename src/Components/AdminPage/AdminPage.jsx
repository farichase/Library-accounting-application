import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import './AdminPage.css'
import * as Yup from 'yup'


class AdminPage extends Component {
    
    makeUserEmployee = (values) => {
        const { email } = values;
        fetch('http://localhost:8080/admin/makeUserEmployee', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email
            }),
        }).then((response) =>{
            if (response.ok){
                return response.json()
            } 
        }).then(res => {
            alert(res.msg)
        })
    }
    makeEmployeeUser = (values) => {
        const { email } = values;
        fetch('http://localhost:8080/admin/makeEmployeeUser', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email
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
                        <h2>Make a user an employee</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('required')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.makeUserEmployee(values)
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
                                <button type="submit">Make</button>

                            </form>
                            )
                        }

                    </Formik>
                    <div className="title">
                        <h2>Make a employee an user</h2>
                        <hr/>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('required')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.makeEmployeeUser(values)
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
                                <button type="submit">Make</button>

                            </form>
                            )
                        }

                    </Formik>
                </div>
            </main>
        )
    }
}

export default AdminPage