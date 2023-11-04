import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.squarespace-cdn.com/content/v1/63eae897c2c95606c0640635/56a21110-9888-4b55-be84-8caf529f9453/Website+Banner+-+HOAH.png",
    "https://images.squarespace-cdn.com/content/v1/637d57dd5eff390eb0e98337/5c9a89cf-68a5-4cd7-8f3f-a28d6207cb69/image00002.jpeg",
  ];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div
      className={`home-page page-container ${'in'}`}
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${images[currentIndex]})` }}
    >
      <i
        onClick={handlePreviousImage}
        className="fa-solid fa-chevron-left home-prev-button"
      />
      <i
        onClick={handleNextImage}
        className="fa-solid fa-chevron-right home-next-button"
      />
      {/* <div
        className={`bg-div ${cycleBg % 2 === 0 ? 'in' : 'out'}`}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg[Math.floor(cycleBg / 2)][0]})` }}>
            <h1 className={`home-page-repp-name ${cycleBg % 2 === 0 ? 'in' : 'out'}`}>
                {bg[Math.floor(cycleBg / 2)][1]}
            </h1>
            <NavLink to={`/${bg[Math.floor(cycleBg / 2)][2]}`} className='home-page-visit-repp'>
                Visit Page {'>'}
            </NavLink>
        </div> */}
    </div>
  );
};

export default HomePage;
