import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

export const createEfiling = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(`/files/createFile`, data, {
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
export const getAllEfiling = async (currentPage, pageSize, userId) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const DeleteEfiling = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(`/files/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateEfiling = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(`files/update/${id}`, data);
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

export const getEFilesByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/files/${id}`);
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

//case Detail
export const getCaseDetailByID = async (fileId, caseId) => {
  console.log("sss", fileId, caseId);
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getCaseDetails/${fileId}/${caseId}`
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

export const UploadEfilingAttechment = async (userId, fileId, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/files/corresponding/${userId}/${fileId}`,
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

//new File
export const createFIleRegister = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(`/fileRegisters/create`, data);
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

export const UpdateFIleRegister = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/fileRegisters/update/${id}`,
      data
    );
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

export const getAllFileRegister = async (branchId, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/fileRegisters/${branchId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

//All Year
export const getAllYear = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/files/years/`, data);
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

//Create Heading
export const createFIleHeading = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(`/mainHeading/create`, data);
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

export const getAllFileHeading = async (branchId, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/mainHeading/getAllHeadings/${branchId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export const registerRecordByRegisterId = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/fileRegisters/singleRegister/${id}`
    );
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

export const UpdateFIleHeading = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/mainHeading/update/${id}`,
      data
    );
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

export const getSingleHeadingbyId = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/mainHeading/${id}`);
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

//heading retrive on the basis on branch id

export const geteHeadingbyBranchId = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/mainHeading/byBranch/${id}`);
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
export const geteHeadingNumberbyMainHeadingId = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/mainHeading/byHeading/${id}`);
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

//CreatFiles
export const createFiles = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(`/files/createFile/${id}`, data);
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

// export const getFileByRegisterById = async (id, currentPage, pageSize) => {
//   try {
//     //   const token = getAuthToken();
//     const response = await axiosClient.get(
//       `/files/byFileRegister/${id}?currentPage=${currentPage}&pageSize=${pageSize}`)
//       // {
//       //   headers: {
//       //     accept: "application/json",
//       //     "Content-Type": "multipart/form-data",
//       //   },
//       // });
//     return response?.data;
//   } catch (error) {
//     console.error("Error fetching API endpoint:", error);
//     throw error;
//   }
// };

export const getFileByRegisterById = async (searchParams) => {
  // Filter out empty values
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );

  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/files/byFileRegister`, {
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

export const getFileStates = async () => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/filesDashboard/stats`);
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

export const DeleteHeading = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(`/mainHeading/delete/${id}`);
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

// Create Case
export const createCase = async (id, userId, frId, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/cases/createCase/${id}/${userId}/${frId}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateCase = async (fileId, userId, caseId, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `cases/updateCase/${fileId}/${userId}/${caseId}`,
      data,
      {
        headers: {
          accept: "multipart/form-data",
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

export const getAllCasesThroughSearchParams = async (searchParams) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/cases/getCasesByFileId`, {
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

export const getSingleCaseByFileId = async (fileId, caseId) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getCase/${fileId}/${caseId}`
    );
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

export const getUserCaseHistory = async (
  fileId,
  branchId,
  userId,
  currentPage,
  pageSize
) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getCasesHistory/${fileId}/${branchId}/${userId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export const getUserAllCaseHistory = async (
  fileId,
  branchId,
  userId,
  currentPage,
  pageSize
) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getAllCasesHistory/${fileId}/${branchId}/${userId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export const getUserApprovedCaseHistory = async (searchParams) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/cases/getApprovedCasesHistory`,
      {
        params: filteredSearchParams,
      }
    );
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

export const DeleteFileCaseImage = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/cases/deleteAttachment/${id}`
    );
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

export const UpdateFIleCase = async (caseNoteId, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/cases/updateCase/${caseNoteId}`,
      data
    );
    // {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const assignFIleCase = async (fileId, caseId, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/cases/assignCase/${fileId}/${caseId}`,
      data
    );
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

//Fresh Recipt
export const createFreshReceipt = async (userId, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/freshReceipt/createFR/${userId}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const assignFR = async (frId, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/freshReceipt/assignFR/${frId}`,
      data
    );
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

export const getAllFreshReceipt = async (userId, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/freshReceipt/${userId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export const getFreshReceiptById = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/freshReceipt/getFR/${id}`);
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

export const createReceivedFromBranches = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/freshReceipt/createExternal`,
      data,
      // {
      //   headers: {
      //     accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getReceivedFromBranches = async () => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/freshReceipt/getExternal?currentPage=0&pageSize=1000`);
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

export const UpdateFreshReceipt = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/freshReceipt/updateFR/${id}`,
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

export const DeleteFreshReceipt = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/freshReceipt/deleteFR/${id}`
    );
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

export const DeleteFreahReceptImage = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/freshReceipt/deleteAttachment/${id}`
    );
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
//Diary
export const getAllFileDiary = async (branchId, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/fileDiary/${branchId}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export const getsentAndRecievedFilesStats = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/filesDashboard/sentAndRecievedFiles/${id}`
    );
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

export const getsentAndRecievedFRStats = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/filesDashboard/sentAndRecievedFRs/${id}`
    );
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

export const getApprovelStats = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/filesDashboard/approvalStats/${id}`
    );
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

// Notifications
export const getEfilingNotifications = async (userId) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/filesDashboard/notifiedFiles/${userId}`,
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

export const DeleteNotificationById = async (notificationId, userId) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/filesDashboard/makeNotificationDecrease/${notificationId}/${userId}`,
    );
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

//FR History
export const getFRHistory = async (branchId, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/freshReceipt/frsHistory/${branchId}?currentPage=${currentPage}&pageSize=${pageSize}`,
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

//Assigin Fr
export const assiginFR = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/freshReceipt/assignFR/${id}`,
      data
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // }
      // }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllFRs = async (branchId) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(
      `/freshReceipt/ByBranch/${branchId}`
    );
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

export const getSignatureByUserId = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/cases/getSignatureByUserId/${id}`);
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

// Correspondence CRUD

export const createCorrespondence = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/correspondence/createCorrespondence`, data, {
      headers: {
        accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateCorrespondence = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/correspondence/updateCorrespondence/${id}`,
      data,
      {
        headers: {
          accept: "multipart/form-data",
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

export const getCorrespondenceById = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/correspondence/getSingleCorrespondence/${id}`);
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

export const getAllCorrespondence = async (fileId, branchId, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/correspondence/getAllCorrespondences?fileId=${fileId}&branchId=${branchId}&currentPage=${currentPage}&pageSize=${pageSize}`);
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

export const DeleteAttachedFiles = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/correspondence/deleteAttachment/${id}`
    );
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

// Approved Case
export const ApprovedFIleCase = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(
      `/cases/updateCaseStatus`,
      data
    );
    // {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Delete Given Paragraph of Case
export const DeletePara = async (caseId,correspondenceID, paraID) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/cases/deleteSingleCorrespondence?caseId=${caseId}&correspondenceID=${correspondenceID}&paraID=${paraID}`);
    // /deleteSingleCorrespondence?caseId=63&correspondenceID=30
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
export const DeleteParaAttachement = async (caseId,correspondenceID,paraID ) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/cases/deleteCorrespondenceAttachment?caseId=${caseId}&correspondenceID=${correspondenceID}&paraID=${paraID}`)
   
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
