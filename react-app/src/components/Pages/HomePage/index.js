import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRPagesHomeThunk } from "../../../store/pages";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const repps = useSelector((state) => Object.values(state.pages));

  useEffect(() => {
    dispatch(getRPagesHomeThunk());
  }, [dispatch]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      console.log(repps.length, prevIndex + 1)
      return prevIndex === repps.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? repps.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div
      className={`home-page page-container ${"in"}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${repps[currentIndex]?.mainImage})`,
      }}
    >
      <i
        onClick={handlePreviousImage}
        className="fa-solid fa-chevron-left home-prev-button"
      />
      <i
        onClick={handleNextImage}
        className="fa-solid fa-chevron-right home-next-button"
      />
      <div className="home-page-text">
        <h1>{repps[currentIndex]?.displayName}</h1>
        <NavLink to={`/${repps[currentIndex]?.linkName}`}>
          Visit Page {'>'}
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
