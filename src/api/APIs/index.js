import React from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const TINY_EDITOR_API_KEY = process.env.REACT_APP_TINY_EDITOR_API_KEY;

console.log("API URL:", API_URL); // This should log the API URL from .env
console.log("Tiny Editor API Key:", TINY_EDITOR_API_KEY); // This should log the API key from .env

export const imagesUrl = API_URL;

const createAxiosClient = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      // Add any default headers here
    },
  });
};

export const axiosClient = createAxiosClient(`${API_URL}/api`);
