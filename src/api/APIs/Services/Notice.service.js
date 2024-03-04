import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";
  
// Notice Stats API
  export const getAllNoticeStats = async () => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/noticeOfficeReport/getStats`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // }
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

// Get attendance 

export const getSessionDayAttendanceReport = async (id) => {
    try {
      // const token = getAuthToken();
      const response = await axiosClientMMS.get(
        `/manageSession/getAttendanceByProvince/${id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // }
        },
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };