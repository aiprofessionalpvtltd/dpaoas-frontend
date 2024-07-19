import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

//Template
export const getContactTemplate = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/contactTemplate?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  
  export const getSignalContactTemplateByid = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `contactTemplate/${id}`,
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
  
  export const createContactTemplate = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(`/contactTemplate/create`, data)
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateContactTemplate = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/contactTemplate/update/${id}`,
        data,
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
  
  export const DeleteContactTemplate = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosClientMMS.delete(`/contactTemplate/delete/${id}`, {
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
  
  
  //Contact
  export const getContactList = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/contactList?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  
  export const getSignalContactListByid = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/contactList/${id}`,
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
  
  export const createContactList = async (data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.post(`/contactList/create`, data)
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  export const UpdateContactList = async (id, data) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.put(
        `/contactList/update/${id}`,
        data,
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
  
  export const DeleteContactList = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.delete(`/contactList/delete/${id}`)
      //  {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };
  
  //SMS
  export const getSMSLog = async (currentPage, pageSize) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/sms?currentPage=${currentPage}&pageSize=${pageSize}`,
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
  
  export const createSendSMS = async (data) => {
    try {
    //   const token = getAuthToken();
      const response = await axiosClientMMS.post(`sms/create`, data)
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };