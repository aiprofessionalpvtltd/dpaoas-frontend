import axios from "axios";
import { getAuthToken } from "../Auth";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "BAse URL/api",
});

export const loginUser = async (data) => {
  try {
    const response = await axiosClient.post(`/users/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

// Roles Module

export const getRoles = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const createRole = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.post(`/roles/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

//Department
export const getDepartment = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const createDepartment = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.post(`/designations/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const UpdateDepartment = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.put(`/departments/delete/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

//Designations
export const getDesignations = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/designations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const createDesignation = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.post(`/designations/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const UpdateDesignation = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.put(`/designations/update/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};