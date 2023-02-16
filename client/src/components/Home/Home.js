import React from "react";
import "./Home.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

function App() {
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h3
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            <h1>The best we offer</h1>
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              <h3>for your business</h3>
            </span>
          </h3>

          <p
            className="px-3"
            style={{ color: "hsl(218, 81%, 85%)", padding: "0px 0px" }}
          >
            At Shoutcart, we connect you with popular influencers to get your
            brand in front of their audience! 750M+ Follower & Subscriber
            network, simple setup, guaranteed & secure process.
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
