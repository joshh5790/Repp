import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRPagesHomeThunk } from "../../../store/pages";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const repps = useSelector((state) => Object.values(state.pages));

  useEffect(() => {
    dispatch(getRPagesHomeThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleNextImage = () => {
    setImageIndex((prevIndex) => {
      return prevIndex === repps.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePreviousImage = () => {
    setImageIndex((prevIndex) => {
      return prevIndex === 0 ? repps.length - 1 : prevIndex - 1;
    });
  };
  if (isLoaded) {
    return (
      <div className="home-page page-container">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {repps.map((repp) => (
              <img
                alt=""
                key={repp?.mainImage}
                src={repp?.mainImage}
                className="img-slider-img"
                style={{ translate: `${-100 * imageIndex}%` }}
                onError={({ target }) => {
                  target.onerror = null;
                  target.src =
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
                }}
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
          <h1>{repps[imageIndex]?.displayName}</h1>
          <NavLink to={`/${repps[imageIndex]?.linkName}`}>
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
          {repps.map((_, index) => (
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