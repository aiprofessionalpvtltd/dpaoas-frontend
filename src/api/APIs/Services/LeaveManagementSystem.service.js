/* Leave Management System (APIs) */

import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Leave Module

export const getAllLeaves = async (page, pageSize) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClient.get(
        `/leave/getAllLeavesOfUser/1?page=${page}&pageSize=${pageSize}`,
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
  
  export const getLeaveById = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/leave/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getAllLeaveTypes = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/leave/types`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const createLeave = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.post(`/leave/create`, data, {
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
  
  export const UpdateLeaveById = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.put(`/leave/${id}`, data, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getWhosOnLeave = async (startDate, endDate, dept) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(
        `/leave/search?startDate=${startDate}&endDate=${endDate}&departmentName=${dept}`,
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
  
  export const searchLeaveHistory = async (searchParams) => {
    try {
      // const token = getAuthToken();
  
      // Filter out empty values
      const filteredSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== ""),
      );
  
      const response = await axiosClient.get(`/leave/search`, {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };