import axios from "axios";
import { getAuthToken } from "../Auth";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "http://172.16.170.8:5151/api",
});

export const axiosClientVMS = axios.create({
  baseURL: "http://172.16.170.8:5152/api",
});

export const axiosClientMMS = axios.create({
  baseURL: "http://172.16.170.8:5252/api",
  // baseURL: "http://10.10.140.200:5152/api",
  // baseURL: "http://10.10.140.200:8080/api",
});
