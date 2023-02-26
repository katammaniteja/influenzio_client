import React, { useState } from "react";
import { userProfile } from "../../utils/API_CALLS";
import { useEffect } from "react";
import "./about.css";
import Sidebar from "./Sidebar";
import WorkExperience from "./WorkExperience";
import { useParams } from "react-router-dom";

const About = () => {
  let { id } = useParams();
  if (id === undefined) {
    id = sessionStorage.getItem("userid");
  }

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const fetchDetails = async () => {
    const data = await userProfile({ id });
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div style={{ paddingTop: "40vh" }}>
          <div
            class="spinner-border d-flex m-auto text-waring"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container app-container">
          <div className="row app-row">
            <div className="col-lg-4">
              <div className="app-sidebar">
                <Sidebar
                  userData={userData}
                  fetchDetails={fetchDetails}
                  userid={id}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="app-main-content">
                <WorkExperience />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default About;
