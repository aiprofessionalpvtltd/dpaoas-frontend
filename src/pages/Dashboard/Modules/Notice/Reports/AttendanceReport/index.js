import React, { useCallback, useState } from "react";
import { searchAttendanceReportByDateWise } from "../../../../../../api/APIs/Services/AttendanceReport.service";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import moment from "moment";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useFormik } from "formik";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
const validationSchema = Yup.object({
  //   attendenceReportsId: Yup.string().required("Selection is Required"),
  selectedMonth: Yup.string().required("Month is Required"),
  //   selectedYear: Yup.string().required("Year is required"),
  weeklyStartDate: Yup.string().required("Start date is required"),
  weeklyEndDate: Yup.string().required("End date is required"),
  //   selectedSingleYear: Yup.string().required("Year is required"),
  // selected3YearsReport: Yup.string().required("Year date is required"),
});
const AttendanceReport = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchedData, setSearchedData] = useState(null);
  console.log("searchedData", searchedData);
  const formik = useFormik({
    initialValues: {
      attendenceReportsId: "",
      weeklyStartDate: "",
      weeklyEndDate: "",
      selectedMonth: "",
      selectedYear: "",
      selectedSingleYear: "",
      selected3YearsReport: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      SearchedAttendanceReport(values);
    },
  });

  const renderFields = () => {
    switch (selectedOption) {
      case "Weekly":
        return (
          <>
            <div className="col-3">
              <div className="mb-3">
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
                    selected={formik.values.weeklyStartDate}
                    onChange={(date) =>
                      formik.setFieldValue("weeklyStartDate", date)
                    }
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.weeklyStartDate &&
                      formik.errors.weeklyStartDate
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.weeklyStartDate &&
                    formik.errors.weeklyStartDate && (
                      <div className="invalid-feedback">
                        {formik.errors.weeklyStartDate}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="col-3">
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
                    selected={formik.values.weeklyEndDate}
                    onChange={(date) =>
                      formik.setFieldValue("weeklyEndDate", date)
                    }
                    onBlur={formik.handleBlur}
                    maxDate={new Date()}
                    className={`form-control ${
                      formik.touched.weeklyEndDate &&
                      formik.errors.weeklyEndDate
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.weeklyEndDate &&
                    formik.errors.weeklyEndDate && (
                      <div className="invalid-feedback">
                        {formik.errors.weeklyEndDate}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        );
      case "Monthly":
        return (
          <>
            <div className="col-3">
              <div className="mb-3">
                <label class="form-label">Select Month</label>
                <select
                  className={`form-select ${
                    formik.touched.selectedMonth && formik.errors.selectedMonth
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Session No"
                  value={formik.values.selectedMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="selectedMonth"
                >
                  <option value={""} selected disabled hidden>
                    Select
                  </option>

                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">July</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Jan</option>
                </select>
                {formik.touched.selectedMonth &&
                  formik.errors.selectedMonth && (
                    <div className="invalid-feedback">
                      {formik.errors.selectedMonth}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label class="form-label">Select Year</label>
                <select
                  className={`form-select ${
                    formik.touched.selectedYear && formik.errors.selectedYear
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.selectedYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="selectedYear"
                >
                  <option value={""} selected disabled hidden>
                    Select
                  </option>

                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
                {formik.touched.selectedYear && formik.errors.selectedYear && (
                  <div className="invalid-feedback">
                    {formik.errors.selectedYear}
                  </div>
                )}
              </div>
            </div>
          </>
        );
      case "Yearly":
        return (
          <div className="col-6">
            <div className="mb-3">
              <label class="form-label">Select Year</label>
              <select
                className={`form-select ${
                  formik.touched.selectedYear && formik.errors.selectedYear
                    ? "is-invalid"
                    : ""
                }`}
                //   placeholder="Session No"
                value={formik.values.selectedYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="selectedYear"
              >
                <option value={""} selected disabled hidden>
                  Select
                </option>

                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              {formik.touched.selectedYear && formik.errors.selectedYear && (
                <div className="invalid-feedback">
                  {formik.errors.selectedYear}
                </div>
              )}
            </div>
          </div>
        );
      case "3 Years":
        return (
          <div className="col-6">
            <div className="mb-3">
              <label class="form-label">Select From Year</label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.selected3YearsReport &&
                  formik.errors.selected3YearsReport
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.selected3YearsReport}
                onChange={(e) => {
                  formik.setFieldValue("selected3YearsReport", e.target.value);
                }}
              />
              {formik.touched.selected3YearsReport &&
                formik.errors.selected3YearsReport && (
                  <div className="invalid-feedback">
                    {formik.errors.selected3YearsReport}
                  </div>
                )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    formik.setFieldValue("attendenceReportsId", value);
    formik.resetForm();
    setSearchedData(null);
  };

  const SearchedAttendanceReport = useCallback(
    async (values) => {
      let searchParams = {};
      if (selectedOption === "Weekly") {
        searchParams = {
          startDay: moment(values?.weeklyStartDate).format("DD-MM-YYYY"),
          endDay: moment(values?.weeklyEndDate).format("DD-MM-YYYY"),
        };
      } else if (selectedOption === "Monthly") {
        searchParams = {
          month: values?.selectedMonth,
          year: values?.selectedYear,
        };
      } else if (selectedOption === "Yearly") {
        searchParams = {
          year: values?.selectedYear,
        };
      } else {
        searchParams = {
          threeYears: values?.selected3YearsReport,
        };
      }

      try {
        const response = await searchAttendanceReportByDateWise(searchParams);

        if (response?.success) {
          showSuccessMessage(response?.message);

          if (response?.data?.fileLink) {
            const url = `http://172.16.170.8:5252${response?.data?.fileLink}`;
            setSearchedData(url);
          } else {
            searchedData(null);
          }
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    },
    [setSearchedData, selectedOption]
  );
  //   Handle Preview
  const handlePreview = (searchedData) => {
    if (!searchedData) return;

    // Extract the file extension
    const fileExtension = searchedData.split(".").pop().toLowerCase();

    // For simplicity, let's assume we are handling PDF and image files
    if (fileExtension === "pdf") {
      // For PDF files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      // For image files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else {
      // For other file types, you might want to handle them differently (e.g., provide a message that the file type is not supported)
      console.log("Preview not supported for this file type");
    }
  };

  //   Handle Download
  const handleDownload = (fileUrl) => {
    // Check if fileUrl exists
    if (!fileUrl) return;

    // Extract the filename from the fileUrl
    const filename = fileUrl.split("/").pop();

    // Perform the download
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob", // Important for handling binary data like files
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleReset = () => {
    formik.resetForm();
    setSearchedData(null);
    setSelectedOption(null);
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Attendance Reports"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-1">
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">
                          Select Attendance Date Wise
                        </label>
                        <select
                          id="attendenceReportsId"
                          className={`form-select ${
                            formik.touched.attendenceReportsId &&
                            formik.errors.attendenceReportsId
                              ? "is-invalid"
                              : ""
                          }`}
                          value={selectedOption}
                          onChange={handleDropdownChange}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                          <option value="3 Years">3 Years</option>
                        </select>
                        {formik.touched.attendenceReportsId &&
                          formik.errors.attendenceReportsId && (
                            <div className="invalid-feedback">
                              {formik.errors.attendenceReportsId}
                            </div>
                          )}
                      </div>
                    </div>
                    {renderFields()}
                    <div className="col-1 my-2">
                      <div className="mt-4">
                        <button class="btn btn-primary mb-3" type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                    <div className="col-1 my-2">
                    <div className="mt-4">
                        <button
                          class="btn btn-primary mb-3"
                          type="button"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                      </div>
                    {/* <div className="row">
                    <div className="col my-2 d-flex justify-content-end">
                      <div className="mt-4">
                        <button class="btn btn-primary mb-3 mx-4" type="submit">
                          Search
                        </button>
                      </div>
                      <div className="mt-4">
                        <button
                          class="btn btn-primary mb-3"
                          type="button"
                          // onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div> */}
                  </div>
                  <div className="row">
                    <div className="col-12 my-2 d-flex justify-content-around">
                      <div className="mt-4">
                        <button
                          disabled={searchedData && searchedData ? false : true}
                          className="btn btn-primary mb-3"
                          type="button"
                          onClick={() => handlePreview(searchedData)}
                        >
                          Preview
                        </button>
                      </div>
                      <div className="mt-4">
                        <button
                          disabled={searchedData && searchedData ? false : true}
                          className="btn btn-primary mb-3"
                          type="button"
                          onClick={() => handleDownload(searchedData)}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default AttendanceReport;
