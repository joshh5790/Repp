import { useState, useEffect, React } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/repp_name.png";
import { setSidebarVisibility } from "../../store/navigation";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../Modals/LoginForm";
// import SearchBar from "../SearchBar";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navVisible = useSelector((state) => state.visibility.nav);
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {}, [sessionUser, dispatch]);

  const setSidebarVisible = (visible) => {
    dispatch(setSidebarVisibility(visible));
  };

  return (
    <ul
      className={`nav ${navVisible ? "" : "nav-hidden"} ${
        isHome ? "home-nav" : ""
      }`}
    >
      <li className="nav-left">
        {sessionUser && (
          <i
            onClick={() => setSidebarVisible(true)}
            className={`fa-solid fa-bars toggle-sidebar`}
          />
        )}
        <NavLink exact to="/" className="logo-link">
          <img src={logo} alt="repp" className="logo" />
        </NavLink>
        <i className="fa-solid fa-info">
          {isHome && (
            <div className="page-info">
              <h4>Home Page/Navbar</h4>
              <ul>
                <li>
                  Visiting artist page will cause navbar to disappear, clicking
                  side ellipsis will make it show up
                </li>
                <li>Click logo to return to home page</li>
                <li>
                  If user is logged in, following sidebar will be available next
                  to the logo
                </li>
                <li>Right side of navbar has login button/user settings</li>
                <li>login for tiffany is demo@aa.io, password is password</li>
                <li>site is fully mobile friendly</li>
              </ul>
            </div>
          )}
          {location.pathname === "/profile/edit" && (
            <div className="page-info">
              <h4>Edit Profile Page</h4>
              <ul>
                <li>4 tabs, general, socials, products, and videos</li>
                <li>desktop view not yet available</li>
              </ul>
            </div>
          )}
          {(location.pathname === "/tiffany-day" ||
            location.pathname === "/highvyn" ||
            location.pathname === "/eric-nam") && (
            <div className="page-info">
              <h4>Profile Page</h4>
              <ul>
                <li>
                  clicking on artist name in profile navbar brings user to top
                </li>
                <li>
                  Cart is profile page specific, carts will only show for the
                  respective artist's page
                </li>
                <li>Newsletter functionality not yet available</li>
              </ul>
            </div>
          )}
        </i>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontSize: "2rem",
            marginLeft: "1rem"
          }}
        >
          <a href="https://github.com/joshh5790">
            <i className="fa-brands fa-github" style={{color: "white"}} />
          </a>
          <a href="https://www.linkedin.com/in/joshua-ho-5790/">
            <i className="fa-brands fa-linkedin" style={{color: "white"}} />
          </a>
        </div>
      </li>
      {/* <li className="search-bar-container">
        <SearchBar />
      </li> */}

      <li className="nav-right">
        {sessionUser ? (
          <div className="nav-button">
            {<ProfileButton user={sessionUser} />}
          </div>
        ) : (
          <div className="nav-button login">
            <OpenModalButton
              buttonText="LOG IN"
              modalComponent={<LoginForm />}
              className="login-button"
            />
          </div>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
