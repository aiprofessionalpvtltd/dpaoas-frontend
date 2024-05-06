import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { SMSsidebarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { getSMSLog } from "../../../../../../api/APIs/Services/SMS.service";
import moment from "moment";

function SMSDetailedMessageLog() {
  const [count, setCount] = useState(null);
  const [smsLogData, setSMSLogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchdata, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const pageSize = 8; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformMessageLogsData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      msgText: item?.msgText,
      RecieverNo: item?.RecieverNo,
      listName: item?.contactList?.listName,
      listDescription: item?.contactList?.listDescription,
      memberName: item.contactList?.contactMembers[0]?.member?.memberName,
      phoneNo: item.contactList?.contactMembers[0]?.member.phoneNo,
      Status: item?.isSent,
      createdAt: moment(item?.createdAt).format("YYYY/MM/DD"),
      updatedAt: moment(item?.updatedAt).format("YYYY/MM/DD"),
    }));
  };

  const getSMSLogDetailApi = useCallback(async () => {
    try {
      const response = await getSMSLog(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformMessageLogsData(
          response?.data?.smsRecord
        );
        setSearchData(transformedData)

        setCount(response?.data.count);
        setSMSLogData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setSMSLogData]);

  const SearchFilter = (text) => {
    if (text) {
      const newData = searchdata.filter((item) => {
        const itemData = `${item.msgText} ${item.RecieverNo} ${item.phoneNo} ${item?.memberName}`
          ? `${item.msgText} ${item.RecieverNo} ${item.phoneNo} ${item?.memberName}`.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSMSLogData(newData);
      setSearch(text);
    } else {
      setSMSLogData(searchdata);
      setSearch(text);
    }
  };

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
            singleDataCard={true}
            seachBarShow={true}
            searchonchange={(e) => SearchFilter(e.target.value)}
            tableTitle={"Detailed"}
            hidebtn1={true}
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
  );
}

export default SMSDetailedMessageLog;
