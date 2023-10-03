import axios from "axios";

import { API_URL } from "./data";

export const loginUser = async (data) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/auth/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};
