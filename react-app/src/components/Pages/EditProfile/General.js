import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isObjectEmpty } from "../../../utilities";
import { updateRPageThunk } from "../../../store/pages";

const General = ({ page }) => {
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
    setDisplayName(page?.displayName || "");
    setLinkName(page?.linkName || "");
    setMainImage(page?.mainImage || "");
    setMainVideo(page?.mainVideo || "");
    setBio(page?.bio || "");
    setNewsletter(page?.newsletter || "");
    setBusinessInquiries(page?.businessInquiries || "");
  }, [page]);

  const onSubmit = async () => {
    setErrors({});

    const currErrors = await dispatch(
      updateRPageThunk({
        pageId: page.id,
        displayName,
        linkName,
        mainImage,
        mainVideo,
        bio,
        newsletter,
        businessInquiries,
        videoSection: page.videoSection,
        shopSection: page.shopSection,
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
      <div className="update-profile-form">
        <label name="display-name" className="new-profile-label">
          <div>Display Name</div>
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
          <div>Link Name</div>
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
          <div>Main Image Link</div>
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

        <button
          className="submit-profile-button button-hover"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
      {mainImage && (
        <div className="update-main-img-container">

          <img
            alt=""
            className="update-main-img-preview"
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
        </div>
      )}
    </>
  );
};

export default General;
