import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";

function QMSSessions() {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([
    {
      SessionNo: "Saqib Khan",
      designation: "Manager",
      email: "saqib@gmail.com",
      phoneNumber: "+923012345678",
    },
  ]);
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header dashboardLink={"/qms/manage"} addLink1={"/qms/manage/sessions"} title1={"Sessions"} />
      {/* <ToastContainer /> */}
      <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={departmentData}
              tableTitle="Sessions List"
              addBtnText="Add Sessions"
              handleAdd={() => navigate("/qms/manage/sessions/addedit")}
              handleEdit={(item) => navigate("/qms/manage/sessions/addedit", { state: true })}
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
  );
}

export default QMSSessions;
