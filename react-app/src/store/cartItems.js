// constants

const SET_CARTITEMS = "cartItems/SET_CARTITEMS";
const ADD_CARTITEMS = "cartItems/ADD_CARTITEMS";
const REMOVE_CARTITEM = "cartItems/REMOVE_CARTITEM";
const CLEAR_CARTITEMS = "cartItems/CLEAR_CARTITEMS";

// action creators

const setCartItems = (cartItems) => ({
  type: SET_CARTITEMS,
  payload: cartItems,
});

const addCartItems = (cartItems) => ({
  type: ADD_CARTITEMS,
  payload: cartItems,
});

const removeCartItem = (cartItemId) => ({
  type: REMOVE_CARTITEM,
  payload: cartItemId,
});

const clearCartItems = () => ({
    type: CLEAR_CARTITEMS,
})
// thunks

// GET /carts/:cartId/cartItems/
export const getCartItemsThunk = (cartId, add) => async (dispatch) => {
  const response = await fetch(`/api/carts/${cartId}/cartItems`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const cartItem of data) {
      formattedData[cartItem.id] = cartItem;
    }
    if (add) dispatch(addCartItems(formattedData));
    else dispatch(setCartItems(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve cartItems."];
};

// POST /productStock/:productStockId/cartItems/
export const createCartItemThunk =
  (productStockId, quantity) => async (dispatch) => {
    const response = await fetch(
      `/api/productStock/${productStockId}/cartItems`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(addCartItems({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create cartItem."];
  };

// PUT /cartItems/:cartItemId
export const updateCartItemThunk =
  (cartItemId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cartItems/${cartItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addCartItems({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update cartItem."];
  };

// DELETE /cartItems/:cartItemId
export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/cartItems/${cartItemId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeCartItem(cartItemId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete cartItem."];
};

// clear cartItems
export const clearCartItemsThunk = () => async (dispatch) => {
  dispatch(clearCartItems());
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARTITEMS:
      return { ...action.payload };
    case ADD_CARTITEMS:
      return { ...state, ...action.payload };
    case REMOVE_CARTITEM:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case CLEAR_CARTITEMS:
      return {}
    default:
      return state;
  }
}
