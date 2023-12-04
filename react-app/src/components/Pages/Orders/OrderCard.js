import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageThunk } from "../../../store/pages";
import { formatCurrency } from "../../../utilities";
import { getOrderItemsThunk } from "../../../store/orderItems";
import OrderItem from "./OrderItem";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const [formattedDate, setFormattedDate] = useState(order?.createdAt);
  const orderItems = useSelector((state) => {
    const allOrderItems = Object.values(state.orderItems);
    const filteredOrderItems = allOrderItems.filter((orderItem) => {
      return orderItem.orderId === order.id
    });
    return filteredOrderItems;
  });
  const page = useSelector((state) => Object.values(state.pages).find(page => page.id === order.pageId));
  useEffect(() => {
    dispatch(addPageThunk(order.pageId));
    dispatch(getOrderItemsThunk(order.id));
    if (order?.createdAt) {
      const dateType = new Date(order.createdAt);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setFormattedDate(dateType.toLocaleDateString("en-US", options));
    }
  }, [order]);
  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          {page?.personalLogo ? (
            <img
              alt={page?.displayName}
              src={page?.personalLogo}
              className="repp-nav-logo"
            />
          ) : (
            <div style={{ fontWeight: "bold" }}>{page?.displayName}</div>
          )}
          <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Order ID #{order.id}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="order-header-detail flex-col">
            <div style={{ color: "#999999", fontSize: "0.7rem" }}>
              ORDER PLACED
            </div>
            <div>{formattedDate}</div>
          </div>
          <div className="order-header-detail flex-col">
            <div style={{ color: "#999999", fontSize: "0.7rem" }}>TOTAL</div>
            <div>{formatCurrency(order.total)}</div>
          </div>
        </div>
      </div>
      <div
        className="flex-col"
        style={{ width: "100%", gap: "1rem", padding: "1rem" }}
      >
        {orderItems.length && (
          orderItems.map((item) => <OrderItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default OrderCard;
