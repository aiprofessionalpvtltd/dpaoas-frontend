import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { delleteQuestionsList, getAllQuesListBySession, getAllQuestion, getAllQuestionByID, getGeneratedQuesList, printQuestionsFromList, saveQuestionList } from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
const validationSchema = Yup.object({
  sessionNumber: Yup.string(),
  category: Yup.string(),
  groupNo: Yup.string(),
  startListNo: Yup.string(),
  listName: Yup.string(),
  houseLayDate: Yup.string(),
  include: Yup.boolean(),
});

function QMSRotaList() {
  const { sessions } = useContext(AuthContext);
  const userData = getUserData();
  const [generatedData, setGeneratedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [include, setInclude] = useState(false);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      sessionNumber: "",
      allotmentType: "",
      groupNo: "",
      startDate: "",
      endDate: ""
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      generateQuestionsList(values);
    },
  });
  const navigate = useNavigate();

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const rowData = {
        SrNo: index,
        id: res?.id, // Show id as the second column
        questionCategory: res?.questionCategory,
        houseLayDate: res?.houseLayDate,
        listName: res?.listName,
        defferedQuestions: res?.defferedQuestions ? "true" : "false",
        questionListStatus: res.questionListStatus ? res?.questionListStatus : "active",
      };
    
      // Remove id key from rowData if it's null or undefined
      if (rowData.id == null) {
        delete rowData.id;
      }
    
      return rowData;
    });
  };

  const generateQuestionsList = async (values) => {
    const Data = {
      fkUserId: userData?.fkUserId,
      fkSessionId: sessionId,
      questionCategory: values?.category || "",
      fkGroupId: values?.groupNo || "",
      startListNo: values?.startListNo || "",
      listName: values?.listName || "",
      houseLayDate: moment(values?.houseLayDate).format("YYYY-MM-DD") || "",
      defferedQuestions: include,
    }

    try {
      const response = await getGeneratedQuesList(Data);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        // setCount(response?.count);
        const transformedData = transformLeavesData(response.data?.questionList);
        setGeneratedData(response.data);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleSaveList = async () => {
    const questionIds = generatedData.questions.map(question => ({ id: question.id }));
  
    const requestData = {
      questionList: {
        fkSessionId: sessionId,
        questionCategory: formik.values.category,
        fkGroupId: formik.values.groupNo,
        startListNo: formik.values.startListNo,
        listName: formik.values.listName,
        houseLayDate: moment(formik.values.houseLayDate).format("YYYY-MM-DD"),
        defferedQuestions: include, // Use formik values for include
        fkUserId: userData.fkUserId,
        questionIds: questionIds
      }
    };
  
    try {
      const response = await saveQuestionList(requestData);
      if (response?.success) {
        showSuccessMessage(response.data.message);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };  

  const handleSessionChange = async (e) => {
    setSessionId(e.target.value);
  }

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
                <div class="row">
                <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        class="form-select"
                        id="sessionNumber"
                        placeholder={"Session Number"}
                        onChange={handleSessionChange}
                        value={sessionId}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Allotment Type</label>
                      <select
                        class="form-select"
                        id="allotmentType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Regular Days</option>
                        <option>Tuesday/Friday</option>
                        <option>Wednesday/Friday</option>
                        <option>Alternate Days</option>
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Group No</label>
                      <select
                        class="form-select"
                        id="groupNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={"1"}>Group 1</option>
                        <option value={"2"}>Group 2</option>
                        <option value={"3"}>Group 3</option>
                        <option value={"4"}>Group 4</option>
                        <option value={"5"}>Group 5</option>
                      </select>
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
                        minDate={new Date()}
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
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.endDate}
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
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
                    <button class="btn btn-primary" type="" onClick={handleSaveList}>
                      Save
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
                showView={true}
                handleView={(item) => navigate("/qms/reports/rota-list/further-details", { state: { listId: item?.id } })} // pass selected sessionNo, allotmentType and GroupNo too along with itemId
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