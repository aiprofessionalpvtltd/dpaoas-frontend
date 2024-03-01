import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Layout } from '../../../../../../components/Layout';
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../../components/Header';

function ListFiles() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(1);
    const pageSize = 5; // Set your desired page size


    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const fileData = [
        {
            No: "15",
            MainHeading: "This is Heading",
            PageNo: "5"
        },
        {
            No: "15",
            MainHeading: "This is Heading",
            PageNo: "5"
        },
        {
            No: "15",
            MainHeading: "This is Heading",
            PageNo: "5"
        }
    ]
    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list"} title1={"File Register"} title2={"List File"} addLink2={"/efiling/dashboard/file-register-list/files-list"} width={"500px"} />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={true}
                        hideBtn={false}
                        addBtnText={"Create File"}
                        data={fileData}
                        tableTitle="List Files"
                        addBtnText2="Create File"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-file")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}

                    />
                </div>
            </div>
        </Layout>
    )
}

export default ListFiles