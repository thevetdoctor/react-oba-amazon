/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { useHistory, useParams } from "react-router-dom";


// function Product({ id, count, title, image, price, rating }) {
const Product = forwardRef((props, ref) => {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  let { dyno } = useParams(); 
  const {id, count, title, image, price, rating, added } = props;

  // console.log(props);
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


  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id,
    })
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

      <img 
      src={image} 
      alt={`ID:${id}`}
      onClick= {e => history.push(`/${id}`)}
      />
    {!added ?
      <button onClick={addToBasket}>Add to Basket</button>:
      <span>
        <small>Already added</small>
        <button onClick={removeFromBasket}>Remove from Basket ?
        </button>
      </span>
      }
    </div>
  );
});

export default Product;
