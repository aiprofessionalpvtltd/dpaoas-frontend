// Search API

import { axiosClient } from "..";

export const mainSearchApi = async (currentPage, pageSize, searchParams) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.post(
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
    const response = await axiosClient.put(
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
    const response = await axiosClient.delete(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.post("ordinance", data);
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
    const response = await axiosClient.get(`/ordinance/${id}`);
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
    const response = await axiosClient.put(`/ordinance/update/${id}`, data, {
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

// Delete APi of File Attachements Added on The Base Document Type.

export const DeleteOrdinanceAttachemnt = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(`/ordinance/${id}/file`, data);
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

// Delete Ordinance

export const DeleteOrdinance = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
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
    const response = await axiosClient.get(
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
    const response = await axiosClient.get(
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
    const resposne = await axiosClient.get(
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
//  Get Ministers On The Base of Parliamentray Year

export const getMinisterByParliamentaryYearID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/mnas/parliamentaryYears/${id}`);
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
// Getting All MNA Lists Data
export const getAllMNALists = async (currentPage, pageSize) => {
  try {
    const response = await axiosClient.get(
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
    const response = await axiosClient.post("senate-bill", data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getSingleNABillByID = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/senate-bill/${id}`);
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
    const response = await axiosClient.put(`/senate-bill/update/${id}`, data, {
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

export const DeleteLegislationBill = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
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

// Getting Government Bill Introduced In Senate

export const getAllGovernmentSenateBills = async (
  currentPage,
  pageSize,
  searchParams
) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );
  try {
    const resposne = await axiosClient.get(
      `/senate-bill/byCategory?currentPage=${currentPage}&pageSize=${pageSize}`,
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
// Getting Government Bill Introduced In Senate
export const getAllGovernmentNABills = async (
  currentPage,
  pageSize,
  searchParams
) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );
  try {
    const resposne = await axiosClient.get(
      `/senate-bill/byCategory?currentPage=${currentPage}&pageSize=${pageSize}`,
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

// Getting All Private Member Bill Introduced in Senate
export const getAllPrivateMemberSenateBills = async (
  currentPage,
  pageSize,
  searchParams
) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== "")
  );
  try {
    const resposne = await axiosClient.get(
      `/senate-bill/byCategory?currentPage=${currentPage}&pageSize=${pageSize}`,
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

export const getAllPrivateMemberNABills = async (
  currentPage,
  pageSize,
  searchParams
) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    const resposne = await axiosClient.get(
      `/senate-bill/byCategory?currentPage=${currentPage}&pageSize=${pageSize}`,
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

// Getting All Committee Recommendation Lists Data
export const getAllCommitteeRecommendation = async (currentPage, pageSize) => {
  try {
    const response = await axiosClient.get(
      `/manage-committee-recomendation?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Committees Recommendation
export const createCommitteesRecommendation = async (data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.post(
      `/manage-committee-recomendation`,
      data
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // },
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Update Committee Recommendation
export const UpdateCommitteeRecommendation = async (id, data) => {
  try {
    const response = await axiosClient.put(
      `/manage-committee-recomendation/update/${id}`,
      data,
      {
        // headers: {
        //   accept: "application/json",
        //   "Content-Type": "multipart/form-data",
        // },
      }
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Start Ministers CRUD

// Get All Ministers
export const getAllMinisters = async (currentPage, pageSize) => {
  try {
    const response = await axiosClient.get(
      `/mnas?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Create Minsters
export const createMinister = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/mnas`,
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
// Get Single Minister
export const getSingleMinisterByID = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.get(`/mnas/${id}`);
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
// Update New Bill Status
export const updateMinisters = async (id, data) => {
  try {
    const response = await axiosClient.put(
      `/mnas/update/${id}`,
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

// Delete APi of File Attachements Added on The Base Document Type.

export const DeleteBillDocumentTypeAttachemnt = async (id, data) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.put(`/senate-bill/${id}/file`, data);
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
