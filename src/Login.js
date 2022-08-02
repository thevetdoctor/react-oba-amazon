/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { apiUrl } from './api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { login } from './functions/login';

function Login() {
    const history = useHistory();
    const [signupActive, setSignupActive] = useState(false);
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useStateValue();

    const handleSignup = () => {
        setSignupActive(!signupActive)
    }
    async function login(e) {
            e.preventDefault();
            setLoading(true);
            const payload = {email, mobile};
            console.log('logging in', payload);
            try {
                const res = await fetch(`${apiUrl}/auth/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
                const data = await res.json();
                console.log(data);
                if(data.success) {
                    setLoading(false);
                    // toast.success("Login successful!", {position: "top-center", hideProgressBar: true});
                    const {username, email, status,} = data.data.user;
                    let user = {username, email, status}
                    dispatch({
                        type: 'SET_USER',
                        user: user
                    })
                    localStorage.setItem('authUser', JSON.stringify(user));
                    localStorage.setItem('jwt', data.data.token);
                    if(status === 'waiter' || status === 'superadmin') {
                        history.push('/dashboard')
                    } else {
                        history.push('/');
                    }
                } else {
                    setLoading(false);
                    // toast.error("Something went wrong!", {position: "top-center", hideProgressBar: true});
                    console.log(data.error);
                }
            } catch(e) {
                setLoading(false);
                console.log('catch error')
            }
        }

        async function signup(e) {
            e.preventDefault();
            setLoading(true);
            const payload = {username, email, mobile, terms: true}
        
            console.log('signing up', payload);
            try {
                const res = await fetch(`${apiUrl}/auth/signup`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
                const data = await res.json();
                console.log(data);
                if(data.success) {
                    setLoading(false);
                    const {username, email, status,} = data.data.user;
                    let user = {username, email, status}
                    dispatch({
                        type: 'SET_USER',
                        user: user
                    })
                    localStorage.setItem('authUser', JSON.stringify(user));
                    localStorage.setItem('jwt', data.data.token);
                    if(status === 'waiter' || status === 'superadmin') {
                        history.push('/dashboard')
                    } else {
                        history.push('/');
                    }
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
            {/* <ToastContainer /> */}
            <Link to='/'>
                <img
                    className="login__logo"
                    src={require('./images/Princess-Luxury.png')} 
                />
            </Link>

            {!signupActive ?
            <div className='login__container' style={{textAlign: 'center'}}>
                <h3>Submit your details</h3><p></p><p></p>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} />

                    <h5>Mobile</h5>
                    <input type='text' value={mobile} placeholder='Mobile' onChange={e => setMobile(e.target.value)} />

                    <button type='submit' disabled={loading} onClick={login} className='login__signInButton'>{!loading ? 'Sign In' : 'Loading'}</button>
                </form>

                <p>
                    I agree to the <strong> PRINCESS LUXURY HOTELS </strong> Conditions of Use.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                {/* <button onClick={handleSignup} disabled={loading} className='login__registerButton'>{signupActive ? 'Go to Login' : 'Create your Account'}</button>
                <button onClick={() => history.push('/')} disabled={loading} className='login__registerButton'>Cancel</button> */}
            </div>
            :
            <div className='login__container'>
                <h1>Sign-Up</h1>

                <form>
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <h5>Mobile</h5>
                    <input type='text' value={mobile} onChange={e => setMobile(e.target.value)} />
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    {/* <input type='password' value={password} onChange={e => setPassword(e.target.value)} /> */}

                    <button type='submit' disabled={loading} onClick={signup} className='login__signInButton'>{!loading ? 'Sign Up' : 'Loading'}</button>
                </form>

                <p>
                    By signing-up you agree to the <strong> PRINCESS LUXURY HOTELS </strong> Conditions of Use. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={handleSignup} disabled={loading} className='login__registerButton'>{signupActive ? 'Go to Login' : 'Create your Account'}</button>
                <button onClick={() => history.push('/')} disabled={loading} className='login__registerButton'>Cancel</button>
            </div>}
        </div>
    )
}

export default Login
