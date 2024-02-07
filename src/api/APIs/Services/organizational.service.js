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
//
//Department
export const getDepartment = async (currentPage, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(
      `/departments/?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const createDepartment = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/departments/create`, data, {
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

export const UpdateDepartment = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(
      `/departments/update/${id}`,
      data,
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

export const DeleteDepartment = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.delete(`/departments/delete/${id}`, {
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

//Designations
export const getDesignations = async (currentPage, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(
      `/designations/?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const createDesignation = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/designations/create`, data, {
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

export const UpdateDesignation = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(
      `/designations/update/${id}`,
      data,
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

export const DeleteDesignation = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.delete(`/designations/delete/${id}`, {
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

//Employee
export const createEmployee = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/employee/create`, data, {
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

export const getAllEmployee = async (currentPage, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(
      `/employee/?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const DeleteEmployee = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.delete(`/employee/delete/${id}`, {
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
export const UpdateEmployee = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/employee/update/${id}`, data, {
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

