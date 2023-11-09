import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ManageStock from "./ManageStock";
import ManageImages from "./ManageImages";
import "./EditProduct.css";

const EditProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [description, setDescription] = useState("");
  const [showStock, setShowStock] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setPreviewImage(product.previewImage || "");
      setDescription(product.description || "");
      setIsLoaded(true);
    }
  }, [dispatch, product]);

  const handleUpdateProduct = () => {};

  return (
    <>
      {isLoaded ? (
        <div className="edit-product-modal">
          <i onClick={closeModal} className="fa-solid fa-x modal" />
          <div className="product-img-container">
            <img
              alt=""
              className="product-modal-img"
              src={previewImage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}
            />
          </div>
          <div className="product-modal-details">
            <label className="product-input-label">
              Product Name
              <input
                className="product-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="product-input-label">
              Price (USD)
              <input
                className="product-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="product-input-label">
              Preview Image
              <input
                className="product-input"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
              />
            </label>
            <label className="product-input-label">
              Description
              <textarea
                className="product-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <ManageStock
              productId={product.id}
              showStock={showStock}
              setShowStock={setShowStock}
              setShowImage={setShowImage}
            />
            <ManageImages
              productId={product.id}
              showImage={showImage}
              setShowImage={setShowImage}
              setShowStock={setShowStock}
            />

            <button
              className="update-product-button button-hover"
              onClick={handleUpdateProduct}
            >
              Update Item
            </button>
          </div>
        </div>
      ) : (
        <div className="edit-product-modal">
          <i onClick={closeModal} className="fa-solid fa-x modal" />
          <div className="product-img-container">
            <div className="product-modal-img skeleton" />
          </div>
          <div className="product-modal-details">
            <h1 className="product-modal-name skeleton">&nbsp;</h1>
            <p className="product-modal-price skeleton" />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
