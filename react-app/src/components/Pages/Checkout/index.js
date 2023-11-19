import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, formatCurrencySymbol } from "../../../utilities";
import CheckoutForm from "./CheckoutForm";

import "./Checkout.css";
import { setNavVisibility } from "../../../store/navigation";
import { getPageCartThunk } from "../../../store/carts";
import { getCartItemsThunk } from "../../../store/cartItems";

export default function Checkout() {
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => Object.values(state.carts)[0]);
  const cartItems = useSelector((state) => Object.values(state.cartItems));
  const [clientSecret, setClientSecret] = useState("");
  const publishable_key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishable_key);

  const loadData = async (data) => {
    const currency = formatCurrencySymbol().toLowerCase();
    let amount = data.subtotal;

    // amount uses lowest denomination for USD and EUR
    if (currency === "usd" || currency === "eur") {
      amount = amount * 100;
    }
    const response = await fetch("/api/checkout/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Security-Policy": "script-src, https://checkout.stripe.com",
      },
      body: JSON.stringify({
        amount,
        currency,
        customer: user.id,
      }),
    });
    if (response.ok) {
      const secret = await response.json();
      setClientSecret(secret.clientSecret);
    }
  };

  useEffect(async () => {
    await dispatch(setNavVisibility(true));
    await dispatch(getPageCartThunk(pageId)).then((data) => {
      if (data) {
        dispatch(getCartItemsThunk(data.id));
        loadData(data);
      }
    });
  }, [dispatch]);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="page-container">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm user={user} cart={cart} cartItems={cartItems} />
        </Elements>
      )}
    </div>
  );
}
