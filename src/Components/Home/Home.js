import React, { Component } from 'react'
import { BrowserRouter as Router,Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import OnlineSupportBot from "../onlineSupportLex/onlineSupport"; 
import ChatWindow from "../ChatModule/chatWindow";

import "./Home.css";
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          toggleStateA: false
        };
    }

    
    render() {
        return (
            <div id="main-container">
                <section id="product-overview"></section>
                <section>
                    <h2 className="cards__section-heading">Welcome to DAL Learning Management System</h2>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="400" height="300" alt="Halifax"></img>
                                    <h4 className="image-centered">What we do</h4>
                                    <h6 className="text-centered"><i>We help the students have a common platform them to
                                     communicate with their peers and also intend to bring our maximum support to our students</i></h6>
                                    <br/>

                                </article>  
                            </MDBCol>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="400" height="300" alt="Halifax"></img>
                                    <h4 className="image-centered">Our Contacts</h4>
                                    <h6 className="text-centered">Email: <i>dallms@dal.ca</i><br/>
                                    <i>PhoneNumber:</i> 1 234 456 778 
                                    <br/><br/>To know more, please register with us as our student</h6>
                                    <br/>
                                </article>  
                            </MDBCol>
                        </MDBRow> 
                        <br></br>
                    </MDBContainer>
                </section>
                <div style = {{bottom: '0px',zIndex: '1', right: '0px', position: 'fixed' }}>  
                </div>
                {/* <div className="jumbotron mt-5">
                    <div className="col-sm-8-mx-auto">
                        <h1 className="text-center">Welcome to Serverless Cloud Plumbing System</h1>
                    </div> */}
            </div>
        )
    }
}

export default withRouter(Home);