/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import FlipMove from 'react-flip-move';
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { useHistory } from "react-router-dom";
// import { sortBasket } from "./reducer";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const token = localStorage.getItem('jwt');
  const history = useHistory();  
  
  useEffect(() => {
    if(!token) {
      history.push('/login');
      return;
    }
    return () => {};

  }, [token]);
  // const basketClone = [...basket];
  // const sorted = sortBasket(basketClone);

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        /> */}

        <div>
          {/* <h3>Hello, {user? user.username : ' Guest'}</h3> */}
  <h4 className="checkout__title">Your Shopping Cart {basket?.length ? "" : "is empty!, please pick some products..."}</h4>
    {/* {sortedBasket.length} */}
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout; 