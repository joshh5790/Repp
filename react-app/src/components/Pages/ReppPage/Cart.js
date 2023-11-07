import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import CartItemCard from '../CartItems/CartItemCard'
import { deleteCartThunk, getPageCartThunk } from "../../../store/carts";
import { setCartVisibility } from "../../../store/navigation";
import { formatCurrency } from "../../../utilities";
import "./Cart.css";
import { getCartItemsThunk } from "../../../store/cartItems";

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
    dispatch(getPageCartThunk(pageId))
      .then((data) => dispatch(getCartItemsThunk(data.id)))
      .then((data) => setNumCartItems(data.length));
  }, [dispatch, pageId]);

  const updateCartItem = (quantity) => {

  }

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
              <h2 style={{ marginTop: "0" }}>Cart</h2>
              <div className="cart-items-list">
                {Object.values(cartItems).map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="flex" style={{ gap: "1rem" }}>
                      <img className="cart-item-img" src={item?.image} />
                      <div>
                        <div style={{ marginBottom: "0.5rem" }}>
                          {item?.name}
                        </div>
                        <div style={{ color: "#999999", fontSize: "0.9rem" }}>
                          {item?.size}
                        </div>
                        <input />
                      </div>
                    </div>
                    <div style={{ marginBottom: "0.5rem" }}>
                      {formatCurrency(item?.price * item?.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{position: "absolute", bottom: "0"}}>
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(cart?.subtotal)}</span>
                </div>
                <NavLink
                to='/checkout'
                onClick={() => dispatch(setCartVisibility(false))}
                className='cart-checkout-button'>
                Go to checkout
              </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
