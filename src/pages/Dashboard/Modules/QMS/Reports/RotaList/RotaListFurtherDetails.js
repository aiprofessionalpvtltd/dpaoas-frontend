import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import {
  deleteSuppList,
  generateRotaFurtherAllotmentList,
  getAllSupplementaryLists,
  getGeneratedSuppList,
  printSuppFromList,
  saveSuppList,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { imagesUrl } from "../../../../../../api/APIs";

const validationSchema = Yup.object({
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
});

function RotaListFurtherDetails() {
  const location = useLocation();
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [printFile, setPrintFile] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      generateFurtherDetailListApi(values);
    },
  });

  const transformData = (apiData) => {
    return apiData.map((res, index) => {
      const divisions = res.Divisions.map(
        (division, idx) => `${idx + 1}. ${division.divisionName}`
      ).join("\n");

      const rowData = {
        DateOfCreation: res?.DateOfCreation,
        DateOfAnswering: res?.DateOfAnswering,
        Group: res?.Group?.groupNameStarred,
        Divisions: divisions,
      };

      return rowData;
    });
  };

  const generateFurtherDetailListApi = async (values) => {
    const Data = {
      fkSessionId: location.state?.fkSessionId,
      fkGroupId: location.state?.fkGroupId || "",
      allotmentType: location.state?.allotmentType,
      startDate: values?.startDate,
      endDate: values?.endDate,
    };

    try {
      const response = await generateRotaFurtherAllotmentList(Data);
      if (response?.success) {
        const url = `${imagesUrl}${response?.data?.fileLink}`;
        setPrintFile(url);
        showSuccessMessage(response?.message);
        // setCount(response?.count);
        const transformedData = transformData(response.data?.rotaList);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
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

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/rota-list"}
        title1={"Rota List"}
        addLink2={"/qms/reports/rota-list/further-details"}
        title2={"Rota List Further Details"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Rota List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Start Date</label>
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

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">End Date</label>
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
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
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
                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Generate
                    </button>
                    <button
                      class="btn btn-primary"
                      type=""
                      disabled={printFile && printFile ? false : true}
                      onClick={() => handleDownload(printFile)}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </form>
              <CustomTable
                block={false}
                hideBtn={true}
                hidebtn1={true}
                data={resData}
                tableTitle="Rota List Further Details"
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                showEditIcon={true}
                ActionHide={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RotaListFurtherDetails;
