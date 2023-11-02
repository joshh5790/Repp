import { csrfFetch } from "./csrf"

// constants

const SET_CARTITEMS = 'cartItems/SET_CARTITEMS'
const ADD_CARTITEM = 'cartItems/ADD_CARTITEM'
const REMOVE_CARTITEM = 'cartItems/REMOVE_CARTITEM'

// action creators

const setCartItems = (cartItems) => ({
	type: SET_CARTITEMS,
	payload: cartItems
})

const addCartItem = (cartItem) => ({
  type: ADD_CARTITEM,
  payload: cartItem
})

const removeCartItem = (cartItemId) => ({
  type: REMOVE_CARTITEM,
  payload: cartItemId
})

// thunks

// GET /carts/:cartId/cartItems/
export const getCartItemsThunk = (cartId) => async (dispatch) => {
  const response = await csrfFetch(`/api/carts/${cartId}/cartItems/`)
	if (response.ok) {
		const data = await response.json()
    const formattedData = {}
    for (const cartItem of data) {
      formattedData[cartItem.id] = cartItem
    }
		dispatch(setCartItems(formattedData))
    return formattedData
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to retrieve cartItems."]
}

// POST /productStocks/:productStockId/cartItems/
export const createCartItemThunk = (
    productStockId, quantity
  ) => async (dispatch) => {
  const response = await csrfFetch(`/api/productStocks/${productStockId}/cartItems/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quantity
    }),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addCartItem({ [data.id]: data }))
    return data
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) return data.errors
  } else return ["Failed to create cartItem."]
}

// PUT /cartItems/:cartItemId
export const updateCartItemThunk = (
		cartItemId, quantity
	) => async (dispatch) => {
	const response = await csrfFetch(`/api/cartItems/${cartItemId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			quantity
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(addCartItem({ [data.id]: data }))
		return data
	} else if (response.status < 500) {
		const data = await response.json()
    if (data.errors) return data.errors
	} else return ["Failed to update cartItem."]
}

// DELETE /cartItems/:cartItemId
export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
	const response = await csrfFetch(`/api/cartItems/${cartItemId}`, {
		method: "DELETE",
	})

	if (response.ok) dispatch(removeCartItem(cartItemId))
  else if (response.status < 500) {
		const data = await response.json()
    if (data.errors) return data.errors
	} else return ["Failed to delete cartItem."]
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CARTITEMS:
			return { ...action.payload }
    case ADD_CARTITEM:
      return { ...state, ...action.payload }
    case REMOVE_CARTITEM:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
		default:
			return state
	}
}
