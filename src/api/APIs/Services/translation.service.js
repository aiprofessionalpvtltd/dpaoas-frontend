import axios from "axios";
import { axiosClient } from "..";
import { getAuthToken, getUserData } from "../../Auth";

const userData = getUserData();
const token = getAuthToken();

export const GetAlLMarkTo = async (userId) => {
  const branchId = userData?.fkBranchId;

  try {
    const res = await axiosClient.get(
      `/translation/getBranchHierarchy/${branchId}/${userId}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const submitQuestion = async (
  assignedTo,
  CommentStatus,
  priority,
  comment,
  fkQuestionId,
  category,
  userId
) => {
  try {
    const res = await axiosClient.post(
      `/translation/remarks/${userId}`,
      {
        fkQuestionId: fkQuestionId,
        assignedTo: assignedTo,
        // CommentStatus: CommentStatus,
        comment: comment ? comment : CommentStatus,
        priority: priority,
        category: category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (error) {
    console.log("Error in submitQuestion:", error);
    throw error;
  }
};

export const getAllRemarks = async (
  userId,
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllRemarks/${userId}?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllRemarksWithOutUserId = async (
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllRemarks?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const assignedMotionForTranslation = async (
  assignedTo,
  CommentStatus,
  priority,
  comment,
  fkMotionId,
  category,
  userId
) => {
  try {
    const res = await axiosClient.post(
      `/translation/remarks/${userId}`,
      {
        fkMotionId: fkMotionId,
        assignedTo: assignedTo,
        // CommentStatus: CommentStatus,
        comment: comment ? comment : CommentStatus,
        priority: priority,
        category: category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (error) {
    console.log("Error in submitQuestion:", error);
    throw error;
  }
};

//Get Question Remarks
export const getQuestionRemarksByID = async (qid, userId) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/translation/getremarks/${qid}/${userId}`,
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

export const getAssignedMotion = async (
  userId,
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllMotionRemarks/${userId}?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
// get Motion Remarks

export const getAssignedMotionWithOutUserId = async (
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllMotionRemarks?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMotionRemarksByID = async (mid, userId) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/translation/getMotionIdRemarks/${mid}/${userId}`,
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


//Translation Legislation

export const getAllGovernmentBillRemarksByUserId = async (
  userId,
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllGovernmentBillRemarks/${userId}?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllGovintroduceInSenateWithOutUserId = async (
  category,
  currentPage,
  pageSize
) => {
  try {
    const response = await axiosClient.get(
      `/translation/getAllGovernmentBillRemarks/?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`,
      {}
    );

    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const getGovintroduceInSenateById = async (id, userId, category) => {
  try {
    // const token = getAuthToken();
    const response = await axiosClient.get(
      `/translation/getgovernmentbill-remarks/${id}/${userId}?category=${category}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      })
      return response?.data;
  } catch (error) {
    console.error("Error fetching API endpoint:", error);
    throw error;
  }
}