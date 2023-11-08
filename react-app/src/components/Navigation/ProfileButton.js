import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { getSessionPageThunk } from "../../store/pages";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => window.location.reload());
    history.push('/')
  };

  const closeMenu = () => setShowMenu(false);

  const handleRedirect = () => {
    dispatch(getSessionPageThunk())
      .then((data) => history.push(`/${data.linkName}`))
      .then(closeMenu);
  };

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {user?.profileImage ? (
          <img
            src={user?.profileImage}
            className="profile-button-img"
            onError={({ target }) => {
              target.onerror = null;
              target.src =
                "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
            }}
          />
        ) : (
          <i className="fas fa-user-circle" />
        )}
      </button>
      <div
        className={"profile-dropdown" + (showMenu ? "" : " hidden")}
        ref={ulRef}
      >
        <div
          onClick={() => {
            if (user.isRepp) handleRedirect();
          }}
          style={{ paddingLeft: '0' }}
          className={`dropdown-info-container ${
            user.isRepp && "dropdown-button"
          }`}
        >
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              className="profile-dropdown-img"
              onError={({ target }) => {
                target.onerror = null;
                target.src =
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}
            />
          ) : (
            <i className="fas fa-user-circle profile-button-img" />
          )}
          <div className="dropdown-info">
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <div> {user?.email} </div>
          </div>
          {user.isRepp ? (
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "1.2rem" }}
            />
          ) : <div>&nbsp;</div>}
        </div>
        <NavLink onClick={closeMenu} className="dropdown-button" to="/account">
          <span>
            <i
              className="fa-solid fa-gear"
              style={{ color: "#7777FF", width: "2rem" }}
            />
            Account Settings
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "1.2rem" }}
          />
        </NavLink>
        {user?.isRepp ? (
          <NavLink
            onClick={closeMenu}
            className="dropdown-button"
            to="/profile/edit"
          >
            <span>
              <i
                className="fa-solid fa-book-open"
                style={{ color: "#7777FF", width: "2rem" }}
              />
              Edit Your Profile Page
            </span>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "1.2rem" }}
            />
          </NavLink>
        ) : (
          <NavLink
            onClick={closeMenu}
            className="dropdown-button"
            to="/profile/new"
          >
            <span>
              <i
                className="fa-solid fa-book-open"
                style={{ color: "#7777FF", width: "2rem" }}
              />
              Create Your Profile Page
            </span>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "1.2rem" }}
            />
          </NavLink>
        )}
        <div className="dropdown-button" onClick={handleLogout}>
          <span>
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              style={{ color: "#FF7777", width: "2rem" }}
            />
            Log Out
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "1.2rem" }}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
