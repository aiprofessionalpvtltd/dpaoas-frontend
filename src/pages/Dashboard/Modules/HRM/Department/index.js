import React, { useEffect } from 'react'
import { Layout } from '../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../utils/sideBarItems'
import Header from '../../../../../components/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { getDepartment } from '../../../../../api/APIs'

const data = [
    {
        "id": 1,
        "name": "Admin Department",
        "description": "Handles Admin Related Work!",
        "departmentStatus": "active",
        "createdAt": "2023-11-21T09:22:13.682Z",
        "updatedAt": "2023-11-24T05:48:16.342Z"
    },
    {
        "id": 2,
        "name": "IT Department",
        "description": "Handles IT Related Work!",
        "departmentStatus": "active",
        "createdAt": "2023-11-24T09:49:43.505Z",
        "updatedAt": "2023-11-24T09:49:43.505Z"
    }
]

function HRMDepartment() {
    const navigate = useNavigate()

    const getDepartmentData = async () => {
        try {
            const response = await getDepartment()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDepartmentData()
    }, [])
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
