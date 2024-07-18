import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../../components/CustomComponents/CustomTable'
import BallotResolutionPdfTemplate from '../../../../../../../components/BallotResolutionPDFTemplate'
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'
import { allBallotByResolutionListId, getBallotRecord } from '../../../../../../../api/APIs/Services/Resolution.service'
import html2pdf from 'html2pdf.js';
import moment from 'moment'
import { useParams } from 'react-router-dom'


function QMSBallotResolutionList() {
    const {id} = useParams()
    const [currentPage, setCurrentPage] = useState(0);
    const [isChecked, setIsChecked] = useState([]);
    const [count, setCount] = useState(null);
    const pageSize = 10
    const [ballotData, setBallotData] = useState([])
    const [resolutionData,setResolutionData]=useState([])
    const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transfrerResolutionDetail = (apiData) => {
    return apiData.map((item, index) => ({
      internalId: item.id,
      id: item.id,
      Date: moment(item?.createdAt).format("YYYY/MM/DD"),
      NameOfTheMover: item?.memberNames
        .map((mover) => mover.memberName)
        .join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.resolutionStatus?.resolutionStatus,
    }));
  };
  const hendleBallot = async () => {
    // const resolutionIds = {isChecked}
    try {
      const response = await getBallotRecord(isChecked); // Add await here
      if (response?.success) {
        setBallotData(response?.data?.resolutions)
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const handleBallotPrint = () => {
    const element = document.getElementById('template-container');
    const opt = {
      margin: 0.2,
      filename: 'ResolutionBallot.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).toPdf().outputPdf('blob').then((pdfBlob) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    });
  };

  const getBallotResolutionsListByIDApi = async () => {
    try {
      const response = await allBallotByResolutionListId(id);
      if (response?.success) {
        const transferData = transfrerResolutionDetail(response?.data[0]?.resolutions)
        console.log("transferData", transferData);
       setResolutionData(transferData)
      }
    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    getBallotResolutionsListByIDApi()
  },[])
  return (
    <Layout sidebarItems={QMSSideBarItems}>
        <ToastContainer />
        <div class="container-fluid">
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Resolution Detail For Ballot</h1>
          </div>
         <div class="row">
         <div class="col">
         <CustomTable
                hidebtn1={true}
                data={resolutionData}
                tableTitle="Resolution Detail For Ballot"
                headerShown={true}
                hideBtn={true}
                // handleDelete={(item) => alert(item.id)}
                // handleEdit={(item) =>
                //   navigate("/mms/motion/detail", { state: item })
                // }
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                ActionHide={true}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                isCheckbox={true}
              /></div></div>
              <BallotResolutionPdfTemplate data={ballotData}>
            <div class="row mb-2" style={{marginRight:"20px"}}>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={hendleBallot}
                      disabled={isChecked.length === 0 ? true : false}
                    >
                      Request To Ballot
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={handleBallotPrint}
                      disabled={ballotData.length === 0 ? true : false}
                    >
                      Print pdf
                    </button>
                  </div>
                </div>
            </BallotResolutionPdfTemplate>
            </div>
            </div>
    </Layout>
  )
}

export default QMSBallotResolutionList