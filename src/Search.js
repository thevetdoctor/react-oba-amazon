/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import data from "./data";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function Search() {

  const [{ stock }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


    const searchData = () => {
        const searchResults = data.data.filter(x => x.title.toLowerCase().includes(query.toLowerCase()));
        setResults(searchResults);
        console.log(query, searchResults);

        dispatch({
            type: "SEARCH_STOCK",
            searchResults
          });
    };

    useEffect(() => {
        searchData();
        return () => {};
    },[query]);
    return (
        <div className="search">
            <input
            className="searchInput" 
            type="text"
            placeholder="Search products"
            value={query}
            onChange={e => setQuery(e.target.value)}
            />
            <div className={!results?.length ? "search__results" : "display"}>
              <ul>  {results?.map((search, index) => (
                    <li 
                    key={index}
                    className="search__items">
                        <Link to="/product">
                            <div className="search__id">
                            {search.title}
                            </div>
                        </Link>
                    </li>
                ))
                }
                </ul>
            </div>
        <SearchIcon className="searchIcon" />
        </div>
    )
}
