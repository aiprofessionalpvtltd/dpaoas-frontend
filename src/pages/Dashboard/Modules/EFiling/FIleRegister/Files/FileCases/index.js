import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { Layout } from '../../../../../../../components/Layout';
import Header from '../../../../../../../components/Header';
import CustomTable from '../../../../../../../components/CustomComponents/CustomTable';
import { EfilingSideBarItem } from '../../../../../../../utils/sideBarItems';
import { getAllCasesByFileId } from '../../../../../../../api/APIs/Services/efiling.service';
import { AuthContext } from '../../../../../../../api/AuthContext';
import { getUserData } from '../../../../../../../api/Auth';


function FileCases() {
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
            const response = await getAllCasesByFileId(location.state?.internalId ? location.state?.internalId : fileIdINRegister, UserData?.fkUserId, currentPage, pageSize)
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
            <div class='row'>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list/files-list"} title1={"Files"} title2={"File Cases"} addLink2={"/efiling/dashboard/file-register-list/files-list/cases"} width={"500px"} />
            <div className="col" style={{ marginTop: "30px", float: 'right' }}>
                  <button className="btn btn-primary" onClick={() => navigate('/efiling/dashboard/file-register-list/files-list/cases-history')} >
                    View Previous History
                  </button>
            </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={false}
                        hideBtn={false}
                        addBtnText={"Create Case"}
                        data={casesData}
                        tableTitle="File Cases"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case")}
                        handleEdit={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: false, id: item.caseId } })}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showView={true}
                        handleView={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
                        showAssigned={false}
                        // hendleAssigned={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true, id: item.caseId } })}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default FileCases;