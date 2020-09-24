/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

// function Product({ id, count, title, image, price, rating }) {
const Product = forwardRef((props, ref) => {
  const [{ basket }, dispatch] = useStateValue();

  const {id, count, title, image, price, rating } = props;
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        count,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div ref={ref} className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
});

export default Product;
