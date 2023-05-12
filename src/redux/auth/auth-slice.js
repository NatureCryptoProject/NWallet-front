import { createSlice } from "@reduxjs/toolkit";
import { signup, login, logout, checkAuth } from "./auth-operations";

const initialState = {
  userName: null,
  payPsw: null,
  token: null,
  isLogin: false,
  error: null,
  loading: false,
  authCheking: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.userName = payload.user.name;
      state.token = payload.token;
      state.payPsw = payload.payPsw;
      state.loading = false;
      state.isLogin = true;
    },
    [signup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.userName = payload.user.name;
      state.token = payload.token;
      state.payPsw = payload.payPsw;
      state.loading = false;
      state.isLogin = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [logout.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state) => {
      state.userName = initialState.userName;
      state.token = null;
      state.payPsw = null;
      state.isLogin = false;
      state.loading = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [checkAuth.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.authCheking = true;
    },
    [checkAuth.fulfilled]: (state, { payload }) => {
      state.userName = payload.userName;
      state.payPsw = payload.payPsw;
      state.token = payload.token;
      state.loading = false;
      state.authCheking = false;
      state.isLogin = true;
    },
    [checkAuth.rejected]: (state, { payload }) => {
      state.loading = false;
      state.authCheking = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
