import "./ProductDetails.css";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductStocksThunk } from "../../../store/productStock";
import { getProductImagesThunk } from "../../../store/productImages";
import { setCartVisibility } from "../../../store/navigation";
import {
  clearCartItemsThunk,
  createCartItemThunk,
  getCartItemsThunk,
} from "../../../store/cartItems";
import { createCartThunk, getProfileCartThunk } from "../../../store/carts";
import { formatCurrency, invalidImage } from "../../../utilities";
import OpenModalButton from "../../OpenModalButton";
import LoginForm from "../LoginForm";

const ProductDetails = ({ product, setNumCartItems, preview, user }) => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => Object.values(state.productStock));
  const images = [
    product.previewImage,
    ...useSelector((state) =>
      Object.values(state.productImages).map((obj) => {
        return obj.image;
      })
    ),
  ];
  const carts = useSelector((state) => Object.values(state.carts));
  const [currStock, setCurrStock] = useState({});
  const [outOfStock, setOutOfStock] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [focusImage, setFocusImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(preview);
  const { closeModal } = useModal();

  useEffect(() => {
    // set size to the first size that has stock
    if (preview) setIsDisabled(true);
    dispatch(getProductImagesThunk(product.id))
      .then(() => dispatch(getProductStocksThunk(product.id)))
      .then((sizes) => {
        for (const size of sizes) {
          if (size.stock > 0) {
            setCurrStock(size);
            return;
          }
        }
        setOutOfStock(true);
      })
      .then(() => setIsLoaded(true));
  }, [dispatch, product.id, preview]);

  const setSizeStock = (size) => {
    if (size.stock !== 0) {
      setCurrStock(size);
      setQuantity(1);
    }
  };

  const addToCart = async () => {
    setIsDisabled(true);
    let existingCart;
    for (const cart of carts) {
      if (cart.profileId === product.profileId) {
        existingCart = cart.id;
        break;
      }
    }
    if (existingCart) {
      await dispatch(createCartItemThunk(currStock.id, quantity)).then(() =>
        dispatch(getProfileCartThunk(product.profileId)).then((data) =>
          dispatch(getCartItemsThunk(data.id)).then((data) =>
            setNumCartItems(data.length)
          )
        )
      );
    } else {
      await dispatch(createCartThunk(product.profileId))
        .then(() => dispatch(clearCartItemsThunk()))
        .then(() => dispatch(createCartItemThunk(currStock.id, quantity)))
        .then(() => dispatch(getProfileCartThunk(product.profileId)))
        .then(() => dispatch(setCartVisibility(true)));
      setNumCartItems((prev) => prev + 1);
    }
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
                  alt=""
                  onClick={() => setFocusImage(idx)}
                  className={`product-img-carousel ${
                    focusImage === idx ? "focus" : ""
                  }`}
                  key={idx}
                  src={img}
                  onError={invalidImage}
                />
              ))}
            </div>
            <img
              alt=""
              className="product-modal-img"
              src={images[focusImage]}
              onError={invalidImage}
            />
          </div>
          <div className="product-modal-details">
            <h1 className="product-modal-name">{product?.name}</h1>
            <p className="product-modal-price">
              {formatCurrency(product?.price)}
            </p>
            {!outOfStock && user && user?.id ? (
              <div>
                <div style={{ display: "flex" }}>
                  {sizes.length > 1 &&
                    sizes.map((size) => (
                      <div
                        onClick={() => setSizeStock(size)}
                        className={`product-size-button
                              ${currStock.size === size.size ? "focus" : ""}
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
                    {currStock.stock > 0 &&
                      Array.from(Array(currStock.stock).keys()).map((el) => (
                        <option value={el + 1} key={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  className="add-to-cart-button button-hover"
                  onClick={addToCart}
                  disabled={isDisabled}
                >
                  Add to Cart
                </button>
              </div>
            ) : outOfStock ? (
              <div className="out-of-stock">
                <b>Out of Stock</b>
              </div>
            ) : (
              <>
                <div className="out-of-stock" style={{ color: "#444444" }}>
                  <b>Log in to add this item to your cart.</b>
                </div>
                <OpenModalButton
                  buttonText="LOG IN"
                  modalComponent={<LoginForm />}
                  className="cart-login-button button-hover"
                />
              </>
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
            <h1 className="product-modal-name skeleton">&nbsp;</h1>
            <p className="product-modal-price skeleton" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
