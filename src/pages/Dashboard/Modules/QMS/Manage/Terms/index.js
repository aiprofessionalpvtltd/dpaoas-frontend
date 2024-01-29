import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { getAllTerms } from '../../../../../../api/APIs'
import moment from 'moment'

function QMSTerms() {
    const navigate = useNavigate();
    const [terms, setTerms] = useState([]);
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
        termName: `${item.termName}`,
        tenure: `${item?.tenure?.tenureName}`,
        fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
        toDate: moment(item.toDate).format("YYYY/MM/DD"),
      }));
    };

    const handleTerms = async () => {
      try {
        const response = await getAllTerms(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data?.terms);
          setTerms(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleTerms();
    }, [])

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/qms/manage"}
      addLink1={"/qms/manage/terms"}
      title1={"Terms"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={terms}
          tableTitle="Terms List"
          addBtnText="Add Terms"
          handleAdd={() => navigate("/qms/manage/terms/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/terms/addedit", { state: item })
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

export default QMSTerms