/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import FlipMove from 'react-flip-move';
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { PaystackButton } from "react-paystack"
import paystackLogo from "./paystack-logo.jpg";
import { apiUrl } from "./api";

function Payment() {
  const [{ basket, user, discountStatus }, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(discountStatus ? getBasketTotal(basket) * 0.90 : getBasketTotal(basket))
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderID, setorderID] = useState(localStorage.getItem('orderId'))
  const [custom_field, setCustomField] = useState([]);
  const token = localStorage.getItem('jwt');
  const history = useHistory();

  async function checkoutOrder(orderId) {
    if(!token) {
      history.push('/login');
      return;
    }
    const res = await fetch(`${apiUrl}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
    });
    const data = await res.json();
    console.log(data.data);
    localStorage.setItem('order', JSON.stringify(data.data));
}
  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      phone,
      custom_field
    },
    publicKey: process.env.REACT_APP_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: () =>
      {
        alert("Thanks for doing business with us! Come back soon!!");
        checkoutOrder(orderID);
      },
      onClose: () => {
        alert("Wait! Don't leave :(");
        checkoutOrder(orderID);
    },
  }

  useEffect(() => {
    if(!token) {
      history.push('/login');
      return;
    }
    setName(user.username);
    setEmail(user.email);
    setPhone(user.mobile);
    console.log(orderID, user);
    // console.log(JSON.parse(localStorage.getItem('order')));
    return () => {};

  }, [orderID]);

  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

  };

  const handleChange = e => {
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">

        <div className="payment__container">
        <h2>
        Checkout {
          <Link to="/checkout">{basket?.length} item{basket.length > 1 ? "s" : ""}</Link>
        }
        </h2>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p><strong>{ user?.email }</strong></p>
              {user.location && <p>{user.location}</p>}
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
                  count={item.count}
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
            {/* <Link to="/orders">             */}
            <div className="pay-btn paystack" onClick={() => history.replace('orders')}>
              <img src={paystackLogo} className="paystack-logo" alt="home-icon" />
              <PaystackButton className='paystack-button' {...componentProps} />
            </div>
            {/* </Link> */}
            <div className='payment__details'>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                      )}
                      decimalScale={2}
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"N"}
                    />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Payment;
