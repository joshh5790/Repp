import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrencySymbol } from "../../../utilities";
import CheckoutForm from "./CheckoutForm";

import "./Checkout.css";
import { setNavVisibility } from "../../../store/navigation";

export default function Checkout() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const cart = useSelector(state => Object.values(state.carts)[0])
  const cartItems = useSelector((state) => Object.values(state.cartItems))
  const [clientSecret, setClientSecret] = useState("");
  const publishable_key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishable_key);

  const loadData = async () => {
    const currency = formatCurrencySymbol().toLowerCase()
    let amount = cart.subtotal

    // amount uses lowest denomination for USD and EUR
    if (currency === 'usd' || currency === 'eur') {
      amount = amount * 100
    }
    const response = await fetch('/api/checkout/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        // items: cartItems,
        customer: user.id
      })
    });
    if (response.ok) {
      const secret = await response.json()
      setClientSecret(secret.clientSecret)
    }
  };

  useEffect(() => {
    dispatch(setNavVisibility(true))
    if (cart) {
      loadData();
    }
  }, []);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="page-container">
      {clientSecret && <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>}
    </div>
  );
}
