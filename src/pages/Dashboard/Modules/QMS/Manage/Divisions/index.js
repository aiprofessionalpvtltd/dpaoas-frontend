import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'

function QMSDivisions() {
    const navigate = useNavigate()
    const [departmentData, setDepartmentData]= useState([
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
      dashboardLink={"/qms/manage"}
      addLink1={"/qms/manage/divisions"}
      title1={"Divisions"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={departmentData}
          tableTitle="Divisions List"
          addBtnText="Add Divisions"
          handleAdd={() => navigate("/qms/manage/divisions/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/divisions/addedit", { state: true })
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

export default QMSDivisions