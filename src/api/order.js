import axios from "axios";

const API_URL = "http://localhost:5000";

export const createOrder = async (data) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/orders",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(API_URL + "/orders");
  return response.data;
};

export const updateStatus = async ({ id, data }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/orders/" + id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const deleteOrder = async (order_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/orders/" + order_id,
  });
  return response.data;
};
