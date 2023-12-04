import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageThunk } from "../../store/pages";
import { setSidebarVisibility } from "../../store/navigation";
import { deleteFollowThunk } from "../../store/follows";

const PageButton = ({ followId, pageId, remove }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const page = useSelector((state) =>
    Object.values(state.pages).find((page) => page.id === pageId)
  );
  const [removeHover, setRemoveHover] = useState(false);
  useEffect(() => {
    dispatch(addPageThunk(pageId));
  }, []);

  const handleSidebarLink = () => {
    if (remove) dispatch(deleteFollowThunk(followId));
    else {
      dispatch(setSidebarVisibility(false));
      history.push(`/${page?.linkName}`);
    }
  };

  return (
    <div
      onMouseEnter={() => setTimeout(setRemoveHover(true), 200)}
      onMouseLeave={() => setRemoveHover(false)}
      className="sidebar-page-button button-hover"
    >
      <div
        onClick={handleSidebarLink}
        style={{
          display: "flex",
          gap: "1rem",
          height: "3rem",
          textDecoration: "none",
          fontWeight: "normal",
          color: "black",
          alignItems: "center",
          width: "100%",
        }}
      >
        {remove && removeHover ? (
          <div style={{ color: "red", justifySelf: "center", width: "100%" }}>
            Unfollow
          </div>
        ) : (
          <>
            <div>
              <img className="sidebar-button-img" src={page?.profileImage} />
            </div>
            <div>{page?.displayName}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageButton;
