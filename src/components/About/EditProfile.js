import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userProfile, updateUser } from "../../utils/API_CALLS";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./editProfile.css";

const EditProfile = ({ updateDetails, id }) => {
  const [updatedData, setUpdatedData] = useState({});
  const [uploadImage, setUploadImage] = useState(null);

  const fetchDetails = async () => {
    const data = await userProfile({ id });
    setUpdatedData(data);
  };

  const validate = () => {
    const { email, name, contact, location } = updatedData;
    if (!email || !name || !contact || !location) return false;
    return true;
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
  };

  const handleUpdate = async () => {
    if (!validate()) {
      toast.error("All fields are required");
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
          <div className="modal-header">
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
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInputs}
                  value={updatedData?.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact No*
                </label>
                <input
                  name="contact"
                  type="text"
                  className="form-control"
                  id="contact"
                  onChange={handleInputs}
                  value={updatedData?.contact}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Place*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  onChange={handleInputs}
                  value={updatedData?.location}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="twitter" className="form-label">
                  Twitter*
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="twitter"
                  name="twitter"
                  onChange={handleInputs}
                  value={updatedData?.twitter}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="linkedin" className="form-label">
                  LinkedIn*
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  onChange={handleInputs}
                  value={updatedData?.linkedin}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="youtube" className="form-label">
                  Youtube*
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="youtube"
                  name="youtube"
                  onChange={handleInputs}
                  value={updatedData?.youtube}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  onChange={imageUpload}
                  name="profilePic"
                />
                <label className="input-group-text" htmlFor="photo">
                  Upload
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => fetchDetails()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
