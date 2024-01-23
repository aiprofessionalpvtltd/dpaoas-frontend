import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'

function QMSMinistries() {
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
      addLink1={"/qms/manage/ministries"}
      title1={"Ministries"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={departmentData}
          tableTitle="Ministries List"
          addBtnText="Add Ministries"
          handleAdd={() => navigate("/qms/manage/ministries/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/ministries/addedit", { state: true })
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

export default QMSMinistries