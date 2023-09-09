import React from "react";
import { Link } from 'react-router-dom'; 
import argentBankLogo from '../assets/argentBankLogo.png'
import '../../src/index.css'
import {setLogin , setLogout} from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

function Header({ isLoggedIn, handleLogout, pseudo }) { 

  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const dispatch = useDispatch();

  // const handleAuthentication = () => {
  //   if (isLoggedIn) {
  //     dispatch(logout());
  //   } else {
  //     dispatch(login());
  //   }
  // };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={ argentBankLogo } alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isLoggedIn ? (
          <div>
          <p className="user-pseudo">{pseudo}</p> 
          <Link to="/sign-in" className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        </div>
        ) : (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
            </div>
        </nav>

    )
}

export default Header