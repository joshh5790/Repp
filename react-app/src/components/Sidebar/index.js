import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../images/repp_name.png";
import { useEffect, useState } from "react";
import { getSessionFollowsThunk, sessionFollows } from "../../store/follows";
import { setSidebarVisibility } from "../../store/navigation";
import PageButton from "./PageButton";

const Sidebar = () => {
  const dispatch = useDispatch();
  const follows = useSelector(sessionFollows);
  const sidebarVisible = useSelector((state) => state.visibility.sidebar);
  const [remove, setRemove] = useState(false)
  useEffect(() => {
    dispatch(getSessionFollowsThunk());
    dispatch(setSidebarVisibility(false))
    setRemove(false)
  }, []);

  const hideSidebar = () => {
    dispatch(setSidebarVisibility(false))
    setRemove(false)
  }
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
        <div style={{display: 'flex', margin: "1.5rem 0 0 2rem"}}>
          <i
            onClick={hideSidebar}
            className={`fa-solid fa-bars toggle-sidebar`}
            style={{color: 'black'}}
          />
          <NavLink exact to="/" className="logo-link">
            <img src={logo} alt="repp" className="logo" />
          </NavLink>
        </div>
        <h3 style={{margin: '2rem 0 1rem 1.5rem'}}>Following</h3>
        {follows?.map((follow) => (
          <div key={follow.id} className="follow-card">
            <PageButton pageId={follow.pageId} remove={remove}/>
          </div>
        ))}
        <div className="remove-follows-button button-hover" onClick={() => setRemove(prev => !prev)}>
          {!remove ? 'Manage Follows' : 'Cancel'}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
