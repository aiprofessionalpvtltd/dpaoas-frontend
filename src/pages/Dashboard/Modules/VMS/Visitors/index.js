import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { Layout } from '../../../../../components/Layout';
import { VMSsidebarItems } from '../../../../../utils/sideBarItems';
import Header from '../../../../../components/Header';
import { getVisirorsByPassId } from '../../../../../api/APIs';

function VMSVisitors() {
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
            "name": "Umar",
            "cnic": "61101-",
            "details": "Senate Visit 2023",
            "visitorStatus": "active",
            "createdAt": "2023-11-21T10:47:24.052Z",
            "updatedAt": "2023-11-21T10:47:24.052Z"
        }, {
            "id": 2,
            "name": "Saqib khan",
            "cnic": "61101-",
            "details": "Senate Visit 2023",
            "visitorStatus": "inactive",
            "createdAt": "2023-11-21T10:47:24.052Z",
            "updatedAt": "2023-11-21T10:47:24.052Z"
        }

    ];
    const getVisitorsAPi = async () => {
        try {
            const response = await getVisirorsByPassId()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // getVisitorsAPi()
    }, [])

    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/visitor"} title1={"Visitors"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Visitors Detail"
                        addBtnText="Add Visitor"
                        handleAdd={() => navigate('/vms/addeditvisitor')}
                        handleEdit={(item) => navigate('/vms/addeditvisitor', { state: item })}
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

export default VMSVisitors
