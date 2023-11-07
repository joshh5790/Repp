import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import { deleteCartThunk, getPageCartThunk } from "../../../store/carts";
import { setCartVisibility } from "../../../store/navigation";
import { formatCurrency } from "../../../utilities";
import "./Cart.css";
import {
  clearCartItemsThunk,
  getCartItemsThunk,
} from "../../../store/cartItems";

const Cart = ({ pageId, numCartItems, setNumCartItems }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => Object.values(state.carts)[0]);
  const cartItems = useSelector((state) => state.cartItems);
  const cartVisible = useSelector((state) => state.visibility.cart);
  // const [showOptions, setShowOptions] = useState(false);
  // const optionsRef = useRef();

  // on page load
  useEffect(() => {
    if (pageId) {
      dispatch(getPageCartThunk(pageId))
        .then((data) =>{
          if (data.id) {
            dispatch(getCartItemsThunk(data.id))
            .then((data) => setNumCartItems(data.length));
          }
        })
    }
  }, [dispatch, pageId]);

  const handleCheckout = () => {
    dispatch(setCartVisibility(false));
    history.push("/checkout");
  };

  const handleDeleteCart = () => {
    dispatch(setCartVisibility(false));
    dispatch(deleteCartThunk(cart.id));
    dispatch(clearCartItemsThunk());
    setNumCartItems(0);
  };

  return (
    <>
      {numCartItems && (
        <div
          onClick={() => dispatch(setCartVisibility((prev) => !prev))}
          className={`open-cart-button ${numCartItems ? "" : "hidden"}`}
        >
          <div>{numCartItems}</div>
          <i className="fa-solid fa-cart-shopping" />
        </div>
      )}
      <div
        id="cart-background"
        className={cartVisible && cart ? "" : "hidden"}
        onClick={() => dispatch(setCartVisibility(false))}
      >
        &nbsp;
      </div>
      <div className={`cart-sidebar ${cartVisible ? "" : "hide-cart"}`}>
        <i
          onClick={() => dispatch(setCartVisibility(false))}
          className="fa-solid fa-x modal"
        />
        <h2 style={{ margin: "1.5rem 0 1.5rem 1.5rem" }}>Cart</h2>
        <div className="cart-items-list">
          {Object.values(cartItems).map((item) => (
            <CartItemCard
              item={item}
              key={item.id}
              numCartItems={numCartItems}
              setNumCartItems={setNumCartItems}
            />
          ))}
        </div>
        <div className="cart-bottom">
          <div onClick={handleDeleteCart} className="clear-cart-button button-hover">
            <i className="fa-solid fa-trash" />
            <span style={{ marginLeft: "0.5rem" }}>Clear Cart</span>
          </div>
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>{formatCurrency(cart?.subtotal)}</span>
          </div>
          <NavLink
            to="/checkout"
            onClick={handleCheckout}
            className="cart-checkout-button button-hover"
          >
            Go to checkout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Cart;
