import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import moment from 'moment'
import { deleteTenures, getAllTenures } from '../../../../../../api/APIs/Services/ManageQMS.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'

function QMSTenures() {
    const navigate = useNavigate();
    const [tenures, setTenures] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 10; // Set your desired page size

    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };

    const transformData = (apiData) => {
      return apiData.map((item) => ({
        id: item.id,
        tenureName: `${item.tenureName}`,
        fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
        toDate: moment(item.toDate).format("YYYY/MM/DD"),
        status: `${item?.status}`,
      }));
    };

    const handleTenures = async () => {
      try {
        const response = await getAllTenures(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data?.tenures);
          setTenures(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
  
    useEffect(() => {
      handleTenures();
    }, [])

    const handleDelete = async (id) => {
      try {
        const response = await deleteTenures(id);
        if (response?.success) {
          showSuccessMessage(response.message);
          handleTenures();
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/qms/manage"}
      addLink1={"/qms/manage/tenures"}
      title1={"Tenures"}
    />
    <ToastContainer />

    <div class="container-fluid dash-detail-container card">
    <div class="row">
      <div class="col-12">
        <CustomTable
          data={tenures}
          tableTitle="Tenures List"
          addBtnText="Add Tenures"
          handleAdd={() => navigate("/qms/manage/tenures/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/tenures/addedit", { state: item })
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

export default QMSTenures