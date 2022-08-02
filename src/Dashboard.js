/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {FaUsers} from 'react-icons/fa';
import {RiAdminLine} from 'react-icons/ri';
import {MdSupportAgent} from 'react-icons/md';
import {FcSalesPerformance} from 'react-icons/fc';
import { Rings} from "react-loader-spinner";
import {BsCart4} from 'react-icons/bs';
import './Dashboard.css'
import { amountFormat } from './amountFormat';
import { useStateValue } from "./StateProvider";
import { apiUrl } from './api';

export default function Dashboard() {
  const [, dispatch] = useStateValue();
  const history = useHistory();
    const [products, setProducts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalWaiters, setTotalWaiters] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
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
            setTotalOrders(totalorders);
            setTotalSales(totalsales);
            localStorage.setItem('totalOrders', totalorders);
            localStorage.setItem('totalSales', totalsales);
        } catch(e) {
            console.log('catch error')
        }
    }

    async function getUsers() {
        if(!token) {
            history.push('/login');
            return;
          }
        try {
            const res = await fetch(`${apiUrl}/auth/users`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`}}
                );
                const data = await res.json();
            let totalusers = data.data.length;
            let totalwaiters = data.data.filter(user => user.status === 'waiter');
            let totaladmins = data.data.filter(user => user.status.indexOf('admin') >= 0);
            console.log(data.data, totalwaiters, totaladmins)
            setTotalUsers(totalusers);
            setTotalWaiters(totalwaiters.length);
            setTotalAdmins(totaladmins.length);
            localStorage.setItem('totalUsers', totalusers);
            localStorage.setItem('totalWaiters', totalwaiters.length);
            localStorage.setItem('totalAdmins', totaladmins.length);
        } catch(e) {
            console.log('catch error')
        }
    }
    async function getProducts() {
        if(!token) {
            history.push('/login');
            return;
          }
        try {
            const res = await fetch(`${apiUrl}/products`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
            });
            const data = await res.json();
            setProducts(data.data);
            localStorage.setItem('products', JSON.stringify(data.data));
            dispatch({
            type: "SEARCH_STOCK",
            searchResults: data.data
            });
        } catch(e) {
            console.log('catch error')
        }
      }
        useEffect(() => {
            getOrders();
            getUsers();
            getProducts();
        }, [])
  return (
    <div className='dashboard'>
         <div className="tabs">
            <span onClick={() => history.push('/dashboard')} className="active">DASHBOARD</span>
            <span onClick={() => history.push('/adminorderlist')} className="">ORDERS</span>
            <span onClick={() => history.push('/waiterregister')} className="">REGISTER A WAITER</span>
        </div>
        <div className='dashboard__tiles'>
            <span className='users'>
                <span><FaUsers size={30}/></span>
                <span className='tiles__title'>Users </span>
                {totalUsers ? 
                <span className='tiles__values'>{totalUsers}</span>
                :
                <Rings 
                    color='#fff'
                    height={30} 
                    width={30} 
                />
                }
            </span>
            <span className='admin'>
                 <span><RiAdminLine size={30}/></span>
                <span className='tiles__title'>Admin</span>
                {totalAdmins ? 
                <span className='tiles__values'>{totalAdmins}</span>
                :
                <Rings 
                    color='#fff'
                    height={30} 
                    width={30} 
                />
                }
            </span>
            <span className='waiters'>
                <span><MdSupportAgent size={30}/></span>
                <span className='tiles__title'>Waiters</span>
                {totalWaiters ? 
                <span className='tiles__values'>{totalWaiters}</span>
                :
                <Rings 
                    color='#fff'
                    height={30} 
                    width={30} 
                />
                }
            </span>
            <span className='sales'>
                <span><FcSalesPerformance size={30}/></span>
                <span className='tiles__title'>Sales</span>
                {totalSales ? 
                <span className='tiles__values'>N{amountFormat(totalSales) }</span>
                :
                <Rings 
                    color='#fff'
                    height={30} 
                    width={30} 
                />
                }
            </span>
            <span className='users'>
                <span><BsCart4 size={30}/></span>
                <span className='tiles__title'>Orders</span> 
                {totalOrders ? 
                <span className='tiles__values'>{totalOrders}</span>
                :
                <Rings 
                    color='#fff'
                    height={30} 
                    width={30} 
                />
                }
            </span>
            {/* <span className='orders'>Orders</span> */}
        </div>
        
        {!products?.length ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Rings 
                color='#000'
                height={150} 
                width={150} 
            />
        </div>:
        <>
        <div className='dashboard__product__header'>Products</div>
        <div className='dashboard__product'>
            <span></span>
            <span><strong>Product</strong></span>
            <span><strong>Category</strong></span>
            <span><strong>Price</strong></span>
        </div>
        <div>
            {products.map((item, idx) => (
            <div key={idx} className="dashboard__product">
            <img className='dashboard_img' src={require(`./${item.imageUrl.slice(7)}`)} alt={item.name}/>
            <span>{item.name}</span>
            <span>{item.type}</span>
            <span>{item.price}</span>
            </div>
            ))}
        </div>
        </>}
    </div>
  )
}
