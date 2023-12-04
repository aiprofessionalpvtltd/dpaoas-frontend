import axios from "axios";
import { getAuthToken } from "../Auth";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "http://172.16.170.8:5151/api",
});

export const axiosClientVMS = axios.create({
  baseURL: "http://172.16.170.8:5152/api",
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

/* Organizational Management System (APIs) */

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

//VMS Module
//Passes
export const getPasses = async (currentPage, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass?currentPage=${currentPage}&pageSize=${pageSize}`, {
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

export const getPassPdfBYPassID = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/api/pass/pdfData/${id}`)
    //  {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const createPasses = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/pass/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
}

export const UpdatePasses = async (data, id) => {
  console.log("data UpData", data);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/pass/update/${id}`, data);
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const DeletePasses = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/pass/delete/${data.id}`, {
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
//Visitors
export const getVisirorsByPassId = async (passId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass/visitors/${passId}`, {
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

export const createVisitorsByPassId = async (id, data) => {
  console.log("iddddddddd", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/visitor/create/${id}`, data)
    //  {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const UpdateVisitorsByVisitorId = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/visitor/update/${id}`, data, {
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

export const DeleteVisitorsByVisitorId = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/visitor/delete/${data.visitorId}`, {
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

export const getDuplicatePassByPassId = async (passId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass/duplicate/${passId}`, {
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

export const createDuplicatePass = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/pass/createDuplicate`, data)
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};



/* Leave Management System (APIs) */

// Leave Module

export const getAllLeaves = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/leave/getAllLeavesOfUser/1?page=${page}&pageSize=${pageSize}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const getLeaveById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/leave/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // } 
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const getAllLeaveTypes = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/leave/types`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const createLeave = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.post(`/leave/create`, data, {
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

export const UpdateLeaveById = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.put(`/leave/${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};

export const getWhosOnLeave = async (startDate, endDate, dept) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/leave/search?startDate=${startDate}&endDate=${endDate}&departmentName=${dept}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    throw error;
  }
};