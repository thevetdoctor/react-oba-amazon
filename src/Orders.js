/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import Order from "./Order";
import { useStateValue } from "./StateProvider";

function  Orders() {
    const [{ basket, user }, dispatch ] = useStateValue();
    const [orders, setOrders] = useState([]);
    console.log(basket, user)
    useEffect(() => {
        if (user) {
        db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        setOrders(basket);
    } else {
        setOrders([]);
        setOrders(basket);
    }
    }, [user, basket]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;