import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfileThunk } from "../../store/profiles";
import { setSidebarVisibility } from "../../store/navigation";
import { deleteFollowThunk } from "../../store/follows";

const PageButton = ({ followId, profileId, remove }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) =>
    Object.values(state.profiles).find((profile) => profile.id === profileId)
  );
  const [removeHover, setRemoveHover] = useState(false);
  useEffect(() => {
    dispatch(addProfileThunk(profileId));
  }, []);

  const handleSidebarLink = () => {
    if (remove) dispatch(deleteFollowThunk(followId));
    else {
      dispatch(setSidebarVisibility(false));
      history.push(`/${profile?.linkName}`);
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
        <img className="sidebar-button-img" src={profile?.profileImage} />
        {remove && removeHover ? (
          <div style={{ color: "red", fontWeight: "bold" }}>Unfollow</div>
        ) : (
          <div>{profile?.displayName}</div>
        )}
      </div>
    </div>
  );
};

export default PageButton;
