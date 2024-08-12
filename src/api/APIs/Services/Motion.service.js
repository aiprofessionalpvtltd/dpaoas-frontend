import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

//Motion Management System
export const createNewMotion = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/motion/create`, data, {
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
    const response = await axiosClient.get(`/motion/ministries`);
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

export const getSingleMinisteryByMinisterID = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/mnas/${id}/ministries`);
    // {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
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
    const response = await axiosClient.get(`/motion/${id}`);
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

export const getAllMotion = async (
  currentPage,
  pageSize,
  motionSentStatus,
  motiontoStatus
) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/motion/all?page=${currentPage}&pageSize=${pageSize}&motionSentStatus=${motionSentStatus}&motionSentStatus=${motiontoStatus}`
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

export const getAllMotionNotice = async (
  currentPage,
  pageSize,
  motionSentStatus
) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/motion/inNotice?page=${currentPage}&pageSize=${pageSize}&motionSentStatus=${motionSentStatus}`
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
    const response = await axiosClient.put(`/motion/${id}`, data, {
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(`/motion/motionStatuses`, {
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.put(`/motion/sendToMotion/${id}`, data, {
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

export const sendMotionForTranslation = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(`/motion/sendForTranslation/${id}`, {
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

export const allMotionSummary = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
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

// //Create Motion List
// export const createNewMotionList = async (data) => {
//   try {
//     // const token = getAuthToken();
//     const response = await axiosClient.post(`/motion/motion-lists`, data);
//     return response?.data;
//   } catch (error) {
//     console.error("Error fetching API endpoint:", error);
//     throw error;
//   }
// };

// Motion List Report
export const allMotionList = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/motion/motionLists?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//GENERATE
export const generateMotionList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/motion/generateMotionListData`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Save Motion List
export const saveNewMotionList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/motion/motion-lists`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Update Motion List
export const UpdateMotionList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/motion/updateMotionListAndAssociations`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Delete Motion List
export const deleteMotionListByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(`/motion/motionlists/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//MotionBallotRecord
export const getBallotMotionRecord = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/motion/pdfMotionList`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const allBallotByMotionListId = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/motion/getSingleMotionData/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const dashboardMotionStats = async () => {
  try {
    const response = await axiosClient.get(`/motion/motion-dashboard-stats`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
