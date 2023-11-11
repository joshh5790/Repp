import { useState, useEffect, useRef } from "react";
import ProductSection from "../Profile/ProductSection";
import VideoSection from "../Profile/VideoSection";
import Footer from "../Profile/Footer";
import ReppNav from "../Profile/ReppNav";
import "./ProfilePreview.css";

const ProfilePreview = ({ page }) => {
  const [scale, setScale] = useState(0);
  const widthRef = useRef();

  useEffect(async () => {
    await setScale(widthRef.current.clientWidth / window.innerWidth);
  });

  const [sectionHeaders, setSectionHeaders] = useState([]);
  return (
    <div
      ref={widthRef}
      className="profile-preview"
      style={{
        transform: `scale(1)`,
        // transform: `scale(${scale})`,
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
      <div id={page?.linkName}>
        <img
          className="repp-page-home-img"
          src={page?.mainImage}
          // style={{
          //   position: "relative",
          //   aspectRatio: `${window.innerWidth} / ${window.innerHeight}`,
          // }}
          alt={page?.displayName}
          onError={({ target }) => {
            target.onerror = null;
            target.src =
              "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
          }}
        />
        <div className="repp-home-text">
          <h1>{page?.displayName}</h1>
        </div>
      </div>
      {page?.mainVideo && (
        <div
          id="watch"
          className="repp-page-section"
          style={{ padding: "0", margin: "0", border: "none" }}
        >
          <iframe
            title="Main Video"
            src={page?.mainVideo}
            className="repp-main-video"
          />
        </div>
      )}
      {page?.shopSection && (
        <div id="merch" className="repp-page-section">
          <ProductSection pageId={page?.id} />
        </div>
      )}
      {page?.videoSection && (
        <div id="videos" className="repp-page-section">
          <VideoSection pageId={page?.id} />
        </div>
      )}
      {page?.bio && (
        <div id="about" className="flex-col-center">
          <h2>ABOUT</h2>
          <div>{page?.bio}</div>
        </div>
      )}
      {page?.newsletter && <Footer />}
      <ReppNav sectionHeaders={sectionHeaders} page={page} />
    </div>
  );
};

export default ProfilePreview;
