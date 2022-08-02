/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { useHistory, useParams } from "react-router-dom";
import { apiUrl } from "./api";

const cloudImageUrl = 'https://res.cloudinary.com/thevetdoctor/image/upload/v1654672763/princessluxury';

// function Product({ id, count, title, image, price, rating }) {
const Product = forwardRef((props, ref) => {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  let { dyno } = useParams(); 
  const {id, count, name, image, price, rating, added } = props;
  const token = localStorage.getItem('jwt');

  const addToBasket = () => {
    // dispatch the item into the data layer
    async function makeOrder(payload) {
      if(!token) {
        history.push('/login');
        return;
      }
      console.log(payload);
      const res = await fetch(`${apiUrl}/orders/add`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data.data);
      localStorage.setItem('order', JSON.stringify(data.data));
      localStorage.setItem('orderId', data.data.id);
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
  }
  let payload = {productId: id, quantity: 1};
  makeOrder(payload);
  };


  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id,
    })
};

const imageUrl = `.${image.slice(6)}`;
  return (
    <div ref={ref} className="product" style={{backgroundImage: `url(${imageUrl})`, width: "200px"}}>
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
