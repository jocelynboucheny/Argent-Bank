import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { setUserToken, setLoginInfos } from "../redux/userSlice";
import '../index.css'
import {setLogin , setLogout} from '../redux/userSlice';



function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleSignIn = (e) => {
    e.preventDefault();

    // const handleAuthentication = () => {
    //   if (isLoggedIn) {
    //     dispatch(setLogout());
    //   } else {
    //     dispatch(setLogin());
    //   }
    // };
  
    
    const data = {
        email: username,
        password: password,
      };
      console.log(data);
  
      Axios.post("http://localhost:3001/api/v1/user/login", data)
        .then((response) => {
          dispatch(setLogin());
          dispatch(setLoginInfos(data));
          dispatch(setUserToken(response.data.body.token));
          console.log("Token:", response.data.body.token);
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
          console.error("Cet identifiant ou ce mot de passe est inconnu, veuillez réessayer.");
        });
  };

    return (
        <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Form