/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./Order.css";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import moment from "moment";

function Order({order}) {
  
    return (
        <div className="order">
            <h2>Order ID: {order.id.slice(0, 8)}</h2>

            <p>
                {moment(order.createdAt).format("MMMM Do YYYY, h: mma")}
            </p>
            <p>
                Status: {order.status}
            </p>
           
                {order.products?.map((item, idx) => (
                    <CheckoutProduct
                        key={idx}
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
                      value={order.totalValue}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"N"}
                    />
        </div>
    )
}

export default Order;
