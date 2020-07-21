import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import OnlineSupportBot from "../onlineSupportLex/onlineSupport"; 

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
                    <h2 className="cards__section-heading">Our Services</h2>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="300" height="300" alt="Halifax"></img>
                                    <h4 className="image-centered">Online Support Service</h4>
                                </article>  
                            </MDBCol>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="300" height="300" alt="Halifax"></img>
                                    <h4 className="image-centered">Data Processing Service</h4>
                                </article>  
                            </MDBCol>
                        </MDBRow>
                        <br></br>
                        <MDBRow>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="300" height="300"alt="Halifax"></img>
                                    <h4 className="image-centered">Real Time Chat Service</h4>
                                </article>  
                            </MDBCol>
                            <MDBCol md="6">
                                <article className="image-container">
                                    <img style={{ borderRadius: '8px' }} src={require("../../assets/card-image.jpg")} width="300" height="300" alt="Halifax"></img>
                                    <h4 className="image-centered">Machine Learning Service</h4>
                                </article>  
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
                <div style = {{bottom: '0px',zIndex: '1', right: '0px', position: 'fixed' }}>
                    <OnlineSupportBot />
                </div>
                {/* <div className="jumbotron mt-5">
                    <div className="col-sm-8-mx-auto">
                        <h1 className="text-center">Welcome to Serverless Cloud Plumbing System</h1>
                    </div> */}
            </div>
        )
    }
}

export default Home;