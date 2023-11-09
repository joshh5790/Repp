import { useModal } from "../../../context/Modal";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductStocksThunk } from "../../../store/productStock";
import {
  getProductImagesThunk,
  productImagesSelector,
} from "../../../store/productImages";
import "./EditProduct.css";

const EditProduct = ({ product }) => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => Object.values(state.productStock));
  const productImages = useSelector(productImagesSelector);
  const [focusImage, setFocusImage] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [editSize, setEditSize] = useState("");
  const [editStock, setEditStock] = useState("");
  const [showStock, setShowStock] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();
  const stockRef = useRef();

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setPreviewImage(product.previewImage || "");
      setDescription(product.description || "");
      dispatch(getProductImagesThunk(product.id))
        .then(() => dispatch(getProductStocksThunk(product.id)))
        .then(() => setIsLoaded(true));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (!showStock) return;

    const closeStock = (e) => {
      if (!stockRef.current.contains(e.target)) {
        console.log(stockRef.current, e.target, "THIS IS CURRENT")
        setShowStock(false);
      }
    };

    document.addEventListener("click", closeStock);

    return () => document.removeEventListener("click", closeStock);
  }, [showStock]);

  const handleUpdateProduct = () => {};

  const openStock = (e) => {
    e.preventDefault()
    if (showStock) return;
    setShowStock(true);
  };

  return (
    <>
      {isLoaded ? (
        <div className="product-modal">
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
            <div>
              <div className="add-sizes-container">
                <b>Sizes</b>{" "}
                <button className="add-size-button" onClick={(e) => openStock(e)}>
                  + Add size/stock
                </button>
                <div
                  className={"stock-dropdown" + (showStock ? "" : " hidden")}
                  ref={stockRef}
                >
                  <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                    Leave size blank if product only has one size
                  </p>
                  <label className="product-input-label">
                    Size:
                    <input type="text" />
                  </label>
                  <label className="product-input-label">
                    Stock:
                    <input type="text" />
                  </label>
                  <button>Add</button>
                </div>
              </div>
              {sizes.length > 1 && (
                <div className="flex">
                  {sizes.map((size) => (
                    <div className="product-size-button" key={size.id}>
                      <b>{size.size || "Single Size"}</b>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-images-container">
              <b>Images</b>{" "}
                <button className="add-size-button" onClick={() => openStock()}>
                  + Add image
                </button>
                <div
                  className={"stock-dropdown" + (showStock ? "" : " hidden")}
                  ref={stockRef}
                >
                  <label className="product-input-label">
                    Image url:
                    <input type="text" />
                  </label>
                  <button>Add</button>
                </div>
              </div>

              <button
                className="add-to-cart-button"
                onClick={handleUpdateProduct}
              >
                Update Item
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-modal">
          <i onClick={closeModal} className="fa-solid fa-x modal" />
          <div className="product-img-container">
            <div className="product-carousel-container" />
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
