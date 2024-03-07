import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { Layout } from '../../../../../../../components/Layout';
import Header from '../../../../../../../components/Header';
import CustomTable from '../../../../../../../components/CustomComponents/CustomTable';
import { EfilingSideBarItem } from '../../../../../../../utils/sideBarItems';
import { getAllCasesByFileId } from '../../../../../../../api/APIs/Services/efiling.service';


function FileCases() {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const [casesData, setCasesData] = useState([])
    const pageSize = 5; // Set your desired page size


    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


    const transformFilesCases = (apiData) => {
        return apiData.map((item) => ({
            id: item?.id,
            registerNumber: item?.registerNumber,
            branch: item?.branches?.branchName,
            Subject:item?.registerSubject,
            year: item?.year,
        }));
    };

    const getAllCasesApi = async () => {
        try {
            const response = await getAllCasesByFileId(location.state?.id, currentPage, pageSize)
            if (response.success) {
                setCount(response?.data?.count)
                const transferData = transformFilesCases(response?.data?.fileRegisters)
                setCasesData(transferData)
            }
        } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getAllCasesApi()
    }, [])

    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list/files-list"} title1={"Files"} title2={"File Cases"} addLink2={"/efiling/dashboard/file-register-list/files-list/cases"} width={"500px"} />
            
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={true}
                        hideBtn={false}
                        addBtnText={"Create Case"}
                        data={casesData}
                        tableTitle="File Cases"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case")}
                        handleEdit={(item) => navigate("/efiling/dashboard/file-register-list/files-list/addedit-case", { state: item })}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        // showView={true}
                        // handleView={(item) => navigate("/efiling/dashboard/file-register-list/files-list", {state:item})}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default FileCases;