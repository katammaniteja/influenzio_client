import React from "react";
import EditProfile from "./EditProfile";
import "./sidebar.css";
import { BsInstagram, BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";

export default function Sidebar({
  userData,
  fetchDetails,
  userid,
  OpenChatBox,
}) {
  const imageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const baseurl = "http://localhost:5000/public/images/";

  console.log(userid);

  return (
    <div>
      <img
        src={userData?.profilePic ? baseurl + userData?.profilePic : imageURL}
        alt="avatar"
        className="sidebar-avatar"
      />
      <div className="sidebar-name">
        Maniteja <span>Katam</span>
      </div>
      <div className="sidebar-item sidebar-title">Software Engineer</div>
      <div className="sidebar-social-handles my-3">
        <div>
          <BsYoutube className="sidebar-icon" />
          <a
            href={`https://www.youtube.com/@${userData?.youtube}`}
            target="_blank"
            rel="noreferrer"
          >
            <div>{userData?.youtube ? "/" + userData.youtube : "-"}</div>
          </a>
        </div>
        <div>
          <BsTwitter className="sidebar-icon" />
          <a
            href={`https://twitter.com/${userData?.twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            <div>{userData?.twitter ? "/" + userData.twitter : "-"}</div>
          </a>
        </div>
        <div>
          <BsLinkedin className="sidebar-icon" />
          <a
            href={`https://www.linkedin.com/in/${userData?.linkedin}`}
            target="_blank"
            rel="noreferrer"
          >
            <div>{userData?.linkedin ? "/" + userData.linkedin : "-"}</div>
          </a>
        </div>
        <div>
          <BsInstagram className="sidebar-icon" />
          <a
            href={`https://www.instagram.com/${userData?.instagram}`}
            target="_blank"
            rel="noreferrer"
          >
            <div>{userData?.instagram ? "/" + userData.instagram : "-"}</div>
          </a>
        </div>
      </div>
      <div className="sidebar-contact">
        <div className="sidebar-location">{userData.location}, India</div>
        <div className="">{userData.email}</div>
        <div className="">+91{userData.contact}</div>
      </div>
      {userid === sessionStorage.getItem("userid") ? (
        <>
          <div
            className="sidebar-item sidebar-email"
            data-bs-toggle="modal"
            data-bs-target="#profileModal"
          >
            Edit Profile
          </div>
          <EditProfile updateDetails={fetchDetails} id={userid} />
        </>
      ) : (
        <div className="sidebar-item sidebar-email" onClick={OpenChatBox}>
          Contact
        </div>
      )}
    </div>
  );
}
