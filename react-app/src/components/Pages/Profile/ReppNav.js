import { useState, useEffect } from "react";
import { setNavVisibility } from "../../../store/navigation";
import { useDispatch } from "react-redux";
import "./ReppNav.css";

const ReppNav = ({
  sectionHeaders,
  scrollToId,
  page,
  navVisible,
  isMobile,
  preview,
}) => {
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState(true);

  const setNavVisible = () => {
    if (!preview) dispatch(setNavVisibility(!navVisible));
  };

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      setScrollTop(scrollPosition <= 150);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navVisible]);

  return (
    <div
      style={{ position: `${preview && "absolute"}`, top: "0" }}
      className={`repp-nav ${scrollTop ? "" : "black-nav"} ${
        navVisible ? "lower-nav" : ""
      }`}
    >
      <div className="repp-nav-left">
        {!isMobile ? (
          <>
            <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
            <h2 onClick={() => scrollToId(page?.linkName)}>
              {page?.displayName}
            </h2>
          </>
        ) : (
          <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
        )}
      </div>
      <div className="repp-nav-links">
        {!isMobile ? (
          <>
            {sectionHeaders.map((header) => (
              <div onClick={() => scrollToId(header)} key={header}>
                {header}
              </div>
            ))}
          </>
        ) : (
          <h2 onClick={() => scrollToId(page?.linkName)}>
            {page?.displayName}
          </h2>
        )}
      </div>
      <div className="repp-nav-right">
        {!isMobile && (
          <>
            {page?.tiktok && (
              <a target="_blank" rel="noreferrer" href={page?.tiktok}>
                <i className="fa-brands fa-tiktok repp-socials" />
              </a>
            )}
            {page?.youtube && (
              <a target="_blank" rel="noreferrer" href={page?.youtube}>
                <i
                  className="fa-brands fa-youtube repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.instagram && (
              <a target="_blank" rel="noreferrer" href={page?.instagram}>
                <i
                  className="fa-brands fa-instagram repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.applemusic && (
              <a target="_blank" rel="noreferrer" href={page?.applemusic}>
                <i className="fa-brands fa-apple repp-socials" />
              </a>
            )}
            {page?.spotify && (
              <a target="_blank" rel="noreferrer" href={page?.spotify}>
                <i
                  className="fa-brands fa-spotify repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.facebook && (
              <a target="_blank" rel="noreferrer" href={page?.facebook}>
                <i
                  className="fa-brands fa-facebook repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.discord && (
              <a target="_blank" rel="noreferrer" href={page?.discord}>
                <i
                  className="fa-brands fa-discord repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.twitter && (
              <a target="_blank" rel="noreferrer" href={page?.twitter}>
                <i
                  className="fa-brands fa-twitter repp-socials"
                  style={{ color: "white" }}
                />
              </a>
            )}
            {page?.external && (
              <a target="_blank" rel="noreferrer" href={page?.external}>
                <i className="fa-solid fa-square-up-right repp-socials" />
              </a>
            )}
          </>
        )}
        <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
      </div>
    </div>
  );
};

export default ReppNav;
