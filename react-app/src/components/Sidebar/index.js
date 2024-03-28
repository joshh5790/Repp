import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../images/repp_name.png";
import { useEffect, useState } from "react";
import { getSessionFollowsThunk, sessionFollows } from "../../store/follows";
import { setSidebarVisibility } from "../../store/navigation";
import PageButton from "./PageButton";
import { authenticate } from "../../store/session";

const Sidebar = () => {
  const dispatch = useDispatch();
  const follows = useSelector(sessionFollows);
  const sidebarVisible = useSelector((state) => state.visibility.sidebar);
  const [remove, setRemove] = useState(false);

  const hideSidebar = () => {
    dispatch(setSidebarVisibility(false));
    setRemove(false);
  };

  useEffect(() => {
    dispatch(authenticate()).then((data) => {
      if (data.id) dispatch(getSessionFollowsThunk());
    });
    dispatch(setSidebarVisibility(false));
    setRemove(false);
  }, [dispatch]);
  return (
    <>
      <div
        id="follows-background"
        className={sidebarVisible ? "" : "hidden"}
        onClick={hideSidebar}
      >
        &nbsp;
      </div>
      <div
        className={`follows-sidebar ${sidebarVisible ? "" : "hide-follows"}`}
      >
        <div style={{ display: "flex", margin: "1.5rem 0 0 2rem" }}>
          <i
            onClick={hideSidebar}
            className={`fa-solid fa-bars toggle-sidebar`}
            style={{ color: "black" }}
          />
          <NavLink exact to="/" className="logo-link">
            <img onClick={hideSidebar} src={logo} alt="repp" className="logo" />
          </NavLink>
        </div>
        <h3 style={{ margin: "2rem 0 1rem 1.5rem" }}>Following</h3>
        {follows.length ? (
          <>
            {follows?.map((follow) => (
              <div key={follow.id} className="follow-card">
                <PageButton
                  followId={follow.id}
                  profileId={follow.profileId}
                  remove={remove}
                />
              </div>
            ))}
            <div
              className="remove-follows-button button-hover"
              onClick={() => setRemove((prev) => !prev)}
            >
              {!remove ? "Manage Follows" : "Cancel"}
            </div>
          </>
        ) : (
          <div style={{ paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
            You are not following any artists.
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
