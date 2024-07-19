// Search API

import { axiosClientMMS } from "..";

export const mainSearchApi = async (currentPage, pageSize, searchParams) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    const response = await axiosClientMMS.get(
      `senate-bill/search?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All Bills Status

export const getAllBillStatus = async (currentPage, pageSize) => {
  try {
    const response = await axiosClientMMS.get(
      `bill-status?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Bill New Status
export const createBillNewStatus = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/bill-status`,
      data
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Update New Bill Status
export const updatedBillNewStatus = async (id, data) => {
  try {
    const response = await axiosClientMMS.put(
      `bill-status/update/${id}`,
      data
      // {
      //   headers: {
      //     accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Delete Bill Statuses
// Delete Ordinance

export const DeleteBillStatus = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `bill-status/delete/${id}`
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All committies

export const getAllCommitties = async (currentPage, pageSize) => {
  try {
    const response = await axiosClientMMS.get(
      `manage-committee?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All Ordinances List
export const GetAllOrdinancesList = async (currentPage, pageSize) => {
  try {
    const response = await axiosClientMMS.get(
      `ordinance?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create New Ordinance
export const createNewOrdinance = async (data) => {
  try {
    const response = await axiosClientMMS.post("ordinance", data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching API endpoint:", error);
    throw error;
  }
};
// Get Single Ordinance

export const getSingleOrdinanceByID = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(`/ordinance/${id}`);
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

// Update Ordiance
export const updatedOrdinance = async (id, data) => {
  try {
    const response = await axiosClientMMS.put(`/ordinance/update/${id}`, data, {
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

// Delete Ordinance

export const DeleteOrdinance = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `ordinance/delete/${id}`
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// Search Ordinance
export const SearchedOrdinance = async (
  currentPage,
  pageSize,
  searchParams
) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    const response = await axiosClientMMS.get(
      `ordinance/search?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching API endpoint:", error);
    throw error;
  }
};

// Get All Committies
export const AllManageCommitties = async (currentPage, pageSize) => {
  try {
    const response = await axiosClientMMS.get(
      `manage-committee?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// Get All Legislation Bills Data

export const getAllLegislationBills = async (
  currentPage,
  pageSize,
  searchParams
) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    const resposne = await axiosClientMMS.get(
      `/senate-bill?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return resposne?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Getting All MNA Lists Data
export const getAllMNALists = async (currentPage, pageSize) => {
  try {
    const response = await axiosClientMMS.get(
      `/mnas?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
// Create New NA Bills
export const createNewLegislationBill = async (data) => {
  try {
    const response = await axiosClientMMS.post("senate-bill", data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getSingleNABillByID = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.get(`/senate-bill/${id}`);
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

// Update NA Bill Data
export const UpdateNABill = async (id, data) => {
  try {
    const response = await axiosClientMMS.put(
      `/senate-bill/update/${id}`,
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

// Delete Ordinance

export const DeleteLegislationBill = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `senate-bill/delete/${id}`
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
