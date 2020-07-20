import React, { Component } from 'react'
import '../App.css';

class Footer extends Component
{
render()
{
    return(
<nav className="navbar fixed-bottom navbar-light bg-light rowCenter">
<div className="row">
  <a className="navbar-brand d-flex justify-content-center" href="#" style={footerStyle}>Copyright 2020 All rights reserved</a>
  <a href="/notfound" className="navbar-primary d-flex justify-content-center" style={footerStyle}>Contact us </a>
  <span className="px-1"/>
  <a href="/Feedback" className="navbar-primary d-flex justify-content-center" style={footerStyle}>Feedback</a>
  </div>
</nav>
    );
}
}

const footerStyle ={
    'font-size':'14px',

};

export default Footer