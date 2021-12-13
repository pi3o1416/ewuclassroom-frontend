
import React, {useState} from 'react';
import axios from 'axios'
import {Form} from '../Form'
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'
import {server_urls, urls} from '../../routes'
export function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(server_urls.account.login, {
            username: username,
            password: password,
        })
            .then(function (response) {
                setLoading(false)
                const data = response.data;
                cookies.set('refresh', data.refresh, {maxAge: 3600 * 24 * 14, secure: true, })
                cookies.set('access', data.access, {maxAge: 60 * 4, secure: true, })
                props.setLoggedIn(true)
                setUsername('')
                setPassword('')
            })
            .catch(function (error) {
                setError(true)
                console.log(error);
            });
    }

    const handleUsernameChange = (e) => {
        let value = e.target.value;
        setUsername(value)
    }

    const handlePasswordChange = (e) => {
        let value = e.target.value;
        setPassword(value);
    }

    const FORM_FIELDS = [
        {
            label: 'Username',
            className: 'input is-primary',
            type: 'text',
            name: 'username',
            id: 'username',
            autoComplete: 'off',
            value: username,
            onChange: handleUsernameChange,
            placeholder: 'Username'
        },
        {
            label: 'Password',
            htmlFor: 'Password',
            className: 'input is-primary',
            type: 'password',
            name: 'password',
            id: 'password',
            autoComplete: 'off',
            value: password,
            onChange: handlePasswordChange,
            placeholder: 'password'
        }

    ]

    return (
        <div className="container is-flex is-justify-content-center">
            <Form onSubmit={handleSubmit} formFields={FORM_FIELDS} error={error} loading={loading} />
            {/* Redirect if Logged in true*/}
            {props.loggedIn && <Redirect from={server_urls.account.login} to={urls.home} />}
            <p>Hello world</p>
        </div>
    )
}
