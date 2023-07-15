import React, { useState } from "react";
import { addWorkExperience } from "../../utils/API_CALLS";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddExperience = () => {
  const [errors, setErrors] = useState({});
  const [experience, setExperience] = useState({
    start_date: "",
    end_date: "",
  });
  const [workingStatus, setWorkingStatus] = useState(false);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // alert("hiii");
    setExperience({ ...experience, [name]: value });
  };

  const addExperience = async () => {
    const data = await addWorkExperience(experience);
    setExperience({});
    // document.querySelector(".form").reset();
    if (data?.error) {
      toast.error(data.error);
    } else {
      window.location.reload(false);
    }
  };

  const handleWorkingStatus = () => {
    setWorkingStatus(!workingStatus);
    setExperience({ ...experience, end_year: "", end_month: "- -" });
  };

  return (
    <div
      className="modal fade"
      id="workExperienceModal"
      tabIndex="-1"
      aria-labelledby="workExperienceModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header mb-2">
            <h1 className="modal-title fs-5" id="workExperienceModalLabel">
              Add Experience
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <TextField
              name="company"
              onChange={handleInputs}
              variant="outlined"
              size="small"
              type="text"
              label="Company/Organization"
              error={Boolean(errors.company)}
              helperText={errors.company}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <TextField
              name="role"
              onChange={handleInputs}
              variant="outlined"
              size="small"
              type="text"
              label="Role"
              error={Boolean(errors.role)}
              helperText={errors.role}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="I am currently working in this role"
              onChange={handleWorkingStatus}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label={"Start Date"}
                  views={["month", "year"]}
                  name="start_date"
                  onChange={(value) => {
                    setExperience({ ...experience, start_date: value["$d"] });
                  }}
                />
                <DatePicker
                  label={"End Date"}
                  views={["month", "year"]}
                  name="end_date"
                  // onChange={handleInputs}
                  disabled={workingStatus}
                  onChange={(value) => {
                    setExperience({ ...experience, end_date: value["$d"] });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <TextField
              name="description"
              onChange={handleInputs}
              variant="outlined"
              size="small"
              type="text"
              label="Description"
              error={Boolean(errors.description)}
              helperText={errors.description}
              fullWidth
              multiline
              rows={5}
            />
          </Box>

          <div className="modal-footer mt-2">
            <Stack spacing={1.5} direction="row">
              <Button
                data-bs-dismiss="modal"
                variant="contained"
                id="closeModal"
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={addExperience}
                color="success"
              >
                Save Changes
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
