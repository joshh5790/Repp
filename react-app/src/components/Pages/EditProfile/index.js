import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getSessionPageThunk } from "../../../store/pages";
import General from "./General";
import Socials from "./Socials";

const EditProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const page = useSelector(state => Object.values(state.pages)[0])
  const [currentTab, setCurrentTab] = useState("General");

  useEffect(() => {
    dispatch(getSessionPageThunk())
  }, [dispatch])

  useEffect(() => {
    if (location.state) setCurrentTab(location.state);
  }, [location.state]);

  if (!user || !user.isRepp) {
    return (
      <div className="unavailable page-container">
        <h1>Sorry, this page isn't available.</h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <NavLink to="/">Click here to return to the home page.</NavLink>
      </div>
    );
  }

  return (
    <div className="manage-profile-page page-container">
      <h1 style={{ marginBottom: "2rem" }}>Manage Profile</h1>
      <div className="manage-profile-content-container">
        <div className="manage-profile-tabs">
          <span
            className={currentTab === "General" ? "focus-tab" : " "}
            onClick={() => setCurrentTab("General")}
          >
            General
          </span>
          <span
            className={currentTab === "Socials" ? "focus-tab" : " "}
            onClick={() => setCurrentTab("Socials")}
          >
            Socials
          </span>
          <span
            className={currentTab === "Products" ? "focus-tab" : " "}
            onClick={() => setCurrentTab("Products")}
          >
            Products
          </span>
          <span
            className={currentTab === "Videos" ? "focus-tab" : " "}
            onClick={() => setCurrentTab("Videos")}
          >
            Videos
          </span>
        </div>
        <div className="manage-profile-section">
          {currentTab === "General" && <General page={page} />}
          {currentTab === "Socials" && <Socials page={page} />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
