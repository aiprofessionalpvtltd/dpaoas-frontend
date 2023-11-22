import React from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { useNavigate } from 'react-router-dom';
import { HRMsidebarItems } from '../../../../../utils/sideBarItems';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';

const data = [
    {
        name: "Admin",
        status: "Active"
    },
    {
        name: "Editor",
        status: "InActive"
    },
    {
        name: "Manager",
        status: "Active"
    },
    {
        name: "Employee",
        status: "Active"
    }
]

function HRMDesignation() {
    const navigate = useNavigate()

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
