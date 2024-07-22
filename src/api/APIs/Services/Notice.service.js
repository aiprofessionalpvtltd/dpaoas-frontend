import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Notice Stats API
export const getAllNoticeStats = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/noticeOfficeReport/getStats`, {
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

// Get attendance

export const getSessionDayAttendanceReport = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/manageSession/getAttendanceByProvince/${id}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Speach On Demand
export const createSpeachOnDemand = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/senator/speech-on-demand`,
      data
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllSpeachOnDemand = async (currentPage, pageSize, isActive) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/speech-on-demand/findall?currentPage=${currentPage}&pageSize=${pageSize}&isActive=${isActive}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getSpeachOnDemandStats = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/speech-on-demand/stats`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getSpeachOnDemandById = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/speech-on-demand/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateSpeachOnDemand = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/senator/speech-on-demand/${id}`,
      data
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const DeleteSpeachOnDemand = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
      `/senator/speech-on-demand/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Reseacrch Services
export const createResearchServices = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/senator/request-research`,
      data
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateResearchServices = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/senator/request-research/${id}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getResearchServicesById = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/request-research/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllResarchServices = async (currentPage, pageSize, isActive) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/request-research/findall?currentPage=${currentPage}&pageSize=${pageSize}&isActive=${isActive}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getResearchServicesStats = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/senator/request-research/stats`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const DeleteResearchServices = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
      `/senator/request-research/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Legislative Bill Data
export const getAllLegislativeBill = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/legislativeBills/findall?currentPage=${currentPage}&pageSize=${pageSize}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllLegislativeBillNotice = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/legislativeBills/inNotice?currentPage=${currentPage}&pageSize=${pageSize}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const sendLegislativeBill = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/legislativeBills/sendToLegislation/${id}`, data,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const DeleteLegislativeBill = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
      `/legislativeBills/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//get By Single Id 
export const getLegislativeBillById = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/legislativeBills/${id}`
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateLegislativeBillById = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/legislativeBills/${id}`,
      data,
      {
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