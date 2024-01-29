import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { getAllMembers } from '../../../../../../api/APIs'
import moment from 'moment'

function QMSMembers() {
    const navigate = useNavigate()
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 5; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData.map((item) => ({
        id: item.id,
        memberName: `${item.memberName}`,
        politicalParty: `${item?.politicalParties?.partyName}`,
        electionType: item?.electionType,
        tenure: item?.tenures?.tenureName,
        phoneNo: item?.phoneNo,
        gender: item?.gender,
        memberStatus: item?.memberStatus,
        fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
        toDate: moment(item.toDate).format("YYYY/MM/DD"),
      }));
    };

    const handleMembers = async () => {
      try {
        const response = await getAllMembers(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.data?.count);
          const transformedData = transformData(response.data?.rows);
          setMembers(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleMembers();
    }, [])

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
          data={members}
          tableTitle="Member List"
          addBtnText="Add Member"
          handleAdd={() => navigate("/qms/manage/members/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/members/addedit", { state: item })
          }
          headertitlebgColor={"#666"}
          headertitletextColor={"#FFF"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={count}
        />
      </div>
    </div>
    </div>
  </Layout>
  )
}

export default QMSMembers