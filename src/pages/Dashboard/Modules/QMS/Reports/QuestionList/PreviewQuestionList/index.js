import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getSingleQuestionList } from '../../../../../../../api/APIs/Services/Question.service';

const PreviewQuestionList = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const stateData = decodeURIComponent(encodedJsonString);

  const getSingleQuestionData= async()=>{
    try {
        const response = await getSingleQuestionList(stateData)
        console.log(response.data)
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    getSingleQuestionData()
  })
  return (
    <div>PreviewQuestionList{stateData}</div>
  )
}

export default PreviewQuestionList