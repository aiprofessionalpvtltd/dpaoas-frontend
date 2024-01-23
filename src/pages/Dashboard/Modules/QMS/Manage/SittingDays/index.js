import React, { useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import { useNavigate } from 'react-router-dom'

function QMSSittingsDays() {
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
      addLink1={"/qms/manage/sitting-days"}
      title1={"Sitting Days"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={departmentData}
          tableTitle="Sitting Days List"
          addBtnText="Add Sitting Days"
          handleAdd={() => navigate("/qms/manage/sitting-days/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/sitting-days/addedit", { state: true })
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

export default QMSSittingsDays