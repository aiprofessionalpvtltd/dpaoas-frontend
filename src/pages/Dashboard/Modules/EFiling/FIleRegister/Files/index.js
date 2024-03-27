import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { Layout } from "../../../../../../components/Layout";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import {
  getAllFileHeading,
  getAllFileRegister,
  getFileByRegisterById,
  registerRecordByRegisterId,
} from "../../../../../../api/APIs/Services/efiling.service";
import { getRegisterID, getUserData } from "../../../../../../api/Auth";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { useLocation } from "react-router-dom";
import Select from "react-select";

function ListFiles() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const userData = getUserData();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(null);
  const [count, setCount] = useState(1);
  const pageSize = 5; // Set your desired page size
  const registerId = getRegisterID();
  const [fileData, setFileData] = useState([]);
  const [headings, setHeadings] = useState(null);
  const [registerDataid, setRegisterDataId] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformFilesHeadingdata = (apiData) => {
    return apiData.map((item) => ({
      internalId: item?.id,
      SNo: item?.id,
      HeadingNumber: item?.mainHeading?.mainHeadingNumber,
      mainHeading: item?.mainHeading?.mainHeading,
      year: item.year,
      fileNumber: item?.fileNumber,
      fileSubject: item?.fileSubject,
    }));
  };
const [registerHistory, setRegisterHistory] = useState(null)

const getRegisterRecordByRegisterId = async (id) => {
  try {
    const response = await registerRecordByRegisterId(id.value)
    if (response.success) {
      setRegisterHistory(response?.data);
    }
  } catch (error) {
    console.log(error);
  }
}

  const getAllFilesAPi = async (id) => {
    try {
      const response = await getFileByRegisterById(id.value, currentPage);
      if (response.success) {
        if (response?.data?.files) {
          setCount(response?.data?.count);
          const transformedData = transformFilesHeadingdata(
            response?.data?.files
          );
          setFileData(transformedData);
        } else {
          setFileData([]);
        }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  const transformFilesHeadings = (apiData) => {
    console.log(apiData);
    return apiData.map((item) => ({
      HeadingNumber: item?.mainHeadingNumber,
    }));
  };

  const getAllFileHeadingApi = useCallback(async () => {
    try {
      const response = await getAllFileHeading(userData?.fkBranchId,0, 1000);
      if (response.success) {
        //   showSuccessMessage(response?.message)
        setCount(response?.data?.count);
        const transformedData = transformFilesHeadings(
          response?.data?.mainHeadings
        );
        setCurrentPage(transformedData[transformedData.length - 1].HeadingNumber);
        setHeadings(transformedData);
        if (registerDataid) {
          getAllFilesAPi(registerDataid);
        }
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage]);

  useEffect(() => {
    if (registerDataid) {
      getAllFilesAPi(registerDataid);
    }
  }, [currentPage, registerDataid]);

  useEffect(() => {
    getAllFileHeadingApi();
  }, []);

  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(
        userData?.fkBranchId,
        0,
        100
      );
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

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
console.log("registerData",registerData);
  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}
    >
      {/* <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/file-register-list"}
        title1={"File Register"}
        title2={"Register Index"}
        addLink2={"/efiling/dashboard/file-register-list/files-list"}
        width={"500px"}
      /> */}

      <div>
        <div style={{ float: "left" }}>
          <div className="col">
            <div
              class="top-head-left"
              style={{ marginLeft: "15px", marginBottom: "15px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Branch Name : {registerHistory?.branches?.branchName}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                RegisterNumber : {registerHistory?.registerNumber}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Year : {registerHistory?.year}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            INDEX
            <br />
            of
            <br />
            Main File Headings
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div className="col-8" style={{display: "flex", flexDirection:"row",alignItems:"center"}}>
          <div class="col-4">
              <label for="formFile" class="form-label">
                Select Register
              </label>
              <Select
                options={
                  registerData &&
                  registerData?.map((item) => ({
                    value: item.id,
                    label: item.year,
                  }))
                }
                onChange={(selectedOptions) => {
                  setRegisterDataId(selectedOptions);
                  getAllFilesAPi(selectedOptions);
                  getRegisterRecordByRegisterId(selectedOptions)
                }}
                // onBlur={formikAssigned.handleBlur}
                // value={fkregisterId}
                name="fkregisterId"
                isClearable={true}
              />
          </div>
          <div class="col-4" style={{marginLeft:"20px"}}>
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

          <p style={{ textAlign: "right", marginRight: "10px" }}>
            Calendar Year: 20
          </p>
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
            handleAdd={() =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/addedit-file"
              )
            }
            singleDataCard={true}
            hideDeleteIcon={true}
            showEditIcon={true}
            showView={true}
            hidePagination={true}
            handleView={(item) =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/cases",
                { state: item }
              )
            }
          />

          {/* {fileData.length > 0 && renderPagination()} */}
        </div>
      </div>
    </Layout>
  );
}

export default ListFiles;
