import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createProfileLinkThunk, updateProfileLinkThunk } from "../../../store/profileLinks";
import "./ManageProfileLink.css";

const ManageProfileLink = ({ profileId, profileLink }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    if (profileLink) {
      setText(profileLink.text)
      setLink(profileLink.link)
    }
  }, [profileLink])

  const manageProfileLink = (e) => {
    e.preventDefault();
    if (profileId) {
      dispatch(
        createProfileLinkThunk({ profileId, text, link })
      );
    }
    else {
      dispatch(updateProfileLinkThunk({ profileLinkId: profileLink.id, text, link }))
    }
    closeModal();
  };

  return (
    <div id="profilelink-modal">
      <form className="flex-col">
        <label className="product-input-label">
           Button Text
          <input
            className="product-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <label className="product-input-label">
           Link
          <input
            className="product-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <button
          className="save-profilelink button-hover"
          onClick={(e) => manageProfileLink(e)}
        >
          {profileId ? "Add Link" : "Update Link"}
        </button>
      </form>
    </div>
  );
};

export default ManageProfileLink;
