import axios from "axios";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "BAse URL",
});

export const listData = () => {
    return axiosClient.get(``)
}