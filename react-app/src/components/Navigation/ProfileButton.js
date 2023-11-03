import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {user?.profileImage
        ? <img src={user?.profileImage} className='profile-button-img'/>
        : <i className="fas fa-user-circle" />
        }
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className="dropdown-info-container">
          {user?.profileImage
          ? <img src={user?.profileImage} className='profile-button-img'/>
          : <i className="fas fa-user-circle profile-button-img" />
          }
          <div className="dropdown-info">
            <div> {user?.firstName} {user?.lastName} </div>
            <div> {user?.email} </div>
            <div></div>
          </div>
        </li>
        <li className="logout-button-div">
          <button
            className='logout-button'
            onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
