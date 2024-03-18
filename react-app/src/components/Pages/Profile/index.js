import "./Profile.css";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneProfileThunk } from "../../../store/profiles";
import { setNavVisibility } from "../../../store/navigation";
import ReppNav from "./ReppNav";
import ProductSection from "./ProductSection";
import VideoSection from "./VideoSection";
import Footer from "./Footer";
import Cart from "./Cart";
import LinkSection from "./LinkSection";
import TourSection from "./TourSection";
import { authenticate } from "../../../store/session";

const Profile = ({ previewPage, preview, previewStyle }) => {
  const dispatch = useDispatch();
  const { linkName } = useParams();
  const user = useSelector((state) => state.session.user);
  let profile = useSelector((state) => state.profiles[linkName]);
  if (previewPage) profile = previewPage;
  const navVisible = useSelector((state) => state.visibility.nav);
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [numCartItems, setNumCartItems] = useState(0);
  const [invalidPage, setInvalidPage] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (preview) return setIsMobile(previewStyle);
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
  }, [isMobile, preview, previewStyle]);

  useEffect(async () => {
    dispatch(authenticate());
    if (preview) {
      await setSectionHeaders(
        [
          previewPage?.mainVideo && "WATCH",
          previewPage?.shopSection && "MERCH",
          previewPage?.tourName && "TOUR",
          previewPage?.videoSection && "VIDEOS",
        ].filter((value) => value)
      );
      await setMainImage(previewPage?.mainImage);
      await setIsMobile(previewStyle);
      await setIsLoaded(true);
      return;
    } else {
      dispatch(getOneProfileThunk(linkName))
        .then((profile) => {
          if (!profile) return setInvalidPage(true);
          setSectionHeaders(
            [
              profile.mainVideo && "WATCH",
              profile.shopSection && "MERCH",
              profile.tourName && "TOURS",
              profile.videoSection && "VIDEOS",
            ].filter((value) => value)
          );
          setMainImage(profile.mainImage);
          document.title = profile.displayName;
          dispatch(setNavVisibility(false));
        })
        .then(() => setIsLoaded(true));
      if (window.innerWidth <= 700) setIsMobile(true);
      else setIsMobile(false);
    }
  }, [dispatch, linkName, preview, previewStyle]);

  const scrollToId = (id) => {
    const element = document.getElementById(id.toLowerCase());
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const headerOffset = navVisible ? 159 : 79;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  if (isLoaded) {
    if (!invalidPage)
      return (
        <div className="profile-page">
          <div id={linkName} style={{ height: "100vh", position: "relative" }}>
            <LinkSection
              user={user}
              profile={profile}
              sectionHeaders={sectionHeaders}
              scrollToId={scrollToId}
              mainImage={mainImage}
              isMobile={isMobile}
              preview={preview}
            />
          </div>
          {profile?.mainVideo && (
            <div
              id="watch"
              className={!isMobile ? "profile-page-section" : " "}
              style={{ padding: "0", margin: "0", border: "none" }}
            >
              <iframe
                title="Main Video"
                src={profile?.mainVideo}
                className="repp-main-video"
              />
            </div>
          )}
          {profile?.shopSection && (
            <div id="merch" className="profile-page-section">
              <ProductSection
                profileId={profile?.id}
                setNumCartItems={setNumCartItems}
                preview={preview}
                previewStyle={previewStyle}
                user={user}
              />
            </div>
          )}
          {profile?.tourName && (
            <div id="tours" className="profile-page-section">
              <TourSection
                profileId={profile?.id}
                tourName={profile?.tourName}
                previewStyle={previewStyle}
              />
            </div>
          )}
          {profile?.videoSection && (
            <div id="videos" className="profile-page-section">
              <VideoSection
                profileId={profile?.id}
                previewStyle={previewStyle}
              />
            </div>
          )}
          {profile?.bio && (
            <div id="about" className="flex-col-center">
              <h2>ABOUT</h2>
              <div>{profile?.bio}</div>
            </div>
          )}
          {profile?.newsletter && <Footer />}
          <ReppNav
            sectionHeaders={sectionHeaders}
            scrollToId={scrollToId}
            profile={profile}
            navVisible={navVisible}
            isMobile={isMobile}
            preview={preview}
          />
          {!preview && (
            <Cart
              profileId={profile?.id}
              linkName={linkName}
              numCartItems={numCartItems}
              setNumCartItems={setNumCartItems}
            />
          )}
        </div>
      );
    else
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
  } else
    return (
      <div
        className="page-container"
        style={{ backgroundColor: "black" }}
      ></div>
    );
};

export default Profile;
