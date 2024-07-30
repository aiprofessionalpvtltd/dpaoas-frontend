/* Notice Management System (APIs) */

import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Resolution Module

export const createResolution = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(`/resolution/create`, data, {
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

export const getAllResolutions = async (page, pageSize, resolutionSentStatus) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/resolution/all?currentPage=${page}&pageSize=${pageSize}&resolutionSentStatus=${resolutionSentStatus}`,
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

export const getAllResolutionsNotice = async (page, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/resolution/inNotice?currentPage=${page}&pageSize=${pageSize}`,
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

export const getAllResolutionStatus = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/resolution/resolutionStatuses`,
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

export const searchResolution = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/resolution/searchQuery?currentPage=${currentPage}&pageSize=${pageSize}`,
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

//Annual Resolution Api
export const resolutionAnnualReport = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/resolution/searchQuery/annual-report?currentPage=${currentPage}&pageSize=${pageSize}`,
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
export const DeleteResolutionList = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/resolution/searchInactiveResoultion?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const DeleteResolution = async (id, Data) => {
  
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(`/resolution/delete/${id}`,Data);
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

export const RecoverDeleteResolution = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(`/resolution/reActive/${id}`);
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

export const getResolutionBYID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/resolution/${id}`);
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

export const UpdateResolution = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/resolution/update/${id}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const sendToResolution = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/resolution/sendToResolution/${id}`, data,
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

export const sendResolutionForTranslation = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/resolution/sendTranslation/${id}`
    );
    //  {
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

//Summary
export const allResolutionSummary = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/resolution/summary?currentPage=${currentPage}&pageSize=${pageSize}`,
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

//Resolution List
//GENERATE
export const generateResolutionListData = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/resolution/generateResolutionListData`, data)
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
  //Create rESOLUTION List 
  export const createNewResolutionList = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.post(`/resolution/resolution-lists`, data)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

   //Update rESOLUTION List 
   export const UpdateResolutionList = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.put(`/resolution/updateResolutionListAndAssociations`, data)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const allResolutionList = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/resolution/resolutionLists?currentPage=${currentPage}&pageSize=${pageSize}`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  }

  export const deleteResolutionListByID = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.delete(`/resolution/resolutionlists/${id}`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  }

  //getBallotRecord
  export const getBallotRecord = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.post(`/resolution/pdfResolutionList`, data)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const resolutionStatusCount = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/resolution/resolutionsByStatus`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const allBallotByResolutionListId = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/resolution/getSingleResolutionData/${id}`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  //
  export const allBallotResolution = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.get(`/resolution/findAllBalloting?currentPage=${currentPage}&pageSize=${pageSize}`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const changeResolutionStatus = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClient.put(`/resolution/resolutionsBalloting/status`, data)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const searchResolutionbyColumn = async (searchParams, data) => {
    try {
      // const token = getAuthToken();
  
      // Filter out empty values
      const filteredSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== "")
      );
  
      const response = await axiosClient.post(
        `/resolution/selectColumnsResolution`, data,
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