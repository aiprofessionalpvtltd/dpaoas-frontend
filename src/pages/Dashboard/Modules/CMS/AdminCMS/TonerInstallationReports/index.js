import React, { useCallback, useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { useFormik } from "formik";
import { CMSsidebarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import moment from "moment";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { AuthContext } from "../../../../../../api/AuthContext";
import { ToastContainer } from "react-toastify";
import { getallcomplaintTypes } from "../../../../../../api/APIs/Services/Complaint.service";
import {
  SearchToner,
  getAllTonerModels,
  getTonersById,
  getallToners,
  tonerDelete,
} from "../../../../../../api/APIs/Services/TonerInstallation.service";

function CMSTonerInstallationReports() {
  const navigate = useNavigate();
  const { employeeData } = useContext(AuthContext);
  const [tonarData, setTonerData] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [requestedBranch, setRequestedBranch] = useState([]);
  const [tonerModelData, setTonerModalData] = useState([]);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      UserRequest: "",
      RequestBranch: "",
      tonerModel: "",
      requestDate: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      SearchTonerApi(values);
    },
  });

  const transformTonerData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item.id,
      RequestDate: `${
        item?.requestDate && moment(item?.requestDate).format("DD/MM/YYYY")
      }`,

      UserRequest: `${item?.requestUser?.employee?.firstName}${item?.requestUser?.employee?.lastName}`,
      BranchRequest: `${item?.requestBranch?.complaintTypeName}`,
      TonerModel: `${item?.tonerModel?.tonerModel}`,
      Qty: item?.quantity,
      status: item?.status,
    }));
  };

  const getToner = useCallback(async () => {
    try {
      const response = await getallToners(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformTonerData(
          response?.data?.tonerInstallations
        );

        setCount(response?.data?.count);
        setTonerData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setTonerData]);

  useEffect(() => {
    getToner();
  }, [getToner]);

  // Getting Branch Request
  const BranchRequest = async () => {
    try {
      const response = await getallcomplaintTypes();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setRequestedBranch(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    BranchRequest();
  }, []);

  // Get All Toner MOdels
  const GetAllTonerModelsData = async () => {
    try {
      const response = await getAllTonerModels(0, 100);
      if (response.success) {
        setTonerModalData(response?.data?.tonerModels);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    GetAllTonerModelsData();
  }, []);
  const hendleEdit = async (id) => {
    try {
      const response = await getTonersById(id);
      if (response?.success) {
        navigate("/cms/dashboard/toner/addedit", {
          state: response?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await tonerDelete(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getToner();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // Search for Toner
  const SearchTonerApi = async (values) => {
    const Data = {
      requestUser: values.UserRequest.value,
      requestBranch: values.RequestBranch,
      tonerModel: values.tonerModel,
      requestDate: values.requestDate,
    };
    try {
      const response = await SearchToner(Data);

      if (response?.success) {
        const transformedData = transformTonerData(response?.data);
        setCount(1);
        setTonerData(transformedData);
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };
  // Handle Export xls File

  const hendleExportExcel = async () => {
    try {
      const response = await getallToners(currentPage, pageSize);

      if (response?.success) {
        const DataArray = response?.data?.tonerInstallations;
        console.log(DataArray);
        const Data = DataArray.map((item) => ({
          SR: item.id,
          RequestDate: item.requestDate
            ? moment(item.requestDate).format("DD/MM/YYYY")
            : "",
          UserRequest: `${item?.requestUser?.employee?.firstName} ${item?.requestUser?.employee?.lastName}`,
          BranchRequest: item?.requestBranch?.complaintTypeName,
          TonerModel: item?.tonerModel?.tonerModel,
          Qty: item?.quantity,
          status: item?.status,
          CreatedAt: item?.createdAt,
          updatedAt: item?.updatedAt,
        }));

        const worksheet = XLSX.utils.json_to_sheet(Data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/cms/admin/toner-installation-report"} />
      <ToastContainer />
      <div class="mt-4">
        <div class="container-fluid ">
          <div className="dash-detail-container">
            <form onSubmit={formik.handleSubmit}>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Request User</label>

                    <Select
                      options={
                        employeeData &&
                        employeeData?.map((item) => ({
                          value: item.id,
                          label: `${item.firstName}${item.lastName}`,
                        }))
                      }
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("UserRequest", selectedOptions)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.requestUser}
                      name="UserRequest"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Request Branch</label>
                    <select
                      class="form-select"
                      placeholder={formik.values.complaintType}
                      onChange={formik.handleChange}
                      id="RequestBranch"
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled hidden>
                        Select
                      </option>
                      {requestedBranch &&
                        requestedBranch.map((item) => (
                          <option value={item.id}>
                            {item.complaintTypeName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Toner Model</label>
                    <select
                      class="form-select"
                      placeholder={formik.values.tonerModel}
                      id="tonerModel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled hidden>
                        Select
                      </option>
                      {tonerModelData &&
                        tonerModelData.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item?.tonerModel}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Request Date</label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <DatePicker
                      minDate={new Date()}
                      selected={formik.values.requestDate}
                      onChange={(date) =>
                        formik.setFieldValue("requestDate", date)
                      }
                      className={"form-control"}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end col">
                  <button class="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div class="row mt-5">
              <div class="col-12">
                <CustomTable
                  block={false}
                  data={tonarData}
                  tableTitle="Toner Installation Reports"
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  totalCount={count}
                  showPrint={false}
                  addBtnText={"Add Toner Installation"}
                  handleAdd={() => navigate("/cms/dashboard/toner/addedit")}
                  handleEdit={(item) => hendleEdit(item.SR)}
                  handleDelete={(item) => handleDelete(item.SR)}
                />
                <div class="d-grid gap-2 d-md-flex justify-content-md-start col">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={() => hendleExportExcel()}
                  >
                    Export Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CMSTonerInstallationReports;
