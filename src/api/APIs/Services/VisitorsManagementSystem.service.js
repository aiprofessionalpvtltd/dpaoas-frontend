//VMS Module

import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

//Passes
export const getPasses = async (currentPage, pageSize) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(
        `/pass?currentPage=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getPassPdfBYPassID = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(`/pass/pdfData/${id}`, {
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const createPasses = async (data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.post(`/pass/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdatePasses = async (data, id) => {
    console.log("data UpData", data);
    try {
      const token = getAuthToken();
      const response = await axiosClient.put(`/pass/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const SearchPasses = async (search) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(
        `/pass/searchQuery?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const DeletePasses = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.delete(`/pass/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  //Visitors
  export const getVisirorsByPassId = async (passId) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(`/pass/visitors/${passId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const createVisitorsByPassId = async (id, data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.post(`/visitor/create/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateVisitorsByVisitorId = async (id, data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.put(`/visitor/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const DeleteVisitorsByVisitorId = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.delete(`/visitor/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const getDuplicatePassByPassId = async (passId) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(`/pass/duplicate/${passId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const createDuplicatePass = async (data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.post(`/pass/createDuplicate`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };