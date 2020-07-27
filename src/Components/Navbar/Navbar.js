import React, { useState} from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Menu } from "@material-ui/icons"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Drawer, Divider} from "@material-ui/core"
import { Navbar, Nav } from "react-bootstrap";
import { loggedout } from '../UserFunctions'
import "./Navbar.css";

function TopNavBar() {

    let history = useHistory();
    const userLoggedIn = localStorage.getItem('usertoken')

    const [ open, setOpen ] = useState(false);
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
        loggedout(localStorage.getItem('user')).then(res => {
            localStorage.removeItem('usertoken')
        })
        localStorage.removeItem('usertoken');
        history.push("/")

       
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
                <a href onClick={logout.bind(this)} className="nav-link">
                    Logout
                </a>
            </li>
        </ul>
    )

    const sideBarDrawer  = (
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
                    <Link to="/dataprocessing">Data Processing</Link>
                </li>
                <li className="nav__main-item">
                    <Link to="/predictionService">Prediction Service</Link>
                </li>
                <li className="nav__main-item">
                    <Link to="/chatservice">Real Time Conversation</Link>
                </li>
            </ul>
        </div>
        </Drawer>
    )
    return (
        <div>
            <Navbar bg="dark" variant="dark">
            {   localStorage.usertoken ? (
                <IconButton onClick={handleDrawer} color="inherit" edge="start" aria-label="menu">
                    <Menu />
                </IconButton> ) : null }
                {userLoggedIn? 
                    <Link to="/landing">
                    <Navbar.Brand>Dal LMS</Navbar.Brand>
                </Link>:
                <Link to="/">
                    <Navbar.Brand>Dal LMS</Navbar.Brand>
                </Link>    
                }          
                <Nav className="mr-auto">
               { userLoggedIn
                ?
                     <Link to="/landing" className="nav-link">Home</Link>:
                <Link to="/" className="nav-link">Home</Link>}
                </Nav>
                <Nav>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </Nav>
            </Navbar>
            {localStorage.usertoken ? sideBarDrawer : null }
         
         </div>
        )
}

export default withRouter(TopNavBar)
