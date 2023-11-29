import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { getSessionPageThunk } from "../../store/pages";
import { invalidImage } from "../../utilities";

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
    history.push("/");
  };

  const closeMenu = () => setShowMenu(false);

  const handleRedirect = () => {
    dispatch(getSessionPageThunk())
      .then((data) => history.push(`/${data.linkName}`))
      .then(closeMenu);
  };

  return (
    <>
      <button className="profile-button ease-bg" onClick={openMenu}>
        {user?.profileImage ? (
          <img
            alt=""
            src={user?.profileImage}
            className="profile-button-img"
            onError={invalidImage}
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
          style={{ paddingLeft: "0" }}
          className={`dropdown-info-container ${
            user.isRepp && "dropdown-button button-hover"
          }`}
        >
          {user?.profileImage ? (
            <img
              alt=""
              src={user?.profileImage}
              className="profile-dropdown-img"
              onError={invalidImage}
            />
          ) : (
            <i className="fas fa-user-circle" style={{ fontSize: "5rem" }} />
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
              style={{ color: "#999999", fontSize: "0.8rem" }}
            />
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <NavLink
          onClick={closeMenu}
          className="dropdown-button button-hover"
          to="/account/carts"
        >
          <span>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "#7777FF", width: "2rem", marginRight: "1rem" }}
            />
            Your Carts
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "0.8rem" }}
          />
        </NavLink>
        <NavLink
          onClick={closeMenu}
          className="dropdown-button button-hover"
          to="/account/orders"
        >
          <span>
            <i
              className="fa-solid fa-clock-rotate-left"
              style={{ color: "#7777FF", width: "2rem", marginRight: "1rem" }}
            />
            Order History
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "0.8rem" }}
          />
        </NavLink>
        <NavLink
          onClick={closeMenu}
          className="dropdown-button button-hover"
          to="/account"
        >
          <span>
            <i
              className="fa-solid fa-gear"
              style={{ color: "#7777FF", width: "2rem", marginRight: "1rem" }}
            />
            Account Settings
          </span>
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#999999", fontSize: "0.8rem" }}
          />
        </NavLink>
        {user?.isRepp ? (
          <NavLink
            onClick={closeMenu}
            className="dropdown-button button-hover"
            to="/profile/edit"
          >
            <span>
              <i
                className="fa-solid fa-book-open"
                style={{ color: "#7777FF", width: "2rem", marginRight: "1rem" }}
              />
              Edit Your Profile Page
            </span>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "0.8rem" }}
            />
          </NavLink>
        ) : (
          <NavLink
            onClick={closeMenu}
            className="dropdown-button button-hover"
            to="/profile/new"
          >
            <span>
              <i
                className="fa-solid fa-book-open"
                style={{ color: "#7777FF", width: "2rem", marginRight: "1rem" }}
              />
              Create Your Profile Page
            </span>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: "#999999", fontSize: "0.8rem" }}
            />
          </NavLink>
        )}
        <div className="dropdown-button button-hover" onClick={handleLogout}>
          <span>
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              style={{ color: "#FF7777", width: "2rem", marginRight: "1rem" }}
            />
            Log Out
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
