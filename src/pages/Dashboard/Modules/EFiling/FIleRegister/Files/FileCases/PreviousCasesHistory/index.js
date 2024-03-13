import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { getUserData } from '../../../../../../../../api/Auth';
import { getAllCasesByFileId } from '../../../../../../../../api/APIs/Services/efiling.service';
import { EfilingSideBarItem } from '../../../../../../../../utils/sideBarItems';
import Header from '../../../../../../../../components/Header';
import { Layout } from '../../../../../../../../components/Layout';
import CustomTable from '../../../../../../../../components/CustomComponents/CustomTable';
import { AuthContext } from '../../../../../../../../api/AuthContext';


function PreviousCasesHistory() {
    const navigate = useNavigate();
    const { setFileIdInRegister, fileIdINRegister } = useContext(AuthContext);
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
            Noting: item?.Note?.description ? new DOMParser().parseFromString(item.Note?.description, 'text/html').documentElement.innerText : '',
            Correspondence: item?.Correspondence?.description ? new DOMParser().parseFromString(item.Correspondence?.description, 'text/html').documentElement.innerText : '',
            Sanction: item?.Sanction?.description ? new DOMParser().parseFromString(item.Sanction?.description, 'text/html').documentElement.innerText : '',
            Objection: item?.Objection?.description ? new DOMParser().parseFromString(item.Objection?.description, 'text/html').documentElement.innerText : '',
            Letter: item?.Letter?.description ? new DOMParser().parseFromString(item.Letter?.description, 'text/html').documentElement.innerText : '',
        }));
    };

    const getAllCasesApi = async () => {
        try {
            const response = await getAllCasesByFileId(fileIdINRegister, UserData?.fkUserId, currentPage, pageSize)
            if (response.success) {
                setCount(response?.data?.count)
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
    }, [fileIdINRegister, setFileIdInRegister, currentPage])

    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list/files-list/cases"} title1={"File Cases"} title2={"Cases History"} addLink2={"/efiling/dashboard/file-register-list/files-list/cases-history"} width={"500px"} />

            <div class="row">
                <div class="col-12">
                    <CustomTable
                        hidebtn1={true}
                        ActionHide={true}
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
                    />
                </div>
            </div>
        </Layout>
    )
}

export default PreviousCasesHistory;