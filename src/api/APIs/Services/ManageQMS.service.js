import { axiosClientMMS } from "..";
import { getAuthToken } from "../../Auth";

//Terms Management System
export const createTerm = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/terms/create`, data, {
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

export const getAllTerms = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/terms?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getTermByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/terms/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//retriveEmployeesAsEngineers
export const retriveEmployeesAsEngineers = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/complaints/retrieveEmployeesAsEngineers?currentPage=${0}&pageSize=${100}`
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
export const updateTerm = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/terms/update/${id}`, data, {
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

export const deleteTerms = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/terms/delete/${id}`
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

//Tenures Management System
export const createTenure = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/tenures/create`, data, {
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

export const getAllTenures = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/tenures?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

// Tenures API's

export const getTenureByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/tenures/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateTenure = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/tenures/update/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const deleteTenures = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/tenures/delete/${id}`
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

//Members API's
export const createMember = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/members/create`, data, {
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

// export const getAllMembers = async (currentPage, pageSize) => {
//   try {
//     // const token = getAuthToken();
//     const response = await axiosClientMMS.get(
//       `/members/all?currentPage=${currentPage}&pageSize=${pageSize}`
//     );
//     // {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   }
//     // });
//     return response?.data;
//   } catch (error) {
//     console.error("Error fetching API endpoint:", error);
//     throw error;
//   }
// };

//

export const getMembersByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/members/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateMembers = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/members/${id}`, data, {
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

export const deleteMembers = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/members/delete/${id}`
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

//Divisions API's
export const createDivision = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/divisions/create`, data, {
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

export const getAllDivisions = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/divisions?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getDivisionsByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/divisions/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateDivisions = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/divisions/update/${id}`, data, {
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

export const deleteDivisions = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/divisions/delete/${id}`
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

//PoliticalParties API's
export const createPoliticalParties = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/politicalParties/create`,
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

export const getAllPoliticalParties = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/politicalParties?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getPoliticalPartiesByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/politicalParties/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updatePoliticalParties = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/politicalParties/update/${id}`,
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

export const deletePoliticalParties = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/politicalParties/delete/${id}`
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

//ParliamentaryYears API's
export const createParliamentaryYears = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/parliamentaryYears/create`,
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

export const getAllParliamentaryYears = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/parliamentaryYears?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getParliamentaryYearsByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/parliamentaryYears/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateParliamentaryYears = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(
      `/parliamentaryYears/update/${id}`,
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

export const deleteParliamentaryYears = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/parliamentaryYears/delete/${id}`
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

//Groups API's
export const createGroup = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/groups/create`, data, {
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

export const getDivisionsBySessionId = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/groups/retrieveDivisionForGroup/${id}`
    );
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateDivisionsAndGroups = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(
      `/groups/manageDivisionInGroup/${id}`,
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

//Sessions API's
export const createSession = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.post(`/sessions/create`, data, {
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

export const getAllSessions = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/sessions?currentPage=${currentPage ? currentPage : 0}&pageSize=${
        pageSize ? pageSize : 100
      }`,
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

// Prorogues Sessions
export const getProroguedSession = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/manageSession/proroguedSessions?currentPage=${
        currentPage ? currentPage : 0
      }&pageSize=${pageSize ? pageSize : 100}`,
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

export const getSessionByID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(`/sessions/${id}`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateSessions = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.put(`/sessions/update/${id}`, data, {
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

export const deleteSessions = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/sessions/delete/${id}`
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

//Sessions Sitting
export const getSessionSitting = async (id, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClientMMS.get(
      `/manageSession/sessionSittings/${id}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
    {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    }

    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const deleteSessionsSitting = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClientMMS.delete(
      `/manageSession/delete/${id}`
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
