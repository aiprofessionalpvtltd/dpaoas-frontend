import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { createSingleMemberAttendance } from "../../../../../../api/APIs/Services/AttendanceReport.service";
import { getSessionSitting } from "../../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
function NMSMemberSessionAttendance() {
  const { members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [sittingDays, setSittingDays] = useState([]);
  const pageSize = 100;
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      markAttendanceBy: "",
      memberName: "",
      sessionId: "",
      sittingDate: "",
      attendanceType: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      markMemberAttendance(values);
    },
  });

  //   Transformed Data
  const transformData = (apiData) => {
    return apiData?.map((item, index) => ({
      id: item?.id,
      session: `${item.session?.sessionName}`,
      sittingDate: moment(item?.sittingDate).format("YYYY/MM/DD"),
      status: item?.status,
    }));
  };

  const SearchSessionSittingApi = useCallback(
    async (values) => {
      const fksessionId = values.sessionId;
      try {
        const response = await getSessionSitting(
          fksessionId,
          currentPage,
          pageSize
        );

        if (response?.success) {
          const transformedData = transformData(
            response?.data?.sessionSittings
          );
          setSittingDays(transformedData);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, pageSize]
  );
  // Getting Dates according to their Sessions
  //   const SearchSessionSittingApi = useCallback(
  //     async (values) => {
  //       const fksessionId = values.sessionId;
  //       try {
  //         const response = await getSessionSitting(
  //           fksessionId,
  //           currentPage,
  //           pageSize
  //         );

  //         if (response?.success) {
  //           const transformedData = transformData(
  //             response?.data?.sessionSittings
  //           );
  //           setSittingDays(transformedData);
  //           // showSuccessMessage(response?.message);
  //           // setCount(response?.data?.count);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     [currentPage, pageSize]
  //   );
  const markMemberAttendance = async (values) => {
    let Data = {};
    // const Data = {
    //   sessionId: values?.sessionId,
    //   memberId: values?.memberName?.value,
    //   attendanceStatus: values?.attendanceType,
    //   sittingId: values?.sittingDate,
    //   startDay: moment(values?.startDate).format("DD-MM-YYYY"),
    //   endDay: moment(values?.endDate).format("DD-MM-YYYY"),
    // };
    // const Data = {
    //   sessionId: values?.sessionId,
    //   memberId: values?.memberName?.value,
    //   attendanceStatus: values?.attendanceType,
    //   sittingId: values?.sittingDate,
    //   // startDay: "6-2-2024",
    //   // endDay: "13-2-2024",
    // };

    if (selectedOptions === "BySession") {
      Data = {
        sessionId: parseInt(values?.sessionId),
        memberId: values?.memberName?.value,
        attendanceStatus: values?.attendanceType,
        ...(values?.sittingDate && {
          sittingId: parseInt(values?.sittingDate),
        }),
      };
    } else {
      Data = {
        startDay: moment(values?.startDate).format("DD-MM-YYYY"),
        endDay: moment(values?.endDate).format("DD-MM-YYYY"),
        memberId: values?.memberName?.value,
        attendanceStatus: values?.attendanceType,
      };
    }
    try {
      const response = await createSingleMemberAttendance(Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //   Handle Drop Down Change
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(value);
    formik.setFieldValue("markAttendanceBy", value);
    formik.resetForm();
    // setSelectedOptions(null);
  };

  //   render Fields

  const renderFields = () => {
    switch (selectedOptions) {
      case "BySession":
        return (
          <>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Select Session</label>
                  <select
                    className={`form-select ${
                      formik.touched.sessionId && formik.errors.sessionId
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.sessionId}
                    onChange={(e) => {
                      formik.setFieldValue("sessionId", e.target.value);
                      SearchSessionSittingApi({
                        sessionId: e.target.value,
                      });
                    }}
                    id="sessionId"
                    onBlur={formik.handleBlur}
                  >
                    <option value="" selected disabled hidden>
                      Select Session
                    </option>
                    {sessions &&
                      sessions.length > 0 &&
                      sessions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.sessionName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.sessionId && formik.errors.sessionId && (
                    <div className="invalid-feedback">
                      {formik.errors.sessionId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3" style={{ position: "relative" }}>
                  <label className="form-label">Sitting Date</label>
                  <select
                    className={`form-select ${
                      formik.touched.sittingDate && formik.errors.sittingDate
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.sittingDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="sittingDate"
                    id="sittingDate"
                  >
                    <option value="" selected disabled hidden>
                      Select Date
                    </option>
                    {sittingDays &&
                      sittingDays.length > 0 &&
                      sittingDays.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.sittingDate}
                        </option>
                      ))}
                  </select>

                  {formik.touched.sittingDate && formik.errors.sittingDate && (
                    <div className="invalid-feedback">
                      {formik.errors.sittingDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Select Member</label>
                  <Select
                    options={
                      members &&
                      members?.map((item) => ({
                        value: item?.id,
                        label: item?.memberName,
                      }))
                    }
                    onChange={(selectedOptions) => {
                      formik.setFieldValue("memberName", selectedOptions);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.memberName}
                    name="memberName"
                    // isClearable={true}
                    className={`.form-select  ${
                      formik.touched.memberName && formik.errors.memberName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.memberName && formik.errors.memberName && (
                    <div className="invalid-feedback">
                      {formik.errors.memberName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Select Attendance Type</label>
                  <select
                    class={`form-select ${
                      formik.touched.attendanceType &&
                      formik.errors.attendanceType
                        ? "is-invalid"
                        : ""
                    }`}
                    // placeholder="Session No"
                    value={formik.values.attendanceType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="attendanceType"
                  >
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Vacant">Vacant</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  {formik.touched.attendanceType &&
                    formik.errors.attendanceType && (
                      <div className="invalid-feedback">
                        {formik.errors.attendanceType}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        );
      case "ByDateRange":
        return (
          <>
            <div className="row">
              <div className="col-6">
                <div className="mb-6">
                  <label class="form-label">Select Start Date</label>
                  <div className="mb-3" style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "5px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <DatePicker
                      selected={formik.values.startDate}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div className="invalid-feedback">
                        {formik.errors.startDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label class="form-label">Select End Date</label>
                  <div className="mb-3" style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "5px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <DatePicker
                      selected={formik.values.endDate}
                      onChange={(date) => formik.setFieldValue("endDate", date)}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div className="invalid-feedback">
                        {formik.errors.endDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Select Member</label>
                  <Select
                    options={
                      members &&
                      members?.map((item) => ({
                        value: item?.id,
                        label: item?.memberName,
                      }))
                    }
                    onChange={(selectedOptions) => {
                      formik.setFieldValue("memberName", selectedOptions);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.memberName}
                    name="memberName"
                    // isClearable={true}
                    className={`.form-select  ${
                      formik.touched.memberName && formik.errors.memberName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.memberName && formik.errors.memberName && (
                    <div className="invalid-feedback">
                      {formik.errors.memberName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Select Attendance Type</label>
                  <select
                    class={`form-select ${
                      formik.touched.attendanceType &&
                      formik.errors.attendanceType
                        ? "is-invalid"
                        : ""
                    }`}
                    // placeholder="Session No"
                    value={formik.values.attendanceType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="attendanceType"
                  >
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Vacant">Vacant</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  {formik.touched.attendanceType &&
                    formik.errors.attendanceType && (
                      <div className="invalid-feedback">
                        {formik.errors.attendanceType}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Mark Member Attendance"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Add Member Attendeance</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <label class="form-label">Mark Attendance</label>

                      <select
                        id="markAttendanceBy"
                        className={`form-select ${
                          formik.touched.markAttendanceBy &&
                          formik.errors.markAttendanceBy
                            ? "is-invalid"
                            : ""
                        }`}
                        value={selectedOptions}
                        onChange={handleDropdownChange}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value="BySession">By Session</option>
                        <option value="ByDateRange">By Date Range</option>
                      </select>
                      {formik.touched.markAttendanceBy &&
                        formik.errors.markAttendanceBy && (
                          <div className="invalid-feedback">
                            {formik.errors.markAttendanceBy}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {renderFields()}
              </div>
              <div className="row mt-2">
                <div className="col">
                  <button className="btn btn-primary float-end" type="submit">
                    Mark Attendance
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default NMSMemberSessionAttendance;
