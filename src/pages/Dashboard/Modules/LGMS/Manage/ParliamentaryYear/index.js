import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { LegislationSideBarItems, QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { deleteParliamentaryYears, getAllParliamentaryYears, getParliamentaryYearsByID } from '../../../../../../api/APIs/Services/ManageQMS.service'
import moment from 'moment'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'

function LGMSParliamentaryYear() {
    const navigate = useNavigate()
    const [parliamentaryYears, setParliamentaryYears] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 10; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData?.map((item) => ({
        id: item.id,
        parliamentaryTenure: `${item.parliamentaryTenure}`,
        tenure: String(item?.tenure?.tenureName),
        description: `${item?.description}`,
        fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
        toDate: moment(item.toDate).format("YYYY/MM/DD"),
        status: String(item.status)
      }));
    };

    const handleParliamentaryYears = async () => {
      try {
        const response = await getAllParliamentaryYears(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data);
          setParliamentaryYears(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handleParliamentaryYears();
    }, [])

    const handleDelete = async (id) => {
      try {
        const response = await deleteParliamentaryYears(id);
        if (response?.success) {
          showSuccessMessage(response.message);
          handleParliamentaryYears();
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    };

    const hendleEdit = async (id) => {
      try {
        const response = await getParliamentaryYearsByID(id)
        if(response.success){
          navigate("/lgms/dashboard/manage/parliamentary-year/addedit", { state: response?.data })
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <Layout module={true} sidebarItems={LegislationSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"lgms/dashboard"}
      addLink1={"/lgms/dashboard/manage/parliamentary-year/list"}
      title1={"Parliamentary Year"}
    />
    <ToastContainer />

    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={parliamentaryYears}
          tableTitle="Parliamentary Year List"
          addBtnText="Add Parliamentary Year"
          handleAdd={() => navigate("/lgms/dashboard/manage/parliamentary-year/addedit")}
          handleEdit={(item) => 
            hendleEdit(item.id)
            
          }
          handleDelete={(item) => handleDelete(item.id)}
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

export default LGMSParliamentaryYear