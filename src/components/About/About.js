import React, { useState } from "react";
import { userProfile } from "../../utils/API_CALLS";
import { useEffect } from "react";
import "./about.css";
import Sidebar from "./Sidebar";
import WorkExperience from "./WorkExperience";
import { useParams } from "react-router-dom";
import Conversation from "../Conversation/Conversation";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const OpenChatBox = () => {
    setIsOpen(!isOpen);
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const fetchDetails = async () => {
    const data = await userProfile({ id });
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div style={{ paddingTop: "40vh" }}>
          <div
            className="spinner-border d-flex m-auto text-waring"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="container app-container">
            <div className="row app-row">
              <div className="col-lg-4">
                <div className="app-sidebar">
                  <Sidebar
                    userData={userData}
                    fetchDetails={fetchDetails}
                    OpenChatBox={OpenChatBox}
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
          {id !== sessionStorage.getItem("userid") && (
            <Conversation
              userData={userData}
              name={userData.name}
              OpenChatBox={OpenChatBox}
              isOpen={isOpen}
            />
          )}
        </>
      )}
    </div>
  );
};
export default About;
