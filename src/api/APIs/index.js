import axios from "axios";
import { getAuthToken } from "../Auth";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "http://172.16.170.8:5151/api",
});

export const axiosClientVMS = axios.create({
  baseURL: "http://172.16.170.8:5152/api",
});

export const axiosClientMMS = axios.create({
  baseURL: "http://172.16.170.8:5252/api",
});

export const loginUser = async (data) => {
  try {
    const response = await axiosClientVMS.post(`/users/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

/* Organizational Management System (APIs) */

// Roles Module

export const getRoles = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientVMS.get(`/roles?currentPage=${0}&pageSize=${1000}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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

//Department
export const getDepartment = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/departments`, {
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

export const createDepartment = async (data) => {
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

export const UpdateDepartment = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(
      `/departments/delete/${data.id}`,
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

//Designations
export const getDesignations = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/designations`, {
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

export const UpdateDesignation = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(
      `/designations/update/${data.id}`,
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

//VMS Module
//Passes
export const getPasses = async (currentPage, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(
      `/pass?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const getPassPdfBYPassID = async (id) => {
  console.log("idddddd", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass/pdfData/${id}`,
     {
      headers: {
        "Content-Type": "application/pdf"
      }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const createPasses = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/pass/create`, data, {
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

export const UpdatePasses = async (data, id) => {
  console.log("data UpData", data);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/pass/update/${id}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const SearchPasses = async (search) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(
      `/pass/searchQuery?search=${search}`,
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

export const DeletePasses = async (id) => {
  console.log("Delete Id", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.delete(`/pass/delete/${id}`);
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
//Visitors
export const getVisirorsByPassId = async (passId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass/visitors/${passId}`, {
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

export const createVisitorsByPassId = async (id, data) => {
  console.log("iddddddddd", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/visitor/create/${id}`, data);
    //  {
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

export const UpdateVisitorsByVisitorId = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.put(`/visitor/update/${id}`, data, {
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

export const DeleteVisitorsByVisitorId = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.delete(`/visitor/delete/${id}`, {
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

export const getDuplicatePassByPassId = async (passId) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.get(`/pass/duplicate/${passId}`, {
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

export const createDuplicatePass = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientVMS.post(`/pass/createDuplicate`, data);
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

/* Leave Management System (APIs) */

// Leave Module

export const getAllLeaves = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/leave/getAllLeavesOfUser/1?page=${page}&pageSize=${pageSize}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
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
    console.error("Error fetching API endpoint:", error);
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
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const createLeave = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.post(`/leave/create`, data, {
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
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getWhosOnLeave = async (startDate, endDate, dept) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/leave/search?startDate=${startDate}&endDate=${endDate}&departmentName=${dept}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

/* Notice Management System (APIs) */

// Resolution Module

export const createResolution = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.post(`/resolution/create`, data, {
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

export const getAllResolutions = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/resolution?currentPage=${page}&pageSize=${pageSize}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const searchResolution = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== ""),
    );

    const response = await axiosClientMMS.get(`/resolution/searchQuery`, {
      params: filteredSearchParams,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const DeleteResolution = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.delete(`/resolution/delete/${id}`)
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

// Question Module
export const createQuestion = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.post(`/questions/create`, data, {
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

export const getAllQuestion = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/questions/all?currentPage=${page}&pageSize=${pageSize}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const searchQuestion = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== ""),
    );

    const response = await axiosClientMMS.get(`/questions/searchQuestion`, {
      params: filteredSearchParams,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Question Status
export const getAllQuestionStatus = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(`/questions/quesStatuses`, {
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

//Send Question Tranlation
export const sendQuestionTranslation = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/questions/sendForTranslation/${id}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
//GetQuestionBYId
export const getAllQuestionBYID = async (id) => {
  console.log("IDDDDDDD", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(`/questions/${id}`, {
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

export const UpdateQuestionById = async (id, data) => {
  console.log("weioweoeo", id);
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.put(`/questions/update/${id}`, data, {
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
//Daffer Question
export const createDefferQuestion = async (id, DefferData) => {
  console.log("iwefjiouios". DefferData);
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.post(`/questions/deferQuestion/${id}`, DefferData, {
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

// Revive 
export const createReviveQuestion = async (id, reviveData) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.post(`/questions/reviveQuestion/${id}`, reviveData, {
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

// Sessions

export const getAllSessions = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.get(`/sessions`, {
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

//Motion Management System
export const createNewMotion = async (data) => {
  try {
    const token = getAuthToken();
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
    const token = getAuthToken();
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
    const token = getAuthToken();
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
    const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/motion/all?page=${currentPage}&pageSize=${pageSize}`,
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
    const token = getAuthToken();
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
    const token = getAuthToken();
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );
    const response = await axiosClientMMS.get(
      `/motion/all?page=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      },
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
    const token = getAuthToken();
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
    const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/members/all?page=${currentPage}&pageSize=${pageSize}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const sendMotionForTranslation = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/motion/sendForTranslation/${id}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
