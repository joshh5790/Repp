import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductImagesThunk,
  createProductImageThunk,
} from "../../../store/productImages";
import "./ManageImages.css";

const ManageImages = ({ productId, showImage, setShowImage, setShowStock }) => {
  const dispatch = useDispatch();
  const productImages = useSelector((state) =>
    Object.values(state.productImages)
  );
  const [editImageUrl, setEditImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [reload, setReload] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    dispatch(getProductImagesThunk(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!showImage) return;

    const closeImages = (e) => {
      if (!imageRef.current.contains(e.target)) {
        setShowImage(false);
      }
    };

    document.addEventListener("click", closeImages);

    return () => document.removeEventListener("click", closeImages);
  }, [showImage]);

  const openImage = (e) => {
    e.stopPropagation();
    setShowImage((prev) => !prev);
    setShowStock(false);
  };

  const handleCreateImage = () => {
    if (!editImageUrl) {
      return setErrors((prev) => {
        return { ...prev, editImageUrl: ["Please enter an image url"] };
      });
    } else if (!errors.editImageUrl) {
      dispatch(createProductImageThunk(productId, editImageUrl));
      setEditImageUrl("");
      setShowImage(false);
      setReload((prev) => !prev);
    }
  };

  return (
    <>
      <div className="add-images-container">
        <b>Additional Images</b>{" "}
        <button className="modal-add-button" onClick={(e) => openImage(e)}>
          + Add image
        </button>
        <div
          className={"image-dropdown" + (showImage ? "" : " hidden")}
          ref={imageRef}
        >
          <label className="product-input-label">
            Image url:
            <input
              value={editImageUrl}
              onChange={(e) => {
                setErrors((prev) => {
                  delete prev.editImageUrl;
                  return prev;
                });
                setEditImageUrl(e.target.value);
              }}
              type="text"
            />
          </label>
          <div className="error-msg">
            {errors.editImageUrl && errors.editImageUrl[0]}&nbsp;
          </div>
          <button
            onClick={handleCreateImage}
            className="modal-dropdown-button button-hover"
          >
            Add
          </button>
        </div>
      </div>
      {productImages.length > 0 && (
        <div style={{ display: "flex", overflow: "auto", overflowY: "hidden" }}>
          {productImages.map((image) => (
            <img
              alt=""
              src={image?.image}
              className="list-image"
              key={image.id}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ManageImages;
