import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../components/Header'
import { deletePoliticalParties, getAllPoliticalParties } from '../../../../../../api/APIs/Services/ManageQMS.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'

function QMSPoliticalParty() {
    const navigate = useNavigate()
    const [politicalParties, setPoliticalParties] = useState([]);
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
        partyName: `${item.partyName}`,
        description: `${item?.description}`,
        shortName: item?.shortName,
        status: String(item?.status),
      }));
    };

    const handlePoliticalParty = async () => {
      try {
        const response = await getAllPoliticalParties(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.count);
          const transformedData = transformData(response.data?.politicalParties);
          setPoliticalParties(transformedData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }    
  
    useEffect(() => {
      handlePoliticalParty();
    }, [])

    const handleDelete = async (id) => {
      try {
        const response = await deletePoliticalParties(id);
        if (response?.success) {
          showSuccessMessage(response.message);
          handlePoliticalParty();
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/qms/manage"}
      addLink1={"/qms/manage/political-party"}
      title1={"Political Party"}
    />
    <ToastContainer />

    <div class="row">
      <div class="col-12">
        <CustomTable
        singleDataCard={true}
          data={politicalParties}
          tableTitle="Political Party List"
          addBtnText="Add Political Party"
          handleAdd={() => navigate("/qms/manage/political-party/addedit")}
          handleEdit={(item) =>
            navigate("/qms/manage/political-party/addedit", { state: item })
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
  </Layout>
  )
}

export default QMSPoliticalParty