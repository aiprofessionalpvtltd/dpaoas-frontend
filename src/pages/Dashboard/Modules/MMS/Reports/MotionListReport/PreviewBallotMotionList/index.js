import React from "react";
import { useLocation } from "react-router-dom";
import BallotMotionPdfTemplate from "../../../../../../../components/BallotMotionPDFTemplate";

function PreviewBallotMotionList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonString = queryParams.get("state");
  const stateData = JSON.parse(decodeURIComponent(encodedJsonString));
  return <BallotMotionPdfTemplate data={stateData && stateData} />;
}

export default PreviewBallotMotionList;
