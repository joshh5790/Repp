import { useState } from "react";
import "./CreateProfile.css";
import OpenModalButton from "../../OpenModalButton";
import SocialsForm from "../../Modals/SocialsForm";
import { useDispatch } from "react-redux";
import { createRPageThunk } from "../../../store/pages";
import { isObjectEmpty } from "../../../utilities";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [socials, setSocials] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [bio, setBio] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [businessInquiries, setBusinessInquiries] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    setErrors({});

    if (isObjectEmpty(errors)) {
      const currErrors = dispatch(
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
      console.log(currErrors)
      if (currErrors) return setErrors(currErrors)
    }
  };

  // don't allow characters that aren't alphanumeric or dashes in linkname
  const checkLinkName = (input) => {
    if (/^[a-zA-Z0-9-]*$/.test(input)) {
      setLinkName(input);
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: "1rem" }}>
      <h1>Design Your Profile Page</h1>
      <div className="create-profile-form">
        <label name="display-name" className="new-profile-label">
          <div>Display Name *</div>
          <input
            className="new-profile-input"
            name="display-name"
            type="text"
            value={displayName}
            placeholder="Rad Mango"
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>
        <label name="link-name" className="new-profile-label">
          <div>Link Name *</div>
          <input
            className="new-profile-input"
            name="link-name"
            type="text"
            value={linkName}
            placeholder="rad-mango"
            onChange={(e) => checkLinkName(e.target.value)}
            required
          />
        </label>
        <label name="main-image" className="new-profile-label">
          <div>Main Image Link *</div>
          <input
            className="new-profile-input"
            name="main-image"
            type="text"
            value={mainImage}
            placeholder="https://radmango.com/images/radmango.png"
            onChange={(e) => setMainImage(e.target.value)}
            required
          />
        </label>
        <label name="main-video" className="new-profile-label">
          <div>Main Video Link</div>
          <input
            className="new-profile-input"
            name="main-video"
            type="text"
            value={mainVideo}
            onChange={(e) => setMainVideo(e.target.value)}
          />
        </label>
        <label name="bio" className="new-profile-label">
          <div>Bio</div>
          <textarea
            className="new-profile-input"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label name="newsletter" className="new-profile-label">
          <div>Newsletter Link</div>
          <input
            className="new-profile-input"
            name="newsletter"
            type="text"
            value={newsletter}
            onChange={(e) => setNewsletter(e.target.value)}
          />
        </label>
        <label name="business-inquiries" className="new-profile-label">
          <div>Business Inquiries Email</div>
          <input
            className="new-profile-input"
            name="business-inquiries"
            type="text"
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
