import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
