import { useDispatch } from "react-redux";
import { invalidImage } from "../../../utilities";
import "./LinkSection.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    dispatch(getFollowsThunk(profile.id)).then((data) => {
      if (user && user.id === profile.userId) return setFollowing("owner");
      for (const follow of data) {
        if (follow.userId === user?.id) {
          return setFollowing("following");
        }
      }
      setFollowing("notFollowing");
    });
  }, []);

  const addFollow = () => {
    dispatch(createFollowThunk({ profileId: profile.id }));
    setFollowing(1);
  };

  return (
    <>
      {isMobile && (
        <>
          <div className="mobile-page-links flex-col-center">
            <div className="mobile-headers-div flex-col-center">
              {sectionHeaders.map((header) => (
                <div
                  className="mobile-header"
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
      <img
        className="profile-page-home-img"
        src={mainImage}
        alt={profile?.displayName}
        onError={invalidImage}
      />
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
    </>
  );
};

export default LinkSection;
