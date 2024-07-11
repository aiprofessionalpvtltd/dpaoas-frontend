import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { delleteQuestionsList, getAllQuesListBySession, getGeneratedQuesList, printQuestionsFromList, saveQuestionList, updateGenaratedQuestion } from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { imagesUrl } from "../../../../../../api/APIs";


function QMSReportQuestionList() {
  const { sessions } = useContext(AuthContext);
  const userData = getUserData();
  const [generatedData, setGeneratedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [include, setInclude] = useState(false);
  const [generatedItem, setGeneratedItem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestionList, setSelectedQuestionList] = useState(null);
  const [generateResData , setGeneratedResData] = useState([])

  const pageSize = 10; // Set your desired page size
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      category: selectedQuestionList ? selectedQuestionList.questionCategory: "",
      groupId: selectedQuestionList ? selectedQuestionList.fkGroupId : "",
      startListNo: selectedQuestionList ? selectedQuestionList.startListNo : "",
      listName: selectedQuestionList ? selectedQuestionList.listName : "",
      houseLayDate: selectedQuestionList ? moment(selectedQuestionList.houseLayDate).toDate() : "",
    },
    onSubmit: (values) => {
      if (isEditing) {
        updateQuestionsList(values);
      } else {
        generateQuestionsList(values);
      }
    },
    enableReinitialize: true,
  });

  const navigate = useNavigate();

  const updateQuestionsList = async (values) => {
    const Data = {
      // ...values,
      fkUserId: userData?.fkUserId,
      fkSessionId: sessionId,
      fkGroupId: values?.groupId,
      houseLayDate: moment(values?.houseLayDate).format("YYYY-MM-DD") || "",
      defferedQuestions: include,
      id: selectedQuestionList.id,
      questionCategory: values?.category,
      listName: values?.listName,
      startListNo: values?.startListNo

    };

    try {
      const response = await updateGenaratedQuestion(Data);
      if (response?.success) {
        formik.resetForm()
        showSuccessMessage(response?.message);
        setIsEditing(false);
        setSelectedQuestionList(null);
        setGeneratedItem(false);
        const transformedData = transformLeavesData(response?.data);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };



  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      const rowData = {
        SrNo: index,
        id: res?.id, // Show id as the second column
        questionCategory: res?.questionCategory,
        houseLayDate: moment(res?.houseLayDate).format('YYYY-MM-DD'),
        listName: res?.listName,
        defferedQuestions: res?.defferedQuestions ? "true" : "false",
        startListNo: res?.startListNo,
        questionListStatus: res.questionListStatus ? res?.questionListStatus : "active",
        internalAttachment: res?.fileLink,
        fkGroupId: res?.fkGroupId
      };

      // Remove id key from rowData if it's null or undefined
      if (rowData.id == null) {
        delete rowData.id;
      }

      return rowData;
    });
  };

  const transformQuestionsData = (apiData) => {
    return apiData.map((res, index) => {
      const rowData = {
        // SrNo: index,
        id: res?.id, // Show id as the second column
        questionCategory: res?.questionCategory,
        sessionName: res?.sessionName,
        ministryName: res?.ministryName,
        questionStatus: res.questionStatus ,
        englishText: res?.englishText.replace(/(<([^>]+)>)/gi, ""),
        // urduText: res?.urduText.replace(/(<([^>]+)>)/gi, ""),
        questionActive: res?.questionActive,
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
        showSuccessMessage(response?.message);
        // setCount(response?.count);
        const transformedData = transformLeavesData(response.data?.questionList?.questionList);
        const transformedQuestionData = transformQuestionsData(response.data?.questionList?.questions)
        setGeneratedItem(true);
        setGeneratedData(response?.data?.questionList);
        setGeneratedResData(transformedQuestionData)
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleSessionChange = async (e) => {
    setSessionId(e.target.value);
    getQuestionsListBySessionApi(e.target.value)
  }

  const getQuestionsListBySessionApi = async (sessionId) => {
    try {
      const response = await getAllQuesListBySession(sessionId, currentPage, pageSize);
      if (response?.success) {
        setCount(response?.count);
        setGeneratedItem(false);
        const transformedData = transformLeavesData(response.data?.questionList);
        setResData(transformedData)
        if(response?.data?.questionList?.length > 0){
          const StartNo = response?.data?.questionList[response?.data?.questionList?.length - 1]?.startListNo || 0 ;
          formik.setFieldValue("startListNo", StartNo+1);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleSaveList = async () => {
    const questionIds = generatedData?.questions?.map(question => ({ id: question.id }));

    const requestData = {

      fkSessionId: sessionId,
      questionCategory: formik.values.category,
      fkGroupId: formik.values.groupNo,
      startListNo: formik.values?.startListNo,
      listName: formik.values?.listName,
      houseLayDate: moment(formik.values?.houseLayDate).format("YYYY-MM-DD"),
      defferedQuestions: include, // Use formik values for include
      fkUserId: userData.fkUserId,
      questionIds: questionIds

    };

    try {
      const response = await saveQuestionList(requestData);
      if (response?.success) {
        formik.resetForm()
        setGeneratedItem(false);
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response?.data);
        setResData(transformedData)
      }
    } catch (error) {
      showErrorMessage(JSON.stringify(error?.response?.data?.message));
    }
  };

  // const printQuestions = async (data) => {
  //   try {
  //     const response = await printQuestionsFromList(data);
  //     if (response?.success) {
  //      showSuccessMessage(response.message);
  //     }
  //   } catch (error) {
  //     showErrorMessage(error.response?.data?.message);
  //   }
  // };

  const deleteList = async (data) => {
    console.log(data);
    try {
      const response = await delleteQuestionsList(data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getQuestionsListBySessionApi(sessionId);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  const handleInclude = () => {
    setInclude(!include);
  }

  const printQuestion = (url) => {
    if (url) {
      const img = `${imagesUrl}${url}`;
      window.open(img, "_blank");
    } else {
      showSuccessMessage("No Attachment Available")
    }
  }
  const handleEdit = (item) => {
    setSelectedQuestionList(item);
    setIsEditing(true);
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/question/list"}
        title1={"Question List"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Question List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      {/* <input
                        type="text"
                        placeholder={formik.values.sessionNumber}
                        className={`form-control ${
                          formik.touched.sessionNumber &&
                          formik.errors.sessionNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="sessionNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.sessionNumber &&
                        formik.errors.sessionNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.sessionNumber}
                          </div>
                        )} */}
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
                      <label class="form-label">Catagory</label>
                      <select
                        class="form-select"
                        id="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      >
                        <option value={""} selected hidden disabled>Select</option>
                        <option value={"Starred"}>Starred</option>
                        <option value={"Un-Starred"}>Un-Starred</option>
                        <option value={"Short Notice"}>Short Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Group No</label>
                      <input
                        class="form-control"
                        id="groupNo"
                        value={formik.values.groupNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Start List No</label>
                      <input
                        class="form-control"
                        id="startListNo"
                        value={formik.values.startListNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">List Name</label>
                      <input
                        class="form-control"
                        id="listName"
                        value={formik.values.listName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">House Lay Date</label>
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
                        selected={formik.values.houseLayDate}
                        onChange={(date) => formik.setFieldValue("houseLayDate", date)}
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="include"
                          checked={include}
                          onChange={handleInclude}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Include Deffer Questions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    {!isEditing ? (
                      <>
                        <button class="btn btn-primary" type="submit">
                          Generate
                        </button>
                        <button class="btn btn-primary" type="button" onClick={handleSaveList}>
                          Save
                        </button>
                      </>
                    ) : (
                      <button class="btn btn-primary" type="submit">
                        Update
                      </button>
                    )}
                  </div>

                </div>
              </form>
              <CustomTable
                block={false}
                hideBtn={true}
                hidebtn1={true}
                data={resData}
                tableTitle="Questions List"
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                handleEdit={(item) => handleEdit(item)}
                handleDelete={(item) => deleteList(item.id)}
                showPrint={true}
                handlePrint={(item) => printQuestion(item.internalAttachment)}
                ActionHide={generatedItem ? true : false}
                showListIcon={true}
                handleList={(item) => navigate("/qms/reports/question-list/supplementary", { state: { listId: item?.id } })}
                totalCount={count}

              />
            </div>

            <div>
            <CustomTable
                block={false}
                hideBtn={true}
                hidebtn1={true}
                data={generateResData}
                tableTitle="Questions Detail" 
                currentPage={currentPage}
                pageSize={pageSize}
                ActionHide={true}
                showListIcon={true}
                totalCount={count}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSReportQuestionList;