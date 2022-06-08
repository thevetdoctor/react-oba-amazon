/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import Tab from './Tab';
import Tabs from "./Tabs";

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
        <Tabs />
        <Tab />
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
