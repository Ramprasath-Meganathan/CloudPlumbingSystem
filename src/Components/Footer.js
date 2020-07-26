import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter style={{ left: '0', bottom: '0', right: '0'}} color="black" className="font-small pt-4 mt-4">
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
                Data Processing
              </li>
              <li className="list-unstyled">
                Prediction Service
              </li>
              <li className="list-unstyled">
                Real Time Chat Conversation
              </li>
              <li className="list-unstyled">
                Online Support Service
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
