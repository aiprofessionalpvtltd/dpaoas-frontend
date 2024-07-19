import React, { useCallback, useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  searchAttendanceReport,
  searchAttendanceReportMonthly,
  searchAttendanceReportThreeYear,
  searchAttendanceReportYearly,
} from "../../../../../api/APIs/Services/AttendanceReport.service";
import { Document, Page } from "@react-pdf/renderer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { imagesUrl } from "../../../../../api/APIs";

const AttendenceReports = () => {
  const [showDateField, setShowDateField] = useState(false);
  const [showDateFieldMonthly, setShowDateFieldMonthly] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [show3Years, setShow3Years] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [searchedData, setSearchedData] = useState(null);

  const pageSize = 10;
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const initialYear = new Date().getFullYear() - 3;
  const formik = useFormik({
    initialValues: {
      attendenceReportsId: "",
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedMonth: "",
      selectedYear: "",
      selectedYearly: new Date().getFullYear().toString(),
      selected3Years: initialYear.toString(),
      ProvinceSelectionId: "",
      partySelectionId: "",
    },
    onSubmit: (values) => {
      const {
        ProvinceSelectionId,
        partySelectionId,
        attendenceReportsId,
        selectedYearly,
        selected3Years,
        selectedDate,
        selectedMonth,
        selectedYear,
      } = values;
      switch (attendenceReportsId) {
        case "Yearly":
          SearchYearlyAttendanceApi(values);
          console.log("Yearly Data:", {
            selectedYearly,
            ProvinceSelectionId,
            partySelectionId,
          });
          break;
        case "3 Years":
          SearchThreeYearAttendanceApi(values);
          console.log("3 Years Data:", {
            selected3Years,
            ProvinceSelectionId,
            partySelectionId,
          });
          break;
        case "Daily":
          console.log("Daily Data:", {
            selectedDate,
            ProvinceSelectionId,
            partySelectionId,
          });
          break;
        case "Monthly":
          SearchMonthlyAttendanceApi(values);
          console.log("Monthly Data:", {
            selectedMonth,
            selectedYear,
            ProvinceSelectionId,
            partySelectionId,
          });
          break;
        default:
          console.log("No data selected.");
          break;
      }
    },
  });

  const transformAttendanceReportData = (apiData) => {
    return apiData.map((model) => ({
      id: model?.id,
      TonerName: model?.tonerModel,
      TonnerDescription: model?.description,
      Status: model?.partySelectionId,
    }));
  };

  // Searching Annual Report Data

  const SearchMonthlyAttendanceApi = useCallback(
    async (values) => {
      const searchParams = {
        month: values?.selectedMonth,
        year: values?.selectedYear,
        partyName: values?.partySelectionId,
      };
      try {
        const response = await searchAttendanceReportMonthly(searchParams);

        if (response?.success) {
          showSuccessMessage(response?.message);

          const url = `${imagesUrl}${response?.data?.fileLink}`;
          setSearchedData(url);
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    },
    [currentPage, pageSize, setCount, setSearchedData]
  );

  const SearchYearlyAttendanceApi = async (values) => {
    const searchParams = {
      year: values?.selectedYearly,
      partyName: values?.partySelectionId,
    };
    try {
      const response = await searchAttendanceReportYearly(searchParams);

      if (response?.success) {
        showSuccessMessage(response?.message);

        const url = `${imagesUrl}${response?.data?.fileLink}`;
        setSearchedData(url);
      }
      // formik.resetForm();
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const SearchThreeYearAttendanceApi = async (values) => {
    const searchParams = {
      year: values?.selected3Years,
    };
    try {
      const response = await searchAttendanceReportThreeYear(searchParams);

      if (response?.success) {
        showSuccessMessage(response?.message);
        const url = `${imagesUrl}${response?.data?.fileLink}`;
        setSearchedData(url);
      }
      // formik.resetForm();
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handlePreview = (searchedData) => {
    // Assuming searchedData is the direct URL to the file
    // You can use different approaches based on the file type
    // For example, if it's a PDF, you might want to open it in a new tab or embed it in an iframe

    // For simplicity, let's assume it's an image or PDF file
    // If it's an image, it will be opened in a new tab
    // If it's a PDF, it will be downloaded (you can adjust this behavior as needed)

    // Check if searchedData exists
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
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header dashboardLink={"/"} title1={"Attendance Reports"} />

      <div class="container-fluid">
        <div class="card mt-1">
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  {/* <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label class="form-label">Select Province</label>
                        <select
                          id="ProvinceSelectionId"
                          className="form-select"
                          value={formik.values.ProvinceSelectionId}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "ProvinceSelectionId",
                              e.target.value
                            );
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select Province
                          </option>

                          <option>{"KPK"}</option>
                          <option>{"Punjab"}</option>
                          <option>{"Balochistan"}</option>
                          <option>{"Sindh"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label class="form-label">Select Party</label>
                        <select
                          id="partySelectionId"
                          className="form-select"
                          value={formik.values.partySelectionId}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "partySelectionId",
                              e.target.value
                            );
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select Party
                          </option>

                          <option>{"PTI"}</option>
                          <option>{"PPP"}</option>
                          <option>{"PMLN"}</option>
                          <option>{"JUI"}</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">
                          Select Attendance Date Wise
                        </label>
                        <select
                          id="attendenceReportsId"
                          className="form-select"
                          value={formik.values.attendenceReportsId}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "attendenceReportsId",
                              e.target.value
                            );
                            setShowDateField(e.target.value === "Daily");
                            setShowDateFieldMonthly(
                              e.target.value === "Monthly"
                            );
                            setShowYearly(e.target.value === "Yearly");
                            setShow3Years(e.target.value === "3 Years");
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>

                          {/* <option>{"Daily"}</option> */}
                          <option>{"Monthly"}</option>
                          <option>{"Yearly"}</option>
                          <option>{"3 Years"}</option>
                        </select>
                        {/* <select
                          id="attendenceReportsId"
                          className="form-select"
                          value={formik.values.attendenceReportsId}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "attendenceReportsId",
                              e.target.value
                            );
                            setShowDateField(e.target.value === "Daily");
                            setShowDateFieldMonthly(
                              e.target.value === "Monthly"
                            );
                            setShowYearly(e.target.value === "Yearly");
                            setShow3Years(e.target.value === "3 Years");

                            // Clear selectedYearly and selected3Years
                            if (
                              e.target.value === "Daily" ||
                              e.target.value === "Monthly"
                            ) {
                              formik.setFieldValue("selectedYearly", "");
                              formik.setFieldValue("selected3Years", "");
                            } else if (e.target.value === "3 Years") {
                              formik.setFieldValue("selectedYearly", "");
                            }
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option>{"Daily"}</option>
                          <option>{"Monthly"}</option>
                          <option>{"Yearly"}</option>
                          <option>{"3 Years"}</option>
                        </select> */}
                      </div>
                    </div>

                    {showDateField && (
                      <div className="col-3">
                        <div className="mb-3">
                          <label class="form-label">Select Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={formik.values.selectedDate}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "selectedDate",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {showDateFieldMonthly && (
                      <>
                        <div className="col-3">
                          <div className="mb-3">
                            <label class="form-label">Select Month</label>
                            {/* <input
                              type="date"
                              className="form-control"
                              value={formik.values.selectedStartDateMonthly}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "selectedStartDateMonthly",
                                  e.target.value
                                );
                              }}
                            
                            /> */}
                            <select
                              className={`form-select ${
                                formik.touched.selectedMonth &&
                                formik.errors.selectedMonth
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
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="mb-3">
                            <label class="form-label">Select Year</label>
                            {/* <input
                              type="date"
                              className="form-control"
                              value={formik.values.selectedEndDateMonthly}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "selectedEndDateMonthly",
                                  e.target.value
                                );
                              }}
                            /> */}
                            <select
                              className={`form-select ${
                                formik.touched.selectedYear &&
                                formik.errors.selectedYear
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Session No"
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
                          </div>
                        </div>
                      </>
                    )}

                    {showYearly && (
                      <div className="col">
                        <div className="mb-3">
                          <label class="form-label">Select Year</label>
                          <input
                            type="number"
                            className="form-control"
                            value={formik.values.selectedYearly}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "selectedYearly",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {show3Years && (
                      <div className="col-3">
                        <div className="mb-3">
                          <label class="form-label">Select From Year</label>
                          <input
                            type="number"
                            className="form-control"
                            value={formik.values.selected3Years}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "selected3Years",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-3 my-2">
                      <div className="mt-4">
                        <button class="btn btn-primary mb-3" type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row" style={{alignItems:"center", justifyContent:"center", flex:1}} >
                <div className="col-3 ">
                  <div className="mt-4">
                    <button
                      disabled={searchedData ? false : true}
                      class="btn btn-primary mb-3"
                      type="button"
                      onClick={() => handlePreview(searchedData)}
                    >
                      Preview Report
                    </button>
                  </div>
                </div>
                <div className="col-3 ">
                  <div className="mt-4">
                    <button
                      class="btn btn-primary mb-3"
                      type="button"
                      disabled={searchedData ? false : true}
                      onClick={() => handleDownload(searchedData)}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendenceReports;
