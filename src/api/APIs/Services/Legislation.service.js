
// Leave Module

import { axiosClientVMS } from "..";
import { getAuthToken } from "../../Auth";

export const getAllPrivateBill = async (page, pageSize) => {
    try {
        const token = getAuthToken();
        const response = await axiosClientVMS.get(
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
        const response = await axiosClientVMS.put(
            `/privateMemberBills/update/${id}`, data
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};