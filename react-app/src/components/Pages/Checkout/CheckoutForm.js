import React, { useEffect, useState } from "react";
import {
  ExpressCheckoutElement,
  AddressElement,
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import OrderSummary from "./OrderSummary";

export default function CheckoutForm({ user, cart, cartItems }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Update with your URL
        return_url: `http://localhost:3000/confirmation`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  const mapKey = process.env.REACT_APP_MAPS_API_KEY;

  const linkAuthElementOptions = {
    defaultValues: {
      email: user.email,
    },
  };

  const addressElementOptions = {
    mode: "shipping",
    autocomplete: {
      mode: "google_maps_api",
      apiKey: mapKey,
    },
    display: {
      name: "split",
    },
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      address: {
        line1: user.address,
        // city: user.city,
        // state: user.state,
        // // country: user.country,
      },
    },
  };

  // const expressCheckoutElementOptions = {
  //   buttonType: {
  //     applePay: "plain",
  //     googlePay: "buy",
  //     paypal: "paypal",
  //   },
  // };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="payment-form-inputs">
        {/* <ExpressCheckoutElement options={expressCheckoutElementOptions} /> */}
        <div>
          <h2>Contact</h2>
          <LinkAuthenticationElement
            options={linkAuthElementOptions}
            id="link-authentication-element"
          />
        </div>
        <div>
          <h2>Delivery</h2>
          <AddressElement options={addressElementOptions} />
        </div>
        <div>
          <h2>Payment</h2>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>
      </div>
      <div className="cart-items-checkout">
        <div>
          <OrderSummary cart={cart} cartItems={cartItems} />
        </div>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit-payment"
          className="button-hover"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {/* {message && <div id="payment-message">{message}</div>} */}
      </div>
    </form>
  );
}
