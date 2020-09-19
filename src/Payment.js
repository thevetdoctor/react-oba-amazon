/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import FlipMove from 'react-flip-move';
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";


function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {

    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket])

    console.log("The Secret is here", clientSecret);

  const handleSubmit = async(e) => {
    e.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) => {

        db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET"
        });

        history.replace("/orders")
    })
  };

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">

        <div className="payment__container">
        <h1>
        Checkout {
          <Link to="/checkout">{basket?.length} item{basket.length > 1 ? "s" : ""}</Link>
        }
        </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{ user?.email }</p>
              <p>Iyana Iyesi, Idiroko Road</p>
              <p>Sango Ota, Ogun State</p>
            </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items & delivery</h3>
            </div>
            <div className="payment__items">
              <FlipMove>
              {basket.map((item, idx) => (
                <CheckoutProduct
                  key={idx}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
              </FlipMove>
            </div>
          </div>
        
          <div className="payment__section">
             <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className='payment__details'>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)} // Part of the homework
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                </div>
                  <button disabled={processing || disabled || succeeded}> 
                  <span>{processing ? <p>Processing</p> : "Buy Now" }</span></button>
              </form>
            </div>
          </div>

        
        </div>
    </div>
  );
}

export default Payment;
