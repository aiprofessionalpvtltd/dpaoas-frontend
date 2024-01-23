import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { getSMSLog } from '../../../../../../api/APIs'

function SMSDetailedMessageLog() {
     const [count, setCount] = useState(null);
     const [smsLogData,setSMSLogData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformDepartmentData = (apiData) => {
    return apiData.map((leave) => ({
        id: leave?.id,
        msgText: leave?.msgText,
        RecieverNo: leave?.RecieverNo,
        listName:leave?.contactList?.listName,
        listDescription:leave?.contactList?.listDescription,
        memberName:leave.contactList?.contactMembers[0]?.member?.memberName,
        phoneNo:leave.contactList?.contactMembers[0]?.member.phoneNo,
        Status: leave?.isSent,
        createdAt: leave?.createdAt,
        updatedAt: leave?.updatedAt
    }));
};

const getSMSLogDetailApi = useCallback(async () => {
    try {
        const response = await getSMSLog(currentPage, pageSize);
        if (response?.success) {
            const transformedData = transformDepartmentData(response?.data?.smsRecord);
            setCount(response?.data.count);
            setSMSLogData(transformedData);
        }
    } catch (error) {
        console.log(error);
    }
}, [currentPage, pageSize, setCount, setSMSLogData]);



useEffect(() => {
    getSMSLogDetailApi();
}, [getSMSLogDetailApi]);

  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/sms/dashboard"}
      title1={"Detailed"}
      addLink1={"/sms/messagelog/detailed"}
    />
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={smsLogData}
          tableTitle={"Detailed"}
          hideBtn={true}
        //   headerShown={true}
          ActionHide={true}
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
  )
}

export default SMSDetailedMessageLog
