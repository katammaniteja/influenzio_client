import React, { useState } from "react";
import { userProfile } from "../../utils/API_CALLS";
import { useEffect } from "react";
// import EditProfile from "./EditProfile";
import "./about.css";
import Sidebar from "./Sidebar";

const About = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const fetchDetails = async () => {
    const data = await userProfile();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    // <div className="app">
    //   <div
    //     style={{
    //       backgroundImage: "linear-gradient(to right bottom, #159957, #155799)",
    //       paddingTop: "50px",
    //       paddingBottom: "50px",
    //     }}
    //   >
    //     {loading ? (
    //       <div class="spinner-border d-flex m-auto text-waring" role="status">
    //         <span class="visually-hidden">Loading...</span>
    //       </div>
    //     ) : (
    //       <>
    //         {/* <div className="about container">
    //           <div className="top-container d-flex">
    //             <div style={{ width: "150px", marginLeft: "20px" }}>
    //               <MDBCardImage
    //                 src={
    //                   userData?.profilePic
    //                     ? baseurl + userData?.profilePic
    //                     : imageURL
    //                 }
    //                 alt="user-avatar"
    //                 className="mt-4 mb-2 img-thumbnail"
    //                 fluid
    //                 style={{ width: "150px", zIndex: "1" }}
    //               />
    //               <button
    //                 data-bs-toggle="modal"
    //                 data-bs-target="#profileModal"
    //                 type="button"
    //                 className="btn btn-primary btn-sm"
    //                 style={{ width: "150px" }}
    //               >
    //                 Edit Profile
    //               </button>
    //             </div>
    //             <div className="right-top-container">
    //               <div className="name">{userData.name}</div>
    //               <div>{userData?.location}</div>
    //               <div className="email">
    //                 Email:<span>{userData?.email ? userData.email : "-"}</span>
    //               </div>
    //               <div className="contact">
    //                 Phone:
    //                 <span>{userData?.contact ? userData.contact : "-"}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div> */}
    //       </>
    //     )}
    //   </div>
    //   <EditProfile updateDetails={fetchDetails} />
    // </div>
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
            <div className="col-lg-3">
              <div className="app-sidebar">
                <Sidebar userData={userData} fetchDetails={fetchDetails} />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="app-main-content"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default About;
