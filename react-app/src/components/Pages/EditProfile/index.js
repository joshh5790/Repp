import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("General");

  useEffect(() => {
    if (location.state) setCurrentTab(location.state);
  }, [location.state]);
  return (
    <div className="manage-profile-page page-container">
      <h1 style={{marginBottom: "2rem"}}>Manage Profile</h1>
      <div className="manage-profile-content-container">
        <div className="manage-profile-tabs">
          <span
            className={currentTab === "General" ? "focus-tab" : ' '}
            onClick={() => setCurrentTab("General")}
          >
            General
          </span>
          <span
            className={currentTab === "Socials" ? "focus-tab" : ' '}
            onClick={() => setCurrentTab("Socials")}
          >
            Socials
          </span>
          <span
            className={currentTab === "Products" ? "focus-tab" : ' '}
            onClick={() => setCurrentTab("Products")}
          >
            Products
          </span>
          <span
            className={currentTab === "Videos" ? "focus-tab" : ' '}
            onClick={() => setCurrentTab("Videos")}
          >
            Videos
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
