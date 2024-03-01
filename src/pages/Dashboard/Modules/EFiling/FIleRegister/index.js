import React, { useState } from 'react'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { ToastContainer } from 'react-toastify';
import Header from '../../../../../components/Header';
import { Layout } from '../../../../../components/Layout';
import { EfilingSideBarItem } from '../../../../../utils/sideBarItems';
import { useNavigate } from 'react-router';

function ListFileRegister() {
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
            Branch: "IT"
        },
        {
            No: "15",
            MainHeading: "This is Heading",
            Branch: "IT"
        },
        {
            No: "15",
            MainHeading: "This is Heading",
            Branch: "IT"
        }
    ]
    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard"} width={"500px"} />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        hideBtn={false}
                        addBtnText={"Create File Register"}
                        data={fileData}
                        tableTitle="List File Registers"
                        addBtnText2="Create File"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/addedit-file-register")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}
                        showView={true}
                        handleView={() => navigate("/efiling/dashboard/file-register-list/files-list")}

                    />
                </div>
            </div>
        </Layout>
    )
}

export default ListFileRegister