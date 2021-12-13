import React from 'react'
import {Route} from 'react-router-dom'
import {urls} from '../../routes'
import {Login} from './Login'
import {CreateAccount} from './CreateAccount'

export function AccountRoutes(props) {
    //Account Routes
    return (
        <React.Fragment>
            <Route path={urls.account.login}>
                <Login setLoggedIn={props.setLoggedIn} loggedIn={props.loggedIn} />
            </Route>
            <Route path={urls.account.createAccount}>
                <CreateAccount />
            </Route>
        </React.Fragment>
    )
}
