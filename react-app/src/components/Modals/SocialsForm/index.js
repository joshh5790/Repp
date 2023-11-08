import "./SocialsForm.css";
import { useModal } from "../../../context/Modal";
import { useState } from "react";

const SocialsForm = ({ socials, setSocials }) => {
  const [tiktok, setTiktok] = useState(socials["tiktok"] || "");
  const [youtube, setYoutube] = useState(socials["youtube"] || "");
  const [instagram, setInstagram] = useState(socials["instagram"] || "");
  const [applemusic, setApplemusic] = useState(socials["applemusic"] || "");
  const [spotify, setSpotify] = useState(socials["spotify"] || "");
  const [facebook, setFacebook] = useState(socials["facebook"] || "");
  const [discord, setDiscord] = useState(socials["discord"] || "");
  const [twitter, setTwitter] = useState(socials["twitter"] || "");
  const [external, setExternal] = useState(socials["external"] || "");
  const { closeModal } = useModal();

  const updateSocials = () => {
    setSocials({
      tiktok,
      youtube,
      instagram,
      applemusic,
      spotify,
      facebook,
      discord,
      twitter,
      external,
    });
    closeModal();
  };

  return (
    <div className="socials-form">
      <label name="tiktok" className="socials-label">
        <div>
          <i
            className="fa-brands fa-tiktok"
            style={{ marginRight: "0.5rem" }}
          />
          Tik Tok
        </div>
        <input
          className="socials-input"
          name="tiktok"
          type="text"
          value={tiktok}
          placeholder="https://www.tiktok.com/@username"
          onChange={(e) => setTiktok(e.target.value)}
        />
      </label>
      <label name="youtube" className="socials-label">
        <div>
          <i
            className="fa-brands fa-youtube"
            style={{ marginRight: "0.5rem" }}
          />
          Youtube
        </div>
        <input
          className="socials-input"
          name="youtube"
          type="text"
          value={youtube}
          placeholder="https://www.youtube.com/@username"
          onChange={(e) => setYoutube(e.target.value)}
        />
      </label>
      <label name="instagram" className="socials-label">
        <div>
          <i
            className="fa-brands fa-instagram"
            style={{ marginRight: "0.5rem" }}
          />
          Instagram
        </div>
        <input
          className="socials-input"
          name="instagram"
          type="text"
          value={instagram}
          placeholder="https://www.instagram.com/@username"
          onChange={(e) => setInstagram(e.target.value)}
        />
      </label>
      <label name="applemusic" className="socials-label">
        <div>
          <i className="fa-brands fa-apple" style={{ marginRight: "0.5rem" }} />
          Apple Music
        </div>
        <input
          className="socials-input"
          name="applemusic"
          type="text"
          value={applemusic}
          placeholder="you get the gist"
          onChange={(e) => setApplemusic(e.target.value)}
        />
      </label>
      <label name="spotify" className="socials-label">
        <div>
          <i
            className="fa-brands fa-spotify"
            style={{ marginRight: "0.5rem" }}
          />
          Spotify
        </div>
        <input
          className="socials-input"
          name="spotify"
          type="text"
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
        />
      </label>
      <label name="facebook" className="socials-label">
        <div>
          <i
            className="fa-brands fa-facebook"
            style={{ marginRight: "0.5rem" }}
          />
          Facebook
        </div>
        <input
          className="socials-input"
          name="facebook"
          type="text"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </label>
      <label name="discord" className="socials-label">
        <div>
          <i
            className="fa-brands fa-discord"
            style={{ marginRight: "0.5rem" }}
          />
          Discord
        </div>
        <input
          className="socials-input"
          name="discord"
          type="text"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
      </label>
      <label name="twitter" className="socials-label">
        <div>
          <i
            className="fa-brands fa-twitter"
            style={{ marginRight: "0.5rem" }}
          />
          Twitter
        </div>
        <input
          className="socials-input"
          name="twitter"
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </label>
      <label name="external" className="socials-label">
        <div>
          <i
            className="fa-solid fa-square-up-right"
            style={{ marginRight: "0.5rem" }}
          />
          External Links
        </div>
        <input
          className="socials-input"
          name="external"
          type="text"
          value={external}
          placeholder="https://www.website.com"
          onChange={(e) => setExternal(e.target.value)}
        />
      </label>
      <button
        className="close-socials-button button-hover"
        onClick={updateSocials}
      >
        Update Socials
      </button>
    </div>
  );
};

export default SocialsForm;
