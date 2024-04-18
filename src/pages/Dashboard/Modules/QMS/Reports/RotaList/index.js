import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { delleteQuestionsList, generatedRotaList, getAllQuesListBySession, getAllQuestion, getAllQuestionByID, getGeneratedQuesList, printQuestionsFromList, saveQuestionList } from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import axios from "axios";

const validationSchema = Yup.object({
  groupNo: Yup.string().required("Group No is required"),
  allotmentType: Yup.string().required("Allotment Type is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
});

function QMSRotaList() {
  const { sessions } = useContext(AuthContext);
  const userData = getUserData();
  const [generatedData, setGeneratedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [printFile, setPrintFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [groupIdVal, setGroupIdVal] = useState(null);
  const [allotmentTypeVal, setAllotmentTypeVal] = useState(null);
  const [include, setInclude] = useState(false);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      allotmentType: "",
      groupNo: "",
      startDate: "",
      endDate: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(sessionId) {
        setGroupIdVal(values?.groupNo);
        setAllotmentTypeVal(values?.allotmentType);
        generateRotaList(values);
      }
    },
  });
  const navigate = useNavigate();

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const divisions = res.Divisions.map((division, idx) => `${idx + 1}. ${division.divisionName}`).join('\n');
      
      const rowData = {
        DateOfCreation: res?.DateOfCreation,
        DateOfAnswering: res?.DateOfAnswering,
        Group: res?.Group?.groupNameStarred,
        Divisions: divisions
      }
    
      return rowData;
    });
  };

  const generateRotaList = async (values) => {
    const Data = {
      fkSessionId: sessionId,
      fkGroupId: values?.groupNo || "",
      allotmentType: values?.allotmentType,
      startDate: values?.startDate,
      endDate: values?.endDate  
    }

    try {
      const response = await generatedRotaList(Data);
      if (response?.success) {
        const url = `http://10.10.140.200:8080${response?.data?.fileLink}`;
        setPrintFile(url);
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response.data?.rotaList);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleSessionChange = async (e) => {
    setSessionId(e.target.value);
  }

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
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Rota List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
              <div className="row">
  <div className="col">
    <div className="mb-3">
      <label className="form-label">Session No</label>
      <select
        className={`form-select ${
          !sessionId
            ? "is-invalid"
            : ""
        }`}
        id="sessionNumber"
        onChange={handleSessionChange}
        value={sessionId}
        onBlur={formik.handleBlur}
      >
        <option value="" disabled hidden>
          Select
        </option>
        {sessions &&
  sessions.map((item) => (
    <option key={item.id} value={String(item.id)}>
      {item?.sessionName}
    </option>
  ))}

      </select>
      {!sessionId && (
        <div className="invalid-feedback">
          {`Session No is required`}
        </div>
      )}
    </div>
  </div>

  <div className="col">
    <div className="mb-3">
      <label className="form-label">Allotment Type</label>
      <select
        className={`form-select ${
          formik.touched.allotmentType && formik.errors.allotmentType
            ? "is-invalid"
            : ""
        }`}
        id="allotmentType"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="" disabled hidden>
          Select
        </option>
        <option>Regular Days</option>
        <option>Tuesday/Friday</option>
        <option>Wednesday/Friday</option>
        <option>Alternate Days</option>
      </select>
      {formik.touched.allotmentType && formik.errors.allotmentType && (
        <div className="invalid-feedback">
          {formik.errors.allotmentType}
        </div>
      )}
    </div>
  </div>

  <div className="col">
    <div className="mb-3">
      <label className="form-label">Group No</label>
      <select
        className={`form-select ${
          formik.touched.groupNo && formik.errors.groupNo ? "is-invalid" : ""
        }`}
        id="groupNo"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="" disabled hidden>
          Select
        </option>
        <option value={"1"}>Group 1</option>
        <option value={"2"}>Group 2</option>
        <option value={"3"}>Group 3</option>
        <option value={"4"}>Group 4</option>
        <option value={"5"}>Group 5</option>
      </select>
      {formik.touched.groupNo && formik.errors.groupNo && (
        <div className="invalid-feedback">{formik.errors.groupNo}</div>
      )}
    </div>
  </div>

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
        onChange={(date) => formik.setFieldValue("startDate", date)}
        onBlur={formik.handleBlur}
        minDate={new Date()}
        className={`form-control ${
          formik.touched.startDate && formik.errors.startDate
            ? "is-invalid"
            : ""
        }`}
      />
      {formik.touched.startDate && formik.errors.startDate && (
        <div className="invalid-feedback">{formik.errors.startDate}</div>
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
        onChange={(date) => formik.setFieldValue("endDate", date)}
        onBlur={formik.handleBlur}
        minDate={new Date()}
        className={`form-control ${
          formik.touched.endDate && formik.errors.endDate ? "is-invalid" : ""
        }`}
      />
      {formik.touched.endDate && formik.errors.endDate && (
        <div className="invalid-feedback">{formik.errors.endDate}</div>
      )}
    </div>
  </div>
</div>

                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Generate
                    </button>
                    <button class="btn btn-primary" type="" disabled={printFile && printFile ? false : true} onClick={() => handleDownload(printFile)}>
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
                tableTitle="Rota List"
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideDeleteIcon={true}
                hideEditIcon={true}
                showView={true}
                handleView={(item) => navigate("/qms/reports/rota-list/further-details", { state: { fkSessionId: sessionId, fkGroupId: groupIdVal, allotmentType: allotmentTypeVal, listId: item?.id } })} // pass selected sessionNo, allotmentType and GroupNo too along with itemId
                totalCount={count}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSRotaList;