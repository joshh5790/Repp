// constants

const SET_PRODUCTSTOCKS = "productStock/SET_PRODUCTSTOCKS";
const ADD_PRODUCTSTOCK = "productStock/ADD_PRODUCTSTOCK";
const REMOVE_PRODUCTSTOCK = "productStock/REMOVE_PRODUCTSTOCK";

// action creators

const setProductStocks = (productStocks) => ({
  type: SET_PRODUCTSTOCKS,
  payload: productStocks,
});

const addProductStock = (productStock) => ({
  type: ADD_PRODUCTSTOCK,
  payload: productStock,
});

const removeProductStock = (productStockId) => ({
  type: REMOVE_PRODUCTSTOCK,
  payload: productStockId,
});

// thunks

// GET /products/:productId/productStocks/
export const getProductStocksThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/productStocks`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const productStock of data) {
      formattedData[productStock.id] = productStock;
    }
    dispatch(setProductStocks(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve product stocks."];
};

// POST /products/:productId/productStocks/
export const createProductStockThunk =
  ({ productId, size, stock }) =>
  async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/productStocks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        size,
        stock,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProductStock({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create product stock."];
  };

// PUT /productStocks/:productStockId
export const updateProductStockThunk =
  ({ productStockId, size, stock }) =>
  async (dispatch) => {
    const response = await fetch(`/api/productStocks/${productStockId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        size,
        stock,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProductStock({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update product stock."];
  };

// DELETE /productStocks/:productStockId
export const deleteProductStockThunk = (productStockId) => async (dispatch) => {
  const response = await fetch(`/api/productStocks/${productStockId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeProductStock(productStockId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete product stock."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTSTOCKS:
      return { ...action.payload };
    case ADD_PRODUCTSTOCK:
      return { ...state, ...action.payload };
    case REMOVE_PRODUCTSTOCK:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
