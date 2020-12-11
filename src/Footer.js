import React from 'react';
import "./Footer.css";
import { Link, useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();

    return (
        <div className="footer">
           <Link to="/">
            <span onClick={e => history.push("/")} className="footer__logo">
                Oba's Amazon.... great products @ lowest prices....!
            </span>
            <p>
                <a href="https://friendly-noether-8dfde0.netlify.app/" target="_blank" rel="noopener noreferrer">
                <span>Design by @Oba</span>
                </a>
            </p>
            </Link>
        </div>
    )
}
