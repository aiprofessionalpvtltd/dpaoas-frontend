import React, { useEffect, useState } from 'react'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { ToastContainer } from 'react-toastify';
import Header from '../../../../../components/Header';
import { Layout } from '../../../../../components/Layout';
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../utils/sideBarItems';
import { useNavigate } from 'react-router';
import { getAllFileRegister } from '../../../../../api/APIs/Services/efiling.service';
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import { getUserData, setregisterID } from '../../../../../api/Auth';

function ListFileRegister() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const [registerData, setRegisterData] = useState([])
    const pageSize = 5; // Set your desired page size
    const UserData = getUserData();


    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


    const transformFilesRegisterdata = (apiData) => {
        return apiData.map((item) => ({
            id: item?.id,
            registerNumber: item?.registerNumber,
            branch: item?.branches?.branchName,
            Subject:item?.registerSubject,
            year: item?.year,
        }));
    };

    const getAllRegisterApi = async () => {
        try {
            const response = await getAllFileRegister(UserData?.fkDepartmentId, currentPage, pageSize)
            if (response.success) {
                // showSuccessMessage(response?.message)
                const transferData = transformFilesRegisterdata(response?.data?.fileRegisters)
                setRegisterData(transferData)
            }
        } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getAllRegisterApi()
    }, [])

    return (
        <Layout module={true} centerlogohide={true} sidebarItems={UserData && UserData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard"} title1={"File Registers"} width={"500px"} />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        hideBtn={false}
                        addBtnText={"Create File Register"}
                        data={registerData}
                        tableTitle="File Registers"
                        addBtnText2="Create File"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        ActionHide={true}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/addedit-file-register")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}
                        showView={true}
                        handleView={(item) => {
                            setregisterID(item?.id)
                            navigate("/efiling/dashboard/file-register-list/files-list", {state:item})}}

                    />
                </div>
            </div>
        </Layout>
    )
}

export default ListFileRegister