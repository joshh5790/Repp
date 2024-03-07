import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import profileLinks from "./profileLinks"
import profiles from "./profiles";
import products from "./products";
import productImages from "./productImages";
import productStock from "./productStock";
import videos from "./videos";
import carts from "./carts";
import cartItems from "./cartItems";
import orders from "./orders";
import orderItems from "./orderItems";
import tours from "./tours";
import follows from "./follows";
import visibility from "./navigation";

const rootReducer = combineReducers({
  session,
  profileLinks,
  profiles,
  products,
  productImages,
  productStock,
  videos,
  carts,
  cartItems,
  orders,
  orderItems,
  tours,
  follows,
  visibility,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
