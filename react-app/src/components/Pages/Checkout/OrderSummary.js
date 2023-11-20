import { formatCurrency } from "../../../utilities";
import './OrderSummary.css'

const OrderSummary = ({ cart, cartItems }) => {
  return (
    <div className="cart-items-checkout">
      <h2>Order Summary</h2>
      <div className="checkout-cart-items-list">

      {cartItems &&
        cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item-card"
            style={{ margin: "1rem 0" }}
          >
            <div style={{ position: "relative" }}>
              <img className="cart-item-img" src={item.image} alt={item.name} />
              <div className="item-quantity-checkout">{item.quantity}</div>
            </div>
            <p>
              {item.name} <br />
              <b>{item.size}</b>
            </p>
            <p>{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="checkout-subtotal-div"
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #EEEEEE",
        }}
      >
        <div>Subtotal</div>
        <div>{formatCurrency(cart.subtotal)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
