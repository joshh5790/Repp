import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import CartItemCard from '../CartItems/CartItemCard'
import { deleteCartThunk, getPageCartThunk } from "../../../store/carts";
import { setCartVisibility } from "../../../store/navigation";
import "./Cart.css";
import { getCartItemsThunk } from "../../../store/cartItems";

const Cart = ({ pageId, numCartItems, setNumCartItems }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.carts);
  const cartItems = useSelector((state) => state.cartItems);
  const cartVisible = useSelector((state) => state.visibility.cart);
  // const [showOptions, setShowOptions] = useState(false);
  // const optionsRef = useRef();

  // on page load
  useEffect(() => {
    dispatch(getPageCartThunk(pageId))
      .then((data) => dispatch(getCartItemsThunk(data.id)))
      .then((data) => setNumCartItems(data.length));
  }, [dispatch, pageId]);

  return (
    <>
      {cart && (
        <>
          <div
            onClick={() => dispatch(setCartVisibility((prev) => !prev))}
            className={`open-cart-button ${numCartItems ? "" : "hidden"}`}
          >
            <div>{numCartItems}</div>
            <i className="fa-solid fa-cart-shopping" />
          </div>
          <div
            id="cart-background"
            className={cartVisible ? "" : "hidden"}
            onClick={() => dispatch(setCartVisibility(false))}
          >
            &nbsp;
          </div>
          <div className={`cart-sidebar ${cartVisible ? "" : "hide-cart"}`}>
            <i
              onClick={() => dispatch(setCartVisibility(false))}
              className="fa-solid fa-x modal"
            />
            <div className="cart-sidebar-content">
              <div>Cart</div>
              <div className="cart-items-list">
                {Object.values(cartItems).map(item => (
                  <div>{item.name}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
