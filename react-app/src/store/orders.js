// constants

const GET_ORDERS = "session/GET_ORDERS";
const REMOVE_ORDER = "orders/REMOVE_ORDER";

// action creators

const getOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

const removeOrder = (orderId) => ({
  type: REMOVE_ORDER,
  payload: orderId,
});

// thunks

// GET /session/orders/
export const getOrderThunk = () => async (dispatch) => {
  const response = await fetch(`/api/session/orders`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const order of data) {
      formattedData[order.id] = order;
    }
    dispatch(getOrders(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
};

// GET /pages/:pageId/orders
export const getPageOrderThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/order`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getOrders({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
};

// POST /pages/:pageId/orders
export const createOrderThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getOrders({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
};

// DELETE /orders/:orderId
export const deleteOrderThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeOrder(orderId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
};

// clear order
export const clearOrderThunk = () => async (dispatch) => {
  dispatch(getOrders({}));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    case REMOVE_ORDER:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
