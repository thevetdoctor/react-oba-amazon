/* eslint-disable no-unused-vars */
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
import axios from "./axios";

// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { db } from "./firebase";


function Payment() {
  const [{ basket, user, discountStatus }, dispatch] = useStateValue();
  const publicKey = `${process.env.REACT_APP_PUBLIC_KEY}`
  const [name, setName] = useState(" ");
  const [amount, setAmount] = useState(discountStatus ? getBasketTotal(basket) * 0.90 : getBasketTotal(basket))
  const [email, setEmail] = useState("thevetdoctor@gmail.com")
  const [phone, setPhone] = useState("080 6910 0463")
  const [orderID, setorderID] = useState("")
  const [custom_field, setCustomField] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZWVhZTcwNGQtMDQ2My00ZWIwLWExZDUtMGViMjYzYWI4NThkIiwidXNlcm5hbWUiOiJvYmEiLCJlbWFpbCI6InRoZXZldGRvY3RvckBnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwiaW1hZ2VVcmwiOm51bGwsImJpbyI6bnVsbCwibG9jYXRpb24iOm51bGwsImRvYiI6bnVsbCwibW9iaWxlIjpudWxsLCJzdGF0dXMiOiJiYXNpYyIsInZlcmlmaWVkIjpmYWxzZSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIn0sImlhdCI6MTY1NDQxNzQxOX0.7_c7ASm9r5Zv1pSa3JRw96_bpl28Vei2dW7rez5vTHI";

  async function checkoutOrder(orderId) {
    const res = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
    });
    const data = await res.json();
    console.log(data.data);
    localStorage.setItem('order', JSON.stringify(data.data));
}
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
      custom_field
    },
    publicKey: 'pk_live_4aec163b8f367f258c17f7219cd057efb4f6180a',
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
    // setorderID(JSON.parse(localStorage.getItem('order')).id);
    console.log(orderID, JSON.parse(localStorage.getItem('order')));
  }, [orderID]);
  // const stripe = useStripe();
  // const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {

  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "POST",
  //       url: `/payments/create?total=${discountStatus ? getBasketTotal(basket) * 90 : getBasketTotal(basket) * 100}`
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   getClientSecret();
  // }, [basket, discountStatus])

    // console.log("The Secret is here", clientSecret);

  const handleSubmit = async(e) => {
    e.preventDefault();

    setProcessing(true);

    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement)
    //     }
    //   }).then(({ paymentIntent }) => {

        // db
        // .collection("users")
        // .doc(user?.uid)
        // .collection("orders")
        // .doc(paymentIntent.id)
        // .set({
        //   basket: basket,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created
        // });

    //     setSucceeded(true);
    //     setError(null);
    //     setProcessing(false);

    //     dispatch({
    //       type: "EMPTY_BASKET"
    //     }); 

    //     history.replace("/orders")
    // })
  };

  const handleChange = e => {
    setDisabled(e.empty);
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
              <p>Your Street Address</p>
              <p>Your State, Country</p>
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
            <Link to="/orders">            
            <div className="pay-btn paystack">
              <img src={paystackLogo} className="paystack-logo" alt="home-icon" />
              <PaystackButton className='paystack-button' {...componentProps} />
            </div>
            </Link>
            <div className='payment__details'>
              <form onSubmit={handleSubmit}>
                {/* <CardElement onChange={handleChange} /> */}
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
                  {/* <button disabled={processing || disabled || succeeded}> 
                    <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                  </button> */}
              </form>
            </div>
          </div>

        
        </div>
    </div>
  );
}

export default Payment;
