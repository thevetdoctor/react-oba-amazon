/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { getBasketCount } from "./reducer";
import Search from "./Search";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }
  const login = !user ? '/login' : '';
  return (
    <div className="header">
      <Link to="/">
        <span onClick={e => history.push("/")} className="header__logo">Princess Luxury Hotels</span>
        <img
          className="header__logo"
          // src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <Search />

      <div className="header__nav">
        <Link to={login}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hey, {user ? user.email : 'Guest'}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to="/orders">
        <div className="header__option prime">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        </Link>

        {/* <div className="header__option prime">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div> */}

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              <sup>
              {getBasketCount(basket)}
              </sup>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
