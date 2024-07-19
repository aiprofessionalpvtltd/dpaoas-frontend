import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { SMSsidebarItems } from "../../../../utils/sideBarItems";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { getContactList } from "../../../../api/APIs/Services/SMS.service";
import moment from "moment";

function SMSDashboard() {
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [contactList, setContactList] = useState([]);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformContactListData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      listName: item?.listName,
      listDescription: item?.listDescription,
      listActive: item?.listActive,
      UserEmail: item.user.email,
      PublicList: JSON.stringify(item?.isPublicList),
      createdAt: moment(item?.createdAt).format("YYYY/MM/DD"),
      updatedAt: moment(item?.updatedAt).format("YYYY/MM/DD"),
    }));
  };
  const getContactListApi = useCallback(async () => {
    try {
      const response = await getContactList(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformContactListData(
          response?.data?.contactList
        );
        setCount(response?.data?.count);
        setContactList(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setContactList]);

  useEffect(() => {
    getContactListApi();
  }, [getContactListApi]);
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/"} />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={contactList}
            tableTitle={"Account Information"}
            hidebtn1={true}
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
