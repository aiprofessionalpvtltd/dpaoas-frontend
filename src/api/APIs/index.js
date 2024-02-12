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
  // baseURL: "http://10.10.140.200:8080/api",
});

// Create Tonar Modal
export const createTonarModal = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/tonerModel/create`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All Tonar Models
export const getAllTonerModels = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/tonerModel?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get Single TonerModels By ID
export const getTonersModelById = async (id) => {
  try {
    const response = await axiosClientMMS.get(`/tonerModel/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Update Tonar Modal
export const UpdateTonnerModel = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/tonerModel/update/${id}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get By Search  TonerModels
export const searchTonerModels = async (search) => {
  try {
    const response = await axiosClientMMS.get(
      `/tonerModel/searchTonerModel?tonerModel=${search}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// Delete Toner Model
export const tonerModelDelete = async (id) => {
  try {
    const response = await axiosClientMMS.delete(`/tonerModel/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Tonar Installation
export const createTonar = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/tonerInstallation/create`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All Toner
export const getallToners = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/tonerInstallation/?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// Get Single Toner By ID
export const getTonersById = async (id) => {
  try {
    const response = await axiosClientMMS.get(`/tonerInstallation/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Update Tonner Data

export const UpdateTonner = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/tonerInstallation/update/${id}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const tonerDelete = async (id) => {
  try {
    const response = await axiosClientMMS.delete(
      `/tonerInstallation/delete/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Searching For Toner

export const SearchToner = async (data) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/tonerInstallation/searchTonerInstallation`,
      {
        params: filteredSearchParams,
      }

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
