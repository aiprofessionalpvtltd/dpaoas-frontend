import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import { SMSsidebarItems } from "../../../../utils/sideBarItems";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";

function SMSDashboard() {

  // const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const Data = [
    {
      Name:"COntact Person Name",
      Detail :"Senate OF pakistan"
    },
    {
      Name:"COntact Person Name",
      Detail :"Senate OF pakistan"
    },
    {
      Name:"COntact Person Name",
      Detail :"Senate OF pakistan"
    },
    {
      Name:"COntact Person Name",
      Detail :"Senate OF pakistan"
    }
  ]
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/sms/dashboard"}
        // addLink1={"/sms/dashboard"}
        // title1={"Home"}
      />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={Data}
            headerShown={true}
            ActionHide={true}
            hideEditIcon={true}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            // totalCount={count}
            
          />
        </div>
      </div>
    </Layout>
  );
}

export default SMSDashboard;
