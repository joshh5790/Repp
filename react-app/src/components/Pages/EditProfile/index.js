import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
import Tabs from "./EditNavigation/Tabs";
import Headers from "./EditNavigation/Headers";

const EditProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => {
    return Object.values(state.profiles).find(
      (profile) => profile.userId === state.session.user.id
    );
  });
  const [currentTab, setCurrentTab] = useState("General");
  const [narrow, setNarrow] = useState(false);

  // mobile tab is for full screen edit/preview while on narrow
  const [mobileTab, setMobileTab] = useState("edit");
  const [isLoaded, setIsLoaded] = useState(false);
  // previewStyle false is desktop, true is mobile
  const [previewStyle, setPreviewStyle] = useState(true);

  useEffect(async () => {
    document.title = "Edit Profile";
    // retrieve profile of session user
    await dispatch(getSessionProfileThunk()).then(() => {
      setIsLoaded(true);
    });
    // reorganize components if screen is narrow
    if (window.innerWidth <= 900) setNarrow(true);
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

  if (!user || !user.isRepp) history.push("/");

  return (
    <>
      {isLoaded && (
        <div className="manage-profile-content-container">
          {!(narrow && mobileTab === "preview") && (
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          )}
          {(!narrow || (narrow && mobileTab === "edit")) && (
            <div
              className={narrow && mobileTab === "edit" ? "flexgrow" : ""}
              style={{
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#F1F1F1",
              }}
            >
              <Headers
                text="manage"
                narrow={narrow}
                mobileTab={mobileTab}
                setMobileTab={setMobileTab}
              />
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
              <Headers
                text="preview"
                narrow={narrow}
                mobileTab={mobileTab}
                setMobileTab={setMobileTab}
              />
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
