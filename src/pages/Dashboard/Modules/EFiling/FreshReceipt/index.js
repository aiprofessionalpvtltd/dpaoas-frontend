import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { Layout } from '../../../../../components/Layout';
import Header from '../../../../../components/Header';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { EfilingSideBarItem } from '../../../../../utils/sideBarItems';


function FileCases() {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(1);
    const pageSize = 5; // Set your desired page size
    const [fileData, setFileData] = useState([])

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    // const transformFilesHeadingdata = (apiData) => {
    //     return apiData.map((item) => ({
    //       id: item?.id,
    //       fileNumber: item?.fileNumber,
    //       fileSubject: item?.fileSubject,
    //       mainHeading: item?.mainHeading?.mainHeading,
    //     }));
    //   };
    //   const getAllFilesAPi = useCallback(async () => {
    //     try {
    //         const response = await getFileByRegisterById(registerId,currentPage, pageSize)
    //         if (response.success) {
    //           showSuccessMessage(response?.message)
    //           setCount(response?.data?.count)
    //           const transformedData = transformFilesHeadingdata(response?.data?.files)
    //           setFileData(transformedData)
    //         }
    //       } catch (error) {
    //         showErrorMessage(error?.response?.data?.message);
    //       }
    //   }, [currentPage, pageSize, setCount, setFileData]);

    //   useEffect(() => {
    //     getAllFilesAPi()
    //   },[getAllFilesAPi])
    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/fresh-receipt"} title1={"Fresh Receipts"} />
            
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={true}
                        hideBtn={false}
                        addBtnText={"Create Fresh Receipt"}
                        data={fileData}
                        tableTitle="Fresh Receipts"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/fresh-receipt/addedit")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}
                        // showView={true}
                        // handleView={(item) => navigate("/efiling/dashboard/file-register-list/files-list", {state:item})}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default FileCases;