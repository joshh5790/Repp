import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageThunk } from "../../store/pages";
import { setSidebarVisibility } from "../../store/navigation";

const PageButton = ({ pageId, remove }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const page = useSelector((state) => Object.values(state.pages).find(page => page.id === pageId));
  useEffect(() => {
    dispatch(addPageThunk(pageId));
  }, []);

  const handleSidebarLink = () => {
    dispatch(setSidebarVisibility(false))
    history.push(`/${page?.linkName}`)
  }

  const mouseEnterRemove = (e) => {
    if (remove) {
      e.target.value = 'Unfollow'
    }
  }

  const mouseLeaveRemove = (e) => {

  }

  const handleRemove = (e) => {

  }

  return (
    <div className="sidebar-page-button button-hover">
      <div
        onMouseEnter={mouseEnterRemove}
        onMouseLeave={mouseLeaveRemove}
        onClick={handleSidebarLink}
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
      </div>
    </div>
  );
};

export default PageButton;
