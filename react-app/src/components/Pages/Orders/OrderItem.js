import { invalidImage } from "../../../utilities";
import "./OrderItem.css";

const OrderItem = ({ item }) => {
  return (
    <div key={item.id} className="order-item-card">
      <div style={{ display: "flex", gap: "1rem" }}>
        <img
          alt=""
          className="order-item-img"
          src={item?.image}
          onError={invalidImage}
        />
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>{item?.name}</h3>
        <div
          style={{
            color: "#999999",
            fontSize: "0.9rem",
            paddingBottom: "0.5rem",
          }}
        >
          {item.size && `Size: ${item.size}`}
        </div>
        <div>Amount: {item?.quantity}</div>
      </div>
      </div>
    </div>
  );
};

export default OrderItem;
