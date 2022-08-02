/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Orders.css";
import Order from "./Order";
import { useStateValue } from "./StateProvider";
import {apiUrl} from './api';
import { Link, useHistory } from "react-router-dom";

function  Orders() {
    const [{ basket, user }, dispatch ] = useStateValue();
    const [orders, setOrders] = useState([]);
    // console.log(basket, user)
    const history = useHistory();

    const [orderID, setOrderID] = useState("")
    const token = localStorage.getItem('jwt');
    async function getOrder(orderId) {
        if(!token) {
            history.push('/login');
            return;
          }
          try {
            const res = await fetch(`${apiUrl}/orders`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
            });
            const data = await res.json();
            console.log(data.data);
            setOrders(data.data)
            localStorage.setItem('order', JSON.stringify(data.data));
        } catch(e) {
            console.log('catch error')
        }
    }
    useEffect(() => {
        if(!token) {
            history.push('/');
            return;
          }
            getOrder()
    return () => {};

      }, [orderID]);

    return (
        <div className="orders">
            <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
            />
             <div className="tabs">
                <span onClick={() => history.push('/dashboard')} className="active">DASHBOARD</span>
                <span onClick={() => history.push('/adminorders')} className="">ORDERS</span>
                <span onClick={() => history.push('/waiterregister')} className="">REGISTER A WAITER</span>
            </div>   
            <h1 className="order__list__header">Orders</h1>

            <div className="orders__order">
                {orders?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order, idx) => (
                    <Order 
                    key={idx}
                    order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;