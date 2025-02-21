// Leave Module

import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

export const createPrivateBill = async (data) => {
  try {
    //   const token = getAuthToken()
    const response = await axiosClient.post(
      `/privateMemberBills/create`,
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

export const getAllPrivateBill = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/privateMemberBills/findall?currentPage=${page}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllPrivateBillNotice = async (page, pageSize) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(
      `/privateMemberBills/inNotice?currentPage=${page}&pageSize=${pageSize}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getPrivateBillById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.get(`/privateMemberBills/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updatePrivateBill = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axiosClient.put(
      `/privateMemberBills/update/${id}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const deletePrivateBill = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/privateMemberBills/delete/${id}`
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

export const sendPrivateBill = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/privateMemberBills/sendToLegislation/${id}`,
      data,
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
//Order Of The Day
export const listOrderOfTheDay = async () => {
  try {
    const response = await axiosClient.get(`/legisOrderOfDay`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const deleteOrderOfTheDay = async (id) => {
  try {
    const response = await axiosClient.delete(`/legisOrderOfDay/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const createOrderOfTheDay = async (data) => {
  try {
    const response = await axiosClient.post(`/legisOrderOfDay/create`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateOrderOfTheDay = async (id, Data) => {
  try {
    const response = await axiosClient.put(
      `/legisOrderOfDay/update/${id}`,
      Data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const OrderOfTheDayByID = async (id) => {
  try {
    const response = await axiosClient.get(`/legisOrderOfDay/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
