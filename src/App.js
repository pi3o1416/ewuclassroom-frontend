import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie'
import axios from 'axios'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {AccountRoutes} from './components/account/AccountRoutes'
import {Login} from './components/account/Login';
import {CreateAccount} from './components/account/CreateAccount'
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer'
import {NotFound} from './components/NotFound'
import {urls, server_urls} from './routes';
import {useJwtToken} from './components/customHooks'

function App() {

    const [refreshToken, setRefreshToken] = useState('')    //JWT refresh token
    const [accessToken, setAccessToken] = useState('')      //JWT access token
    const [loggedIn, setLoggedIn] = useState(false)



    //Initial chech wheather there exist an jwt token in cookie
    useEffect(() => {
        const cookies = new Cookies()
        var rToken = cookies.get('refresh')
        if (rToken) {
            setLoggedIn(true)
        }
        else {
            setLoggedIn(false)
        }
    }, [])

    //Get a new access token every 4 minutes
    useJwtToken(() => {
        const cookies = new Cookies()
        if (loggedIn) {
            const getJwtToken = () => {
                let rToken = cookies.get('refresh')
                axios.post(server_urls.account.refresh, {
                    'refresh': rToken
                })
                    .then(function (response) {
                        const data = response.data
                        cookies.set('refresh', data.refresh, {maxAge: 3600 * 24 * 14, secure: true, })
                        cookies.set('access', data.access, {maxAge: 60 * 3, secure: true, })
                        setRefreshToken(data.refresh)
                        setAccessToken(data.access)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                return setTimeout(getJwtToken, 1000 * 60 * 3)
            }
            var call = setTimeout(getJwtToken)
        }
        else {
            setRefreshToken('')
            setAccessToken('')
            clearInterval(call)
        }
    }, loggedIn)

    return (
        <div>
            <Router>
                <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <Switch>
                    <Route exact path={urls.home}>
                        <h2>Home Page</h2>
                    </Route>

                    <AccountRoutes setLoggedIn={setLoggedIn} loggedIn={loggedIn} />

                    <Route path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div >
    );
}

export default App;
