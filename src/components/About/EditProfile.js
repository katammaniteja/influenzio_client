import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userProfile, updateUser } from "../../utils/API_CALLS";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FaceIcon from "@mui/icons-material/Face";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Stack from "@mui/material/Stack";

const EditProfile = ({ updateDetails, id }) => {
  const [updatedData, setUpdatedData] = useState({});
  const [uploadImage, setUploadImage] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchDetails = async () => {
    const data = await userProfile({ id });
    setUpdatedData(data);
  };

  const validate = () => {
    const errors = {};
    const { name, contact, location, designation } = updatedData;
    if (!name) {
      errors.name = "This field is required";
    }
    if (!contact) {
      errors.contact = "This field is required";
    }
    if (!location) {
      errors.location = "This field is required";
    }
    if (!designation) {
      errors.designation = "This field is required";
    }
    return errors;
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleUpdate = async () => {
    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    if (uploadImage !== null) {
      const imageRef = ref(
        storage,
        `profile/${uploadImage.name}+${Date.now()}`
      );
      await uploadBytes(imageRef, uploadImage);
      const url = await getDownloadURL(imageRef);
      const newData = { ...updatedData, profilePic: url };
      const data = await updateUser(newData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        updateDetails();
      }
      return;
    }

    const data = await updateUser(updatedData);
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      updateDetails();
    }
  };

  const imageUpload = (e) => {
    const profilePic = e.target.files[0];
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(profilePic.type)) {
      setUploadImage(profilePic);
    } else {
      toast.error("Invalid Media Format");
      e.target.type = "text";
      e.target.type = "file";
    }
  };

  return (
    <div
      className="modal fade"
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header mb-2">
            <h1 className="modal-title fs-5" id="profileModalLabel">
              Edit Profile
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <AccessibilityIcon sx={{ mr: 1 }} />
            <TextField
              name="name"
              onChange={handleInputs}
              value={updatedData.name}
              variant="outlined"
              size="small"
              type="name"
              label="Name"
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <WorkIcon sx={{ mr: 1 }} />
            <TextField
              name="designation"
              onChange={handleInputs}
              value={updatedData?.designation}
              variant="outlined"
              size="small"
              type="designation"
              label="Designation"
              error={Boolean(errors.designation)}
              helperText={errors.designation}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <PhoneIcon sx={{ mr: 1 }} />
            <TextField
              name="contact"
              onChange={handleInputs}
              value={updatedData?.contact}
              variant="outlined"
              size="small"
              type="contact"
              label="Contact No"
              error={Boolean(errors.contact)}
              helperText={errors.contact}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <TextField
              name="location"
              onChange={handleInputs}
              value={updatedData?.location}
              variant="outlined"
              size="small"
              type="location"
              label="Location"
              error={Boolean(errors.location)}
              helperText={errors.location}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <TwitterIcon sx={{ mr: 1 }} />
            <TextField
              name="twitter"
              onChange={handleInputs}
              value={updatedData?.twitter}
              variant="outlined"
              size="small"
              type="twitter"
              label="Twitter URL"
              error={Boolean(errors.twitter)}
              helperText={errors.twitter}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <LinkedInIcon sx={{ mr: 1 }} />
            <TextField
              name="linkedin"
              onChange={handleInputs}
              value={updatedData.linkedin}
              variant="outlined"
              size="small"
              type="linkedin"
              label="LinkedIn URL"
              error={Boolean(errors.linkedin)}
              helperText={errors.linkedin}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <YouTubeIcon sx={{ mr: 1 }} />
            <TextField
              name="youtube"
              onChange={handleInputs}
              value={updatedData.youtube}
              variant="outlined"
              size="small"
              type="youtube"
              label="Youtube URL"
              error={Boolean(errors.youtube)}
              helperText={errors.youtube}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1, px: 2 }}>
            <FaceIcon sx={{ mr: 1 }} />
            <TextField
              name="email"
              onChange={imageUpload}
              variant="outlined"
              size="small"
              type="file"
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
            />
          </Box>

          <div className="modal-footer mt-2">
            <Stack spacing={1.5} direction="row">
              <Button
                data-bs-dismiss="modal"
                variant="contained"
                onClick={() => fetchDetails()}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
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

export default EditProfile;
