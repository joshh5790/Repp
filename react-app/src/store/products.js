// constants

const SET_PRODUCTS = "products/SET_PRODUCTS";
const ADD_PRODUCT = "products/ADD_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";

// action creators

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

// thunks

// GET /pages/:pageId/products/
export const getProductsThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/products`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const product of data) {
      formattedData[product.id] = product;
    }
    dispatch(setProducts(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve products."];
};

// POST /pages/:pageId/products/
export const createProductThunk =
  ({pageId, name, description, price, previewImage}) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        previewImage,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProduct({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create product."];
  };

// GET /products/:productId
export const getOneProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addProduct({ [data.id]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve product."];
};

// PUT /products/:productId
export const updateProductThunk =
  ({productId, name, price, previewImage, description}) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        previewImage,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProduct({ [data.id]: data }));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update product."];
  };

// DELETE /products/:productId
export const deleteProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeProduct(productId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete product."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...action.payload };
    case ADD_PRODUCT:
      return { ...state, ...action.payload };
    case REMOVE_PRODUCT:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
