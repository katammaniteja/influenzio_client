import React from "react";
import EditProfile from "./EditProfile";
import "./sidebar.css";
import { BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";

export default function Sidebar({ userData, fetchDetails, OpenChatBox }) {
  return (
    <div>
      <img src={userData.profilePic} alt="avatar" className="sidebar-avatar" />
      <div className="sidebar-name">
        Maniteja <span>Katam</span>
      </div>
      <div className="sidebar-item sidebar-title">{userData?.designation}</div>
      <div className="sidebar-social-handles my-3">
        <div>
          <BsYoutube className="sidebar-icon" />
          <a href={userData?.youtube} target="_blank" rel="noreferrer">
            <div>
              {userData?.youtube
                ? "/" + userData.youtube.split("/").slice(-1)[0]
                : "-"}
            </div>
          </a>
        </div>
        <div>
          <BsTwitter className="sidebar-icon" />
          <a href={userData?.twitter} target="_blank" rel="noreferrer">
            <div>
              {userData?.twitter
                ? "/" + userData.twitter.split("/").slice(-1)[0]
                : "-"}
            </div>
          </a>
        </div>
        <div>
          <BsLinkedin className="sidebar-icon" />
          <a href={userData?.linkedin} target="_blank" rel="noreferrer">
            <div>
              {userData?.linkedin
                ? "/" + userData.linkedin.split("/").slice(-1)[0]
                : "-"}
            </div>
          </a>
        </div>
      </div>
      <div className="sidebar-contact">
        <div className="sidebar-location">{userData.location}, India</div>
        <div className="">{userData.email}</div>
        <div className="">+91{userData.contact}</div>
      </div>
      {userData._id === sessionStorage.getItem("userid") ? (
        <>
          <div
            className="sidebar-item sidebar-email"
            data-bs-toggle="modal"
            data-bs-target="#profileModal"
          >
            Edit Profile
          </div>
          <EditProfile updateDetails={fetchDetails} id={userData._id} />
        </>
      ) : (
        <div className="sidebar-item sidebar-email" onClick={OpenChatBox}>
          Contact
        </div>
      )}
    </div>
  );
}
