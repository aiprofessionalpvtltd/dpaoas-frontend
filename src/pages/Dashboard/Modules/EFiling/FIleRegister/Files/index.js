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
import { useLocation } from "react-router-dom";


function ListFiles() {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(null);
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
          HeadingNumber: item?.mainHeading?.mainHeadingNumber,
          mainHeading: item?.mainHeading?.mainHeading,
          fileNumber: item?.fileNumber,
          fileSubject: item?.fileSubject,
        }));
      };
      const getAllFilesAPi = useCallback(async () => {
        try {
            const response = await getFileByRegisterById(registerId,1)
            if (response.success) {
              showSuccessMessage(response?.message)
              setCount(response?.data?.count)
              const transformedData = transformFilesHeadingdata(response?.data?.files)
              console.log(transformedData, "transformedData");
              setFileData(transformedData)
            }
          } catch (error) {
            showErrorMessage(error?.response?.data?.message);
          }
      }, [currentPage, pageSize, setCount, setFileData]);

      useEffect(() => {
        getAllFilesAPi()
      },[currentPage]);

      const renderPagination = () => {
        const uniqueHeadingNumbers = [...new Set(fileData.map(item => item.HeadingNumber))];
        const totalPages = Math.ceil(fileData.length / pageSize);
        return (
          <nav aria-label="Page navigation">
            <ul className="pagination float-end mt-2">
              <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
              </li>
              {uniqueHeadingNumbers.map((headingNumber, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index)}
            >
              {headingNumber}
            </button>
          </li>
        ))}
              <li
                className={`page-item ${
                  currentPage >= totalPages - 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        );
      };

    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem}>
            <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list"} title1={"File Register"} title2={"Register Index"} addLink2={"/efiling/dashboard/file-register-list/files-list"} width={"500px"} />
           
            <div>
                <div style={{float:"left"}}>
                <div className='col'>
                <div class="top-head-left" style={{marginLeft:"15px",marginBottom:"15px"}}>
              <p style={{fontSize: "14px", marginBottom: "5px", fontWeight:"bold"}}>Branch Name : {location?.state?.branch}</p>
              <p style={{fontSize: "15px", marginBottom: "5px", fontWeight:"bold"}}>RegisterNumber : {location?.state?.registerNumber}</p>
              <p style={{fontSize: "15px", marginBottom: "5px", fontWeight:"bold"}}>Year {location?.state?.year} </p>
            </div>
                </div>
                </div>
                <div>
                <h1 style={{fontSize: "20px", textAlign: "center", marginBottom: "30px"}}>
              INDEX<br/>of<br/>Main File Headings
            </h1>
                </div>
            
            <p style={{textAlign: "right", marginRight: "10px"}}>Calendar Year: 20</p>
            </div>

            
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        // hidebtn1={true}
                        ActionHide={false}
                        hideBtn={false}
                        addBtnText={"Create File"}
                        data={fileData}
                        tableTitle="Register Index"
                        addBtnText2="Create File"
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handleAdd={() => navigate("/efiling/dashboard/file-register-list/files-list/addedit-file")}
                        singleDataCard={true}
                        hideDeleteIcon={true}
                        showEditIcon={true}
                        showView={true}
                        hidePagination={true}
                        handleView={(item) => navigate("/efiling/dashboard/file-register-list/files-list/cases", {state:item})}
                    />

                    {fileData.length > 0 && renderPagination()}
                </div>
            </div>
        </Layout>
    )
}

export default ListFiles