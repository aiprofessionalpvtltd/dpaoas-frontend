import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../utils/sideBarItems'
import Header from '../../../../../components/Header'
import { ToastContainer } from 'react-toastify'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { DeleteHeading, getAllFileHeading } from '../../../../../api/APIs/Services/efiling.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert'
import { getUserData } from '../../../../../api/Auth'

function FileHeadingList() {
    const navigate = useNavigate()
    const userData = getUserData()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 5; // Set your desired page size
    const [headingData, setHedingData] = useState([])


    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


      const transformFilesHeadingdata = (apiData) => {
        console.log(apiData);
        return apiData.map((item) => ({
          id: item?.id,
          Heading: item?.mainHeading,
          HeadingNumber: item?.mainHeadingNumber,
          branch: item?.branches?.branchName,
          status: item?.status
        }));
      };
      const getAllFileHeadingApi = useCallback(async () => {
        try {
            const response = await getAllFileHeading(currentPage, pageSize)
            if (response.success) {
            //   showSuccessMessage(response?.message)
              setCount(response?.data?.count)
              const transformedData = transformFilesHeadingdata(response?.data?.mainHeadings)
              setHedingData(transformedData)
            }
          } catch (error) {
            showErrorMessage(error?.response?.data?.message);
          }
      }, [currentPage, pageSize, setCount, setHedingData]);


      const handleDelete = async (id) => {
        try {
          const response = await DeleteHeading(id);
          if (response?.success) {
            showSuccessMessage(response.message);
            getAllFileHeadingApi();
          }
        } catch (error) {
          showErrorMessage(error.response.data.message);
        }
      };

      useEffect(() => {
        getAllFileHeadingApi()
      },[getAllFileHeadingApi])
  return (
    <Layout module={true} centerlogohide={true} sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
    <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard"} title1={"File Heading"} width={"500px"} />
    <ToastContainer />
    <div class="row">
        <div class="col-12">
            <CustomTable
                // hidebtn1={true}
                hideBtn={false}
                addBtnText={"Create File Heading"}
                data={headingData}
                tableTitle="File Headings"
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                handleAdd={() => navigate("/efiling/dashboard/addedit-file-heading")}
                pageSize={pageSize}
                totalCount={count}
                singleDataCard={true}
                // hideDeleteIcon={true}
                handleDelete={(item) => handleDelete(item.id)}
                showEditIcon={false}
                handleEdit={(item) => navigate("/efiling/dashboard/addedit-file-heading", {state:item})}
            />
        </div>
    </div>
</Layout>
  )
}

export default FileHeadingList