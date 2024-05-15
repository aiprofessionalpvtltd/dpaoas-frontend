import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

//Motion Management System
export const createNewMotion = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/motion/create`, data, {
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

export const getAllMinistry = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/motion/ministries`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getMotionByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/motion/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllMotion = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/motion/all?page=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllMotionNotice = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/motion/inNotice?page=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateNewMotion = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/motion/${id}`, data, {
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

//SearchMotion
export const searchMotion = async (currentPage, pageSize, data) => {
  try {
    // const token = getAuthToken();
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    const response = await axiosClientMMS.get(
      `/motion/all?page=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const searchMotionNotice = async (currentPage, pageSize, data) => {
  try {
    // const token = getAuthToken();
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    const response = await axiosClientMMS.get(
      `/motion/inNotice?page=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Motion Status
export const getallMotionStatus = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/motion/motionStatuses`, {
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
//Member
export const getallMembers = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/members/all?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const sendToMotion = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/motion/sendToMotion/${id}`, data,
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

export const sendMotionForTranslation = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/motion/sendForTranslation/${id}`,
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

export const allMotionSummary = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(
      `/motion/summary?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Create Motion List
export const createNewMotionList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/motion/motion-lists`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
