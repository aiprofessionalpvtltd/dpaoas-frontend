import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

//CMS Api
export const getallComplaint = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  
  export const getallcomplaintTypes = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/complaintTypes/?currentPage=${0}&pageSize=${1000}`,
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
  
  export const getallcomplaintCategories = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/complaintCategories/?currentPage=${0}&pageSize=${1000}`,
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
  
  export const createComplaint = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(`/complaints/issueComplaint`, data) 
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
  
  export const UpdateComplaint = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/complaints/updateComplaint/${id}`,
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
  
  export const UpdateComplaintByAdmin = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(`/complaints/resolveComplaint/${id}`, data,
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
  
  export const assignedComplaintByAdmin = async (id, Data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/complaints/assignToResolver/${id}`,
        Data
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
  
  export const getallcomplaintRecordById = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/${id}`,
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

  export const getallcomplaintRecordByUserId = async (id, currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/ByComplainee/${id}?currentPage=${currentPage}&pageSize=${pageSize}`,
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

  export const SearchComplaint = async (data) => {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/complaints/searchComplaint`, {
        params: filteredSearchParams,
  
      }
  
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

  export const complaintDelete = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.delete(
        `/complaints/delete/${id}`,
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

  //Inventory
export const getAllInventory = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/inventory/?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  export const createInventory = async (Data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/inventory/create`,
        Data
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
  export const searchInventory = async (data) => {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/inventory/searchInventory`, {
        params: filteredSearchParams,
  
      }
  
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
  
  export const getInventoryRecordByUserId = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/userInventory/inventoryOfUser/${id}`,
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
  
  
  //Invoice Bill 
  export const createInventoryBill = async (Data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/inventoryBills/create`,
        Data
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
  export const getAllInvoiceBill = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/inventoryBills?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  
  export const SearchInvoiceBill = async (search) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/inventoryBills/searchBill?invoiceNumber=${search}`,
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
  
  export const invoiceBillDelete = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.delete(
        `/inventoryBills/delete/${id}`,
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
  
  export const UpdateInventoryBill = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(`/inventoryBills/update/${id}`, data, {
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
  export const getInventoryBillsById = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(`/inventoryBills/${id}`)
     
  
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const inventoryDelete = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.delete(
        `/inventory/delete/${id}`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  export const getInventoryById = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(`/inventory/${id}`)
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  export const UpdateInventoryById = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(`/inventory/update/${id}`, data)
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
  export const SearchInventoryBySerailNo = async (search) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/userInventory/searchInventory?serialNo=${search}`,
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
  
  export const createIssueProduct = async (id, Data) => {
    console.log("ddd", Data);
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/userInventory/issueProduct/${id}`,
        Data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  export const updateInventoryreturnDate = async (id, Data) => {
    console.log("Data", Data);
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/userInventory/returnProduct/${id}`,
        Data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  //Vendor CRUD
export const createVandor = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(
        `/vendors/create`,
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  export const getAllVendor = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/vendors?currentPage=${currentPage}&pageSize=${pageSize}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const DeleteVendor = async (id) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.delete(
        `/vendors/delete/${id}`,
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateVendor = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/vendors/update/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const searchVendor = async (search) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/vendors/searchVendor?vendorName=${search}`)
        return response?.data;
      } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
      }
    };  