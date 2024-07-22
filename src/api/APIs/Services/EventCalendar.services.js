import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";


export const createEventCalendar = async (data) => {
    try {
      //   const token = getAuthToken()
      const response = await axiosClient.post(`/event-calender`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

export const getAllEventCalendar = async (page, pageSize) => {
    try {
        const token = getAuthToken();
        const response = await axiosClient.get(
            `/event-calender?currentPage=${page}&pageSize=${pageSize}`,
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const getEventCalendarById = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axiosClient.get(
            `/event-calender/${id}`,
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const UpdateEventCalendar = async (id, data) => {
    try {
        const token = getAuthToken();
        const response = await axiosClient.put(
            `/event-calender/update/${id}`, data, {
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const DeleteEventCalendar = async (id) => {
    try {
      //   const token = getAuthToken();
      const response = await axiosClient.delete(
        `/event-calender/delete/${id}`
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