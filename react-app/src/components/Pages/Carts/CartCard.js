import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfileThunk } from "../../../store/profiles";
import { formatCurrency } from "../../../utilities";
import { getCartItemsThunk } from "../../../store/cartItems";
import CartItemCard from "../Profile/CartItemCard";
import "./CartCard.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const CartCard = ({ cart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const allCartItems = Object.values(state.cartItems);
    const filteredCartItems = allCartItems.filter((cartItem) => {
      return cartItem.cartId === cart.id;
    });
    return filteredCartItems;
  });
  const profile = useSelector((state) =>
    Object.values(state.profiles).find(
      (profile) => profile.id === cart.profileId
    )
  );
  const [numCartItems, setNumCartItems] = useState(0);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    dispatch(addProfileThunk(cart.profileId));
    dispatch(getCartItemsThunk(cart.id, true)).then((data) => {
      setNumCartItems(Object.keys(data).length);
    });
  }, [cart]);
  return (
    <div className="cart-card">
      <div className="cart-header">
        <div className="flex-col" style={{ gap: "0.5rem" }}>
          {profile?.personalLogo ? (
            <img
              alt={profile?.displayName}
              src={profile?.personalLogo}
              className="repp-nav-logo"
            />
          ) : (
            <div style={{ fontWeight: "bold" }}>{profile?.displayName}</div>
          )}
          <NavLink
            to={`/${profile?.linkName}`}
            className="cart-profile-link button-hover"
          >
            Visit Profile
          </NavLink>
        </div>
        <div className="cart-header-detail flex-col">
          <div style={{ color: "#999999", fontSize: "0.7rem" }}>SUBTOTAL</div>
          <div>{formatCurrency(cart.subtotal)}</div>
        </div>
      </div>

      <div
        className="flex-col"
        style={{ width: "100%", gap: "1rem", padding: "1rem" }}
      >
        {Object.values(cartItems).map((item) => (
          <CartItemCard
            item={item}
            key={item.id}
            numCartItems={numCartItems}
            setNumCartItems={setNumCartItems}
            setReload={setReload}
          />
        ))}
      </div>
    </div>
  );
};

export default CartCard;
