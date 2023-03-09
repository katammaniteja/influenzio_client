import React from "react";
import "./workExperience.css";
import { AiFillPlusCircle } from "react-icons/ai";
import AddExperience from "./AddExperience";
import { MdDelete } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { deleteWorkExperience } from "../../utils/API_CALLS";

export default function WorkExperience({ work_experience }) {
  const deleteExperience = async (id) => {
    console.log(id);
    await deleteWorkExperience({ id });
  };

  return (
    <div className="container resume">
      <div className="row">
        <div className="col-lg-12 resume-card">
          <div>
            <div className="resume-card-heading">Work Experience</div>
            <div
              className="badge text-bg-success btn"
              data-bs-toggle="modal"
              data-bs-target="#workExperienceModal"
            >
              <AiFillPlusCircle /> Add New
            </div>
          </div>
          {work_experience.map((data) => {
            return (
              <div className="resume-card-body">
                <h5 className="resume-card-title">
                  <div>{data.company}</div>
                  <div>
                    <span onClick={() => deleteExperience(data._id)}>
                      <MdDelete />
                    </span>{" "}
                    <BsPencil />
                  </div>
                </h5>
                <p className="resume-card-name">
                  {data.role}(Feb 2022-July 2022)
                </p>
                <p className="resume-card-details">{data.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <!-- Modal --> */}
      <AddExperience />
    </div>
  );
}
