import React from 'react'
import { useLocation } from 'react-router-dom'
import BallotResolutionPdfTemplate from '../../../../../../../components/BallotResolutionPDFTemplate'

function PreviewBallotResolutionList() {
 const location = useLocation()
 const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get('state');
  const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
  return (
    <BallotResolutionPdfTemplate data={stateData && stateData} />
  )
}

export default PreviewBallotResolutionList