import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { AuthContext } from '../../../../../../api/AuthContext';
import { getUserData } from '../../../../../../api/Auth';
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../../utils/sideBarItems';
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { getFRHistory } from '../../../../../../api/APIs/Services/efiling.service';


function PreviousFRsHistory() {
    const navigate = useNavigate();
    const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const [frHistoryData, setFRHistoryData] = useState([])
    const pageSize = 5; // Set your desired page size
    const UserData = getUserData();

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


    const transformFRHistory = (apiData) => {
        return apiData.map((item, index) => ({
            id: item?.id,
            frType: item?.frType,
            AssignedBy: item?.freshReceipt?.length > 0 ? item?.freshReceipt[item?.freshReceipt?.length - 1]?.submittedUser?.employee?.firstName : "---",
            AssignedTo: item?.freshReceipt?.length > 0 ? item?.freshReceipt[item?.freshReceipt?.length - 1]?.assignedUser?.employee?.firstName : "---",
            Status: item?.freshReceipt?.length > 0 ? item?.freshReceipt[item?.freshReceipt?.length - 1]?.CommentStatus : "---",
            AssignedDate: item?.freshReceipt?.length > 0 ? moment(item?.freshReceipt[item?.freshReceipt?.length - 1]?.createdAt).format("DD/MM/YYYY h:m A") : "---",
            frSubject:item?.frSubject,
            referenceNumber: item?.referenceNumber,
            frDate: moment(item?.frDate).format("DD/MM/YYYY"),
            DiaryDate: item?.freshReceiptDiaries ? moment(item?.freshReceiptDiaries?.diaryDate).format("DD/MM/YYYY") : "---",
            staus:item?.status
        }));
    };

    const getAllFRHistoryApi = async () => {
        try {
            const response = await getFRHistory(UserData?.fkBranchId, currentPage, pageSize)
            if (response.success) {
                setCount(response?.data?.count)
                const transferData = transformFRHistory(response?.data?.freshReceipts)
                setFRHistoryData(transferData)
            }
        } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getAllFRHistoryApi();
    }, [currentPage])

    return (
        <Layout module={true} sidebarItems={UserData && UserData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/fresh-receipt"} title1={"Fresh Receipts"} title2={"FRs History"} addLink2={"/efiling/dashboard/file-register-list/files-list/cases-history"} width={"500px"} />

            <div class="row">
                <div class="col-12">
                    <CustomTable
                        ActionHide={false}
                        hidebtn1={true}
                        hideBtn={true}
                        data={frHistoryData}
                        tableTitle="Fresh Receipts History"
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
                        handleView={(item) => navigate("/efiling/dashboard/fresh-receipt/frdetail", {state:{id:item.id, view: true}})}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default PreviousFRsHistory;