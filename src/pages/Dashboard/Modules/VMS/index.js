import React, { useState, useEffect } from 'react'
import { Layout } from '../../../../components/Layout'
import { VMSsidebarItems } from '../../../../utils/sideBarItems'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import { getPasses } from '../../../../api/APIs'
import { ToastContainer } from 'react-toastify';
import { showErrorMessage } from '../../../../utils/ToastAlert'



function VMSDashboard() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const data = [
        {
            "id": 1,
            "passDate": "21-11-2023",
            "requestedBy": "Ali Ahmad Jan",
            "branch": "Additional Secretary Office",
            "visitPurpose": "Educational Trip",
            "cardType": "Personal",
            "companyName": "AI Professionals Pvt Limited",
            "fromDate": "21-11-2023",
            "toDate": "30-11-2023",
            "allowOffDays": [
                "Saturday"
            ],
            "remarks": "Visit",
            "passStatus": "Inactive",
            "createdAt": "2023-11-21T10:32:24.068Z",
            "updatedAt": "2023-11-22T04:06:59.873Z"
        },
        {
            "id": 2,
            "passDate": "21-11-2023",
            "requestedBy": "Ali Ahmad Jan",
            "branch": "Additional Secretary Office",
            "visitPurpose": "Educational Trip",
            "cardType": "Personal",
            "companyName": "AI Professionals Pvt Limited",
            "fromDate": "22-11-2023",
            "toDate": "1-12-2023",
            "allowOffDays": [
                "Saturday"
            ],
            "remarks": "Visit",
            "passStatus": "Inactive",
            "createdAt": "2023-11-22T06:05:52.689Z",
            "updatedAt": "2023-11-22T06:05:52.689Z"
        },

    ]

    const getPassesData = async () => {
        try {
            const response = await getPasses()
        } catch (error) {
            console.log(error);
            showErrorMessage()
        }
    }
    useEffect(() => {
        getPassesData()
    }, [currentPage])
    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        block={true}
                        data={data}
                        tableTitle="Passes"
                        addBtnText="Add Pass"
                        handleAdd={() => navigate('/vms/addeditpass')}
                        handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                        hideUserIcon={true}
                        handleUser={() => navigate("/vms/visitor")}
                        handleDuplicate={() => navigate("/vms/duplicatepass")}
                        seachBarShow={true}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                    // handlePrint={}
                    // handleUser={}
                    // handleDelete={(item) => handleDelete(item.id)}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default VMSDashboard
