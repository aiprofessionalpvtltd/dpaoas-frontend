import { axiosClientMMS } from "..";
export const searchAttendanceReportMonthly = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(
      `/manageSession/getMonthlyAttendanceRecord`,
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

export const searchAttendanceReportYearly = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(
      `/manageSession/getYearlyAttendanceRecord`,
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

export const searchAttendanceReportThreeYear = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClientMMS.get(`/manageSession/upto3Years`, {
      params: filteredSearchParams,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// export const searchAttendanceReportPartyWise = async (searchParams) => {
//   try {
//     // const token = getAuthToken();

//     // Filter out empty values
//     const filteredSearchParams = Object.fromEntries(
//       Object.entries(searchParams).filter(([_, value]) => value !== "")
//     );

//     const response = await axiosClientMMS.get(
//       `/manageSession/getPartyWise/${id}`,
//       {
//         params: filteredSearchParams,
//         // headers: {
//         //   Authorization: `Bearer ${token}`,
//         // },
//       }
//     );
//     return response?.data;
//   } catch (error) {
//     console.error("Error fetching API endpoint:", error);
//     throw error;
//   }
// };
