import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

// Question Module
export const createQuestion = async (data) => {
  try {
    //   const token = getAuthToken()
    const response = await axiosClient.post(`/questions/create`, data, {
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

//DeleteQuestion
export const DeleteQuestion = async (id, Data) => {
  try {
    //   const token = getAuthToken()
    const response = await axiosClient.put(`/questions/delete/${id}`, Data)
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getAllQuestion = async (page, pageSize, questionSentStatus) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/all?currentPage=${page}&pageSize=${pageSize}&questionSentStatus=${questionSentStatus}`,
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

export const getAllQuestionNotice = async (page, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/inNotice?currentPage=${page}&pageSize=${pageSize}`,
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

export const searchQuestion = async (searchParams, currentPage, pageSize) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
    console.log("filtered", filteredSearchParams);
    const response = await axiosClient.get(
      `/questions/searchQuestion?currentPage=${currentPage}&pageSize=${pageSize}`,
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

//Question Status
export const getAllQuestionStatus = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/questions/quesStatuses`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Send Question
export const sendToQuestion = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/questions/sendToQuestion/${id}`, data,
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

//Send Question Tranlation
export const sendQuestionTranslation = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/questions/sendForTranslation/${id}`,
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
//GetQuestionBYId
export const getAllQuestionByID = async (id) => {
  try {
    // const token = getAuthToken();
    const [questionResponse, historyResponse] = await Promise.all([
      axiosClient.get(`/questions/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      }),
      axiosClient.get(`/questions/getQuestionHistories/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      }),
    ]);

    return {
      question: questionResponse?.data,
      history: historyResponse?.data,
    };
  } catch (error) {
    console.error("Error fetching API endpoints:", error);
    throw error;
  }
};

export const UpdateQuestionById = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(`/questions/update/${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};
//Daffer Question
export const createDefferQuestion = async (id, DefferData) => {
  console.log("iwefjiouios".DefferData);
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questions/deferQuestion/${id}`,
      DefferData,
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

// Revive
export const createReviveQuestion = async (id, reviveData) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questions/reviveQuestion/${id}`,
      reviveData,
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

//Question History
export const allRevivedQuestions = async () => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/allRevivedQuestions?currentPage=${0}&pageSize=${100}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const RevivedQuestionsBYID = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/getReviveQuestion/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const noticeBusinessReport = async (fromDate, toDate) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/noticeOfficeReport/?noticeOfficeDiaryDateFrom=${fromDate}&noticeOfficeDiaryDateTo=${toDate}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const allQuestionSummary = async (
  searchParams,
  currentPage,
  pageSize
) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/questions/getQuestionsSummary`,
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

export const deleteQuestionFromList = async (id) => {
  try {
    //   const token = getAuthToken();
    const response = await axiosClient.delete(
      `/questions/removeQuestion/${id}`
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

export const getAllDeletedQuestions = async (page, pageSize, searchParams) => {
  try {
    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/getDeletedQuestions?currentPage=${page}&pageSize=${pageSize}`,
      {
        params: filteredSearchParams,
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

export const getAllDeferedQuestions = async (page, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/getDeferredQuestions?currentPage=${page}&pageSize=${pageSize}`,
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

export const getAllQuesListBySession = async (sessionId, page, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questionList/getBySessionId/${sessionId}?currentPage=${page}&pageSize=${pageSize}`,
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

export const getGeneratedQuesList = async (data) => {
  try {
    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questionList/generateQuestionList`,
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

export const saveQuestionList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questionList/saveQuestionList`,
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

// api needed
export const printQuestionsFromList = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questionList/${id}`,
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

export const delleteQuestionsList = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
      `/questionList/deleteQuestionList/${id}`,
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

export const getQuestionGroupDiaries = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(`/questions/getGroupDiary`, {
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

export const getUnderProcessQuestions = async (searchParams) => {
  try {
    // const token = getAuthToken();

    // Filter out empty values
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    const response = await axiosClient.get(
      `/questions/getUnderProcessQuestions`,
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

// Supplementary List API
export const getAllSupplementaryLists = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questionList/getByQuestionListId/${id}`,
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

export const getGeneratedSuppList = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questionList/generateSupplementaryList/${id}`,
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

export const saveSuppList = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/questionList/saveSupplementaryList/${id}`,
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

// api needed
export const printSuppFromList = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `questionList/getBySupplementaryListId/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const deleteSuppList = async (id) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.delete(
      `/questionList/deleteSupplementaryList/${id}`,
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

// Rota List API
export const generatedRotaList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/rota/create`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Create Rota List
export const CreateRotaList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(`/new/rota/create`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

//Get All Rota List
export const allRotaList = async (currentPage, pageSize) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/new/rota/getAll?currentPage=${currentPage}&pageSize=${pageSize}`)
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const UpdateRotaList = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(`/new/rota/update/${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const getRotaListById = async (id, data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(`/new/rota/getById/${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const generateRotaFurtherAllotmentList = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.post(
      `/rota/createFurtherAllotment`,
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

export const updateQuestionStatus = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.put(
      `/questions/changeQuestionStatus`,
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

export const allquestionsByStatus = async (data) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/questions/questionsByStatus`,
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
};

export const updateGenaratedQuestion = async(data)=>{
  try {
    const response = await axiosClient.put(`/questionList/editQuestionList`,data)
    return response?.data
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
}

export const getSingleQuestionList = async (id)=>{
  try {
    const response = await axiosClient.get(`/questionList/${id}`)
    return response?.data
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
}



