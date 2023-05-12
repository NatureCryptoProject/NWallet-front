import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import AuthService from "../../api/services/auth-service";
import { API_URL } from "../../api/http";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkApi) => {
    try {
      const { data } = await AuthService.registration(userData);
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      Notify.failure(error.response?.data?.message);
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await AuthService.login(userData);
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      Notify.failure(error.response?.data?.message);
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
  } catch (error) {
    Notify.failure(error.response?.data?.message);
    return thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

export const checkAuth = createAsyncThunk(
  "auth/current",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      return {
        userName: response.data.user.name,
        payPsw: response.data.payPsw,
      };
    } catch (error) {
      // Notify.failure(error.response?.data?.message);
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);
