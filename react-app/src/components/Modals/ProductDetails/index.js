import "./ProductDetails.css";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getCartThunk, postCartThunk } from '../../store/cart';
// import { postCartProductThunk } from '../../store/cartProducts';

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  // const carts = useSelector(state => state.cart)
  // const cart = carts[product.restaurantId]

  const addToCart = () => {
    // if (!cart?.id) {
    // 	dispatch(postCartThunk(product.restaurantId))
    // 	.then(() => dispatch(postCartProductThunk(product.id, quantity)))
    // 	.then(() => dispatch(getCartThunk()))
    // }
    // else {
    // 	dispatch(postCartProductThunk(product.id, quantity))
    // 	.then(() => dispatch(getCartThunk()))
    // }

    closeModal();
  };

  return (
    <div className="product-modal">
      <i onClick={closeModal} className="fa-solid fa-x modal" />
      <div className="product-img-container">
        <img className="product-modal-img" src={product?.previewImage} alt={product?.name} />
      </div>
      <div className="product-modal-details">
        <h1 className="product-modal-name">{product?.name}</h1>
        <p className="product-modal-price">${product?.price}</p>
        {user ? (
          <>
            <div className="product-modal-quantity">
              <div className="product-modal-quantity-label">Quantity</div>
              <select
                onChange={(e) => setQuantity(e.target.value)}
                className="product-modal-quantity-select"
                value={quantity}
              >
                {Array.from(Array(99).keys()).map((el) => (
                  <option value={el + 1} key={el + 1}>
                    {el + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="product-modal-add-cart" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </>
        ) : (
          <>
            <div>Log in to add this product to your cart.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
