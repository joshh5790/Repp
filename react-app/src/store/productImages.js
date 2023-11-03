// constants

const SET_PRODUCTIMAGES = 'productImages/SET_PRODUCTIMAGES'
const ADD_PRODUCTIMAGE = 'productImages/ADD_PRODUCTIMAGE'
const REMOVE_PRODUCTIMAGE = 'productImages/REMOVE_PRODUCTIMAGE'

// action creators

const setProductImages = (productImages) => ({
	type: SET_PRODUCTIMAGES,
	payload: productImages
})

const addProductImage = (productImage) => ({
  type: ADD_PRODUCTIMAGE,
  payload: productImage
})

const removeProductImage = (productImageId) => ({
  type: REMOVE_PRODUCTIMAGE,
  payload: productImageId
})

// thunks

// GET /products/:productId/productImages/
export const getProductImagesThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/productImages/`)
	if (response.ok) {
		const data = await response.json()
    const formattedData = {}
    for (const productImage of data) {
      formattedData[productImage.id] = productImage
    }
		dispatch(setProductImages(formattedData))
    return formattedData
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to retrieve product images."]
}

// POST /products/:productId/productImages/
export const createProductImageThunk = (
    productId, image
  ) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/productImages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image
    }),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addProductImage({ [data.id]: data }))
    return data
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) return data.errors
  } else return ["Failed to create product image."]
}

// PUT /productImages/:productImageId
export const updateProductImageThunk = (
		productImageId, image
	) => async (dispatch) => {
	const response = await fetch(`/api/productImages/${productImageId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			image
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(addProductImage({ [data.id]: data }))
		return data
	} else if (response.status < 500) {
		const data = await response.json()
    if (data.errors) return data.errors
	} else return ["Failed to update product image."]
}

// DELETE /productImages/:productImageId
export const deleteProductImageThunk = (productImageId) => async (dispatch) => {
	const response = await fetch(`/api/productImages/${productImageId}`, {
		method: "DELETE",
	})

	if (response.ok) dispatch(removeProductImage(productImageId))
  else if (response.status < 500) {
		const data = await response.json()
    if (data.errors) return data.errors
	} else return ["Failed to delete product image."]
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRODUCTIMAGES:
			return { ...action.payload }
    case ADD_PRODUCTIMAGE:
      return { ...state, ...action.payload }
    case REMOVE_PRODUCTIMAGE:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
		default:
			return state
	}
}
