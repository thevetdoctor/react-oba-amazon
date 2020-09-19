import React from "react";
import "./Home.css";
import Product from "./Product";
import data from "./data";

function Home() {

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

    <div className="home__row">
      {data.data.map((item, idx) => (
          <Product
            id={item.id}
            key={idx}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
      ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
