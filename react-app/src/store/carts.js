// constants

const SET_CARTS = "session/SET_CARTS";
const ADD_CART = "carts/ADD_CART";
const REMOVE_CART = "carts/REMOVE_CART";

// action creators

const setCarts = (carts) => ({
  type: SET_CARTS,
  payload: carts,
});

const addCart = (cart) => ({
  type: ADD_CART,
  payload: cart,
});

const removeCart = (cartId) => ({
  type: REMOVE_CART,
  payload: cartId,
});

// thunks

// GET /session/carts/
export const getCartsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/session/carts`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const cart of data) {
      formattedData[cart.id] = cart;
    }
    dispatch(setCarts(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve carts."];
};

// GET /pages/:pageId/carts
export const getPageCartThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/cart`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addCart({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve cart."];
}

// POST /pages/:pageId/carts
export const createCartThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addCart({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to create cart."];
};

// DELETE /carts/:cartId
export const deleteCartThunk = (cartId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeCart(cartId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete cart."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARTS:
      return { ...action.payload };
    case ADD_CART:
      return { ...state, ...action.payload };
    case REMOVE_CART:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
