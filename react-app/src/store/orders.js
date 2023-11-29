// constants

const GET_ORDERS = "session/GET_ORDERS";

// Selectors

export const ordersSelector = (state) => {
  const ordersArr = Object.values(state.orders);
  ordersArr.sort((a, b) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB - dateA;
  });
  console.log(ordersArr)
  return ordersArr
}

// action creators

const getOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

// thunks

// GET /session/orders/
export const getOrdersThunk = () => async (dispatch) => {
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

// GET /orders/:orderId
export const getOneOrderThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getOrders({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
}


// POST /carts/:cartId/orders
export const createOrderThunk = (cartId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${cartId}/orders`, {
    method: "POST",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getOrders({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else dispatch(getOrders({}));
}

// clear order
export const clearOrderThunk = () => async (dispatch) => {
  dispatch(getOrders({}));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    default:
      return state;
  }
}
