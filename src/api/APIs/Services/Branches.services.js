import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

export const getBranches = async (currentPage, pageSize) => {
    try {
        //   const token = getAuthToken();
        const response = await axiosClientMMS.get(
            `/branches?currentPage=${currentPage}&pageSize=${pageSize}`,
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