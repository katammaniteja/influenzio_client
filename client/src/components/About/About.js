import React, { useState } from "react";
import {
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { userProfile } from "../../utils/API_CALLS";
import { useEffect } from "react";
// import EditProfile from "./EditProfile";
import { ColorRing } from "react-loader-spinner";

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
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        {loading ? (
          <ColorRing height="100" width={100} style={{ margin: "auto" }} />
        ) : (
          <>
            <div className="py-5 h-100">
              <div className="justify-content-center align-items-center row">
                <MDBCol lg="9" xl="7">
                  <MDBCard>
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "250px" }}
                    >
                      <div
                        className="ms-4 d-flex flex-column"
                        style={{ width: "250px" }}
                      >
                        <MDBCardImage
                          src={
                            userData?.profilePic
                              ? baseurl + userData?.profilePic
                              : imageURL
                          }
                          alt="Generic placeholder image"
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

                      <div className="mt-4">
                        <MDBRow className="pt-1">
                          <MDBCol size="10" className="mb-3">
                            <MDBTypography tag="h3">
                              {userData?.name}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol size="10" className="mb-3">
                            <MDBCardText>{userData?.location}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                              {userData?.email}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">
                              {userData?.contact}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            Web Developer
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1">
                            Lives in New York
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0">
                            Photographer
                          </MDBCardText>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <EditProfile updateDetails={fetchDetails} /> */}
    </div>
  );
};
export default About;
