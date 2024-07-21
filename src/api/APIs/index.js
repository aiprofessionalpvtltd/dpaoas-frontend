import axios from "axios";
 
// const NODE_APP_API_URL = "http://127.0.0.1:5152";
const NODE_APP_API_URL = process.env.NODE_APP_API_URL;

// Get APP_IP from environment variables with a fallback
const APP_IP = NODE_APP_API_URL || "http://localhost:5152";


console.log("this is env var", process.env.REACT_APP_API_URL);

// Image/Files URL (Production)
export const imagesUrl = APP_IP;

// Image Url
export const imagesUrl2 = APP_IP;

// Function to create an axios instance with a base URL
const createAxiosClient = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      // Add any default headers here
    },
  });
};

// Create axios clients with base URL
export const axiosClient = createAxiosClient(`${APP_IP}/api`);
export const axiosClientVMS = createAxiosClient(`${APP_IP}/api`);
export const axiosClientMMS = createAxiosClient(`${APP_IP}/api`);
 
