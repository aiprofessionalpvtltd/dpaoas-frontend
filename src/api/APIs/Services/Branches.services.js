import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

export const getBranches = async (currentPage, pageSize) => {
    try {
        //   const token = getAuthToken();
        const response = await axiosClient.get(
            `/branches?page=${currentPage}&pageSize=${pageSize}`,
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

export const createBranches = async (data) => {
    try {
        //   const token = getAuthToken();
        const response = await axiosClient.post(
            `/branches/createBranch`,
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

export const updateBranches = async (id, data) => {
    try {
        //   const token = getAuthToken();
        const response = await axiosClient.put(
            `/branches/update/${id}`,
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

export const deleteBranches = async (id) => {
    try {
        //   const token = getAuthToken();
        const response = await axiosClient.delete(
            `/branches/delete/${id}`,
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