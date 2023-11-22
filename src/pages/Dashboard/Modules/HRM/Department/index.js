import React from 'react'
import { Layout } from '../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../utils/sideBarItems'
import Header from '../../../../../components/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'

const data = [
    {
        Name: "Admin",
        Status: "Active"
    },
    {
        Name: "Editor",
        Status: "InActive"
    },
    {
        Name: "Manager",
        Status: "Active"
    },
    {
        id: "4",
        Name: "Employee",
        Status: "Active"
    }
]

function HRMDepartment() {
    const navigate = useNavigate()

    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/department"} addLink1={"/hrm/department"} title1={"Department"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Department List"
                        addBtnText="Add Department"
                        handleAdd={() => navigate('/hrm/addeditdepartment')}
                        handleEdit={(item) => navigate('/hrm/addeditdepartment', { state: item })}
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

export default HRMDepartment
