import { axiosClientVMS } from "..";
import { getAuthToken } from "../../Auth";

/* Organizational Management System (APIs) */

// Roles Module

export const getRoles = async () => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.get(
        `/roles?currentPage=${0}&pageSize=${1000}`,
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
  
  export const getRoleById = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.get(`/roles/${id}`, {
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
  
  export const createRole = async (data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.post(`/roles/create`, data, {
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
  
  export const updateRole = async (id, data) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.put(`/roles/updateRole/${id}`, data, {
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
  
  export const DeleteRole = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.delete(`/roles/delete/${id}`, {
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

  export const getModules = async () => {
    try {
      const token = getAuthToken();
      const response = await axiosClientVMS.get(
        `/permissions/modulesPermissions`,
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

