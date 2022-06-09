/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./Order.css";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import moment from "moment";

function Order({order}) {
  
    return (
        <div className="order">
            <h2>Order</h2>

            <p>
                {moment.unix(order.createdAt).format("MMMM Do YYYY, h: mma")}
            </p>
            <p>
                <small className="oder__id">{order.id}</small>
            </p>
                {order.products?.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        name={item.name}
                        image={item.imageUrl}
                        price={item.price}
                        rating={item.rating}
                        hideButton
                    />
                ))}
                    <CurrencyFormat
                      renderText={(value) => (
                        <h3 className="order__total">Order Total: {value}</h3>
                      )}
                      decimalScale={2}
                      value={order.totalValue / 100}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"N"}
                    />
        </div>
    )
}

export default Order;
