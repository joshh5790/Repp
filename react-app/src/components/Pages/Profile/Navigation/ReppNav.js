import { useState, useEffect } from "react";
import { setNavVisibility } from "../../../../store/navigation";
import { useDispatch } from "react-redux";
import "./ReppNav.css";
import RNDropdown from "./RNDropdown";

const ReppNav = ({
  sectionHeaders,
  scrollToId,
  profile,
  navVisible,
  isMobile,
  preview,
  previewStyle,
}) => {
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState(true);
  const [hideDropdown, setHideDropdown] = useState(true);

  const setNavVisible = () => {
    if (!preview) dispatch(setNavVisibility(!navVisible));
  };

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      setScrollTop(scrollPosition <= 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navVisible]);

  return (
    <div
      style={{
        position: `${preview && "absolute"}`,
        top: `${preview && "9rem"}`,
      }}
      className={`repp-nav ${
        !scrollTop || preview || navVisible || !hideDropdown ? "black-nav" : ""
      } ${navVisible ? "lower-nav" : ""} ${
        previewStyle ? "mobile" : "desktop"
      }`}
    >
      <div className="repp-nav-left">
        <i
          style={{ cursor: "pointer" }}
          onClick={setNavVisible}
          className="fa-solid fa-ellipsis"
        />
        {!isMobile && (
          <>
            {profile?.personalLogo ? (
              <img
                alt={profile?.displayName}
                src={profile?.personalLogo}
                id="repp-nav-logo"
                onClick={() => scrollToId(profile?.linkName)}
              />
            ) : (
              <h2
                id="repp-nav-logo"
                onClick={() => scrollToId(profile?.linkName)}
              >
                {profile?.displayName}
              </h2>
            )}
            <div id="repp-nav-links">
              {sectionHeaders.map((header) => (
                <div onClick={() => scrollToId(header)} key={header}>
                  {header}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {isMobile && (
        <div className="repp-nav-center">
          <i
            onClick={() => setHideDropdown((prev) => !prev)}
            className="fa-solid fa-angle-down"
          />
          {profile?.personalLogo ? (
            <img
              alt={profile?.displayName}
              src={profile?.personalLogo}
              id="repp-nav-logo"
              onClick={() => {
                scrollToId(profile?.linkName);
                setHideDropdown(true);
              }}
            />
          ) : (
            <h2 onClick={() => scrollToId(profile?.linkName)}>
              {profile?.displayName}
            </h2>
          )}
          <i
            onClick={() => setHideDropdown((prev) => !prev)}
            className="fa-solid fa-angle-down"
          />
        </div>
      )}
      <div className="repp-nav-right">
        {!isMobile && (
          <>
            {profile?.tiktok && (
              <a target="_blank" rel="noreferrer" href={profile?.tiktok}>
                <i className="fa-brands fa-tiktok repp-socials" />
              </a>
            )}
            {profile?.youtube && (
              <a target="_blank" rel="noreferrer" href={profile?.youtube}>
                <i
                  className="fa-brands fa-youtube repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.instagram && (
              <a target="_blank" rel="noreferrer" href={profile?.instagram}>
                <i
                  className="fa-brands fa-instagram repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.applemusic && (
              <a target="_blank" rel="noreferrer" href={profile?.applemusic}>
                <i className="fa-brands fa-apple repp-socials" />
              </a>
            )}
            {profile?.spotify && (
              <a target="_blank" rel="noreferrer" href={profile?.spotify}>
                <i
                  className="fa-brands fa-spotify repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.facebook && (
              <a target="_blank" rel="noreferrer" href={profile?.facebook}>
                <i
                  className="fa-brands fa-facebook repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.discord && (
              <a target="_blank" rel="noreferrer" href={profile?.discord}>
                <i
                  className="fa-brands fa-discord repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.twitter && (
              <a target="_blank" rel="noreferrer" href={profile?.twitter}>
                <i
                  className="fa-brands fa-twitter repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.external && (
              <a target="_blank" rel="noreferrer" href={profile?.external}>
                <i className="fa-solid fa-square-up-right repp-socials" />
              </a>
            )}
          </>
        )}
        <i onClick={setNavVisible} className="fa-solid fa-ellipsis" />
      </div>
      <RNDropdown
        sectionHeaders={sectionHeaders}
        scrollToId={scrollToId}
        hideDropdown={hideDropdown}
        setHideDropdown={setHideDropdown}
        preview={preview}
      />
    </div>
  );
};

export default ReppNav;
