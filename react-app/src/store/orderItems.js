// constants

const SET_ORDERITEMS = "orderItems/SET_ORDERITEMS";

// action creators

const setOrderItems = (orderItems) => ({
  type: SET_ORDERITEMS,
  payload: orderItems,
});

// thunks

// GET /orders/:orderId/orderItems
export const getOrderItemsThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}/orderItems`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const orderItem of data) {
      formattedData[orderItem.id] = orderItem;
    }
    dispatch(setOrderItems(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve orderItems."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERITEMS:
      return { ...action.payload };
    default:
      return state;
  }
}
