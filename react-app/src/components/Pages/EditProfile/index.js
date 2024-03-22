import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getSessionProfileThunk } from "../../../store/profiles";
import EditGeneral from "./EditGeneral";
import EditSocials from "./EditSocials";
import EditProducts from "./EditProducts";
import EditVideos from "./EditVideos";
import More from "./More";
import Profile from "../Profile";
import EditTours from "./EditTours";
import Tabs from "./Tabs";

const EditProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => Object.values(state.profiles)[0]);
  const [currentTab, setCurrentTab] = useState("General");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState("manage");
  const [isLoaded, setIsLoaded] = useState(false);
  // previewStyle false is desktop, true is mobile
  const [previewStyle, setPreviewStyle] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (isMobile && windowWidth > 700) {
        setIsMobile(false);
      } else if (!isMobile && windowWidth <= 700) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(async () => {
    document.title = "REPP";
    await dispatch(getSessionProfileThunk()).then((data) => {
      setIsLoaded(true);
    });
    if (window.innerWidth <= 700) setIsMobile(true);
    else setIsMobile(false);
  }, [dispatch]);

  useEffect(() => {
    if (location.state) setCurrentTab(location.state);
  }, [location.state]);

  if (isLoaded && (!user || !user.isRepp)) {
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
      {isLoaded && (
        <div className="manage-profile-page page-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* add these two to the respective containers instead */}
          </div>
          <div className="manage-profile-content-container">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {(!isMobile || (isMobile && mobileTab === "manage")) && (
              <>
                <h2 className="manage-header manage-nav">Manage Profile</h2>
                <div className="manage-profile-section flex-col">
                  {currentTab === "General" && (
                    <EditGeneral profile={profile} />
                  )}
                  {currentTab === "Socials" && (
                    <EditSocials profile={profile} />
                  )}
                  {currentTab === "Products" && (
                    <EditProducts profile={profile} />
                  )}
                  {currentTab === "Tours" && <EditTours profile={profile} />}
                  {currentTab === "Videos" && <EditVideos profile={profile} />}
                  {currentTab === "+ More" && <More profile={profile} />}
                </div>
              </>
            )}
            {(!isMobile || (isMobile && mobileTab === "preview")) && (
              <>
                <div className="preview-profile-section flex-col-center">
                  <div className="darken-preview-background" />
                  <Profile
                    previewPage={profile}
                    preview={true}
                    previewStyle={previewStyle}
                  />
                </div>
                <h2
                  className="preview-header manage-nav"
                  // onClick={() => setPreviewStyle((prev) => !prev)}
                >
                  {/* <span
                    style={{
                      fontWeight: `${previewStyle ? "normal" : "bold"}`,
                    }}
                  >
                    Desktop
                  </span>
                  &nbsp;|&nbsp; */}
                  <span
                    style={{
                      fontWeight: `${!previewStyle ? "normal" : "bold"}`,
                    }}
                  >
                    Mobile Preview
                  </span>
                </h2>
              </>
            )}
            <div className="switch-header manage-nav">
              {isMobile && mobileTab === "preview" ? (
                <div
                  className="button-hover switch-manage-button"
                  onClick={() => setMobileTab("manage")}
                >
                  Manage
                </div>
              ) : isMobile && mobileTab === "manage" ? (
                <div
                  className="button-hover switch-manage-button"
                  onClick={() => setMobileTab("preview")}
                >
                  Preview
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
