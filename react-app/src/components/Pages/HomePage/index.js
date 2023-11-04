import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i1.sndcdn.com/avatars-r559nwVkf8e18rUZ-vNUSGg-t500x500.jpg",
    "https://images.genius.com/e9a779c23099a34081cdd35250f273cc.539x539x1.jpg",
    "https://thehiddenhits.files.wordpress.com/2021/01/tiffany-day-the-hidden-hits.jpg",
  ];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => {
      console.log(currentIndex);
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <div
      className="home-page page-container"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <button className="home-prev-button" onClick={handlePreviousImage}>
        Previous Image
      </button>
      <button className="home-next-button" onClick={handleNextImage}>
        Next Image
      </button>
    </div>
  );
};

export default HomePage;
