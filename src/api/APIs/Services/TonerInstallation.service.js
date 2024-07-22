import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Start of Tonar Model

// Get All Tonar Models
export const getAllTonerModels = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(`/tonerModel/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get By Search  TonerModels
export const searchTonerModels = async (search) => {
  try {
    const response = await axiosClient.get(
      `/tonerModel/searchTonerModel?tonerModel=${search}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Tonar Model
export const createTonarModal = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/tonerModel/create`, data);
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
    const response = await axiosClient.put(
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

// Delete Toner Model
export const tonerModelDelete = async (id) => {
  try {
    const response = await axiosClient.delete(`/tonerModel/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// End of Tonar Model

// Start of Tonar Installation

// Get All Toner
export const getallToners = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(`/tonerInstallation/${id}`);
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
    const response = await axiosClient.get(
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

// Create Tonar Installation
export const createTonar = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/tonerInstallation/create`,
      data
    );
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
    const response = await axiosClient.put(
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

//   Delete Toner
export const tonerDelete = async (id) => {
  try {
    const response = await axiosClient.delete(
      `/tonerInstallation/delete/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// End Of Toner
