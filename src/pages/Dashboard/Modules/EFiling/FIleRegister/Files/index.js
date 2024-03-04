import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Layout } from '../../../../../../components/Layout';
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../../components/Header';
import { getFileByRegisterById } from '../../../../../../api/APIs/Services/efiling.service';
import { getRegisterID } from '../../../../../../api/Auth';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';

function ListFiles() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(1);
    const pageSize = 5; // Set your desired page size
    const registerId = getRegisterID()
    const [fileData, setFileData] = useState([])

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    // const fileData = [
    //     {
    //         FileNo: "15",
    //         Subject: "This is Heading",
    //         Heading: "5"
    //     },
    //     {
    //         FileNo: "15",
    //         Subject: "This is Heading",
    //         Heading: "5"
    //     }
    // ]

    const transformFilesHeadingdata = (apiData) => {
        return apiData.map((item) => ({
          id: item?.id,
          fileNumber: item?.mainHeading?.mainHeadingNumber,
          fileSubject: item?.fileSubject,
          mainHeading: item?.mainHeading?.mainHeading,
        }));
      };
      const getAllFilesAPi = useCallback(async () => {
        try {
            const response = await getFileByRegisterById(registerId,currentPage, pageSize)
            if (response.success) {
              showSuccessMessage(response?.message)
              setCount(response?.data?.count)
              const transformedData = transformFilesHeadingdata(response?.data?.files)
              setFileData(transformedData)
            }
          } catch (error) {
            showErrorMessage(error?.response?.data?.message);
          }
      }, [currentPage, pageSize, setCount, setFileData]);

      useEffect(() => {
        getAllFilesAPi()
      },[getAllFilesAPi])
    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list"} title1={"File Register"} title2={"Register Index"} addLink2={"/efiling/dashboard/file-register-list/files-list"} width={"500px"} />
            <ToastContainer />
            <div className='row'>
                <div className='col'>
                <div class="top-head-left" style={{marginLeft:"15px",marginBottom:"15px"}}>
              <p style={{fontSize: "14px", marginBottom: "5px"}}>S-92</p>
              <p style={{fontSize: "15px", marginBottom: "5px"}}>(See Appendix E-Instructions)</p>
              <p style={{fontSize: "15px", marginBottom: "5px"}}>Secretariat Instructions</p>
            </div>
                </div>
            </div>

            
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={true}
                        hideBtn={false}
                        addBtnText={"Create File"}
                        data={fileData}
                        tableTitle="Register Index"
                        addBtnText2="Create File"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-file")}
                        pageSize={pageSize}
                        totalCount={count}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}

                    />
                </div>
            </div>
        </Layout>
    )
}

export default ListFiles