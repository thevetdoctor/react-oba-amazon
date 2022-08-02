/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React, {useEffect} from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
// import Home from "./Home";
import Pool from './Pool';
import Kitchen from './Kitchen';
import Restaurant from './Restaurant';
import Lounge from './Lounge';
import Garden from './Garden';
import Klubb from './Klubb';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import Product from "./Product";
import ProductItem from "./ProductItem";
import Orders from "./Orders";
import AdminOrders from "./AdminOrders";
import AdminOrderList from "./AdminOrderList";
import NotFound from "./NotFound";
import Board from "./Board";
import WaiterRegister from './WaiterRegister';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from "./StateProvider";
import Dashboard from "./Dashboard";
import { apiUrl } from "./api";

function App() {
  const [{user}, dispatch] = useStateValue();

  async function getProducts() {
    const token = localStorage.getItem('jwt');
    try {
      const res = await fetch(`${apiUrl}/products`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
      });
      const data = await res.json();
      localStorage.setItem('products', JSON.stringify(data.data));
      console.log(data.data);
      dispatch({
        type: "SEARCH_STOCK",
        searchResults: data.data
      });
    } catch(e) {
      console.log('catch error')
    }
  }

  async function getActiveOrder() {
    const token = localStorage.getItem('jwt');
    try {
      const res = await fetch(`${apiUrl}/orders/active`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', Authorization:`Bearer ${token}`},
      });
      const data = await res.json();
      console.log(data.data);
      let updatedBasket = [];
      if(data.data) {
        updatedBasket = data.data.length && data.data[0].products.map(({id, name, imageUrl, price, orderproduct}) => ({id, name, image: imageUrl, price, count: orderproduct?.quantity}));
      }
      console.log(updatedBasket);
      dispatch({
        type: "UPDATE_BASKET",
        data: updatedBasket
      });
    } catch(e) {
      console.log(e, 'catch error')
    }
  }

  useEffect(() => {
    getActiveOrder();
  }, [])

  useEffect(() => {
    if(navigator.onLine) {
      if (!JSON.parse(localStorage.getItem('products')).length) {
        console.log('from DB');
        console.log(!localStorage.getItem('products'));
        getProducts();
      } else {
        console.log('from cache');
        dispatch({
          type: "SEARCH_STOCK",
          searchResults: JSON.parse(localStorage.getItem('products'))
        });
      }
    } else {
      console.log("Please check the network!");
    }
   const authUser = JSON.parse(localStorage.getItem('authUser')) || null;
      console.log(authUser);

      if (authUser || user) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
  }, [])

  // const ErrorView = () => (
  //     <div style={{textAlign: 'center', backgroundColor: 'white', color: 'red', fontWeight: 'bold'}}>Please check your network !</div>

  // )
  return (
    // BEM
    <Router>
            {/* <ToastContainer /> */}
      <div className="">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/checkout">
             <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
             <Header />
             {/* <Elements stripe={promise}> */}
             <Payment />
             {/* </Elements> */}
             <Footer />
          </Route>
          <Route path="//:dyno">
            <Header />
            <ProductItem />
            <Footer />
          </Route>
          <Route exact path="/">
            <Header />
            <Board />
            <Footer />
          </Route>
          <Route exact path="/pool">
            <Header />
            <Pool />
            <Footer />
          </Route>
          <Route exact path="/grillkitchen">
            <Header />
            <Kitchen />
            <Footer />
          </Route>
          <Route exact path="/restaurant">
            <Header />
            <Restaurant />
            <Footer />
          </Route>
          <Route exact path="/caesarslounge">
            <Header />
            <Lounge />
            <Footer />
          </Route>
          <Route exact path="/gardenbar">
            <Header />
            <Garden />
            <Footer />
          </Route>
          <Route exact path="/clubspartacuz">
            <Header />
            <Klubb />
            <Footer />
          </Route>
          <Route exact path="/dashboard">
            <Header />
            <Dashboard />
            <Footer />
          </Route>
          <Route exact path="/waiterregister">
            <Header />
            <WaiterRegister />
            <Footer />
          </Route>
          <Route path="/adminorderlist">
            <Header />
            <AdminOrderList />
            <Footer />
          </Route>
          <Route path="/adminorders">
            <Header />
            <AdminOrders />
            <Footer />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
