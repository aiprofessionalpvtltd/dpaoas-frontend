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
export const getAllEfiling = async (userId, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/files/?currentPage=${currentPage}&pageSize=${pageSize}?userId=${userId}`,
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