/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { apiUrl } from "./api";

// const CheckoutProduct = forwardRef({ id, image, title, price, rating, hideButton }) => {
const CheckoutProduct = forwardRef((props, ref) => {
const { id, name, image, count, title, price, rating, hideButton } = props;
const [{ basket }, dispatch] = useStateValue();
const history = useHistory();
const token = localStorage.getItem('jwt');

async function makeOrder(payload, flag) {
    if(!token) {
      history.push('/login');
      return;
    }
    console.log(payload);
    const res = await fetch(`${apiUrl}/orders/${flag}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data.data);
    localStorage.setItem('order', JSON.stringify(data.data));
    localStorage.setItem('orderId', data.data.id);
    // dispatch({
    //     type: "ADD_TO_BASKET",
    //     item: {
    //       id,
    //       count,
    //       name,
    //       image,
    //       price,
    //       rating,
    //     },
    //   });
}
    const addToBasket = () => {
        // dispatch the item into the data layer
        let payload = {productId: id, quantity: 1};
        console.log('adding to cart');
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
        makeOrder(payload, 'add');
    };

    const reduceFromBasket = () => {
        // remove the item from the basket
        let payload = {productId: id, quantity: 1};
        console.log('reducing in cart');
        dispatch({
            type: 'REDUCE_FROM_BASKET',
            id: id,
        })
        makeOrder(payload, 'reduce');
    }

    const removeFromBasket = () => {
        // remove the item from the basket
        let payload = {productId: id, quantity: 1};
        makeOrder(payload, 'remove');        
        console.log('removing from cart');
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div ref={ref} className='checkoutProduct'>
            <img className='checkoutProduct__image' src={require(`.${image.slice(6)}`)} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <strong>N{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                    {!hideButton && (<p className="checkoutProduct__count">
                        <span style={{cursor: 'pointer'}} onClick={reduceFromBasket}>-</span>
                        <span>{count}</span>
                        <span style={{cursor: 'pointer'}} onClick={addToBasket}>+</span>
                    </p>)}
                {!hideButton && (
                    <button style={{cursor: 'pointer'}} onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
});

export default CheckoutProduct;
