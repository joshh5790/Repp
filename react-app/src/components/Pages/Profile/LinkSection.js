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
      {isMobile && (
        <>
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
              {sectionHeaders.map((header) => (
                <div
                  className="profile-section-link"
                  onClick={() => scrollToId(header)}
                  key={header}
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ position: `${preview && "absolute"}` }}
            className="mobile-socials-div"
          >
            {profile?.tiktok && (
              <a target="_blank" rel="noreferrer" href={profile.tiktok}>
                <i className="fa-brands fa-tiktok repp-socials" />
              </a>
            )}
            {profile?.youtube && (
              <a target="_blank" rel="noreferrer" href={profile.youtube}>
                <i
                  className="fa-brands fa-youtube repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.instagram && (
              <a target="_blank" rel="noreferrer" href={profile.instagram}>
                <i
                  className="fa-brands fa-instagram repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.applemusic && (
              <a target="_blank" rel="noreferrer" href={profile.applemusic}>
                <i className="fa-brands fa-apple repp-socials" />
              </a>
            )}
            {profile?.spotify && (
              <a target="_blank" rel="noreferrer" href={profile.spotify}>
                <i
                  className="fa-brands fa-spotify repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.facebook && (
              <a target="_blank" rel="noreferrer" href={profile.facebook}>
                <i
                  className="fa-brands fa-facebook repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.discord && (
              <a target="_blank" rel="noreferrer" href={profile.discord}>
                <i
                  className="fa-brands fa-discord repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.twitter && (
              <a target="_blank" rel="noreferrer" href={profile.twitter}>
                <i
                  className="fa-brands fa-twitter repp-socials"
                  style={{ color: "#F1F1F1" }}
                />
              </a>
            )}
            {profile?.external && (
              <a target="_blank" rel="noreferrer" href={profile.external}>
                <i className="fa-solid fa-square-up-right repp-socials" />
              </a>
            )}
          </div>
        </>
      )}
      <div className="repp-home-text">
        {!isMobile && (
          <>
            <h1>{profile?.displayName}</h1>
            {user && following === "notFollowing" && (
              <div onClick={addFollow} className="follow-button button-hover">
                + Follow
              </div>
            )}
          </>
        )}
      </div>
      {!isMobile && (
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
      )}
    </>
  );
};

export default LinkSection;
