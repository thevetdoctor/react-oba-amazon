import React from 'react';
import './Board.css';
import { Link } from "react-router-dom";

export default function Board() {
    return (
    <div className="board">
        <div className="side-a">
            <Link to="/restaurant">
                <img src={require("./images/Banner/rest-frank.jpg")} alt="" />
            </Link>
            <div className='side-b'>
                <Link to="/grillkitchen">
                    <img src={require("./images/Banner/Grill-Kitchen.jpg")} alt="" />
                </Link>
                <Link to="/caesarslounge">
                    <img src={require("./images/Banner/Caesar-Lounge.jpg")} alt="" />
                </Link>
            </div>
        </div>
        <div className="side-a">
            <Link to="/clubspartacuz">
                <img src={require("./images/Banner/Untitled-1.jpg")} alt="" />
            </Link>
            <div className='side-b'>
                <Link to="/pool">
                    <img src={require("./images/Banner/frank-princess.jpg")} alt="" />
                </Link>
                <Link to="/gardenbar">
                    <img src={require("./images/Banner/GB-frank.jpg")} alt="" />
                </Link>
            </div>
        </div>
    </div>
  )
}
