import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageThunk } from "../../store/pages";
import { setSidebarVisibility } from "../../store/navigation";

const PageButton = ({ pageId }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages[pageId]);
  useEffect(() => {
    dispatch(addPageThunk(pageId));
  }, []);
  return (
    <div className="sidebar-page-button button-hover">
      <NavLink
        to={`/${page?.linkName}`}
        onClick={() => dispatch(setSidebarVisibility(false))}
        style={{
          display: "flex",
          gap: "1rem",
          textDecoration: "none",
          fontWeight: "normal",
          color: "black",
          alignItems: "center",
        }}
      >
        <div>
          <img className="sidebar-button-img" src={page?.profileImage} />
        </div>
        <div>{page?.displayName}</div>
      </NavLink>
    </div>
  );
};

export default PageButton;
