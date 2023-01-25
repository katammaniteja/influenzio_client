import React, { useState } from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
import { userProfile } from "../../utils/API_CALLS";
import { useEffect } from "react";
import EditProfile from "./EditProfile";
import "./about.css";

const About = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const imageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const baseurl = "http://localhost:5000/public/images/";

  const fetchDetails = async () => {
    const data = await userProfile();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div
        className="gradient-custom-2"
        style={{
          backgroundColor: "#9de2ff",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        {loading ? (
          <div class="spinner-border d-flex m-auto text-waring" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div className="about container">
              <div className="top-container d-flex">
                <div style={{ width: "150px", marginLeft: "20px" }}>
                  <MDBCardImage
                    src={
                      userData?.profilePic
                        ? baseurl + userData?.profilePic
                        : imageURL
                    }
                    alt="user-avatar"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#profileModal"
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ width: "150px" }}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="right-top-container">
                  <div className="name">{userData.name}</div>
                  <div>{userData?.location}</div>
                  <div className="email">
                    Email:<span>{userData?.email ? userData.email : "-"}</span>
                  </div>
                  <div className="contact">
                    Phone:
                    <span>{userData?.contact ? userData.contact : "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <EditProfile updateDetails={fetchDetails} />
    </div>
  );
};
export default About;
