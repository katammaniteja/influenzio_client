import React from "react";
import "./workExperience.css";

export default function WorkExperience() {
  return (
    <div className="container resume">
      <div className="row">
        <div className="col-lg-12 resume-card">
          <div className="resume-card-heading">Work Experience</div>
          <div className="resume-card-body">
            <h5 className="resume-card-title">Shiksha Sopan-IIT Kanpur</h5>
            <p className="resume-card-name">
              Backend Developer Intern(Feb 2022-July 2022)
            </p>
            <p className="resume-card-details">
              Worked as a back-end developer in the core team of Prof H.C Verma
              sir where we built Discussion Forum and NAEST Examination Portal
              which is an annual online competition which assesses and nurtures
              keen observational skills, experimental skills, and analytical
              skills of a student in physics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
