import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'

function QMSMembers() {
    const navigate = useNavigate()
const [departmentData, setDepartmentData]= useState([
    {
        name:"Saqib Khan",
        designation: "Manager",
        email: "saqib@gmail.com",
        phoneNumber: "+923012345678"
    },
    {
        name:"Saqib Khan",
        designation: "Manager",
        email: "saqib@gmail.com",
        phoneNumber: "+923012345678"
    },
    {
        name:"Saqib Khan",
        designation: "Manager",
        email: "saqib@gmail.com",
        phoneNumber: "+923012345678"
    },
])
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/qms/department"}
      addLink1={"/qms/manage/members"}
      title1={"Members"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={departmentData}
          tableTitle="Member List"
          addBtnText="Add Member"
          handleAdd={() => navigate("/qms/manage/members/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/members/addedit", { state: true })
          }
          headertitlebgColor={"#666"}
          headertitletextColor={"#FFF"}
        //   handlePageChange={handlePageChange}
        //   currentPage={currentPage}
        //   pageSize={pageSize}
          // handlePrint={}
          // handleUser={}
        //   totalCount={count}
        //   handleDelete={(item) => handleDelete(item.id)}
        />
      </div>
    </div>
    </div>
  </Layout>
  )
}

export default QMSMembers