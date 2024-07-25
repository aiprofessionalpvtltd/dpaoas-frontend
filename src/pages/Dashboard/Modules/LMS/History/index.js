import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { LMSsidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import moment from "moment";
import { searchLeaveHistory } from "../../../../../api/APIs/Services/LeaveManagementSystem.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function LMSHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [count, setCount] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    if (data) {
      searchHistoryApi(data);
    }
    handleClose();
  };

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      employeeName: "",
      departmentName: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      handleShow();
      setData(values);
    },
  });

  const transformLeavesData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      name: `${leave.userfirstName} ${leave.userlastName}`,
      leaveType: leave.requestLeaveSubType,
      startDate: moment(leave.requestStartDate).format("YYYY/MM/DD"),
      endDate: moment(leave.requestEndDate).format("YYYY/MM/DD"),
      NoOfLeaves: leave.requestNumberOfDays,
      reason: leave.requestLeaveReason,
      leaveStatus: leave.requestStatus,
      submittedTo: leave.leavesubmittedTofirstName,
    }));
  };

  const searchHistoryApi = async (values) => {
    try {
      const params = {
        startDate: moment(values.startDate).format("YYYY-MM-DD"),
        endDate: moment(values.endDate).format("YYYY-MM-DD"),
        employeeName: values.employeeName,
        departmentName: values.departmentName,
      };

      const response = await searchLeaveHistory(params);
      if (response?.success) {
        showSuccessMessage(response.message);
        const transformedData = transformLeavesData(response.data);
        setHistoryData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    searchHistoryApi();
  }, [currentPage]);

  return (
    <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/lms/dashboard"}
        addLink1={"/lms/history"}
        title1={"History"}
      />
      <ToastContainer />
      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />
      <div className="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            <h1>Leave History</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Department <span className="text-danger">*</span></label>
                      <select
                        class="form-select"
                        placeholder={formik.values.departmentName}
                        value={formik.values.departmentName}
                        id="departmentName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value={1}>IT</option>
                        <option value={2}>Admin</option>
                        <option value={3}>Finance</option>
                      </select>
                    </div>
                  </div>
                  {formik.values.departmentName && (
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Name <span className="text-danger">*</span></label>
                        <select
                          class="form-select"
                          placeholder={formik.values.employeeName}
                          value={formik.values.employeeName}
                          id="employeeName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={1}>Saqib</option>
                          <option value={2}>Hamid</option>
                          <option value={3}>Mohsin</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label" style={{ display: "block" }}>
                        Start Date <span className="text-danger">*</span>
                      </label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        id="startDate"
                        selected={formik.values.startDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("startDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label" style={{ display: "block" }}>
                        End Date <span className="text-danger">*</span>
                      </label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        id="endDate"
                        selected={formik.values.endDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <CustomTable
                      hideBtn={true}
                      hidebtn1={true}
                      data={historyData?.length > 0 ? historyData : []}
                      tableTitle={"Leave History"}
                      headerBgColor={"#666"}
                      // hideBtn={true}
                      handleEdit={() =>
                        navigate("/lms/addedit", { state: true })
                      }
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      pageSize={pageSize}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LMSHistory;
