import { axiosClientVMS } from "..";

export const loginUser = async (data) => {
    try {
      const response = await axiosClientVMS.post(`/users/login`, data, {
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