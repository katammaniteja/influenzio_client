import React, { useState } from "react";
import { addWorkExperience } from "../../utils/API_CALLS";
import { toast } from "react-toastify";

const AddExperience = () => {
  const [experience, setExperience] = useState({
    start_month: "- -",
    end_month: "- -",
    start_year: "- -",
    end_year: "",
  });
  const [workingStatus, setWorkingStatus] = useState(false);
  const months = [
    "- -",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExperience({ ...experience, [name]: value });
  };

  const addExperience = async () => {
    const data = await addWorkExperience(experience);
    setExperience({});
    document.querySelector(".form").reset();
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
  };

  const handleWorkingStatus = () => {
    setWorkingStatus(!workingStatus);
    setExperience({ ...experience, end_year: "", end_month: "- -" });
  };

  return (
    <div>
      <div
        class="modal fade"
        id="workExperienceModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Work Experience
              </h1>
            </div>
            <div class="modal-body">
              <form className="form">
                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Company/Organization*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    onChange={handleInputs}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    onChange={handleInputs}
                  />
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={handleWorkingStatus}
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    I am currently working in this role
                  </label>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <label htmlFor="start_month" className="form-label">
                      Start Month*
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="start_month"
                      value={experience.start_month}
                      name="start_month"
                      onChange={handleInputs}
                    >
                      {months.map((month) => {
                        return <option value={month}>{month}</option>;
                      })}
                    </select>
                  </div>
                  <div style={{ width: "49%" }}>
                    <label htmlFor="start_year" className="form-label">
                      Start Year*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="start_year"
                      name="start_year"
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <label htmlFor="end_month" className="form-label">
                      End Month*
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="end_month"
                      disabled={workingStatus}
                      value={experience.end_month}
                      name="end_month"
                      onChange={handleInputs}
                    >
                      {months.map((month) => {
                        return <option value={month}>{month}</option>;
                      })}
                    </select>
                  </div>
                  <div style={{ width: "49%" }}>
                    <label htmlFor="end_year" className="form-label">
                      End Year*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="end_year"
                      name="end_year"
                      onChange={handleInputs}
                      disabled={workingStatus}
                      value={experience.end_year}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description*
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleInputs}
                    rows={4}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={addExperience}
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
