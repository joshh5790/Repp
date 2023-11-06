import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import CartItemCard from '../CartItems/CartItemCard'
import { deleteCartThunk, getCartsThunk } from "../../store/carts";
import "./Cart.css";
import { getCartItemsThunk } from "../../store/cartItems";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, carts, cartItems } = useSelector((state) => {
    state.session.user,
    state.carts,
    state.cartItems
  });
  const [cartVisible, setCartVisible] = useState(false)
  const [cart, setCart] = useState({});
  const [numItems, setNumItems] = useState(0);
  // const [numCarts, setNumCarts] = useSt3ate(0);
  // const [showCarts, setShowCarts] = useState(false);
  // const [showOptions, setShowOptions] = useState(false);
  // const optionsRef = useRef();
  // const cartsRef = useRef();


  // on page load
  useEffect(() => {
    dispatch(getCartsThunk()).then((carts) => {
      if (carts[0]) dispatch(getCartItemsThunk(carts[0]?.id));
    });
  }, [dispatch]);

  return (
    <>
    {cart && <>
      <div onClick={() => setCartVisible(prev => !prev)} className="open-cart-button">
        <i className="fa-solid fa-cart-shopping" />
      </div>
      <div
        id="cart-background"
        className={cartVisible ? "" : "hidden"}
        onClick={() => setCartVisible(false)}
      >
        &nbsp;
      </div>
      <div className={`cart-sidebar ${cartVisible ? "" : "hide-cart"}`}>
        <i
          onClick={() => setCartVisible(false)}
          className="fa-solid fa-x modal"
        />
      </div>
    </>}
    </>
  );
};

export default Cart;
