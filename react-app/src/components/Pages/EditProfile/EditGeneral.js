import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isObjectEmpty } from "../../../utilities";
import { updateProfileThunk } from "../../../store/profiles";

const EditGeneral = ({ profile }) => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [bio, setBio] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [businessInquiries, setBusinessInquiries] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDisplayName(profile?.displayName || "");
    setLinkName(profile?.linkName || "");
    setMainImage(profile?.mainImage || "");
    setMainVideo(profile?.mainVideo || "");
    setBio(profile?.bio || "");
    setNewsletter(profile?.newsletter || "");
    setBusinessInquiries(profile?.businessInquiries || "");
  }, [profile]);

  const onSubmit = async () => {
    setErrors({});

    const currErrors = await dispatch(
      updateProfileThunk({
        profileId: profile.id,
        shopSection: profile.shopSection,
        videoSection: profile.videoSection,
        displayName,
        linkName,
        mainImage,
        mainVideo,
        bio,
        newsletter,
        businessInquiries,
      })
    );
    if (!isObjectEmpty(currErrors)) return setErrors(currErrors);
  };

  const checkLinkName = (input) => {
    if (/^[a-zA-Z0-9-]*$/.test(input)) {
      setLinkName(input);
    }
  };

  return (
    <>
      <label name="display-name" className="new-profile-label">
        <div>Display Name *</div>
        <input
          style={{ width: "95%" }}
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
          style={{ width: "95%" }}
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
        <div>Main Image URL *</div>
        <input
          style={{ width: "95%" }}
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
          style={{ width: "95%" }}
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
          style={{ width: "95%" }}
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
          style={{ width: "95%" }}
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
          style={{ width: "95%" }}
          name="business-inquiries"
          type="text"
          placeholder="mangomanager@mgmt.com"
          value={businessInquiries}
          onChange={(e) => setBusinessInquiries(e.target.value)}
        />
      </label>

      <button
        className="submit-profile-button button-hover"
        onClick={onSubmit}
        style={{ alignSelf: "center" }}
      >
        Save
      </button>
    </>
  );
};

export default EditGeneral;
