/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { getBasketCount } from "./reducer";
import {FiLogOut} from 'react-icons/fi';
import {FaArchive} from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
// import Search from "./Search";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const signOut = () => {
    dispatch({
      type: 'SET_USER',
      user: null
    })
    localStorage.clear();
  }

  const handleAuthenticaton = () => {
    if (user) {
      signOut();
    }
  }

  useEffect(() => {

  }, [user]);
  
  const login = !user ? '/login' : '';
  return (
    <div className="header">
      <Link to="/">
        {/* <span onClick={e => history.push("/")} className="header__logo">Princess Luxury Hotels</span> */}
        <img
          onClick={e => history.push("/")}
          className="logo"
          src={require('./images/Princess-Luxury.png')}
        />
      </Link>

      {/* <Search /> */}

      <div className="header__nav">

        {(user?.status === 'basic') && 
        <Link to="/orders">
        <div className="header__option prime">
          <span><FaArchive /></span>
          <span className="header__optionLineTwo">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        </Link>}

        {(user?.status === 'basic') && 
        <Link to="/checkout">
          <div className="header__option">
            <BsCart4 size={25} />
            <span className="header__optionLineTwo header__basketCount">
              <sup>
              {getBasketCount(basket)}
              </sup>
            </span>
            {/* <span className="header__optionLineTwo">Cart</span> */}
          </div>
        </Link>}

        <Link to={login}>
          <div onClick={handleAuthenticaton} className="header__option">
            {/* <span className="header__optionLineOne">Hey, {user ? user.username : 'Guest'}</span> */}
            <span className="header__optionLineTwo">{user ? 
                    <span><FiLogOut size={25}/></span>
                    : 'Sign In'}</span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Header;
