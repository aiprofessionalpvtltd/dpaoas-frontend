import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { getAllDivisions } from '../../../../../../api/APIs'

function QMSDivisions() {
    const navigate = useNavigate()
    const [divisions, setDivisions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 5; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData?.map((item) => ({
        id: item.id,
        divisionName: `${item.divisionName}`,
        ministry: `${item?.ministry?.ministryName}`,
        divisionStatus: String(item?.divisionStatus),
      }));
    };

    const handleDivisions = async () => {
      try {
        const response = await getAllDivisions(currentPage, pageSize);
        if (response?.success) {
          console.log(response);
          setCount(response?.count);
          const transformedData = transformData(response.data);
          setDivisions(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleDivisions();
    }, [])

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/qms/manage"}
      addLink1={"/qms/manage/divisions"}
      title1={"Divisions"}
    />
    {/* <ToastContainer /> */}
    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={divisions}
          tableTitle="Divisions List"
          addBtnText="Add Divisions"
          handleAdd={() => navigate("/qms/manage/divisions/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/divisions/addedit", { state: item })
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

export default QMSDivisions