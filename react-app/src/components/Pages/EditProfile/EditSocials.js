import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRPageThunk } from "../../../store/pages";

const EditSocials = ({ page }) => {
  const dispatch = useDispatch();
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [applemusic, setApplemusic] = useState("");
  const [spotify, setSpotify] = useState("");
  const [facebook, setFacebook] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [external, setExternal] = useState("");

  useEffect(() => {
    setTiktok(page["tiktok"] || "");
    setYoutube(page["youtube"] || "");
    setInstagram(page["instagram"] || "");
    setApplemusic(page["applemusic"] || "");
    setSpotify(page["spotify"] || "");
    setFacebook(page["facebook"] || "");
    setDiscord(page["discord"] || "");
    setTwitter(page["twitter"] || "");
    setExternal(page["external"] || "");
  }, [page]);

  const onSubmit = async () => {
    await dispatch(
      updateRPageThunk({
        pageId: page.id,
        tiktok,
        youtube,
        instagram,
        applemusic,
        spotify,
        facebook,
        discord,
        twitter,
        external,
      })
    );
  };

  return (
    <>
      <label name="tiktok" className="update-socials-label">
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
          value={tiktok}
          placeholder="https://www.tiktok.com/@username"
          onChange={(e) => setTiktok(e.target.value)}
        />
      </label>
      <label name="youtube" className="update-socials-label">
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
          value={youtube}
          placeholder="https://www.youtube.com/@username"
          onChange={(e) => setYoutube(e.target.value)}
        />
      </label>
      <label name="instagram" className="update-socials-label">
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
          value={instagram}
          placeholder="https://www.instagram.com/@username"
          onChange={(e) => setInstagram(e.target.value)}
        />
      </label>
      <label name="applemusic" className="update-socials-label">
        <div>
          <i className="fa-brands fa-apple" style={{ marginRight: "0.5rem" }} />
          Apple Music
        </div>
        <input
          className="socials-input"
          name="applemusic"
          value={applemusic}
          placeholder="you get the gist"
          onChange={(e) => setApplemusic(e.target.value)}
        />
      </label>
      <label name="spotify" className="update-socials-label">
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
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
        />
      </label>
      <label name="facebook" className="update-socials-label">
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
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </label>
      <label name="discord" className="update-socials-label">
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
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
      </label>
      <label name="twitter" className="update-socials-label">
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
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </label>
      <label name="external" className="update-socials-label">
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
          value={external}
          placeholder="https://www.website.com"
          onChange={(e) => setExternal(e.target.value)}
        />
      </label>
      <button className="close-socials-button button-hover" onClick={onSubmit}>
        Save
      </button>
    </>
  );
};

export default EditSocials;
