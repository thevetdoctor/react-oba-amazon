import React from 'react';
import Product from "./Product";
import "./ProductItem.css";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function ProductItem() {

  const [{ stock, basket }] = useStateValue();
  
  let { dyno } = useParams();
  const history = useHistory();
  const item = stock.filter(x => x.id === dyno);
  console.log(dyno, item)
  if(!item[0]) return <Redirect to="/" />;

  const { id, name, count, imageUrl, price, rating } = item[0];
  const statefulStock = basket.filter(
    item => item.id === id
);
  // console.info(statefulStock, stock, basket);
    
    return (
        <div className="product__item">
            <button className="back-btn" onClick={() => history.push("/")}>
                Back
            </button>
            <Product 
            id={id} 
            name={name} 
            count={count}
            image={imageUrl}
            price={price}
            rating={rating}
            added={statefulStock.length}
            />
        </div>
    )
}
