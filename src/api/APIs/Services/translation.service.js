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
        CommentStatus: CommentStatus,
        comment: comment,
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

export const getRemarkById = (id) => {
  try {
  } catch (error) {}
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
