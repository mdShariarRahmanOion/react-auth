import ReactDOM from 'react';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css'


const Login = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        error: '',
        success: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    var provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                // const { displayName, email } = result.user;
                // const signedInUser = { name: displayName, email }
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                // setLoggedInUser(signedInUser)
                // history.replace(from);
                setLoggedInUser(user)
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                // console.log(errorCode, errorMessage, email, credential)
            });
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleLogin = (e) => {
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(provider)
                // .signInWithPopup(provider)
                .then((result) => {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = '';
                    // newUserInfo.success = true;
                    // setUser(newUserInfo);
                    var credential = result.credential;
                    var user = result.user;
                    var accessToken = credential.accessToken;
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const handleClick = () => {
        // <Link to="/destination"></Link>
        setLoggedInUser(user);
        history.replace(from);
    }
    return (
        <div className="text-center">
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h5>Login:</h5>
                    <input className="input" onBlur={handleBlur} type="text" name="Name" placeholder="Enter Your Name:" required />
                    <hr/>
                    <br />
                    <input className="input" onBlur={handleBlur} type="text" name="email" placeholder="Enter Your Email:" required />
                    <hr/>
                    <br />
                    <input className="input" type="password" onBlur={handleBlur} name="password" placeholder="enter Your Password:" required />
                    <hr/>
                    <br />
                    <input className="login" type="submit" onClick={handleClick} value="Login" />
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User created successfully</p>}
                </form>
            </div>
            <br/>
            <hr className="hr"/>
            <p className="hr">or</p>
            <hr className="hr"/>
            <br/>
            <button className="signIn" onClick={handleGoogleSignIn} style={{ backgroundColor: 'orange' }}> Google Sign in</button>
            <br />
            <button className="signIn" onClick={handleFacebookSignIn} style={{ backgroundColor: 'orange' }}>Facebook Sign in</button>
        </div>
    );
};

export default Login;