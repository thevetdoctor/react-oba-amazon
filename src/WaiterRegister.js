/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { apiUrl } from './api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const history = useHistory();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useStateValue();

        async function signup(e) {
            e.preventDefault();
            setLoading(true);
            const payload = {username, email, mobile, password, status: 'waiter', terms: true}
        
            console.log('signing up a waiter', payload);
            try {
                const res = await fetch(`${apiUrl}/auth/signup`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
                const data = await res.json();
                console.log(data);
                if(data.success) {
                    setLoading(false);
                    history.push('/dashboard');
                } else {
                    setLoading(false);
                    console.log(data.error);

                }
            } catch(e) {
                setLoading(false);
                console.log('catch error')
            }
        }

    return (
        <div className='login'>
            <div className="tabs">
                <span onClick={() => history.push('/dashboard')} className="active">DASHBOARD</span>
                <span onClick={() => history.push('/adminorderlist')} className="">ORDERS</span>
                <span onClick={() => history.push('/waiterregister')} className="">REGISTER A WAITER</span>
            </div>            
            {/* <ToastContainer /> */}
            <Link to='/'>
                <img
                    className="login__logo"
                    src={require('./images/Princess-Luxury.png')} 
                />
            </Link>

            <div className='login__container'>
                <h2>Create Waiter Account</h2>

                <form>
                    <h5>Firstname</h5>
                    <input type='text' value={firstname} onChange={e => setFirstname(e.target.value)} />
                    <h5>Lastname</h5>
                    <input type='text' value={lastname} onChange={e => setLastname(e.target.value)} />
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <h5>Mobile</h5>
                    <input type='text' value={mobile} onChange={e => setMobile(e.target.value)} />
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' disabled={loading} onClick={signup} className='login__signInButton'>{!loading ? 'Sign Up' : 'Loading'}</button>
                </form>

                {/* <p>
                    By signing-up you agree to the <strong> PRINCESS LUXURY HOTELS </strong> Conditions of Use. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p> */}

                <button onClick={() => history.push('/dashboard')} disabled={loading} className='login__registerButton'>Cancel</button>
            </div>
        </div>
    )
}

export default Login
