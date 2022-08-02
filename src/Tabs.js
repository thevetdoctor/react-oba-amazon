import React from 'react';
import './Tabs.css';
import { useStateValue } from "./StateProvider";
// import data from './data';

export default function Tabs() {
    const [, dispatch] = useStateValue();
    const showTab = (val) => {
      const searchResults = JSON.parse(localStorage.getItem('products')).filter(x => x.type.toLowerCase().includes(val.toLowerCase()));
        dispatch({
            type: "SEARCH_STOCK",
            searchResults
          });
      }

  return (
    <div className="tabs">
        <span onClick={() => showTab('soft')} className="active">SOFTs, ENERGY & YOGHURT</span>
        <span onClick={() => showTab('wines')} className="">WINES</span>
        <span onClick={() => showTab('alcohols')} className="">ALCOHOL</span>
        <span onClick={() => showTab('beers')} className="">BEER & SMOKE</span>
        <span onClick={() => showTab('cocktails')} className="">COCKTAIL & CHAMPANGE</span>
    </div>
  )
}
