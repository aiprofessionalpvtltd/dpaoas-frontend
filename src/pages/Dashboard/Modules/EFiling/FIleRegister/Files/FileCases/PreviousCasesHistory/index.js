import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { getUserData } from '../../../../../../../../api/Auth';
import { getUserCaseHistory } from '../../../../../../../../api/APIs/Services/efiling.service';
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../../../../utils/sideBarItems';
import Header from '../../../../../../../../components/Header';
import { Layout } from '../../../../../../../../components/Layout';
import CustomTable from '../../../../../../../../components/CustomComponents/CustomTable';
import { AuthContext } from '../../../../../../../../api/AuthContext';
import moment from 'moment';


function PreviousCasesHistory() {
    const navigate = useNavigate();
    const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
    const [showApproved, setShowApproved] = useState(true)
    const [approvedCaseData, setApprovedCaseData] = useState([])
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const [casesData, setCasesData] = useState([])
    const pageSize = 5; // Set your desired page size
    const UserData = getUserData();

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


    const transformFilesCases = (apiData) => {
        return apiData.map((item, index) => ({
            caseId: item?.fkCaseId,
            FileNo: item?.fileData?.fileNumber,
            AssignedBy: item?.fileRemarksData?.length > 0 ? `${item?.fileRemarksData[item?.fileRemarksData.length - 1]?.submittedUser?.employee?.firstName} ${item?.fileRemarksData[item?.fileRemarksData.length - 1]?.submittedUser?.employee?.lastName}` : "---",
            AssignedTo: item?.fileRemarksData?.length > 0 ? `${item?.fileRemarksData[item?.fileRemarksData.length - 1]?.assignedUser?.employee?.firstName} ${item?.fileRemarksData[item?.fileRemarksData.length - 1]?.assignedUser?.employee?.lastName}` : "---",
            Status: item?.fileRemarksData?.length > 0 ? item?.fileRemarksData[item?.fileRemarksData.length - 1]?.CommentStatus : "Draft",
            MarkedDate: item?.fileRemarksData?.length > 0 ? moment(item?.fileRemarksData[item?.fileRemarksData.length - 1]?.createdAt).format('DD/MM/YYYY') : "---",
            MarkedTime: item?.fileRemarksData?.length > 0 ? moment(item?.fileRemarksData[item?.fileRemarksData.length - 1]?.createdAt).format("hh:mm A") : "---"
        }));
    };

    const transformApprovedCases = (apiData) => {
        return apiData.map((item, index) => ({
            caseId: item?.fkCaseId,
            // FileNo: item?.fileData?.fileNumber,
            AssignedBy: item?.submittedUser?.employee ? item?.submittedUser?.employee?.firstName :"---",
            AssignedTo:item?.assignedUser?.employee ? `${item?.assignedUser?.employee?.firstName} ${item?.assignedUser?.employee?.lastName}` :"---",
            Status: item?.CommentStatus,
            MarkedDate:item?.createdAt ?   moment(item?.createdAt).format('DD/MM/YYYY') : "---",
            MarkedTime:item?.createdAt?  moment(item?.createdAt).format("hh:mm A") : "---"
        }));
    };

    const getAllCasesApi = async () => {
        try {
            const response = await getUserCaseHistory(location?.state?.fileId, UserData?.fkBranchId, currentPage, pageSize)
            if (response.success) {
                setCount(response?.data?.count)
               
                const approvedFilter = response?.data?.cases[0]?.fileRemarksData.filter((item) => item.CommentStatus =="Approved")
                console.log("approvedFilter-----------",approvedFilter);
              const transferomapprove =  transformApprovedCases(approvedFilter)
              setApprovedCaseData(transferomapprove)
              const transferData = transformFilesCases(response?.data?.cases)
              setCasesData(transferData)
            }
        } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        if(location.state?.internalId) {
            setFileIdInRegister(location.state?.internalId);
        }
        getAllCasesApi();
    }, [currentPage])

   

    return (
        <Layout module={false} sidebarItems={UserData && UserData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
            <div className='row'>

            {/* <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list/files-list/cases"} title1={"File Cases"} title2={"Cases History"} addLink2={"/efiling/dashboard/file-register-list/files-list/cases-history"} width={"500px"} /> */}
            <div className="col" style={{ marginTop: "30px", float: "right", marginBottom: 20, marginLeft: 10 }}>
        </div>
            </div>
                <div class="row">
                <div class="col-12">
                    <CustomTable
                        ActionHide={false}
                        hidebtn1={true}
                        hideBtn={true}
                        data={casesData}
                        tableTitle="File Cases History"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        showEditIcon={true}
                        hideDeleteIcon={true}
                        showView={true}
                        handleView={(item) => navigate("/efiling/dashboard/fileDetail", {state: {id: item.caseId,fileId: location?.state?.fileId, view: true}})}
                    />
                </div>
            </div>
            
        </Layout>
    )
}

export default PreviousCasesHistory;