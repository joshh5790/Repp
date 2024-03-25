import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfileLinkThunk,
  getProfileLinksThunk,
} from "../../../store/profileLinks";
import ManageProfileLink from "../../Modals/ManageProfileLink";
import OpenModalButton from "../../OpenModalButton";
import "./EditProfileLinks.css";

const EditProfileLinks = ({ profile }) => {
  const dispatch = useDispatch();
  const profileLinks = useSelector((state) =>
    Object.values(state.profileLinks)
  );

  useEffect(() => {
    if (profile) {
      dispatch(getProfileLinksThunk(profile.id));
    }
  }, [dispatch, profile]);

  const handleDeleteProfileLink = (profileLinkId, e) => {
    e.preventDefault();
    dispatch(deleteProfileLinkThunk(profileLinkId));
  };

  return (
    <>
      <OpenModalButton
        modalComponent={<ManageProfileLink profileId={profile?.id} />}
        buttonText={<b>+ New Link</b>}
        className={"new-card-button"}
      />
      <div className="edit-profilelinks-list flex-col">
        {profileLinks &&
          profileLinks.map((profileLink) => (
            <div key={profileLink?.id} className="profilelink-card">
              <a
                target="_blank"
                className="profilelink-text button-hover"
                style={{ textDecoration: "none" }}
                href={profileLink?.link}
              >
                {profileLink?.text}
              </a>
              <div>
                <OpenModalButton
                  className="edit-card ease-bg"
                  buttonText={<i className="fa-regular fa-pen-to-square" />}
                  modalComponent={
                    <ManageProfileLink profileLink={profileLink} />
                  }
                />
                <button
                  className="delete-card delete-profilelink"
                  onClick={(e) => handleDeleteProfileLink(profileLink.id, e)}
                  style={{ justifySelf: "flex-end" }}
                >
                  <i className="fa-solid fa-x" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EditProfileLinks;
