import "./ReppPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRPageThunk } from "../../../store/pages";
import { getProductsThunk } from "../../../store/products";
import { setNavVisibility } from "../../../store/navigation";
import ReppNav from "./ReppNav";
import Products from "./Products";

const ReppPage = () => {
  const dispatch = useDispatch();
  const { linkName } = useParams();
  const repp = useSelector((state) => state.pages[linkName]);
  const products = useSelector((state) => Object.values(state.products));
  const navVisible = useSelector((state) => state.visibility.nav);
  const [sectionHeaders, setSectionHeaders] = useState([]);

  useEffect(() => {
    dispatch(getOneRPageThunk(linkName)).then((reppPage) => {
      setSectionHeaders(
        [
          reppPage.mainVideo && "WATCH",
          reppPage.shopSection && "MERCH",
          reppPage.videoSection && "VIDEOS",
          reppPage.bio && "ABOUT",
        ].filter((value) => value)
      );
      dispatch(setNavVisibility(false));
    });
  }, [dispatch]);

  return (
    <div className="repp-page">
      <div id={linkName} className="home-section repp-page-section">
        <img
          className="repp-page-home-img"
          src={repp?.mainImage}
          alt={repp?.displayName}
        />
        <div className="home-page-text">
          <h1>{repp?.displayName}</h1>
        </div>
      </div>
      {repp?.mainVideo && (
        <div id="watch" className="main-video-section repp-page-section">
          <iframe
            src={repp?.mainVideo}
            className="repp-main-video"
            scrolling="no"
            frameborder="0"
            allowfullscreen=""
          ></iframe>
        </div>
      )}
      {repp?.shopSection && (
        <div id="merch" className="shop-section repp-page-section">
          <Products pageId={repp?.id} />
        </div>
      )}
      {repp?.videoSection && (
        <div id="videos" className="video-section repp-page-section"></div>
      )}
      {repp?.bio && (
        <div id="about" className="bio-section repp-page-section">
          <h2>ABOUT</h2>
          <div>{repp?.bio}</div>
        </div>
      )}
      {repp?.newsletter && <div className="newsletter"></div>}
      <ReppNav
        sectionHeaders={sectionHeaders}
        repp={repp}
        navVisible={navVisible}
      />
    </div>
  );
};

export default ReppPage;
