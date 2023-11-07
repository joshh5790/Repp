import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import { getSessionPageThunk } from "../../store/pages";

function ProfileButton({ user }) {
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
    dispatch(logout());
  };

  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {user?.profileImage ? (
          <img
            alt="profile"
            src={user?.profileImage}
            className="profile-button-img"
          />
        ) : (
          <i className="fas fa-user-circle" />
        )}
      </button>
      <div
        className={"profile-dropdown" + (showMenu ? "" : " hidden")}
        ref={ulRef}
      >
        <div className="dropdown-info-container">
          {user?.profileImage ? (
            <img
              alt="profile"
              src={user?.profileImage}
              className="profile-button-img"
            />
          ) : (
            <i className="fas fa-user-circle profile-button-img" />
          )}
          <div className="dropdown-info">
            <div>
              {" "}
              {user?.firstName} {user?.lastName}{" "}
            </div>
            <div> {user?.email} </div>
          </div>
        </div>
        <NavLink className="dropdown-button" to="/account">
          <span>
            <i className="fa-solid fa-gear" style={{ color: "#7777FF", width: "2rem" }} />
            Account Settings
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "1.2rem" }}
          />
        </NavLink>
        {user?.isRepp ? (
          <NavLink className="dropdown-button" to="/profile/edit">
            <span>
              <i className="fa-solid fa-book-open" style={{ color: "#7777FF", width: "2rem" }} />
              Edit Your Profile Page
            </span>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "1.2rem" }}
            />
          </NavLink>
        ) : (
          <NavLink className="dropdown-button" to="/profile/new">
            <span>
              <i className="fa-solid fa-book-open" style={{ color: "#7777FF", width: "2rem" }} />
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
