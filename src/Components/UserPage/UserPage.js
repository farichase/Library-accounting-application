import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import './UserPage.css'
import * as Yup from 'yup'


class UserPage extends Component {
    
    handleSubmit = (values) => {
        const { oldPassword, newPassword } = values;
        fetch('http://localhost:8080/auth/changePassword', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.props.email,
                oldPassword: oldPassword,
                newPassword: newPassword
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
                        <h2>Change password</h2>
                        <hr/>
                    </div>
                    <div className="title">
                        {this.props.email}
                    </div>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object({
                            oldPassword: Yup.string()
                                .min(2, 'At least 7 characters')
                                .required('required'),
                            newPassword: Yup.string()
                                .min(2, 'At least 7 characters')
                                .required('required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref("newPassword")], "Paswords must match")
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
                                    <p>Old password:</p>
                                    <TextField 
                                        {...formik.getFieldProps('oldPassword')}
                                        name="oldPassword" 
                                        className="myinput" 
                                        type="password" 
                                        error={formik.errors.oldPassword ? true : false}  
                                        />
                                </div>
                                <div className="form-group">
                                    <p>New password:</p>
                                    <TextField 
                                        {...formik.getFieldProps('newPassword')}
                                        name="newPassword" 
                                        className="myinput" 
                                        type="password" 
                                        error={formik.errors.newPassword ? true : false}  
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
                </div>
            </main>
        )
    }
}

export default UserPage