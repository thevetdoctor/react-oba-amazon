/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef } from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";

// const CheckoutProduct = forwardRef({ id, image, title, price, rating, hideButton }) => {
const CheckoutProduct = forwardRef((props, ref) => {
const { id, image, count, title, price, rating, hideButton } = props;
const [{ basket }, dispatch] = useStateValue();

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

    const reduceFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REDUCE_FROM_BASKET',
            id: id,
        })
    }

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div ref={ref} className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                    {!hideButton && (<p className="checkoutProduct__count">
                        <span onClick={reduceFromBasket}>-</span>
                        <span>{count}</span>
                        <span onClick={addToBasket}>+</span>
                    </p>)}
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
});

export default CheckoutProduct;
