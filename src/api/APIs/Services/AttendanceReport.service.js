import { axiosClientMMS } from "..";

// import { axiosClientMMS } from "..";
export const searchAttendanceReportByDateWise = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(
      `/manageSession/getAttendance`,

      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const searchAttendanceReportByPartyProvince = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(
      `/manageSession/getAttendanceBySittings`,

      {
        params: filteredSearchParams,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const createSingleMemberAttendance = async (data) => {
  // const { startDay, endDay, sessionId, sittingId, memberId, attendanceStatus } =
  //   data;

  const filteredSearchParams = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );
  try {
    const queryString = new URLSearchParams(filteredSearchParams).toString();
    const response = await axiosClientMMS.post(
      `/manageSession/markAttendanceToLeave?${queryString}`

      // {
      //   params: filteredSearchParams,
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // },
      // }
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
