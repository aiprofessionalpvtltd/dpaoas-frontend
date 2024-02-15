import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

export const createEfiling = async (data) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/vendors/create`,
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  export const getAllEfiling = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/vendors?currentPage=${currentPage}&pageSize=${pageSize}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const DeleteEfiling = async (id) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.delete(
        `/vendors/delete/${id}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateEfiling = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/vendors/update/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };