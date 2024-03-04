import React, { useCallback, useContext, useState } from "react";

import { useFormik } from "formik";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import axios from "axios";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import * as Yup from "yup";
const validationSchema = Yup.object({
  sessionId: Yup.string().required("Session is required"),
  sittingDate: Yup.string().required("Sitting date is required"),
});
const PartywiseAttendenceReports = () => {
  const { sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [searchedData, setSearchedData] = useState(null);

  const pageSize = 4;
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      sessionId: "",
      sittingDate: "",
      provinceId: "",
      partyId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Party-Province wise Reports"}
      />

      <div class="container-fluid">
        <div class="card mt-1">
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">Select Session</label>
                        <select
                          id="sessionId"
                          className={`form-select ${
                            formik.touched.sessionId && formik.errors.sessionId
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.sessionId}
                          onChange={(e) => {
                            formik.setFieldValue("sessionId", e.target.value);
                          }}
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
                        {formik.touched.sessionId &&
                          formik.errors.sessionId && (
                            <div className="invalid-feedback">
                              {formik.errors.sessionId}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">Sitting Date</label>
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
                          selected={formik.values.sittingDate}
                          onChange={(date) =>
                            formik.setFieldValue("sittingDate", date)
                          }
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.sittingDate &&
                            formik.errors.sittingDate
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.sittingDate &&
                          formik.errors.sittingDate && (
                            <div className="invalid-feedback">
                              {formik.errors.sittingDate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">Select Province</label>
                        <select
                          id="provinceId"
                          className="form-select"
                          value={formik.values.provinceId}
                          onChange={(e) => {
                            formik.setFieldValue("provinceId", e.target.value);
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
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">Select Party</label>
                        <select
                          id="partyId"
                          className="form-select"
                          value={formik.values.partyId}
                          onChange={(e) => {
                            formik.setFieldValue("partyId", e.target.value);
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
                    <div className="col my-2 d-flex justify-content-end">
                      <div className="mt-4">
                        <button class="btn btn-primary mb-3" type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-12 my-2 d-flex justify-content-around">
                  <div className="mt-4">
                    <button
                      disabled={searchedData && searchedData ? false : true}
                      className="btn btn-primary mb-3"
                      type="button"
                      // onClick={() => handlePreview(searchedData)}
                    >
                      Preview
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      disabled={searchedData && searchedData ? false : true}
                      className="btn btn-primary mb-3"
                      type="button"
                      // onClick={() => handleDownload(searchedData)}
                    >
                      Download
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

export default PartywiseAttendenceReports;

// const handlePreview = (searchedData) => {
//   // Assuming searchedData is the direct URL to the file
//   // You can use different approaches based on the file type
//   // For example, if it's a PDF, you might want to open it in a new tab or embed it in an iframe

//   // For simplicity, let's assume it's an image or PDF file
//   // If it's an image, it will be opened in a new tab
//   // If it's a PDF, it will be downloaded (you can adjust this behavior as needed)

//   // Check if searchedData exists
//   if (!searchedData) return;

//   // Extract the file extension
//   const fileExtension = searchedData.split(".").pop().toLowerCase();

//   // For simplicity, let's assume we are handling PDF and image files
//   if (fileExtension === "pdf") {
//     // For PDF files, let's open it in a new tab
//     window.open(searchedData, "_blank");
//   } else if (
//     fileExtension === "jpg" ||
//     fileExtension === "jpeg" ||
//     fileExtension === "png" ||
//     fileExtension === "gif"
//   ) {
//     // For image files, let's open it in a new tab
//     window.open(searchedData, "_blank");
//   } else {
//     // For other file types, you might want to handle them differently (e.g., provide a message that the file type is not supported)
//     console.log("Preview not supported for this file type");
//   }
// };
// const handleDownload = (fileUrl) => {
//   // Check if fileUrl exists
//   if (!fileUrl) return;

//   // Extract the filename from the fileUrl
//   const filename = fileUrl.split("/").pop();

//   // Perform the download
//   axios({
//     url: fileUrl,
//     method: "GET",
//     responseType: "blob", // Important for handling binary data like files
//   }).then((response) => {
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", filename); // Set the filename for download
//     document.body.appendChild(link);
//     link.click();
//   });
// };
