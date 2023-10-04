import axios from "axios";

import { API_URL } from "./data";

export const verifyPayment = async (data) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/payment",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};
