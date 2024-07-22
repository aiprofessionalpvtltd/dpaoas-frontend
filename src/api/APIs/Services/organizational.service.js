import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

/* Organizational Management System (APIs) */

// Roles Module

export const getRoles = async () => {
    try {
      const token = getAuthToken();
      const response = await axiosClient.get(
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
      const response = await axiosClient.get(`/roles/${id}`, {
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
      const response = await axiosClient.post(`/roles/create`, data, {
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
      const response = await axiosClient.put(`/roles/updateRole/${id}`, data, {
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
      const response = await axiosClient.delete(`/roles/delete/${id}`, {
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
      const response = await axiosClient.get(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.post(`/departments/create`, data, {
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
    const response = await axiosClient.put(
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
    const response = await axiosClient.delete(`/departments/delete/${id}`, {
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.post(`/designations/create`, data, {
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
    const response = await axiosClient.put(
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
    const response = await axiosClient.delete(`/designations/delete/${id}`, {
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
    const response = await axiosClient.post(`/employee/create`, data, {
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
    const response = await axiosClient.get(
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

export const getEmployeeById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/employee/${id}`,
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

export const getLLEmployee = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getLLEmployee/${userId}`,
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

export const getHLEmployee = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getHLEmployees/${userId}`,
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
    const response = await axiosClient.delete(`/employee/delete/${id}`, {
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
    const response = await axiosClient.put(`/employee/update/${id}`, data, {
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

