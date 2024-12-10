import { axiosClient } from "..";
import { getAuthToken, getUserData } from "../../Auth";

 const userData = getUserData()
 const token = getAuthToken()
export const GetAlLMarkTo = async ()=>{
    const branchId = userData?.fkBranchId
    const token = getAuthToken()

    try {
        const res = await axiosClient.get(`/translation/getBranchHierarchy/${branchId}`, {
        headers: {
            Authorization: `Bearer ${token}`  
          }
        })
        return res?.data
    } catch (error) {
        throw error;
    }
}


export const submitQuestion = async (assignedTo, CommentStatus, priority, comment , fkQuestionId) => {
    try {
          const res = await axiosClient.post(`/translation/create`,{
            fkQuestionId : fkQuestionId ,
            assignedTo : assignedTo,
            CommentStatus : CommentStatus,
            comment : comment,
            priority : priority
          },
          {
            headers: {
                Authorization: `Bearer ${token}`  
              }
            })

          return res?.data
    } catch (error) {
        console.error("Error in submitQuestion:", error);
        throw error;
    }
};