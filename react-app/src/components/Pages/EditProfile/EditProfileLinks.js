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
      {profileLinks.length < 5 ? (
        <OpenModalButton
          modalComponent={<ManageProfileLink profileId={profile?.id} />}
          buttonText={<b>+ Links {profileLinks.length}/5</b>}
          className={"new-card-button"}
        />
      ) : (
        <div
          id="max-links-reached"
          className="new-card-button"
          style={{ color: "#999999" }}
        >
          Links 5/5
        </div>
      )}
      <div className="edit-profilelinks-list flex-col">
        {profileLinks.length ? (
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
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            These links will be the first thing your users see when they visit
            your page. Add links to your profile to make it more personal!
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfileLinks;
