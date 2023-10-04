import axios from "axios";

import { API_URL } from "./data";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL + "/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(API_URL + "/products/" + id);
  return response.data;
};

export const addProduct = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/products",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/images",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const updateProduct = async ({ id, data, token = "" }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/products/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const deleteProduct = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/products/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
