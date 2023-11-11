import { useState, useEffect } from "react";
import { setNavVisibility } from "../../../store/navigation";
import { useDispatch } from "react-redux";
import "./ReppNav.css";

const ReppNav = ({ sectionHeaders, page, navVisible }) => {
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState(true);

  const setNavVisible = () => {
    dispatch(setNavVisibility(!navVisible));
  };

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;


      const threshold = window.innerHeight - 85; // nav bar becomes black at the bottom of home element

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
        <h2 onClick={() => scrollToId(page.linkName)}>{page?.displayName}</h2>
      </div>
      <div className="repp-nav-links">
        {sectionHeaders.map((header) => (
          <div onClick={() => scrollToId(header)} key={header}>
            {header}
          </div>
        ))}
      </div>
      <div className="repp-nav-right">
        {page?.tiktok && (
          <a target="_blank" rel="noreferrer" href={page.tiktok}>
            <i className="fa-brands fa-tiktok repp-socials" />
          </a>
        )}
        {page?.youtube && (
          <a target="_blank" rel="noreferrer" href={page.youtube}>
            <i className="fa-brands fa-youtube repp-socials" style={{color: "white"}}/>
          </a>
        )}
            {page?.instagram && (
              <a target="_blank" rel="noreferrer" href={page.instagram}>
                <i className="fa-brands fa-instagram repp-socials" style={{color: "white"}} />
              </a>
            )}
            {page?.applemusic && (
              <a target="_blank" rel="noreferrer" href={page.applemusic}>
                <i className="fa-brands fa-apple repp-socials" />
              </a>
            )}
        {page?.spotify && (
          <a target="_blank" rel="noreferrer" href={page.spotify}>
            <i className="fa-brands fa-spotify repp-socials" style={{color: "white"}} />
          </a>
        )}
        {page?.facebook && (
          <a target="_blank" rel="noreferrer" href={page.facebook}>
            <i className="fa-brands fa-facebook repp-socials" style={{color: "white"}} />
          </a>
        )}
        {page?.discord && (
          <a target="_blank" rel="noreferrer" href={page.discord}>
            <i className="fa-brands fa-discord repp-socials" style={{color: "white"}} />
          </a>
        )}
        {page?.twitter && (
          <a target="_blank" rel="noreferrer" href={page.twitter}>
            <i className="fa-brands fa-twitter repp-socials" style={{color: "white"}} />
          </a>
        )}
        {page?.external && (
          <a target="_blank" rel="noreferrer" href={page.external}>
            <i className="fa-solid fa-square-up-right repp-socials" />
          </a>
        )}
        <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
      </div>
    </div>
  );
};

export default ReppNav;
