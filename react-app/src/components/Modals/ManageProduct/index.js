import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ManageStock from "./ManageStock";
import ManageImages from "./ManageImages";
import { isObjectEmpty, checkNumeric } from "../../../utilities";
import {
  createProductThunk,
  updateProductThunk,
} from "../../../store/products";
import "./ManageProduct.css";

const ManageProduct = ({ product, pageId }) => {
  const dispatch = useDispatch();
  const [currProduct, setCurrProduct] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [description, setDescription] = useState("");
  const [showStock, setShowStock] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (product) setCurrProduct(product || "");
  }, [product]);

  useEffect(() => {
    if (!isObjectEmpty(currProduct)) {
      setName(currProduct.name);
      setPrice(currProduct.price);
      setPreviewImage(currProduct.previewImage);
      setDescription(currProduct.description || "");
    }
  }, [currProduct]);

  const handleUpdateProduct = async () => {
    if (!isObjectEmpty(currProduct)) {
      const currErrors = await dispatch(
        updateProductThunk({
          productId: currProduct.id,
          name,
          price,
          previewImage,
          description,
        })
      );
      if (!isObjectEmpty(currErrors)) {
        setErrors(currErrors);
        return false;
      } else {
        closeModal();
        if (!product)
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        return true;
      }
    } else {
      await dispatch(
        createProductThunk({
          pageId,
          name,
          price,
          previewImage,
          description,
        })
      ).then((data) => {
        if (data.id) setCurrProduct(data);
        else setErrors(data);
      });
    }
  };

  return (
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
        <label className="product-input-label" style={{ marginTop: "0" }}>
          Product Name *
          <input
            className="product-input"
            value={name}
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.name;
                return prev;
              });
              setName(e.target.value);
            }}
          />
        </label>
        <div className="error-msg">{errors.price && errors.price[0]}&nbsp;</div>
        <label className="product-input-label">
          Price (USD) *
          <input
            className="product-input"
            value={price}
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.price;
                return prev;
              });
              if (checkNumeric(e.target.value) || !e.target.value) {
                setPrice(e.target.value);
              }
            }}
          />
        </label>
        <div className="error-msg">{errors.price && errors.price[0]}&nbsp;</div>
        <label className="product-input-label">
          Preview Image *
          <input
            className="product-input"
            value={previewImage}
            onChange={(e) => {
              setErrors((prev) => {
                delete prev.previewImage;
                return prev;
              });
              setPreviewImage(e.target.value);
            }}
          />
        </label>
        <div className="error-msg">
          {errors.previewImage && errors.previewImage[0]}&nbsp;
        </div>
        <label className="product-input-label">
          Description
          <textarea
            className="product-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {!isObjectEmpty(currProduct) && (
          <>
            <ManageStock
              productId={currProduct.id}
              showStock={showStock}
              setShowStock={setShowStock}
              setShowImage={setShowImage}
            />
            <ManageImages
              productId={currProduct.id}
              showImage={showImage}
              setShowImage={setShowImage}
              setShowStock={setShowStock}
            />
          </>
        )}

        <button
          className="update-product-button button-hover"
          onClick={handleUpdateProduct}
        >
          {!isObjectEmpty(currProduct) ? "Update Item" : "Create Item"}
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
