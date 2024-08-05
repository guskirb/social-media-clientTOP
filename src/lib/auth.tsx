import { Navigate } from "react-router-dom";
import axios from "./axios";

const getUser = () => {
  return axios.get("/users/me");
};

const login = (data) => {
  return axios.post("/users/log-in", data);
};

const register = (data) => {
  return axios.post("/users/create", data);
};

const logout = () => {};
