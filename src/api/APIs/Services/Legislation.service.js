
// Leave Module

import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

export const getAllPrivateBill = async (page, pageSize) => {
    try {
        const token = getAuthToken();
        const response = await axiosClientMMS.get(
            `/privateMemberBills?currentPage=${page}&pageSize=${pageSize}`,
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const updatePrivateBill = async (id, data) => {
    try {
        const token = getAuthToken();
        const response = await axiosClientMMS.put(
            `/privateMemberBills/update/${id}`, data
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};