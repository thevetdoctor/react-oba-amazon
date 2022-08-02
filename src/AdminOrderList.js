/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Rings} from "react-loader-spinner";
import './Dashboard.css'
import { amountFormat } from './amountFormat';
import { useStateValue } from "./StateProvider";
import { apiUrl } from './api';

export default function Dashboard() {
//   const [, dispatch] = useStateValue();
  const history = useHistory();
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('jwt');

    async function getOrders() {
        if(!token) {
            history.push('/login');
            return;
          }
        try {

            const res = await fetch(`${apiUrl}/orders`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`}}
            );
            const data = await res.json();
            let totalorders = data.data.length;
            let totalsales = data.data.map(x => parseInt(x.totalValue)).reduce((a, b) => a + b, 0);
            setOrders(data.data);

            localStorage.setItem('totalOrders', totalorders);
            localStorage.setItem('totalSales', totalsales);
        } catch(e) {
            console.log('catch error')
        }
    }

        useEffect(() => {
            getOrders();
        }, [])
  return (
    <div className='dashboard'>
         <div className="tabs">
            <span onClick={() => history.push('/dashboard')} className="active">DASHBOARD</span>
            <span onClick={() => history.push('/adminorderlist')} className="">ORDERS</span>
            <span onClick={() => history.push('/waiterregister')} className="">REGISTER A WAITER</span>
        </div>
        
        {!orders?.length ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Rings 
                color='#000'
                height={150} 
                width={150} 
            />
        </div>:
        <>
        <div className='dashboard__product__header'>Orders</div>
        <div className='dashboard__product'>
            <span></span>
            <span><strong>Items</strong></span>
            <span><strong>Location</strong></span>
            <span><strong>Table Number</strong></span>
            <span><strong>Total Value</strong></span>
            <span><strong>Status</strong></span>
        </div>
        <div>
            {orders.map((item, idx) => (
            <div key={idx} className="dashboard__product">
            {/* <img className='dashboard_img' src={require(`./${item.imageUrl.slice(7)}`)} alt={item.name}/> */}
            <span>{item.products.length}</span>
            <span>{item.location}</span>
            <span>{item.tableNumber}</span>
            <span>{amountFormat(item.totalValue)}</span>
            <span>{item.status}</span>
            </div>
            ))}
        </div>
        </>}
    </div>
  )
}
