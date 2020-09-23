/* eslint-disable no-unused-vars */
import React from "react";
import FlipMove from 'react-flip-move';
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { sortBasket } from "./reducer";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  // const sortedBasket = [];
  // let empty = basket.map(item => {
  //   let idx = sortedBasket.indexOf(item.id);
  //   if(idx >= 0) {
  //     console.log(item.count);
  //     item.count += 1;
  //     return item;
  //   }
  //   console.log(item.count);
  //   sortedBasket.push(item);
    // return item;
  // });
  // for( let i = 0; i < basket.length; i++) {

  // }
  // basket.map(item => {
  //   let empty = basket
  //               .filter(item => item.id)
  //               .map(item => ({
  //                 for
  //               }));
  //   if(empty.indexOf(item.id) >= 0) {
  //     item.count += 1;
  //   } else {
  //     item.count = 1;
  //   }
  //   console.log(empty);
  //   return item;
  // });
  // console.log(basket, sortedBasket, empty);
  console.log(sortBasket(basket));
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user? user.email : ' Guest'}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
    {/* {sortedBasket.length} */}
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout; 