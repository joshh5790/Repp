import "./MobileSocials.css";

const MobileSocials = ({ profile, preview }) => {
  return (
    <div className={`mobile-socials-div ${preview ? "preview" : ""}`}>
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
  );
};

export default MobileSocials;
