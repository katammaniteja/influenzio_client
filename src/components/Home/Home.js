import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";

function App() {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        className="p-4 background-radial-gradient overflow-hidden container-fluid home"
        style={{ height: screenHeight - 110.2 }}
      >
        <div>
          <h3
            className=" display-3 fw-bold ls-tight"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              <h3 className="text-center" style={{ fontSize: 50 }}>
                Hire Best Influencers
              </h3>
            </span>
          </h3>

          <p
            // className="px-3"
            style={{ color: "#ffffff", padding: "0px 0px" }}
          >
            At Influenzio, we connect you with popular influencers to run the
            compaigns, or marketing for your company
          </p>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="hello"
          >
            <a href="/influencers" class="btn-browse-influencers">
              Browse Influencers
            </a>
          </div>
        </div>
      </div>
      <div className="footer" style={{ height: 55, paddingTop: 15 }}>
        <div className="text-center">
          <span style={{ color: "grey" }}>Designed and Developed by</span>{" "}
          Maniteja
        </div>
      </div>
    </>
  );
}

export default App;
