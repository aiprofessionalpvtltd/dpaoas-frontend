import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { SMSsidebarItems } from "../../../../utils/sideBarItems";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { getContactList } from "../../../../api/APIs";
import moment from "moment";

function SMSDashboard() {

  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [contactList,setContactList] = useState([])
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDepartmentData = (apiData) => {
    console.log(apiData);
    return apiData.map((leave) => ({
      id: leave?.id,
      listName: leave?.listName,
      listDescription: leave?.listDescription,
      listActive: leave?.listActive,
      UserEmail:leave.user.email,
      PublicList:JSON.stringify(leave?.isPublicList),
      createdAt: moment(leave?.createdAt).format("YYYY/MM/DD"),
      updatedAt: moment(leave?.updatedAt).format("YYYY/MM/DD")
    //   contactMembers: leave?.contactMembers[0]?.member.memberName
    }));
  };
  const getContactListApi = useCallback(async () => {
    try {
      const response = await getContactList(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformDepartmentData(response?.data?.contactList);
        setCount(response?.data?.count);
        setContactList(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setContactList]);

  useEffect(() => {
    getContactListApi()
  },{getContactListApi})
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/sms/dashboard"}
      />
      <div class="row">
        <div class="col-12">
        <CustomTable
          data={contactList}
          tableTitle={"Account Information"}
          hideBtn={true}
          singleDataCard={true}
          ActionHide={true}
          hideDeleteIcon={true}
          hideEditIcon={true}
          headertitlebgColor={"#666"}
          headertitletextColor={"#FFF"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={count}
          />
        </div>
      </div>
      
    </Layout>
  );
}

export default SMSDashboard;
