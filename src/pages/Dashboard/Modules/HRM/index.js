import React from 'react'
import { Layout } from '../../../../components/Layout';
import { HRMsidebarItems } from '../../../../utils/sideBarItems';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header';
import CustomTable from '../../../../components/CustomComponents/CustomTable';


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
function HRMDashboard() {
    const navigate = useNavigate()


    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/dashboard"} addLink1={"/hrm/dashboard"} title1={"Roles"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Roles List"
                        addBtnText="Add Roles"
                        handleAdd={() => navigate('/hrm/addrole')}
                        handleEdit={(item) => navigate('/hrm/editrole', { state: item })}
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

export default HRMDashboard
