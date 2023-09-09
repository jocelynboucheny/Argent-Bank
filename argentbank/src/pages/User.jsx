import '../user.css';
import Account from '../components/Account';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken, setLogout } from '../redux/userSlice';
import Axios from 'axios';
import Header from '../containers/Header';
import { setUserFirstName, setUserLastName, setUserUserName } from '../redux/userSlice';



const AccountsData = [
    {
        title: 'Argent Bank Checking (x8349)',
        amount: '$2,082.79',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Savings (x6712)',
        amount: '$10,928.42',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Credit Card (x8349)',
        amount: '$184.30',
        description: 'Current Balance'
    }
]

function User() {
  const loginInfos = useSelector((state) => state.user.loginInfos);
  const token = useSelector((state) => state.user.token);
  const firstName = useSelector((state) => state.user.userProfile.firstName);
  const lastName = useSelector((state) => state.user.userProfile.lastName);
  const userName = useSelector((state) => state.user.userProfile.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatingName, setUpdatingName] = useState(false);
  const [pseudo, setPseudo] = useState(userName);

  useEffect(() => {
    if (!firstName || !lastName) {
      getUserData();
    }
  }, [token, loginInfos, firstName, lastName]);


  const getUserData = () => {
    Axios.post("http://localhost:3001/api/v1/user/profile", loginInfos, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const { userName, firstName, lastName } = response.data.body
        console.log(response.data.body)
        dispatch(setUserFirstName(firstName));
        dispatch(setUserLastName(lastName));
        dispatch(setUserUserName(userName))
        setPseudo(response.data.body.userName);
      })
      .catch((error) => {
        console.error("Token incorrect.");
        console.log(error);
      });
  };



  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/sign-in");
  };

  const handleChangeUserName = (e) => {
    e.preventDefault();
    updateUserData(pseudo);
    setUpdatingName(!updatingName);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPseudo(value);
  };

  const updateUserData = (pseudo) => {
    const userProfile = {
      userName: pseudo,
    };
    console.log(userProfile);
    Axios.put("http://localhost:3001/api/v1/user/profile", userProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setPseudo(pseudo);
        dispatch(setUserUserName(pseudo));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeUsername = () => {
    return (
      <form onSubmit={handleChangeUserName}>
        <div className="formChangeUserNameInputs">
          <div>
            <input
              type="text"
              id="username"
              value={pseudo}
              className="inputUpdate"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="firstname"
              value={firstName}
              className="inputUpdate input-disabled"
              readOnly
            />
          </div>
          <div>
            <input
              type="text"
              id="lastname"
              value={lastName}
              className="inputUpdate input-disabled"
              readOnly
            />
          </div>
        </div>
        <div className="formChangeUserNameButtons">
          <button type="submit" className="buttonUpdate">
            Save
          </button>
          <button
            type="button"
            className="buttonUpdate"
            onClick={(e) => setUpdatingName(!updatingName)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="user_container">
      <Header isLoggedIn={true} handleLogout={handleLogout} pseudo={userName} />
        <main className={`main ${updatingName ? 'bg_white' : 'bg-dark'}`}>
        <div className="header">
        <h1>
            Welcome back<br />
            {!updatingName ? (
              <>{userName} !</>
            ) : (
              changeUsername()
            )}
          </h1>
          {updatingName || (
            <button
              className="edit-button"
              onClick={(e) => setUpdatingName(!updatingName)}
            >
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
          { AccountsData.map(account => (
            <Account 
              key= { account.title }
              title= { account.title }
              amount= { account.amount }
              description= { account.description }
            />
          ))}
    </main>
    </div>
  );
}

export default User