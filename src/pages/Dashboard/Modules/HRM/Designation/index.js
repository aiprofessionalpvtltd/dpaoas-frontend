import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { useNavigate } from 'react-router-dom';
import { HRMsidebarItems } from '../../../../../utils/sideBarItems';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { getDesignations } from '../../../../../api/APIs';

const data = [
    {
        "id": 1,
        "name": "IT Administrator",
        "description": "Admin Related Things",
        "designationStatus": "active",
        "createdAt": "2023-11-21T09:08:06.733Z",
        "updatedAt": "2023-11-21T09:08:06.733Z"
    },
    {
        "id": 2,
        "name": "HR",
        "description": "Manage Human Resources",
        "designationStatus": "active",
        "createdAt": "2023-11-21T09:08:45.694Z",
        "updatedAt": "2023-11-21T09:08:45.694Z"
    },
]

function HRMDesignation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const getDesignationApi = async () => {
        try {
            const response = await getDesignations()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDesignationApi()
    }, [])
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/designation"} addLink1={"/hrm/designation"} title1={"Designation"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Designation List"
                        addBtnText="Add Designation"
                        handleAdd={() => navigate('/hrm/addeditdesignation')}
                        handleEdit={(item) => navigate('/hrm/addeditdesignation', { state: item })}
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
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

export default HRMDesignation
