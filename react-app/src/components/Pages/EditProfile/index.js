import { useState, useEffect } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => Object.values(state.profiles)[0]);
  const [currentTab, setCurrentTab] = useState("General");
  const [narrow, setNarrow] = useState(false);
  const [mobileTab, setMobileTab] = useState("manage");
  const [isLoaded, setIsLoaded] = useState(false);
  // previewStyle false is desktop, true is mobile
  const [previewStyle, setPreviewStyle] = useState(true);

  useEffect(async () => {
    document.title = "REPP";
    await dispatch(getSessionProfileThunk()).then((data) => {
      setIsLoaded(true);
    });
    if (window.innerWidth <= 700) setNarrow(true);
    else setNarrow(false);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      windowWidth > 900 ? setNarrow(false) : setNarrow(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state) setCurrentTab(location.state);
  }, [location.state]);

  if (isLoaded && (!user || !user.isRepp)) {
    history.push("/");
  }

  return (
    <>
      {isLoaded && (
        <div className="manage-profile-content-container">
          {!(narrow && mobileTab === "preview") && (
            <Tabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              mobileTab={mobileTab}
              setMobileTab={setMobileTab}
              narrow={narrow}
            />
          )}
          {(!narrow || (narrow && mobileTab === "manage")) && (
            <div className="flex-col" style={{ height: "100vh" }}>
              <h2 className="manage-nav" style={{ marginTop: "5.2rem" }}>
                Manage Profile
              </h2>
              <div className="manage-profile-section flex-col">
                {currentTab === "General" && <EditGeneral profile={profile} />}
                {currentTab === "Socials" && <EditSocials profile={profile} />}
                {currentTab === "Products" && (
                  <EditProducts profile={profile} />
                )}
                {currentTab === "Tours" && <EditTours profile={profile} />}
                {currentTab === "Videos" && <EditVideos profile={profile} />}
                {currentTab === "+ More" && <More profile={profile} />}
              </div>
            </div>
          )}
          {(!narrow || (narrow && mobileTab === "preview")) && (
            <div style={{ flexGrow: "1", overflow: "hidden", height: "100vh" }}>
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
              <div className="preview-profile-section flex-col-center">
                <div className="darken-preview-background" />
                <Profile
                  previewPage={profile}
                  preview={true}
                  previewStyle={previewStyle}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditProfile;
