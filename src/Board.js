import React from 'react';
import './Board.css';
import { Link } from "react-router-dom";

export default function Board() {
    return (
    <div className="board">
        <div className="side-a">
            <div>
                <Link to="/restaurant">
                    <img className='board_img' src={require("./images/Banner/rest-frank.jpg")} alt="" />
                </Link>
            </div>
            <div className='side-b'>
                <div>
                    <Link to="/grillkitchen">
                        <img className='board_img' src={require("./images/Banner/Grill-Kitchen.jpg")} alt="" />
                    </Link>
                </div>
                <div>
                    <Link to="/caesarslounge">
                        <img className='board_img' src={require("./images/Banner/Caesar-Lounge.jpg")} alt="" />
                    </Link>
                </div>
            </div>
        </div>
        <div className="side-a">
            <div>
                <Link to="/clubspartacuz">
                    <img className='board_img' src={require("./images/Banner/Untitled-1.jpg")} alt="" />
                </Link>
            </div>
            <div className='side-b'>
                <div>
                    <Link to="/pool">
                        <img className='board_img' src={require("./images/Banner/frank-princess.jpg")} alt="" />
                    </Link>
                </div>
                <div>
                    <Link to="/gardenbar">
                        <img className='board_img' src={require("./images/Banner/GB-frank.jpg")} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
