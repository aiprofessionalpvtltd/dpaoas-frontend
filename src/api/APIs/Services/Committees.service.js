import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Getting All Committees
export const getCommittees = async (currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/manage-committee?currentPage=${currentPage}&pageSize=${pageSize}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Update Committees Data
export const UpdateCommittees = async (id, data) => {
  try {
    const response = await axiosClient.put(
      `/manage-committee/update/${id}`,
      data
      //   {
      //     headers: {
      //       accept: "application/json",
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Committees
export const createCommittees = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/manage-committee`,
      data
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
