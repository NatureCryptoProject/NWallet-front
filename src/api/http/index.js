import axios from "axios";

export const API_URL = "http://localhost:8000/api";

// export const API_URL = "https://nwallet.nproject.charity/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
