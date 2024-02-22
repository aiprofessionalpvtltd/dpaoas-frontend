// Seating Plan

import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

export const updateSeat = async (seatNo, data) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/seatingPlan/seatAssignment/${seatNo}`,
        data,
        // {
        //   headers: {
        //     accept: "application/json",
        //     "Content-Type": "multipart/form-data",
        //   },
        // },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getAllSeats = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(`/seatingPlan/allSeats`, {
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
  
  export const createManageSession = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(`/manageSession/create`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const updateManageSession = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(`/manageSession/update/${id}`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getAllManageSessions = async (page, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/manageSession/all?currentPage=${page}&pageSize=${pageSize}`,
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
  
  export const getManageSessionById = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/manageSession/${id}`,
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
  
  export const getSeatById = async (seatNo) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/seatingPlan/getSeat/${seatNo}}`,
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
  