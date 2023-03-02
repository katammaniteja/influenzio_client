import React, { useEffect, useState } from "react";
import "./index.css";
import { getInfluencers } from "../../utils/API_CALLS";

const Influencers = () => {
  const [loading, setLoading] = useState(true);
  const [influencers, setInfluencers] = useState();
  const [searchVal, setSearchVal] = useState("");

  const fetchInfluencers = async () => {
    const data = await getInfluencers();
    setInfluencers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const handleFilter = (influencers) => {
    if (searchVal === "") return influencers;
    return influencers.filter((influencer) => {
      if (influencer.name.toLowerCase().includes(searchVal.toLowerCase()))
        return true;
      if (
        influencer?.location &&
        influencer.location.toLowerCase().includes(searchVal.toLowerCase())
      )
        return true;
      return false;
    });
  };

  return (
    <div className="container mt-2">
      <div className="Search">
        <h2 className="title">Buy shoutouts from social media influencers</h2>
        <p className="sub-title">
          Browse social media influencers by category, followers and price
        </p>

        <div className="search-wrap">
          <input
            type="text"
            id="search_keywords"
            placeholder="Search influencers by keyword"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-responsive mt-4 text-nowrap">
        {!loading ? (
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Account</th>
                <th scope="col">Job</th>
                <th scope="col">Followers</th>
                <th scope="col">Location</th>
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {handleFilter(influencers)?.map((influencer) => {
                return (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={influencer.profilePic}
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{influencer.name}</p>
                          <p className="text-muted mb-0">{influencer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Software engineer</p>
                      <p className="text-muted mb-0">IT department</p>
                    </td>
                    <td>
                      {influencer.social_handles?.map((handle) => {
                        return (
                          <>
                            <span style={{ whiteSpace: "nowrap" }}>
                              {handle.name} - {handle.followers}
                            </span>
                            <br />
                          </>
                        );
                      })}
                    </td>
                    <td>{influencer?.location ? influencer.location : "-"}</td>
                    <td>
                      <a href={`/profile/${influencer._id}`}>View</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
            className="spinner-border d-flex m-auto text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Influencers;
