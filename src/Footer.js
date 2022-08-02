import React from 'react';
import "./Footer.css";
import { Link, useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();

    return (
        <div className="footer">
           <Link to="/">
            <span onClick={e => history.push("/")} className="footer__logo">
            {/* <p>
            Princess Luxury Hotels has the friendly and relaxing hotel accommodation you need and has been home to the great and the good, the intellectual elite, the cream de la cream and thousands of discerning guests.
            </p> */}
            </span>
            <p>
                {/* <a href="https://friendly-noether-8dfde0.netlify.app/" target="_blank" rel="noopener noreferrer"> */}
                <span>© 2022 Princess Luxury designed by Frankenstein services</span>
                {/* </a> */}
            </p>
            </Link>
        </div>
    )
}
