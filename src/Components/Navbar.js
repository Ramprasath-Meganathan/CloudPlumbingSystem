import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { loggedout } from './UserFunctions'

class Navbar extends Component {
    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        // loggedout(localStorage.getItem('user')).then(res => {
        // })
        this.props.history.push('/')
    }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav pull-left">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                </Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav pull-right">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Login
                </Link>
                </li>
                <li className="nav-item">
                    <a href onClick={this.logout.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content md-center"
                    id="navbar1">
                    <ul className="navbar-nav">
                        <li className="navbar-nav">
                            <Link to="/" className="nav-link">
                                Home
                    </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)