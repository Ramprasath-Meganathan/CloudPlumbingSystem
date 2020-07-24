import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from "@material-ui/icons"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Drawer, Divider} from "@material-ui/core"
import { Navbar, Nav } from "react-bootstrap";
import { loggedout } from '../UserFunctions'
import "./Navbar.css";

function TopNavBar() {

    const [ open, setOpen ] = useState(false);
    console.log(open);
    const handleDrawer = () => {
        setOpen(true);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }

    const useStyles = makeStyles({
        root: {
          background: '#343A40',
          width: "250px",
          position: "fixed"
      },
      dividerColor: {
          background: '#FFFFFF',
          marginLeft: "40px",
          marginRight: "40px",
          height: "1px"
      },
      backArrowClass: {
          marginLeft: "-45px"
      },

      headingStyle: {
          marginTop: "8px",
          marginLeft: "0.2%"
      },

      toolBarHeight: {
          height: "64px"
      }
    }
      );
        const classes = useStyles();

    function logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        loggedout(localStorage.getItem('user')).then(res => {
        })
        this.props.history.push('/')
    }
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
                <a href onClick={logout.bind(this)} className="nav-link">
                    Logout
                </a>
            </li>
        </ul>
    )
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <IconButton onClick={handleDrawer} color="inherit" edge="start" aria-label="menu">
                    <Menu />
                </IconButton>
                <Link to="/">
                    <Navbar.Brand>Dal LMS</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                </Nav>
                <Nav>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </Nav>
            </Navbar>
             <Drawer classes={{ paper: classes.root}}
             anchor="left"
             open={open}
             onClose={() => setOpen(false)} >
             <div className="nav__header">
                 <IconButton classes={{root: classes.backArrowClass }} onClick={handleDrawerClose }  edge="start" aria-label="menu">
                     <ArrowBackIcon />
                 </IconButton>
                 <h5 className="nav__bar-title">Dal LMS</h5>
             </div>
             <div className="nav__main">
                 <ul className="nav__main-items">
                     <li className="nav__main-item">
                         <a href="/login">Login</a>
                     </li>
                     <li className="nav__main-item">
                         <a href="/Register">Register</a>
                     </li>
                     <li className="nav__main-item">
                         <a  href="/dataprocessing">Data Processing</a>
                     </li>
                     <li className="nav__main-item">
                         <Link to="/predictionService">Prediction Service</Link>
                     </li>
                     <li className="nav__main-item">
                         <a href="/chatservice">Real Time Conversation</a>
                     </li>
                 </ul>
             </div>
         </Drawer>
         </div>
            // <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            //     <button className="navbar-toggler"
            //         type="button"
            //         data-toggle="collapse"
            //         data-target="#navbar1"
            //         aria-controls="navbar1"
            //         aria-expanded="false"
            //         aria-label="Toggle navigation">
            //         <span className="navbar-toggle-icon"></span>
            //     </button>
            //     <div className="collapse navbar-collapse justify-content md-center"
            //         id="navbar1">
            //         <ul className="navbar-nav">
            //             <li className="navbar-nav">
            //                 <Link to="/" className="nav-link">
            //                     Home
            //         </Link>
            //             </li>
            //         </ul>

            //     </div>
            // </nav>
        )
}

export default withRouter(TopNavBar)
