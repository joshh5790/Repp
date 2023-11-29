import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk, ordersSelector } from "../../../store/orders";
import OrderCard from "./OrderCard";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);
  return (
    <div className="page-container flex-col-center">
      <div style={{ width: "90vw", maxWidth: "1200px" }}>
        <h1>Your Order History</h1>
        <div className="flex-col" style={{ gap: "1rem" }}>
          {orders ? (
            orders.map((order) => <OrderCard order={order} />)
          ) : (
            <div>No orders here!</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;
