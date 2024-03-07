import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Layout } from '../../../../../../components/Layout';
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../../components/Header';
import { getAllFileHeading, getFileByRegisterById } from '../../../../../../api/APIs/Services/efiling.service';
import { getRegisterID } from '../../../../../../api/Auth';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { useLocation } from "react-router-dom";
import Select from "react-select";


function ListFiles() {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(null);
    const [count, setCount] = useState(1);
    const pageSize = 5; // Set your desired page size
    const registerId = getRegisterID()
    const [fileData, setFileData] = useState([])
    const [headings, setHeadings] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const transformFilesHeadingdata = (apiData) => {
        return apiData.map((item) => ({
          id: item?.id,
          HeadingNumber: item?.mainHeading?.mainHeadingNumber,
          mainHeading: item?.mainHeading?.mainHeading,
          fileNumber: item?.fileNumber,
          fileSubject: item?.fileSubject,
        }));
      };

      const getAllFilesAPi = async () => {
        try {
            const response = await getFileByRegisterById(registerId,currentPage)
            if (response.success) {
              setCount(response?.data?.count)
              const transformedData = transformFilesHeadingdata(response?.data?.files)
              setFileData(transformedData)
            }
          } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
          }
      }

      const transformFilesHeadings = (apiData) => {
        console.log(apiData);
        return apiData.map((item) => ({
          HeadingNumber: item?.mainHeadingNumber,
        }));
      };

      const getAllFileHeadingApi = useCallback(async () => {
        try {
            const response = await getAllFileHeading(0, 1000)
            if (response.success) {
            //   showSuccessMessage(response?.message)
              setCount(response?.data?.count)
              const transformedData = transformFilesHeadings(response?.data?.mainHeadings);
              setCurrentPage(transformedData[0].HeadingNumber);
              setHeadings(transformedData)
            }
          } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
          }
      }, [currentPage]);

      useEffect(() => {
        getAllFilesAPi();
      },[currentPage]);

      useEffect(() => {
        getAllFileHeadingApi();
      }, [])
    

//       const renderPagination = () => {
//         const uniqueHeadingNumbers = [...new Set(headings?.map(item => item.HeadingNumber))];
//         const totalPages = Math.ceil(fileData.length / pageSize);
//         return (
//           <nav aria-label="Page navigation">
//     <ul className="pagination float-end mt-2">
//         {/* <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
//             <button
//                 className="page-link"
//                 onClick={() => handlePageChange("prev")}
//                 disabled={currentPage === 0}
//             >
//                 Previous
//             </button>
//         </li> */}
//         {uniqueHeadingNumbers.map((headingNumber, index) => (
//             <li
//                 key={index}
//                 className={`page-item ${currentPage === headingNumber ? "active" : ""}`}
//             >
//                 <button
//                     className="page-link"
//                     onClick={() => handlePageChange(headingNumber)}
//                 >
//                     {headingNumber}
//                 </button>
//             </li>
//         ))}
//         {/* <li
//             className={`page-item ${
//                 currentPage >= totalPages - 1 ? "disabled" : ""
//             }`}
//         >
//             <button
//                 className="page-link"
//                 onClick={() => handlePageChange("next")}
//                 disabled={currentPage >= totalPages - 1}
//             >
//                 Next
//             </button>
//         </li> */}
//     </ul>
// </nav>

//         );
//       };

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

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <div class="col-2">
                  <div class="mb-3">
                    <label class="form-label">Heading Number</label>
                    <select
                      class="form-select"
                      placeholder={"Select Heading Number"}
                      onChange={(event) => setCurrentPage(event.target.value)}
                      id="headings"
                    >
                      <option selected disabled hidden>
                        Select
                      </option>
                      {headings &&
                        headings.map((item) => (
                          <option value={item.HeadingNumber}>
                            {item.HeadingNumber}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              
                  <p style={{textAlign: "right", marginRight: "10px"}}>Calendar Year: 20</p>
                </div>
            
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

                    {/* {fileData.length > 0 && renderPagination()} */}
                </div>
            </div>
        </Layout>
    )
}

export default ListFiles