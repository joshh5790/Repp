import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfileLinkThunk,
  getProfileLinksThunk,
  updateProfileLinkThunk,
} from "../../../store/profileLinks";
// import AddProfileLink from "../../Modals/AddProfileLink";
import OpenModalButton from "../../OpenModalButton";
import "./EditProfileLinks.css";

const EditProfileLinks = ({ profile }) => {
  const dispatch = useDispatch();
  const profileLinks = useSelector((state) => Object.values(state.profileLinks)); // .sort((a, b) => a.date - b.date), profileLink dates are not date variables
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [editInput, setEditInput] = useState(0);

  useEffect(() => {
    if (profile) {
      dispatch(getProfileLinksThunk(profile.id));
    }
  }, [dispatch, profile]);

  const focusProfileLink = (e, profileLink) => {
    e.preventDefault();
    if (!editInput) {
      setEditInput(profileLink.id);
      setText(profileLink.text);
      setLink(profileLink.link);
    }
  };

  const handleDeleteProfileLink = (profileLinkId, e) => {
    e.preventDefault()
    dispatch(deleteProfileLinkThunk(profileLinkId));
    resetState();
  };

  const handleUpdateProfileLink = (profileLinkId) => {
    dispatch(
      updateProfileLinkThunk({ profileLinkId, text, link })
    );
    resetState();
  };

  const resetState = () => {
    setEditInput(0);
    setText("");
    setLink("");
  };

  return (
    <>
      {/* <OpenModalButton
        modalComponent={<AddProfileLink profileId={profile?.id}/>}
        buttonText={<b>+ New Link</b>}
        className={"new-card-button"}
      /> */}
      <div className="edit-profileLinks-list">
        {profileLinks &&
          profileLinks.map((profileLink) => (
            <form
              key={profileLink?.id}
              className={`profileLink-card ease-bg ${
                editInput === profileLink?.id ? "focus-profileLink" : ""
              }`}
            >
              <button
                className="edit-card"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "40px",
                  alignSelf: "start",
                  justifySelf: "end",
                }}
                onClick={(e) => focusProfileLink(e, profileLink)}
              >
                <i className="fa-regular fa-pen-to-square" />
              </button>
              <button
                className="delete-card delete-profilelink"
                onClick={(e) => handleDeleteProfileLink(profileLink.id, e)}
              >
                <i className="fa-solid fa-x" />
              </button>
              <input
                className="profilelink-input"
                placeholder="Text"
                value={editInput !== profileLink.id ? profileLink.text : text}
                onChange={(e) => setText(e.target.value)}
                disabled={editInput !== profileLink.id}
              />
              {editInput === profileLink.id && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    gridArea: "buttons",
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <button
                    className="profilelink-button-cancel button-hover"
                    onClick={resetState}
                  >
                    Cancel
                  </button>
                  <button
                    className="profilelink-button-save button-hover"
                    onClick={() => handleUpdateProfileLink(profileLink.id)}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          ))}
      </div>
    </>
  );
};

export default EditProfileLinks;
