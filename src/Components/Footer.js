import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter style={{  bottom: '0px', width: '100%'}}  color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Serverless Management System</h5>
            <p>
              Serverless Cloud Application powered by Google Cloud Platform & Amazon Web Services
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Services</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/dataprocessing">Data Processing</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Prediction Service</a>
              </li>
              <li className="list-unstyled">
                <a href="/chatservice">Real Time Chat Conversation</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Online Support Service</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Serverless Management System</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
