// unable to import from @stripe/react-stripe-js

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { formatCurrencySymbol } from "../../../utilities";
// import { getCartPageThunk, getOneRPageThunk } from "../../../store/pages";
// import { setNavVisibility } from "../../../store/navigation";
// import { getPageCartThunk } from "../../../store/carts";
// import { getCartItemsThunk } from "../../../store/cartItems";
// import CheckoutForm from "./CheckoutForm";

// import "./Checkout.css";
// import { authenticate } from "../../../store/session";

// const loadData = async (data, userId, setClientSecret) => {
//   const currency = formatCurrencySymbol().toLowerCase();
//   let amount = data.subtotal;

//   // amount uses lowest denomination for USD and EUR
//   if (currency === "usd" || currency === "eur") {
//     amount = amount * 100;
//   }
//   const response = await fetch("/api/checkout/create-payment-intent", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       amount,
//       currency,
//       customer: userId,
//     }),
//   });
//   if (response.ok) {
//     const secret = await response.json();
//     setClientSecret(secret.clientSecret);
//   }
// };

// export default function Checkout() {
//   const dispatch = useDispatch();
//   const { linkName } = useParams();
//   const user = useSelector((state) => state.session.user);
//   const page = useSelector((state) => Object.values(state.pages)[0]);
//   const cart = useSelector((state) => Object.values(state.carts)[0]);
//   const cartItems = useSelector((state) => Object.values(state.cartItems));
//   const [clientSecret, setClientSecret] = useState("");
//   const publishable_key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
//   const stripePromise = loadStripe(publishable_key);

//   useEffect(() => {
//     dispatch(setNavVisibility(true));
//     dispatch(getOneRPageThunk(linkName)).then(page => {

//       dispatch(getPageCartThunk(page.id)).then(async (data) => {
//         if (data) {
//           await dispatch(getCartItemsThunk(data.id));
//           await dispatch(authenticate()).then((user) => {
//             loadData(data, user.id, setClientSecret);
//           });
//         }
//       });
//     })
//   }, [dispatch]);

//   const appearance = {
//     theme: "night",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div
//       className="page-container"
//       style={{ height: "calc(100vh - 5rem)", overflow: "hidden" }}
//     >
//       {clientSecret && (
//         <Elements stripe={stripePromise} options={options}>
//           <CheckoutForm
//             user={user}
//             cart={cart}
//             cartItems={cartItems}
//             page={page}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// }
