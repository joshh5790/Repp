import { useState, useEffect } from "react";
import { setNavVisibility } from "../../../store/navigation";
import { useDispatch } from "react-redux";
import "./ReppNav.css";

const ReppNav = ({ sectionHeaders, repp, navVisible }) => {
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState(true);

  const setNavVisible = () => {
    dispatch(setNavVisibility(!navVisible));
  };

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      const threshold = 30; // 30 pixels from the top

      setScrollTop(scrollPosition <= threshold);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  const scrollToId = (id) => {
    const element = document.getElementById(id.toLowerCase());
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const headerOffset = navVisible ? 150 : 100;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`repp-nav ${scrollTop ? "" : "black-nav"} ${
        navVisible ? "lower-nav" : ""
      }`}
    >
      <div className="repp-nav-left">
        <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
        <h2 onClick={() => scrollToId(repp.linkName)}>{repp?.displayName}</h2>
      </div>
      <div className="repp-nav-links">
        {sectionHeaders.map((header) => (
          <div onClick={() => scrollToId(header)} key={header}>
            {header}
          </div>
        ))}
      </div>
      <div className="repp-nav-right">
        {repp?.spotify && (
          <a target="_blank" href={repp.spotify}>
            <i className="fa-brands fa-spotify repp-socials" />
          </a>
        )}
        {repp?.tiktok && (
          <a target="_blank" href={repp.tiktok}>
            <i className="fa-brands fa-tiktok repp-socials" />
          </a>
        )}
        {repp?.youtube && (
          <a target="_blank" href={repp.youtube}>
            <i className="fa-brands fa-youtube repp-socials" />
          </a>
        )}
        {repp?.instagram && (
          <a target="_blank" href={repp.instagram}>
            <i className="fa-brands fa-instagram repp-socials" />
          </a>
        )}
        {repp?.applemusic && (
          <a target="_blank" href={repp.applemusic}>
            <i className="fa-solid fa-music repp-socials" />
          </a>
        )}
        {repp?.twitter && (
          <a target="_blank" href={repp.twitter}>
            <i className="fa-brands fa-twitter repp-socials" />
          </a>
        )}
        {repp?.external && (
          <a target="_blank" href={repp.external}>
            <i className="fa-solid fa-square-up-right repp-socials" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ReppNav;
