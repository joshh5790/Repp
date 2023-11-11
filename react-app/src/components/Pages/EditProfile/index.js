import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getSessionPageThunk } from "../../../store/pages";
import EditGeneral from "./EditGeneral";
import EditSocials from "./EditSocials";
import EditProducts from "./EditProducts";
import EditVideos from "./EditVideos";
import ProfilePreview from "./ProfilePreview";

const EditProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const page = useSelector(state => Object.values(state.pages)[0])
  const [currentTab, setCurrentTab] = useState("General");
  const [height, setHeight] = useState(0)
  const heightRef = useRef()

  useEffect(() => {
    dispatch(getSessionPageThunk())
    setHeight(heightRef.current.clientHeight)
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
    <>

    <div className="manage-profile-page page-container">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>



        {/* add these two to the respective containers instead */}
      </div>
      <div className="manage-profile-content-container">
        <div className="manage-profile-tabs">
          <span
            className={currentTab === "General" ? "focus-tab" : " "}
            onClick={async () => {
              await setCurrentTab("General")
              await setHeight(heightRef.current.clientHeight)
            }}
          >
            General
          </span>
          <span
            className={currentTab === "Socials" ? "focus-tab" : " "}
            onClick={async () => {
              await setCurrentTab("Socials")
              await setHeight(heightRef.current.clientHeight)
            }}
          >
            Socials
          </span>
          <span
            className={currentTab === "Products" ? "focus-tab" : " "}
            onClick={async () => {
              await setCurrentTab("Products")
              await setHeight(heightRef.current.clientHeight)
            }}
          >
            Products
          </span>
          <span
            className={currentTab === "Videos" ? "focus-tab" : " "}
            onClick={async () => {
              await setCurrentTab("Videos")
              await setHeight(heightRef.current.clientHeight)
            }}
          >
            Videos
          </span>
        </div>
        <div className="manage-profile-section flex-col-center" ref={heightRef}>
        <h1 className="manage-profile-section-header">Manage Profile</h1>
          {currentTab === "General" && <EditGeneral page={page} />}
          {currentTab === "Socials" && <EditSocials page={page} />}
          {currentTab === "Products" && <EditProducts page={page} />}
          {currentTab === "Videos" && <EditVideos page={page} />}
        </div>
        <div className="preview-profile-section flex-col-center" style={{height}}>
        <h1 className="manage-profile-section-header">Preview</h1>
        <ProfilePreview page={page} />
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
