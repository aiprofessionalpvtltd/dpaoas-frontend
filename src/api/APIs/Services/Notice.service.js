import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

// Notice Stats API
export const getAllNoticeStats = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/noticeOfficeReport/getStats`, {
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
    const response = await axiosClientMMS.get(
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
    const response = await axiosClientMMS.post(
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

export const getAllSpeachOnDemand = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/senator/speech-on-demand/findall?currentPage=${currentPage}&pageSize=${pageSize}`
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
    const response = await axiosClientMMS.get(
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
    const response = await axiosClientMMS.put(
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
    const response = await axiosClientMMS.delete(
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
    const response = await axiosClientMMS.post(
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
    const response = await axiosClientMMS.put(
      `/senator/request-research/${id}`,
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

export const getResearchServicesById = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
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

export const getAllResarchServices = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/senator/request-research/findall?currentPage=${currentPage}&pageSize=${pageSize}`
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
    const response = await axiosClientMMS.delete(
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
    const response = await axiosClientMMS.get(
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

export const DeleteLegislativeBill = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
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
    const response = await axiosClientMMS.get(
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
    const response = await axiosClientMMS.put(
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