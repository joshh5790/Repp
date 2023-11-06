import "./ReppPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRPageThunk } from "../../../store/pages";
import { setNavVisibility } from "../../../store/navigation";
import ReppNav from "./ReppNav";
import ProductSection from "./ProductSection";
import VideoSection from "./VideoSection";
import Footer from "./Footer";
import Cart from "./Cart";

const ReppPage = () => {
  const dispatch = useDispatch();
  const { linkName } = useParams();
  const repp = useSelector((state) => state.pages[linkName]);
  const navVisible = useSelector((state) => state.visibility.nav);
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [numCartItems, setNumCartItems] = useState(0);

  useEffect(() => {
    dispatch(getOneRPageThunk(linkName)).then((reppPage) => {
      setSectionHeaders(
        [
          reppPage.mainVideo && "WATCH",
          reppPage.shopSection && "MERCH",
          reppPage.videoSection && "VIDEOS",
        ].filter((value) => value)
      );
      dispatch(setNavVisibility(false));
    });
  }, [dispatch, linkName]);

  return (
    <div className="repp-page">
      <div id={linkName} style={{ height: "100vh" }}>
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
        <div id="watch" className="repp-page-section">
          <iframe
            title="Main Video"
            src={repp?.mainVideo}
            className="repp-main-video"
          />
        </div>
      )}
      {repp?.shopSection && (
        <div id="merch" className="repp-page-section">
          <ProductSection pageId={repp?.id} />
        </div>
      )}
      {repp?.videoSection && (
        <div id="videos" className="repp-page-section">
          <VideoSection pageId={repp?.id} />
        </div>
      )}
      {repp?.bio && (
        <div id="about">
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
};

export default ReppPage;
