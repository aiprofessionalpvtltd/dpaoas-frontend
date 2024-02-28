import React, { useState } from "react";
import { Layout } from "../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";

const AttendenceReports = () => {
  const [showDateField, setShowDateField] = useState(false);
  const [showDateFieldMonthly, setShowDateFieldMonthly] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [show3Years, setShow3Years] = useState(false);
  const data = [];
  const initialYear = new Date().getFullYear() - 3;
  const formik = useFormik({
    initialValues: {
      attendenceReportsId: "",
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedStartDateMonthly: "",
      selectedEndDateMonthly: "",
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
        selectedStartDateMonthly,
        selectedEndDateMonthly,
      } = values;
      switch (attendenceReportsId) {
        case "Yearly":
          console.log("Yearly Data:", {
            selectedYearly,
            ProvinceSelectionId,
            partySelectionId,
          });
          break;
        case "3 Years":
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
          console.log("Monthly Data:", {
            selectedStartDateMonthly,
            selectedEndDateMonthly,
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

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Attendance Reports"} />

      <div class="container-fluid">
        <div class="card mt-1">
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
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
                  </div>
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

                          <option>{"Daily"}</option>
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
                            <label class="form-label">Select Start Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={formik.values.selectedStartDateMonthly}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "selectedStartDateMonthly",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="mb-3">
                            <label class="form-label">Select End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={formik.values.selectedEndDateMonthly}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "selectedEndDateMonthly",
                                  e.target.value
                                );
                              }}
                            />
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

              <div class="row">
                <div class="col-12">
                  <CustomTable
                    data={data}
                    tableTitle="Attendance Reports"
                    hideBtn={true}
                    hidebtn1={true}
                    ActionHide={true}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    // handlePageChange={handlePageChange}
                    // currentPage={currentPage}
                    // pageSize={pageSize}
                  />
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
