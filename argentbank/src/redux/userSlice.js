import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loginInfos: null,
  token: null,
  userProfile: {
    firstName: "",
    lastName: "",
    userName: "",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginInfos: (state, action) => {
      state.loginInfos = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserFirstName: (state, action) => {
      state.userProfile.firstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.userProfile.lastName = action.payload;
    },
    setUserUserName: (state, action) => {
      state.userProfile.userName = action.payload;
    },
    setLogout: (state) => {
      return initialState; 
    },
    setLogin: (state) => {
      state.isLoggedIn = true; 
    },
  },
});

export const {
  setLoginInfos,
  setUserToken,
  setUserFirstName,
  setUserLastName,
  setUserUserName,
  setLogout,
  setLogin,
} = userSlice.actions;

export default userSlice; 