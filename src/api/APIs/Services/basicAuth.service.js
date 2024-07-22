import { axiosClient } from "..";

export const loginUser = async (data) => {
    try {
      const response = await axiosClient.post(`/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };