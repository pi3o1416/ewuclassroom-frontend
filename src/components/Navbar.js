import React from 'react';
import {Link} from 'react-router-dom'
import {urls} from '../routes'
import Cookies from 'universal-cookie'
import logo from '../images/logo1.png'


export function Navbar(props) {

    const setLoggedOut = () => {
        const cookies = new Cookies()
        cookies.remove('refresh')
        cookies.remove('access')
        props.setLoggedIn(false)
    }

    return (
        <div className="navbar box">
            <div className="navbar-brand">
                <Link to={urls.home}>
                    <img src={logo} alt="company logo" />
                </Link>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link"> Categories </p>
                <div className="navbar-dropdown">
                    <p className="navbar-item"> About </p>
                    <p className="navbar-item"> Jobs </p>
                    <p className="navbar-item"> Contact </p>
                    <hr className="navbar-divider" />
                    <p className="navbar-item"> Report an issue </p>
                </div>
            </div>
            <div className="navbar-item">
                <input className="input is-medium is-hovered" type="text" placeholder="What do you want to learn" />
            </div>
            <div className="navbar-end">

                <div className="navbar-item">
                    <div className="buttons">
                        {props.loggedIn ?
                            <p className="button is-primary" onClick={setLoggedOut}><strong>Logout</strong></p>
                            :
                            <Link to={urls.account.login}>
                                <p className="button is-primary"><strong>Login</strong></p>
                            </Link>
                        }
                    </div>
                </div>
                <div className="navbar-item">
                    <div className="buttons">
                        {props.loggedIn ||
                            <Link to={urls.account.createAccount}>
                                <p className="button is-primary"><strong>Join for free</strong></p>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

