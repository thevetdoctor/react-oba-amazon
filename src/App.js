/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React from "react";
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
import NotFound from "./NotFound";
import Board from "./Board";

// import { auth } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// const promise = loadStripe("pk_test_51HReOoBxZFvwuKOrvZhOm1aUaBHBToUElv7sVeTJxdI3bpTgq5DHdMduWbN4lCjwLCbXulLUqDyHG5olKBSPqjsd00ABmHVVRN");

function App() {
  // const [{}, dispatch] = useStateValue();

  // useEffect(() => {
  //   // will only run once when the app component loads...

  //   auth.onAuthStateChanged(authUser => {
  //     console.log('THE USER IS >>> ', authUser);

  //     if (authUser) {
  //       // the user just logged in / the user was logged in

  //       dispatch({
  //         type: 'SET_USER',
  //         user: authUser
  //       })
  //     } else {
  //       // the user is logged out
  //       dispatch({
  //         type: 'SET_USER',
  //         user: null
  //       })
  //     }
  //   })
  // }, [])

  return (
    // BEM
    <Router>
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
