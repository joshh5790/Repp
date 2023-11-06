import "./ProductDetails.css";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductStocksThunk } from "../../../store/productStock";
import {
  getProductImagesThunk,
  productImagesSelector,
} from "../../../store/productImages";
import { formatCurrency } from "../../../utilities";

const ProductDetailsModal = ({ product }) => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => Object.values(state.productStock));
  const images = [product.previewImage, ...useSelector(productImagesSelector)];
  const [currSize, setCurrSize] = useState("");
  const [currStock, setCurrStock] = useState("");
  const [outOfStock, setOutOfStock] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [focusImage, setFocusImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    // set size to the first size that has stock
    dispatch(getProductImagesThunk(product.id))
      .then(() => dispatch(getProductStocksThunk(product.id)))
      .then((sizes) => {
        for (const size of sizes) {
          if (size.stock > 0) {
            setCurrStock(size.stock);
            setCurrSize(size.size);
            return;
          }
        }
        setOutOfStock(true);
      })
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  const setSizeStock = (size, stock) => {
    if (stock !== 0) {
      setCurrStock(stock);
      setCurrSize(size);
      setQuantity(1)
    }
  };

  const addToCart = () => {
    // add to cart
    closeModal();
  };

  return (
    <>
      {isLoaded ? (
        <div className="product-modal">
          <i onClick={closeModal} className="fa-solid fa-x modal" />
          <div className="product-img-container">
            <div className="product-carousel-container">
              {images.map((img, idx) => (
                <img
                  onClick={() => setFocusImage(idx)}
                  className={`product-img-carousel ${
                    focusImage === idx ? "focus" : ""
                  }`}
                  key={idx}
                  src={img}
                />
              ))}
            </div>
            <img
              className="product-modal-img"
              src={images[focusImage]}
              alt={product?.name}
            />
          </div>
          <div className="product-modal-details">
            <h1 className="product-modal-name">{product?.name}</h1>
            <p className="product-modal-price">{formatCurrency(product?.price)}</p>
            {!outOfStock ? (
              <div>
                <div className="flex">
                  {sizes.length > 1 &&
                    sizes.map((size) => (
                      <div
                        onClick={() => setSizeStock(size.size, size.stock)}
                        className={`product-size-button
                              ${currSize === size.size ? "focus" : ""}
                              ${size.stock === 0 ? "disabled" : ""}`}
                        key={size.id}
                      >
                        <b>{size.size}</b>
                      </div>
                    ))}
                </div>
                <div className="product-modal-quantity">
                  <div className="product-modal-quantity-label">Quantity</div>
                  <select
                    onChange={(e) => setQuantity(e.target.value)}
                    className="product-modal-quantity-select"
                    value={quantity}
                  >
                    {currStock > 0 &&
                      Array.from(Array(currStock).keys()).map((el) => (
                        <option value={el + 1} key={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <button className="product-modal-button" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="out-of-stock">
                <b>Out of Stock</b>
              </div>
            )}
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
            <h1 className="product-modal-name skeleton" />
            <p className="product-modal-price skeleton" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsModal;
