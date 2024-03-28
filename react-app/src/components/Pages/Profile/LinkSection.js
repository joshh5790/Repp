import { useDispatch, useSelector } from "react-redux";
import { invalidImage } from "../../../utilities";
import "./LinkSection.css";
import { useState, useEffect } from "react";
import { getProfileLinksThunk } from "../../../store/profileLinks";
import { createFollowThunk, getFollowsThunk } from "../../../store/follows";

const LinkSection = ({
  user,
  profile,
  sectionHeaders,
  scrollToId,
  mainImage,
  isMobile,
  preview,
}) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(0);
  const profileLinks = useSelector((state) =>
    Object.values(state.profileLinks)
  );

  useEffect(() => {
    dispatch(getProfileLinksThunk(profile.id));
    dispatch(getFollowsThunk(profile.id)).then((data) => {
      if (user && user.id === profile.userId) return setFollowing("owner");
      for (const follow of data) {
        if (follow.userId === user?.id) {
          return setFollowing("following");
        }
      }
      setFollowing("notFollowing");
    });
  }, [dispatch, profile.id, profile.userId]);

  const addFollow = () => {
    dispatch(createFollowThunk({ profileId: profile.id }));
    setFollowing(1);
  };

  return (
    <>
      <img
        id="profile-page-home-img"
        src={mainImage}
        alt={profile?.displayName}
        onError={invalidImage}
      />
      {isMobile ? (
        <>
          <img src={profile?.profileImage} id="mobile-profile-headshot" />
          <div className="mobile-page-links flex-col-center">
            <div className="mobile-headers-div flex-col-center">
              {profileLinks.map((link) => (
                <a
                  href={link?.link}
                  className="profile-section-link"
                  key={link?.id}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  {link?.text}
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="repp-home-text">
            <h1>{profile?.displayName}</h1>
            {user && following === "notFollowing" && (
              <div onClick={addFollow} className="follow-button button-hover">
                + Follow
              </div>
            )}
          </div>
          <div className="profile-links-div">
            {profileLinks.map((link) => (
              <a
                href={link?.link}
                target="_blank"
                className="profile-section-link"
                key={link?.id}
                style={{ textDecoration: "none" }}
              >
                {link?.text}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default LinkSection;
