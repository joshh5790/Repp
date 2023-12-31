import { useEffect, useState } from "react";
import { formatCurrency, invalidImage } from "../../../utilities";
import { useDispatch } from "react-redux";
import {
  clearCartItemsThunk,
  deleteCartItemThunk,
  updateCartItemThunk,
} from "../../../store/cartItems";
import { deleteCartThunk } from "../../../store/carts";
import { setCartVisibility } from "../../../store/navigation";

const CartItemCard = ({ item, numCartItems, setNumCartItems, setReload }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])
  
  const updateCartItem = async (newQuantity) => {
    if (newQuantity === "remove") {
      if (numCartItems === 1) {
        setNumCartItems(0);
        dispatch(deleteCartThunk(item.cartId));
        dispatch(clearCartItemsThunk());
        dispatch(setCartVisibility(false));
      } else {
        setNumCartItems((prev) => prev - 1);
        await dispatch(deleteCartItemThunk(item.id))
        .then(() => setReload(prev => !prev));
      }
      setReload(prev => !prev)
      return;
    }
    setQuantity(newQuantity);
    await dispatch(updateCartItemThunk(item.id, newQuantity))
    .then(() => setReload(prev => !prev));
  };
  return (
    <div key={item.id} className="cart-item-card">
      <div style={{ display: 'flex', gap: "1rem" }}>
        <img
          alt=""
          className="cart-item-img"
          src={item?.image}
          onError={invalidImage}
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
            {/* shouldnt be able to exceed stock */}
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
