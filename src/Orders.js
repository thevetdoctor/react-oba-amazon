/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
import "./Orders.css";
import Order from "./Order";
import { useStateValue } from "./StateProvider";

function  Orders() {
    const [{ basket, user }, dispatch ] = useStateValue();
    const [orders, setOrders] = useState([]);
    console.log(basket, user)

    const [orderID, setOrderID] = useState("")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZWVhZTcwNGQtMDQ2My00ZWIwLWExZDUtMGViMjYzYWI4NThkIiwidXNlcm5hbWUiOiJvYmEiLCJlbWFpbCI6InRoZXZldGRvY3RvckBnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwiaW1hZ2VVcmwiOm51bGwsImJpbyI6bnVsbCwibG9jYXRpb24iOm51bGwsImRvYiI6bnVsbCwibW9iaWxlIjpudWxsLCJzdGF0dXMiOiJiYXNpYyIsInZlcmlmaWVkIjpmYWxzZSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNi0wNVQwNzoyNDowOS45MTBaIn0sImlhdCI6MTY1NDQxNzQxOX0.7_c7ASm9r5Zv1pSa3JRw96_bpl28Vei2dW7rez5vTHI";
    async function getOrder(orderId) {
        const res = await fetch(`http://localhost:8000/orders`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
        });
        const data = await res.json();
        console.log(data.data);
        setOrders(data.data)
        localStorage.setItem('order', JSON.stringify(data.data));
    }
    useEffect(() => {
        // setOrderID(JSON.parse(localStorage.getItem('order')));
        console.log(orderID, JSON.parse(localStorage.getItem('order')));
        if(!orderID) {
            getOrder(orderID)
        }
      }, [orderID]);

    useEffect(() => {
        if (user) {
            
    } else {
        setOrders([]);
        setOrders(orders);
    }
    return () => {};
    }, [user]);

    return (
        <div className="orders">
            <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
            />
               
        <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map((order, idx) => (
                    <Order 
                    key={idx}
                    order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;