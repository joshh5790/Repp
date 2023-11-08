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


      const threshold = window.innerHeight - 80; // nav bar becomes black at the bottom of home element

      setScrollTop(scrollPosition <= threshold);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id.toLowerCase());
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const headerOffset = navVisible ? 127 : 79;
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
        {repp?.tiktok && (
          <a target="_blank" rel="noreferrer" href={repp.tiktok}>
            <i className="fa-brands fa-tiktok repp-socials" />
          </a>
        )}
        {repp?.youtube && (
          <a target="_blank" rel="noreferrer" href={repp.youtube}>
            <i className="fa-brands fa-youtube repp-socials" style={{color: "white"}}/>
          </a>
        )}
            {repp?.instagram && (
              <a target="_blank" rel="noreferrer" href={repp.instagram}>
                <i className="fa-brands fa-instagram repp-socials" style={{color: "white"}} />
              </a>
            )}
            {repp?.applemusic && (
              <a target="_blank" rel="noreferrer" href={repp.applemusic}>
                <i className="fa-brands fa-apple repp-socials" />
              </a>
            )}
        {repp?.spotify && (
          <a target="_blank" rel="noreferrer" href={repp.spotify}>
            <i className="fa-brands fa-spotify repp-socials" style={{color: "white"}} />
          </a>
        )}
        {repp?.facebook && (
          <a target="_blank" rel="noreferrer" href={repp.facebook}>
            <i className="fa-brands fa-facebook repp-socials" style={{color: "white"}} />
          </a>
        )}
        {repp?.discord && (
          <a target="_blank" rel="noreferrer" href={repp.discord}>
            <i className="fa-brands fa-discord repp-socials" style={{color: "white"}} />
          </a>
        )}
        {repp?.twitter && (
          <a target="_blank" rel="noreferrer" href={repp.twitter}>
            <i className="fa-brands fa-twitter repp-socials" style={{color: "white"}} />
          </a>
        )}
        {repp?.external && (
          <a target="_blank" rel="noreferrer" href={repp.external}>
            <i className="fa-solid fa-square-up-right repp-socials" />
          </a>
        )}
        <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
      </div>
    </div>
  );
};

export default ReppNav;
