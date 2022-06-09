/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useStateValue();

    
    async function login(e) {
            e.preventDefault();
            const payload = {email, password};
            console.log('logging in', payload);
            const res = await fetch('http://localhost:8000/auth/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
            const data = await res.json();
            console.log(data);
            if(data.success) {
                const {username, email, status,} = data.data.user;
                let user = {username, email, status}
                dispatch({
                    type: 'SET_USER',
                    user: user
                  })
                localStorage.setItem('authUser', JSON.stringify(user));
                localStorage.setItem('jwt', data.data.token);
                history.push('/');
            } else {
                console.log(data.error);
            }
        }

        async function signup() {
            const storedUsername = localStorage.getItem('username');    
            const storedEmail = localStorage.getItem('email');
            const storedPhone = localStorage.getItem('phone');    
            const storedPassword = localStorage.getItem('password');    
            const storedTerms = localStorage.getItem('terms');
            const payload = {username: storedUsername, email: storedEmail, mobile: storedPhone, password: storedPassword, terms: storedTerms}
            // if (!storedTerms) {
            //     console.log('Terms required');
            //     return false;
            // };
            console.log('signing up', payload);
            const res = await fetch('http://localhost:8000/auth/signup', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
            const data = await res.json();
            console.log(data);
            if(data.success) {
                const {username, email, status,} = data.data.user;
                let user = {username, email, status}
                dispatch({
                    type: 'SET_USER',
                    user: user
                  })
                localStorage.setItem('authUser', JSON.stringify(user));
                localStorage.setItem('jwt', data.data.token);
                history.push('/');
            } else {
                console.log(data.error);

            }
        }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src={require('./images/Princess-Luxury.png')} 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={login} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the <strong> PRINCESS LUXURY HOTELS </strong> Conditions of Use. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={signup} className='login__registerButton'>Create your Account</button>
            </div>
        </div>
    )
}

export default Login
