/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { useHistory, useParams } from "react-router-dom";

const cloudImageUrl = 'https://res.cloudinary.com/thevetdoctor/image/upload/v1654672763/princessluxury';

// function Product({ id, count, title, image, price, rating }) {
const Product = forwardRef((props, ref) => {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  let { dyno } = useParams(); 
  const {id, count, name, image, price, rating, added } = props;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZWVhZTcwNGQtMDQ2My00ZWIwLWExZDUtMGViMjYzYWI4NThkIiwidXNlcm5hbWUiOiJvYmEiLCJlbWFpbCI6InRoZXZldGRvY3RvckBnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwiaW1hZ2VVcmwiOm51bGwsImJpbyI6bnVsbCwibG9jYXRpb24iOm51bGwsImRvYiI6bnVsbCwibW9iaWxlIjpudWxsLCJzdGF0dXMiOiJiYXNpYyIsInZlcmlmaWVkIjpmYWxzZSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIn0sImlhdCI6MTY1NDQxNzQxOX0.7_c7ASm9r5Zv1pSa3JRw96_bpl28Vei2dW7rez5vTHI";

  const addToBasket = () => {
    // dispatch the item into the data layer
    async function makeOrder(payload) {
      const res = await fetch('http://localhost:8000/orders', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data.data);
      localStorage.setItem('order', JSON.stringify(data.data));
  }
  let payload = {productId: id, quantity: 1, location: 'category', tableNumber: 1 };
  makeOrder(payload);
  dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        count,
        name,
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
        <p>{name}</p>
        <p className="product__price">
          <b>N</b>
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
      src={require(`.${image.slice(6)}`)} 
      alt={image.slice(7)}
      // onClick= {e => history.push(`/${id}`)}
      />
    {!added ?
      <button onClick={addToBasket}>Add to Cart</button>:
      <span>
        <small>Already added</small>
        <button onClick={removeFromBasket}>Remove from Cart ?
        </button>
      </span>
      }
    </div>
  );
});

export default Product;
