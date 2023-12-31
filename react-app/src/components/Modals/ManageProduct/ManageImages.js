import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductImagesThunk,
  createProductImageThunk,
  deleteProductImageThunk,
} from "../../../store/productImages";
import "./ManageImages.css";
import { invalidImage } from "../../../utilities";

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
  }, [showImage, setShowImage]);

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

  const handleDeleteImage = (imageId) => {
    dispatch(deleteProductImageThunk(imageId));
    setReload((prev) => !prev);
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
            Image URL:
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
            <div key={image.id} style={{ position: "relative" }}>
              <img
                alt=""
                src={image.image}
                className="list-image"
                onError={invalidImage}
              />
              <i
                onClick={() => handleDeleteImage(image.id)}
                className="fa-solid fa-x del-img-x"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ManageImages;
