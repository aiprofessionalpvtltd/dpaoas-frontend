import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { Layout } from "../../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../utils/sideBarItems";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 5;

  const [fileData, setFileData] = useState([]);
  const [headings, setHeadings] = useState(null);
  const [registerDataid, setRegisterDataId] = useState(null);
  const [headingNumber, setHeadingNumber] = useState(null);

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
  const [registerHistory, setRegisterHistory] = useState(null);
  const getAllFilesAPi = async () => {
    const searchParams = {
      branchId: userData?.fkBranchId,
      currentPage: currentPage,
      pageSize: pageSize,
      fileRegisterId: registerDataid,
      mainHeadingNumber: headingNumber,
    };
    try {
      const response = await getFileByRegisterById(searchParams);
      if (response?.success) {
        setCount(response?.data?.count);
        if (response?.data?.files) {
          const transformedData = transformFilesHeadingdata(
            response?.data?.files
          );
          setFileData(transformedData);
        } else {
          setFileData([]);
        }
      }
    } catch (error) {
      console.log(error);
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
      const response = await getAllFileHeading(userData?.fkBranchId, 0, 1000);
      if (response.success) {
        const transformedData = transformFilesHeadings(
          response?.data?.mainHeadings
        );

        setHeadings(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllFilesAPi();
  }, [currentPage, pageSize, registerDataid, headingNumber]);

  useEffect(() => {
    getAllFileHeadingApi();
  }, []);

  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(userData?.fkBranchId, 0, 100);
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
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
          <div
            className="col-8"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
                  setRegisterDataId(selectedOptions?.value);
                }}
                name="fkregisterId"
                isClearable={true}
              />
            </div>
            <div class="col-4" style={{ marginLeft: "20px" }}>
              <label class="form-label">Heading Number</label>
              <select
                class="form-select"
                placeholder={"Select Heading Number"}
                onChange={(event) => setHeadingNumber(event.target.value)}
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
            ActionHide={false}
            hideBtn={false}
            addBtnText={"Create File"}
            data={fileData}
            tableTitle="Register Index"
            addBtnText2="Create File"
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
            handleAdd={() =>
              navigate(
                "/efiling/dashboard/file-register-list/files-list/addedit-file"
              )
            }
            totalCount={count}
            singleDataCard={true}
            hideDeleteIcon={true}
            showEditIcon={true}
            showView={true}
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
