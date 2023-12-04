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
  const [isHome, setIsHome] = useState(true)

  useEffect(() => {
    setIsHome(location.pathname === '/')
  }, [location.pathname])

  useEffect(() => {}, [sessionUser, dispatch]);

  const setSidebarVisible = (visible) => {
    dispatch(setSidebarVisibility(visible));
  };

  return (
    <ul className={`nav ${navVisible ? "" : "nav-hidden"} ${isHome ? "home-nav" : ""}`}>
      <li className="nav-left">
        <i
          onClick={() => setSidebarVisible(true)}
          className={`fa-solid fa-bars toggle-sidebar`}
        />
        <NavLink exact to="/" className="logo-link">
          <img src={logo} alt="repp" className="logo" />
        </NavLink>
        <i className="fa-solid fa-info">
          {isHome && (
            <div className="page-info">
              <h4>Home Page/Navbar</h4>
              <ul>
                <li>Visiting artist page will cause navbar to disappear, clicking side ellipsis will make it show up</li>
                <li>Logo designed with Figma</li>
                <li>Click logo to return to home page</li>
                <li>Right side of navbar has login button/user settings</li>
                <li>logins for Highvyn and tiffany are josiah@aa.io and demo@aa.io, password is password</li>
                <li>site is fully mobile friendly</li>
              </ul>
            </div>
          )}
          {location.pathname === '/profile/edit' && (
            <div className="page-info">
            <h4>Edit Profile Page</h4>
            <ul>
              <li>4 tabs, general, socials, products, and videos</li>
              <li>Feel free to play around, I reset the database somewhat regularly</li>
              <li>fully functional</li>
            </ul>
            </div>
          )}
          {(location.pathname === '/tiffany-day' || location.pathname === '/highvyn' || location.pathname === '/eric-nam') && (
            <div className="page-info">
            <h4>Profile Page</h4>
            <ul>
              <li>clicking on artist name in profile navbar brings user to top</li>
              <li>Eric's page has a merch section that has items that can be added to cart</li>
              <li>Cart is profile page specific, carts will only show for the respective artist's page</li>
              <li>Checkout functionality not working yet</li>
              <li>Newsletter functionality not working yet</li>
            </ul>
            </div>
          )}
        </i>
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
