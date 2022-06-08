/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ stock, basket }, dispatch] = useStateValue();

  let ids = [];
  const basketIds = basket.filter(item => ids.indexOf(item.id) < 0);

  const checkBasket = basketIds.map(x => x.id);
  console.log(checkBasket);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={require("./images/lounge/frontview.PNG")}
          alt=""
        />
        <div className="tabs">
          <span className="active">SOFTs, ENERGY & YOGHURT</span>
          <span className="">WINES</span>
          <span className="">ALCOHOL</span>
          <span className="">BEER & SMOKE</span>
          <span className="">COCKTAIL & CHAMPANGE</span>
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
