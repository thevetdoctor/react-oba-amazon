/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";
import data from './data';
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ stock, basket }, dispatch] = useStateValue();

  let ids = [];
  const basketIds = basket.filter(item => ids.indexOf(item.id) < 0);

  const checkBasket = basketIds.map(x => x.id);
  console.log(checkBasket);
  const showTab = (val) => {
    const searchResults = data.data.filter(x => x.type.toLowerCase().includes(val.toLowerCase()));
    // console.log(val, searchResults)

    dispatch({
        type: "SEARCH_STOCK",
        searchResults
      });
  }

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={require("./images/slider/slider-2.jpg")}
          alt=""
        />
        <img
          className="home__image"
          src={require("./images/slider/slider-1.jpg")}
          alt=""
        />
        <div className="tabs">
          <span onClick={() => showTab('soft')} className="active">SOFTs, ENERGY & YOGHURT</span>
          <span onClick={() => showTab('wines')} className="">WINES</span>
          <span onClick={() => showTab('alcohols')} className="">ALCOHOL</span>
          <span onClick={() => showTab('beers')} className="">BEER & SMOKE</span>
          <span onClick={() => showTab('cocktails')} className="">COCKTAIL & CHAMPANGE</span>
        </div>
        <div className="tag">Princess Luxury Hotels and Tourism has been elegantly crafted and prearranged to achieve a measure of comfortable luxury to satisfy the senses of every guest from all over the world.</div>

        <div className="home__row">
          {stock.map((item, idx) => (
              <Product
                id={item.id}
                key={idx}
                // count={item.count}
                name={item.name}
                price={item.price}
                // rating={item.rating}
                image={item.imageUrl}
                added={checkBasket?.indexOf(item.id) >= 0}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
