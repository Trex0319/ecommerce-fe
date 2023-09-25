import axios from "axios";

const API_URL = "http://localhost:5000";

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
