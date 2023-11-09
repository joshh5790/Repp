import { useState } from "react";
import { formatCurrency } from "../../../utilities";
import { useDispatch } from "react-redux";
import {
  clearCartItemsThunk,
  deleteCartItemThunk,
  updateCartItemThunk,
} from "../../../store/cartItems";
import { deleteCartThunk } from "../../../store/carts";
import { setCartVisibility } from "../../../store/navigation";

const CartItemCard = ({ item, numCartItems, setNumCartItems }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const updateCartItem = (newQuantity) => {
    if (newQuantity === "remove") {
      if (numCartItems === 1) {
        setNumCartItems(0);
        dispatch(deleteCartThunk(item.cartId));
        dispatch(clearCartItemsThunk());
        dispatch(setCartVisibility(false));
      } else {
        setNumCartItems((prev) => prev - 1);
        dispatch(deleteCartItemThunk(item.id));
      }
      return;
    }
    setQuantity(newQuantity);
    dispatch(updateCartItemThunk(item.id, newQuantity));
  };
  return (
    <div key={item.id} className="cart-item-card">
      <div style={{ display: 'flex', gap: "1rem" }}>
        <img
          alt=""
          className="cart-item-img"
          src={item?.image}
          onError={({ target }) => {
            target.onerror = null;
            target.src =
              "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
          }}
        />
        <div>
          <div style={{ marginBottom: "0.5rem" }}>{item?.name}</div>
          <div style={{ color: "#999999", fontSize: "0.9rem" }}>
            {item?.size}
          </div>
          <select
            onChange={(e) => updateCartItem(e.target.value)}
            className="cart-item-quantity-select"
            value={quantity}
          >
            <option value="remove">Remove</option>
            {Array.from(Array(99).keys()).map((el) => (
              <option value={el + 1} key={el + 1}>
                {el + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        {formatCurrency(item?.price * item?.quantity)}
      </div>
    </div>
  );
};

export default CartItemCard;
