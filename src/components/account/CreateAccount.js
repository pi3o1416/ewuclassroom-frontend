
import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {server_urls, urls} from '../../routes'
import {Form} from '../Form'


export function CreateAccount() {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        retypePassword: '',
        firstName: '',
        lastName: '',
        role: '',
        dateOfBirth: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false) // successfully create a user???


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({...user, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        if (user.password !== user.retypePassword) {
            setError('Passwords did not match')
            return
        }
        if (user.password.length < 8) {
            setError('Password should be atleast 8 character long')
            return
        }
        axios.post(server_urls.account.register, {
            username: user.username,
            email: user.email,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            role: user.role,
            dateOfBirth: user.dateOfBirth,
        })
            .then(function (response) {
                setLoading(false)
                //Successfully created an user now cleanup an redirect
                if (response.status === 201) {
                    setUser({
                        username: '',
                        email: '',
                        password: '',
                        retypePassword: '',
                        firstName: '',
                        lastName: '',
                        role: '',
                        dateOfBirth: '',
                    })
                    setCreated(true)
                }
                //some validation error occur
                else if (response.status === 200) {
                    if(typeof response.data === typeof []){
                        setError(response.data)
                    }
                    else{
                        if(response.data.search('user')){
                            setError('username already exist try different username')
                        }
                        else if (response.data.search('eamil')) {
                            setError('Email already exist')
                        }
                    }
                }
            })
            .catch(function (error) {
                setError(true)
                console.log(error);
            });
    }


    const FORM_FIELDS = [
        {
            label: 'Username',
            htmlFor: 'Username',
            className: 'input is-primary',
            type: 'text',
            name: 'username',
            id: 'username',
            autoComplete: 'off',
            value: user.username,
            onChange: handleChange,
            placeholder: 'Username',
        },
        {
            label: 'Email',
            htmlFor: 'Email',
            className: 'input is-primary',
            type: 'email',
            name: 'email',
            id: 'email',
            autoComplete: 'off',
            value: user.email,
            onChange: handleChange,
            placeholder: 'Email',
        },
        {
            label: 'Password',
            htmlFor: 'Password',
            className: 'input is-primary',
            type: 'password',
            name: 'password',
            id: 'password',
            autoComplete: 'off',
            value: user.password,
            onChange: handleChange,
            placeholder: 'password',
        },
        {
            label: 'Retype Password',
            htmlFor: 'retypePassword',
            className: 'input is-primary',
            type: 'password',
            name: 'retypePassword',
            id: 'retypePassword',
            autoComplete: 'off',
            value: user.retypePassword,
            onChange: handleChange,
            placeholder: 'Retype password',
        },
        {
            label: 'First Name',
            htmlFor: 'firstName',
            className: 'input is-primary',
            type: 'text',
            name: 'firstName',
            id: 'firstName',
            autoComplete: 'off',
            value: user.firstName,
            onChange: handleChange,
            placeholder: 'First Name',
        },
        {
            label: 'Last Name',
            htmlFor: 'lastName',
            className: 'input is-primary',
            type: 'text',
            name: 'lastName',
            id: 'lastName',
            autoComplete: 'off',
            value: user.lastName,
            onChange: handleChange,
            placeholder: 'Last Name',
        },
        {
            label: 'Role',
            type: 'radio',
            className: 'radio is-primary',
            name: 'role',
            id: ['Student', 'Teacher'],
            value: ['student', 'teacher'],
            onChange: handleChange,
        },
        {
            label: 'Date of Birth',
            className: 'input is-primary',
            type: 'date',
            name: 'dateOfBirth',
            id: 'dateOfBirth',
            autoComplete: 'off',
            value: user.dateOfBirth,
            onChange: handleChange,
            placeholder: 'Date of Birth',
        },
    ]





    return (
        <div className="container is-flex is-justify-content-center" >
            <Form onSubmit={handleSubmit} formFields={FORM_FIELDS} error={error} loading={loading} />
            {/*Redirect to login page if successfully create an account*/}
            {created && <Redirect from={urls.account.createAccount} to={urls.account.login} />}
        </div>
    )
}
