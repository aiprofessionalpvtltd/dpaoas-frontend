/* Notice Management System (APIs) */

import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

// Resolution Module

export const createResolution = async (data) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.post(`/resolution/create`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getAllResolutions = async (page, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/resolution?currentPage=${page}&pageSize=${pageSize}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // }
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getAllResolutionStatus = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/resolution/resolutionStatuses`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // }
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const searchResolution = async (searchParams) => {
    try {
      // const token = getAuthToken();
  
      // Filter out empty values
      const filteredSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== ""),
      );
  
      const response = await axiosClientMMS.get(`/resolution/searchQuery`, {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const DeleteResolution = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.delete(`/resolution/delete/${id}`);
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getResolutionBYID = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(`/resolution/${id}`);
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateResolution = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/resolution/update/${id}`,
        data,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const sendResolutionForTranslation = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/resolution/sendTranslation/${id}`,
      );
      //  {
      //   headers: {
      //     accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };