import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfilesHomeThunk } from "../../../store/profiles";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import SignupForm from "../../Modals/SignupForm";
import "./Home.css";
import { invalidImage } from "../../../utilities";
import { setNavVisibility } from "../../../store/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const profiles = useSelector((state) => Object.values(state.profiles));

  useEffect(() => {
    document.title = "REPP";
    dispatch(getProfilesHomeThunk()).then(() => {
      dispatch(setNavVisibility(true));
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleNextImage = () => {
    setImageIndex((prevIndex) => {
      return prevIndex === profiles.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePreviousImage = () => {
    setImageIndex((prevIndex) => {
      return prevIndex === 0 ? profiles.length - 1 : prevIndex - 1;
    });
  };
  if (isLoaded) {
    return (
      <>
        <div className="home-page">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
              }}
            >
              {profiles.map((profile) => (
                <img
                  alt=""
                  key={profile?.mainImage}
                  src={profile?.mainImage}
                  className="img-slider-img"
                  style={{ translate: `${-100 * imageIndex}%` }}
                  onError={invalidImage}
                />
              ))}
            </div>
          </div>
          <button
            className="img-slider-btn btn-left"
            onClick={handlePreviousImage}
            style={{ left: "0" }}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            className="img-slider-btn btn-right"
            onClick={handleNextImage}
            style={{ right: "0" }}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
          <div className="home-page-text">
            <h1 className="no-top">{profiles[imageIndex]?.displayName}</h1>
            <NavLink to={`/${profiles[imageIndex]?.linkName}`}>
              Visit Page {">"}
            </NavLink>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: ".5rem",
              left: "50%",
              translate: "-50%",
              display: "flex",
              gap: "1rem",
            }}
          >
            {profiles.map((_, index) => (
              <button
                key={index}
                className="img-slider-dot-btn"
                onClick={() => setImageIndex(index)}
              >
                {index === imageIndex ? (
                  <i className="fa-solid fa-circle" />
                ) : (
                  <i className="fa-regular fa-circle" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-col home-page-create-profile">
          <h1>Design Your Online Home</h1>
          <p style={{ margin: "1rem 0 2rem 0", lineHeight: "1.5rem" }}>
            Your free personal website alternative.
            <br />
            Made in minutes, tailored to you.
          </p>
          <OpenModalButton
            buttonText={"Get Started"}
            className={"button-hover get-started"}
            modalComponent={<SignupForm />}
          />
        </div>
      </>
    );
  } else
    return (
      <div
        className="page-container"
        style={{ backgroundColor: "black" }}
      ></div>
    );
};

export default Home;
