import { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isObjectEmpty } from "../../../utilities";
import { createRPageThunk } from "../../../store/pages";
import { authenticate } from "../../../store/session";
import OpenModalButton from "../../OpenModalButton";
import SocialsForm from "../../Modals/SocialsForm";
import "./CreateProfile.css";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [displayName, setDisplayName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [socials, setSocials] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [bio, setBio] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [businessInquiries, setBusinessInquiries] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async () => {
    setErrors({});

    const currErrors = await dispatch(
      createRPageThunk(
        displayName,
        linkName,
        socials,
        mainImage,
        mainVideo,
        bio,
        newsletter,
        businessInquiries,
        false,
        false
      )
    );
    if (!isObjectEmpty(currErrors)) return setErrors(currErrors);
    else {
      dispatch(authenticate());
      history.push(`/${linkName}`);
    }
  };

  // don't allow characters that aren't alphanumeric or dashes in linkname
  const checkLinkName = (input) => {
    if (/^[a-zA-Z0-9-]*$/.test(input)) {
      setLinkName(input);
    }
  };

  if (!user || user.isRepp) {
    return (
      <div className="unavailable page-container">
        <h1>Sorry, this page isn't available.</h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <NavLink to="/">Click here to return to the home page.</NavLink>
      </div>
    );
  }
  return (
    <div className="page-container">
      {mainImage && (
        <img
          className="main-img-preview"
          src={mainImage}
          onError={({ target }) => {
            setErrors((prev) => {
              return { ...prev, mainImage: ["Invalid image url"] };
            });
            target.onerror = null;
            target.src =
              "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
          }}
        />
      )}
      <div className="create-profile-form">
        <h1>Design Your Profile Page</h1>
        <label name="display-name" className="new-profile-label">
          <div>Display Name *</div>
          <input
            className="new-profile-input"
            name="display-name"
            type="text"
            value={displayName}
            placeholder="Rad Mango"
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.displayName;
                return prev;
              });
              setDisplayName(e.target.value);
            }}
            required
          />
          <div className="error-msg">
            {errors.displayName && errors.displayName[0]}&nbsp;
          </div>
        </label>
        <label name="link-name" className="new-profile-label">
          <div>Link Name *</div>
          <input
            className="new-profile-input"
            name="link-name"
            type="text"
            value={linkName}
            placeholder="rad-mango"
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.linkName;
                return prev;
              });
              checkLinkName(e.target.value);
            }}
            required
          />
          <div className="error-msg">
            {errors.linkName && errors.linkName[0]}&nbsp;
          </div>
        </label>
        <label name="main-image" className="new-profile-label">
          <div>Main Image Link *</div>
          <input
            className="new-profile-input"
            name="main-image"
            type="text"
            value={mainImage}
            placeholder="https://radmango.com/images/radmango.png"
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.mainImage;
                return prev;
              });
              setMainImage(e.target.value);
            }}
            required
          />
          <div className="error-msg">
            {errors.mainImage && errors.mainImage[0]}&nbsp;
          </div>
        </label>
        <label
          name="main-video"
          className="new-profile-label"
          style={{ marginBottom: "1rem" }}
        >
          <div>Main Video Link</div>
          <input
            className="new-profile-input"
            name="main-video"
            type="text"
            value={mainVideo}
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            onChange={(e) => setMainVideo(e.target.value)}
          />
        </label>
        <label
          name="bio"
          className="new-profile-label"
          style={{ marginBottom: "1rem" }}
        >
          <div>Bio</div>
          <textarea
            className="new-profile-input"
            name="bio"
            value={bio}
            placeholder="Raddest of mangoes"
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label
          name="newsletter"
          className="new-profile-label"
          style={{ marginBottom: "1rem" }}
        >
          <div>Newsletter Link</div>
          <input
            className="new-profile-input"
            name="newsletter"
            type="text"
            value={newsletter}
            placeholder="https://radmango.com/newsletter"
            onChange={(e) => setNewsletter(e.target.value)}
          />
        </label>
        <label
          name="business-inquiries"
          className="new-profile-label"
          style={{ marginBottom: "1rem" }}
        >
          <div>Business Inquiries Email</div>
          <input
            className="new-profile-input"
            name="business-inquiries"
            type="text"
            placeholder="mangomanager@mgmt.com"
            value={businessInquiries}
            onChange={(e) => setBusinessInquiries(e.target.value)}
          />
        </label>
        <div className="socials-button-div">
          <OpenModalButton
            buttonText="Link Socials"
            modalComponent={
              <SocialsForm socials={socials} setSocials={setSocials} />
            }
            className="socials-form-button button-hover"
          />
          <div>
            {socials?.tiktok && (
              <a target="_blank" rel="noreferrer" href={socials?.tiktok}>
                <i
                  className="fa-brands fa-tiktok"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.instagram && (
              <a target="_blank" rel="noreferrer" href={socials?.instagram}>
                <i
                  className="fa-brands fa-youtube"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.youtube && (
              <a target="_blank" rel="noreferrer" href={socials?.youtube}>
                <i
                  className="fa-brands fa-instagram"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.applemusic && (
              <a target="_blank" rel="noreferrer" href={socials?.applemusic}>
                <i
                  className="fa-brands fa-apple"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.spotify && (
              <a target="_blank" rel="noreferrer" href={socials?.spotify}>
                <i
                  className="fa-brands fa-spotify"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.facebook && (
              <a target="_blank" rel="noreferrer" href={socials?.facebook}>
                <i
                  className="fa-brands fa-facebook"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.discord && (
              <a target="_blank" rel="noreferrer" href={socials?.discord}>
                <i
                  className="fa-brands fa-discord"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.twitter && (
              <a target="_blank" rel="noreferrer" href={socials?.twitter}>
                <i
                  className="fa-brands fa-twitter"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
            {socials?.external && (
              <a target="_blank" rel="noreferrer" href={socials?.external}>
                <i
                  className="fa-solid fa-square-up-right"
                  style={{ marginLeft: "0.5rem" }}
                />
              </a>
            )}
          </div>
        </div>
        <button
          className="submit-profile-button button-hover"
          onClick={onSubmit}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;
