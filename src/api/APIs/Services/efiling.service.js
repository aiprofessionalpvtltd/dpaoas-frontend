import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

export const createEfiling = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/files/createFile`,
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
export const getAllEfiling = async (currentPage, pageSize, userId) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`,
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
    const response = await axiosClientMMS.put(
      `/files/delete/${id}`,
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateEfiling = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `files/update/${id}`,
      data)
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
    const response = await axiosClientMMS.get(`/files/${id}`);
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
    const response = await axiosClientMMS.put(
      `/files/corresponding/${userId}/${fileId}`,
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

//new File
export const createFIleRegister = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/fileRegisters/create`,
      data)
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

export const getAllFileRegister = async (currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/fileRegisters/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
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
    const response = await axiosClientMMS.get(
      `/files/years/`,
      data)
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
    const response = await axiosClientMMS.post(
      `/mainHeading/create`,
      data)
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

export const getAllFileHeading = async (currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/mainHeading/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
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
    const response = await axiosClientMMS.put(
      `/mainHeading/update/${id}`, data)
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
    const response = await axiosClientMMS.get(
      `/mainHeading/${id}`)
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
    const response = await axiosClientMMS.get(
      `/mainHeading/byBranch/${id}`)
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
    const response = await axiosClientMMS.get(
      `/mainHeading/byHeading/${id}`)
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
    const response = await axiosClientMMS.post(
      `/files/createFile/${id}`,
      data)
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
//     const response = await axiosClientMMS.get(
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

export const getFileByRegisterById = async (id, currentPage) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/files/byFileRegister/${id}?mainHeadingNumber=${currentPage}`)
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

export const getFileStates = async () => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/filesDashboard/stats`)
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
    const response = await axiosClientMMS.delete(
      `/mainHeading/delete/${id}`)
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

<<<<<<< HEAD
//Fresh Recipt
export const createFreshReceipt = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/freshReceipt/createFR`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
=======































// Create Case
export const createCase = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.post(`/cases/createCase/${id}`, data, {
      headers: {
        accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
>>>>>>> develop
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

<<<<<<< HEAD
export const getAllFreshReceipt = async (currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/freshReceipt/?currentPage=${currentPage}&pageSize=${pageSize}`)
=======

export const getAllCasesByFileId = async (id, currentPage, pageSize) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/cases/getCasesByFileId/${id}?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
>>>>>>> develop
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
<<<<<<< HEAD
};

export const getFreshReceiptById = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/freshReceipt/getFR/${id}`)
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
    const response = await axiosClientMMS.put(
      `/freshReceipt/updateFR/${id}`,
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

export const DeleteFreshReceipt = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/freshReceipt/deleteFR/${id}`)
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
    const response = await axiosClientMMS.delete(
      `/freshReceipt/deleteAttachment/${id}`)
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
=======
};
>>>>>>> develop
