import React, { useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import { useNavigate } from 'react-router-dom'
import { getAllManageSessions } from '../../../../../../api/APIs'
import moment from "moment";

function QMSSittingsDays() {
    const navigate = useNavigate()
    const [sittingDays, setSittingDays] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 5; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData?.map((item, index) => ({
        id: index+1,
        session: `${item.session?.sessionName}`,
        sittingDate: moment(item?.sittingDate).format("YYYY/MM/DD"),
        startTime: String(item?.startTime),
        endTime: String(item?.endTime),
        sessionAdjourned: String(item?.sessionAdjourned),
      }));
    };

    const handleSittingDays = async () => {
      try {
        const response = await getAllManageSessions(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data);
          setSittingDays(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleSittingDays();
    }, [])

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
          data={sittingDays}
          tableTitle="Sitting Days List"
          addBtnText="Add Sitting Days"
          handleAdd={() => navigate("/qms/manage/sitting-days/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/sitting-days/addedit", { state: item })
          }
          hideDeleteIcon={true}
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

export default QMSSittingsDays