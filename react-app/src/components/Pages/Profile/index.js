import "./Profile.css";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRPageThunk } from "../../../store/pages";
import { setNavVisibility } from "../../../store/navigation";
import ReppNav from "./ReppNav";
import ProductSection from "./ProductSection";
import VideoSection from "./VideoSection";
import Footer from "./Footer";
import Cart from "./Cart";

const Profile = () => {
  const dispatch = useDispatch();
  const { linkName } = useParams();
  const repp = useSelector((state) => state.pages[linkName]);
  const navVisible = useSelector((state) => state.visibility.nav);
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [numCartItems, setNumCartItems] = useState(0);
  const [invalidPage, setInvalidPage] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneRPageThunk(linkName))
      .then((profile) => {
        if (!profile) return setInvalidPage(true);
        setSectionHeaders(
          [
            profile.mainVideo && "WATCH",
            profile.shopSection && "MERCH",
            profile.videoSection && "VIDEOS",
          ].filter((value) => value)
        );
        setMainImage(profile.mainImage);
        dispatch(setNavVisibility(false));
      })
      .then(() => setIsLoaded(true));
  }, [dispatch, linkName]);

  if (isLoaded) {
    if (!invalidPage)
      return (
        <div className="repp-page">
          <div id={linkName} style={{ height: "100vh" }}>
            <img
              className="repp-page-home-img"
              src={mainImage}
              alt={repp?.displayName}
              onError={({ target }) => {
                target.onerror = null;
                target.src =
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}
            />
            <div className="repp-home-text">
              <h1>{repp?.displayName}</h1>
            </div>
          </div>
          {repp?.mainVideo && (
            <div id="watch" className="repp-page-section" style={{padding: '0', margin: '0', border: 'none'}}>
              <iframe
                title="Main Video"
                src={repp?.mainVideo}
                className="repp-main-video"
              />
            </div>
          )}
          {repp?.shopSection && (
            <div id="merch" className="repp-page-section">
              <ProductSection
                pageId={repp?.id}
                setNumCartItems={setNumCartItems}
              />
            </div>
          )}
          {repp?.videoSection && (
            <div id="videos" className="repp-page-section">
              <VideoSection pageId={repp?.id} />
            </div>
          )}
          {repp?.bio && (
            <div id="about" className="flex-col-center">
              <h2>ABOUT</h2>
              <div>{repp?.bio}</div>
            </div>
          )}
          {repp?.newsletter && <Footer />}
          <ReppNav
            sectionHeaders={sectionHeaders}
            repp={repp}
            navVisible={navVisible}
          />
          <Cart
            pageId={repp?.id}
            numCartItems={numCartItems}
            setNumCartItems={setNumCartItems}
          />
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
          <NavLink to="/">
            Click here to return to the home page.
          </NavLink>
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
