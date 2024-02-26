import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import {
  NoticeSidebarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router";

import {
  UpdateQuestionById,
  createDefferQuestion,
  createReviveQuestion,
  getAllQuestionStatus,
  sendQuestionTranslation,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../../../../../api/AuthContext";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { getAllDivisions } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
const validationSchema = Yup.object({
  sessionNo: Yup.string(),
  noticeOfficeDiaryNo: Yup.string(),
  noticeOfficeDiaryDate: Yup.string(),
  noticeOfficeDiaryTime: Yup.string(),
  priority: Yup.string(),
  questionId: Yup.string(),
  questionDiaryNo: Yup.string(),
  category: Yup.string(),
  questionStatus: Yup.string(),
  replyDate: Yup.string(),
  senator: Yup.string(),
  group: Yup.string(),
  division: Yup.string(),
  fileStatus: Yup.string(),
  urduText: Yup.string(),
  englishText: Yup.string(),
  ammendedText: Yup.string(),
  originalText: Yup.string(),
});

function NoticeQuestionDetail() {
  const location = useLocation();
  // const English = location?.state && location?.state?.question?.englishText;
  // const Urdu = location?.state && location?.state?.question?.urduText;
  // console.log("location states", location?.state?.question?.urduText);
  const { members, sessions } = useContext(AuthContext);
  const [alldivisons, setAllDivisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  console.log(
    "Question Detail Data",
    location?.state?.question?.session?.sessionName
  );
  // console.log("Divisions", divisons);
  const [showDeferForm, setShowDeferForm] = useState(false);
  const [showRetriveForm, setShowRetriveForm] = useState(false);

  const [allquestionStatus, setAllQuestionStatus] = useState([]);

  const [deferState, setDeferState] = useState({
    sessionNo: "",
    deferDate: "",
  });

  const [statusHistory, setStatusHistory] = useState();

  const [reviveState, setReviveState] = useState({
    sessionNo: "",
    qroup: "",
    division: "",
    noticeDiaryNo: "",
    noticeDiaryDate: "",
    noticeDiaryTime: "",
    questionStatus: "",
    questionDiaryNo: "",
  });

  const formik = useFormik({
    initialValues: {
      sessionNo: location?.state?.question?.session?.sessionName,
      noticeOfficeDiaryNo:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate: new Date(
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryDate
      ),
      // location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryDate,
      noticeOfficeDiaryTime:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryTime,
      priority: "",
      questionId: location?.state?.question?.id,
      questionDiaryNo: location?.state?.question?.fkNoticeDiary,
      category: location?.state?.question?.questionCategory,
      questionStatus: location?.state?.question?.fkQuestionStatus,
      // replyDate: location?.state?.question?.replyDate,
      replyDate: new Date(location?.state?.question?.replyDate),
      senator: "",
      group: location?.state?.question?.groups,
      division: location?.state?.question?.divisions,
      fileStatus: location?.state?.question?.fileStatus,
      englishText: location?.state?.question?.englishText,
      urduText: location?.state?.question?.urduText,
      ammendedText: "",
      originalText: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      updateQuestion(values);
    },
  });

  const updateQuestion = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNo);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
    formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("questionCategory", values?.category);
    formData.append("questionDiaryNo", values?.questionDiaryNo);
    formData.append("fkMemberId", values?.senator);
    formData.append("fkGroupId", values?.group);
    formData.append("fkDivisionId", values?.division);
    formData.append("fileStatus", values?.fileStatus);
    formData.append("replyDate", values?.replyDate);

    formData.append("ammendedText", values.ammendedText);
    formData.append("urduText", values.urduText);
    formData.append("englishText", values.englishText);
    formData.append("originalText", values.originalText);
    try {
      const response = await UpdateQuestionById(
        location?.state?.question?.id,
        formData
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const GetALlStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllQuestionStatus(response?.data);
        // showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleQuestionTranslation = async () => {
    try {
      const response = await sendQuestionTranslation(
        location?.state?.question?.id
      );
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const hendleDeffer = async () => {
    const DefferData = {
      fkSessionId: deferState.sessionNo,
      deferredDate: deferState.deferDate,
      deferredBy: "login user ID",
    };
    try {
      const response = await createDefferQuestion(
        location?.state?.question?.id,
        DefferData
      );
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const hendleRevive = async () => {
    const reviveData = {
      fkFromSessionId: location?.state?.question?.session?.sessionName,
      fkToSessionId: reviveState.sessionNo,
      fkGroupId: reviveState.qroup,
      fkDivisionId: reviveState.division,
      noticeOfficeDiaryNo: reviveState.noticeDiaryNo,
      noticeOfficeDiaryDate: reviveState.noticeDiaryDate,
      noticeOfficeDiaryTime: reviveState.noticeDiaryTime,
      questionDiaryNo: reviveState.questionDiaryNo,
      fkQuestionStatus: reviveState.questionStatus,
      fkSessionId: reviveState.sessionNo,
    };
    try {
      const response = await createReviveQuestion(
        location?.state?.question?.id,
        reviveData
      );
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  //History
  const transfrerStatusHistoryData = (apiData) => {
    if (Array.isArray(apiData)) {
      return apiData?.map((leave, index) => ({
        SR: `${index + 1}`,
        sessionNo: leave?.session?.sessionName,
        status: leave?.questionStatus?.questionStatus,
        questionDate: leave?.questionStatusDate,
      }));
    } else {
      // Handle the case when apiData is not an array (e.g., "No defer data found")
      return [];
    }
  };
  const StatusHistoryData = transfrerStatusHistoryData(
    location?.state?.history?.questionStatusHistory
  );

  console.log("status", location?.state);
  //questionRevival
  const transfrerRevivalHistoryData = (apiData) => {
    if (Array.isArray(apiData)) {
      return apiData?.map((leave, index) => ({
        SR: `${index + 1}`,
        FromSession: leave?.FromSession?.sessionName,
        ToSession: leave?.ToSession?.sessionName,
        questionDiary: leave?.questionDiary?.questionDiaryNo,
        revivalDate: leave?.createdAt,
      }));
    } else {
      // Handle the case when apiData is not an array (e.g., "No defer data found")
      return [];
    }
  };

  const QuestionRevivalHistoryData = transfrerRevivalHistoryData(
    location?.state?.history?.questionRevival
  );

  //Deffer History
  const transfrerDefferHistoryData = (apiData) => {
    if (Array.isArray(apiData)) {
      return apiData?.map((leave, index) => ({
        SR: `${index + 1}`,
        defferToSession: leave?.session?.sessionName,
        defferOn: leave?.deferredDate,
        deferredBy: leave?.deferredBy,
        revivalDate: leave?.createdAt,
      }));
    } else {
      // Handle the case when apiData is not an array (e.g., "No defer data found")
      return [];
    }
  };

  const QuestionDefferHistoryData = transfrerDefferHistoryData(
    location?.state?.history?.questionDefer
  );

  //File History
  const transfrerFilerHistoryData = (apiData) => {
    if (Array.isArray(apiData)) {
      return apiData?.map((leave, index) => ({
        SR: `${index + 1}`,
        fileStatus: leave?.fileStatus,
        fileStatusDate: leave?.fileStatusDate,
      }));
    } else {
      // Handle the case when apiData is not an array (e.g., "No defer data found")
      return [];
    }
  };

  const QuestionFileHistoryData = transfrerFilerHistoryData(
    location?.state?.history?.questionFileHistory
  );
  // Getting All Divisions
  const GetALLDivsions = async () => {
    try {
      const response = await getAllDivisions(0, 100);
      if (response?.success) {
        setAllDivisions(response?.data?.divisions);
        // setCount(response?.data?.count);
        // setTotalPages(rersponse?.data?.totalPages)
        // showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetALlStatus();
    GetALLDivsions();
  }, []);
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/"}
        addLink1={"/notice/question/detail"}
        title1={"Question Detail"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>QUESTIONS DETAIL</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row mb-4">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>
                  <div class="clearfix"></div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      {/* <select
                        class="form-select"
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select> */}
                      <input
                        // readOnly={true}
                        placeholder={formik.values.sessionNo}
                        type="text"
                        class="form-control"
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        placeholder={formik.values.noticeOfficeDiaryNo}
                        type="text"
                        class="form-control"
                        id="noticeOfficeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Notice Office Diary Date</label>
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
                        selected={formik.values.noticeOfficeDiaryDate}
                        // minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("noticeOfficeDiaryDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Time</label>
                      <TimePicker
                        value={formik.values.noticeOfficeDiaryTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("noticeOfficeDiaryTime", time)
                        }
                        className={`form-control`}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  {/* <div class="col">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "25px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="priority"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          {" "}
                          Priority
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question ID</label>
                      <input
                        readOnly={true}
                        type="text"
                        placeholder={formik.values.questionId}
                        className={"form-control"}
                        id="questionId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Category</label>
                      <select
                        class="form-control small-control"
                        id="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Starred">Starred</option>
                        <option value="Un-Starred">Un-Starred</option>
                        <option value="Short Notice">Short Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Senator</label>
                      <select
                        placeholder={formik.values.senator}
                        className={`form-control`}
                        id="senator"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.senator}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {members &&
                          members.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.memberName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"Original Text"}
                    onChange={(content) =>
                      formik.setFieldValue("originalText", content)
                    }
                    value={formik.values.originalText}
                  />
                </div> */}

                <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"English Text"}
                    onChange={(content) =>
                      formik.setFieldValue("englishText", content)
                    }
                    value={formik.values.englishText}
                  />
                </div>

                <div style={{ marginTop: 70, marginBottom: 40 }}>
                  <Editor
                    title={"Urdu Text"}
                    onChange={(content) =>
                      formik.setFieldValue("urduText", content)
                    }
                    value={formik.values.urduText}
                  />
                </div>
                <div
                  class="d-grid gap-2 d-md-flex"
                  style={{ marginTop: 70, marginBottom: 40 }}
                >
                  <button class="btn btn-primary" type="submit">
                    Update
                  </button>
                  <button class="btn btn-primary" type="">
                    Upload File
                  </button>
                  <button class="btn btn-danger" type="">
                    Delete
                  </button>
                </div>
              </form>
              <CustomTable
                block={false}
                hidebtn1={true}
                ActionHide={true}
                data={StatusHistoryData}
                tableTitle="Status History"
                pageSize={pageSize}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />

              {/* <h2
                style={{ color: "#666", fontSize: "24px", marginTop: "30px" }}
              >
                Status History
              </h2>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        Session No
                      </th>
                      <th class="text-center" scope="col">
                        Question Status
                      </th>
                      <th class="text-center" scope="col">
                        Status Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {StatusHistoryData.length > 0 &&
                      StatusHistoryData.map((item, index) => (
                        <tr>
                          <td class="text-center">{item.SR}</td>
                          <td class="text-center">{item.sessionNo}</td>
                          <td class="text-center">{item.status}</td>
                          <td class="text-center">{item.questionDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div> */}
              {/* <h2
                style={{ color: "#666", marginTop: "25px", fontSize: "24px" }}
              >
                Revival History
              </h2>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        From Session Number
                      </th>
                      <th class="text-center" scope="col">
                        To Session Number
                      </th>
                      <th class="text-center" scope="col">
                        Previous Notice Office Diary No
                      </th>
                      <th class="text-center" scope="col">
                        Revival Date
                      </th>
                      <th class="text-center" scope="col">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuestionRevivalHistoryData.length > 0 &&
                      QuestionRevivalHistoryData.map((item, index) => (
                        <tr>
                          <td class="text-center">{item.SR}</td>
                          <td class="text-center">{item.FromSession}</td>
                          <td class="text-center">{item.ToSession}</td>
                          <td class="text-center">{item.questionDiary}</td>
                          <td class="text-center">{item.revivalDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div> */}

              <CustomTable
                block={false}
                hidebtn1={true}
                ActionHide={true}
                data={QuestionRevivalHistoryData}
                tableTitle="Revival  History"
                pageSize={pageSize}
                currentPage={currentPage}
              />
              {/* <h2
                style={{ color: "#666", marginTop: "25px", fontSize: "24px" }}
              >
                Defer History
              </h2>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        Defered to Session No
                      </th>
                      <th class="text-center" scope="col">
                        Defered on
                      </th>
                      <th class="text-center" scope="col">
                        Defered by
                      </th>
                      <th class="text-center" scope="col">
                        User
                      </th>
                      <th class="text-center" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuestionDefferHistoryData.length > 0 &&
                      QuestionDefferHistoryData.map((item, index) => (
                        <tr>
                          <td class="text-center">{item.SR}</td>
                          <td class="text-center">{item.defferToSession}</td>
                          <td class="text-center">{item.defferOn}</td>
                          <td class="text-center">{item.deferredBy}</td>
                          <td class="text-center">{item.revivalDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div> */}
              <CustomTable
                block={false}
                hidebtn1={true}
                ActionHide={true}
                data={QuestionDefferHistoryData}
                tableTitle="Defer  History"
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NoticeQuestionDetail;
