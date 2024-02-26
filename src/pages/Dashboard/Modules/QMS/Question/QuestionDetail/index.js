import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
  UpdateQuestionById,
  createDefferQuestion,
  createReviveQuestion,
  getAllQuestionStatus,
  sendQuestionTranslation,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getAllDivisions } from "../../../../../../api/APIs/Services/ManageQMS.service";
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

function QMSQuestionDetail() {
  const location = useLocation();
  // const English = location?.state && location?.state?.question?.englishText;
  // const Urdu = location?.state && location?.state?.question?.urduText;
  // console.log("location states", location?.state?.question?.urduText);
  const { members, sessions } = useContext(AuthContext);
  const [alldivisons, setAllDivisions] = useState([]);

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

  console.log("location", location?.state?.question?.member?.id);
  const formik = useFormik({
    initialValues: {
      sessionNo: location?.state?.question?.session?.id,
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
      senator: location?.state ? location?.state?.question?.member?.id : "",
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
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/question/detail"}
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
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-warning" type="">
                      No File Attached
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setShowRetriveForm(!showRetriveForm);
                        setShowDeferForm(false);
                      }}
                    >
                      Revive
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setShowDeferForm(!showDeferForm);
                        setShowRetriveForm(false);
                      }}
                    >
                      Defer
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => hendleQuestionTranslation()}
                    >
                      Send for Translation
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div>
                {showDeferForm && (
                  <div
                    class="dash-detail-container"
                    style={{ marginTop: "20px", marginBottom: "25px" }}
                  >
                    <h4>Deffer Question</h4>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Session No</label>
                          <select
                            class="form-select"
                            value={deferState.sessionNo}
                            onChange={(e) =>
                              setDeferState({
                                ...deferState,
                                sessionNo: e.target.value,
                              })
                            }
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
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">Deffer Date</label>
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
                            selected={deferState.deferDate}
                            minDate={new Date()}
                            onChange={(date) =>
                              setDeferState({
                                ...deferState,
                                deferDate: date,
                              })
                            }
                            onBlur={formik.handleBlur}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          class="btn btn-primary"
                          type="button"
                          onClick={hendleDeffer}
                        >
                          Defer
                        </button>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                )}
                {showRetriveForm && (
                  <div
                    class="dash-detail-container"
                    style={{ marginTop: "20px", marginBottom: "25px" }}
                  >
                    <h4>Revive Question</h4>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Session No</label>
                          <select
                            class="form-select"
                            value={reviveState.sessionNo}
                            onChange={(e) =>
                              setReviveState({
                                ...reviveState,
                                sessionNo: e.target.value,
                              })
                            }
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
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Group</label>
                          <select
                            class="form-select"
                            value={reviveState.qroup}
                            onChange={(e) =>
                              setReviveState({
                                ...reviveState,
                                qroup: e.target.value,
                              })
                            }
                          >
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"1"}>123</option>
                            <option>Qroup 1</option>
                            <option>45456</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Division</label>
                          <select
                            class="form-select"
                            value={reviveState.division}
                            onChange={(e) =>
                              setReviveState({
                                ...reviveState,
                                division: e.target.value,
                              })
                            }
                          >
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"1"}>Division 1</option>
                            <option>12123</option>
                            <option>45456</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Notice Diary No</label>
                          <input
                            class="form-control"
                            type="text"
                            value={reviveState.noticeDiaryNo}
                            onChange={(e) =>
                              setReviveState({
                                ...reviveState,
                                noticeDiaryNo: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3" style={{ position: "relative" }}>
                          <label class="form-label">Notice Diary Date</label>
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
                            selected={reviveState.noticeDiaryDate}
                            minDate={new Date()}
                            onChange={(date) =>
                              setReviveState({
                                ...reviveState,
                                noticeDiaryDate: date,
                              })
                            }
                            onBlur={formik.handleBlur}
                            className={`form-control`}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Notice Diary Time</label>

                            <TimePicker
                              value={reviveState.noticeDiaryTime}
                              clockIcon={null} // Disable clock view
                              openClockOnFocus={false}
                              format="hh:mm a"
                              onChange={(time) =>
                                setReviveState({
                                  ...reviveState,
                                  noticeDiaryTime: time,
                                })
                              }
                              className={`form-control`}
                            />
                          </div>
                        </div>
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Question Status</label>
                            <select
                              class="form-select"
                              value={reviveState.questionStatus}
                              onChange={(e) =>
                                setReviveState({
                                  ...reviveState,
                                  questionStatus: e.target.value,
                                })
                              }
                            >
                              <option value={""} selected disabled hidden>
                                select
                              </option>
                              <option value={"1"}>Defferd</option>
                              <option value={"2"}>Qroup 1</option>
                              <option value={"3"}>45456</option>
                            </select>
                          </div>
                        </div>
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Question Diary No</label>
                            <input
                              class="form-control"
                              type="text"
                              value={reviveState.questionDiaryNo}
                              onChange={(e) =>
                                setReviveState({
                                  ...reviveState,
                                  questionDiaryNo: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          class="btn btn-primary"
                          type="button"
                          onClick={hendleRevive}
                        >
                          Revive
                        </button>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                )}
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
                  <div class="col">
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
                  </div>
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
                      <label class="form-label">Question Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.questionDiaryNo}
                        className={"form-control"}
                        id="questionDiaryNo"
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
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select
                        class="form-control"
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.questionStatus}
                      >
                        <option selected disabled hidden>
                          select
                        </option>
                        {allquestionStatus &&
                          allquestionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.questionStatus}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Reply Date</label>
                      {/* <input
                        type="text"
                        placeholder={formik.values.replyDate}
                        className={`form-control`}
                        id="replyDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
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
                        selected={formik.values.replyDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("replyDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Senator</label>
                      <select
                        values={formik.values.senator}
                        // placeholder={formik.values.senator}
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Group</label>
                      <select
                        class="form-control small-control"
                        id="group"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="1">1st Group</option>
                        <option>2nd Group</option>
                        <option>3rd Group</option>
                        <option>4th Group</option>
                        <option>5th Group</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.tonerModel}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {alldivisons &&
                          alldivisons.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item?.divisionName}
                            </option>
                          ))}
                      </select>
                      {/* <select
                        class="form-control small-control"
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.division}
                        name="division"
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {alldivisons &&
                          alldivisons.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.divisionname}
                            </option>
                          ))}
                      </select> */}
                      {/* <option value={"1"}>Aviation Division</option>
                        <option>Cabinet Division</option>
                        <option>
                          Capital Administration &amp; Development Div.
                        </option>
                        <option>
                          Climate Change and Environmental Coordination
                        </option>
                        <option>Establishment Division</option>
                        <option>Housing and Works Division</option>
                        <option>
                          Information Technology &amp; Telecommunications
                          Division
                        </option>
                        <option>National Security Division</option>
                        <option>
                          Poverty Alleviation and Social Safety Division
                        </option>
                        <option>Textile Division</option> */}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">File Status</label>
                      <select
                        class="form-control small-control"
                        id="fileStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        <option value={"Available"}>Available</option>
                        <option value={"Missing"}>Missing</option>
                        <option value={"Moved for Approval"}>
                          Moved for Approval
                        </option>
                        <option value={"Moved for Advance Copy"}>
                          Moved for Advance Copy
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"Original Text"}
                    onChange={(content) =>
                      formik.setFieldValue("originalText", content)
                    }
                    value={formik.values.originalText}
                  />
                </div>
                <div style={{ marginTop: 70, marginBottom: 40 }}>
                  <Editor
                    title={"Ammended Text"}
                    onChange={(content) =>
                      formik.setFieldValue("ammendedText", content)
                    }
                    value={formik.values.ammendedText}
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
                    Print Ammended Question
                  </button>
                  <button class="btn btn-primary" type="">
                    Print Original Question
                  </button>
                  <button class="btn btn-primary" type="">
                    Print Urdu
                  </button>
                  <button class="btn btn-danger" type="">
                    Delete
                  </button>
                </div>
              </form>
              <div style={{ marginTop: 10 }}>
                <Editor
                  title={"English Text"}
                  onChange={(content) =>
                    formik.setFieldValue("englishText", content)
                  }
                  value={formik.values.englishText}
                />
              </div>
              <div
                class="dash-detail-container"
                style={{ marginTop: 70, marginBottom: 40 }}
              >
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-left" scope="col">
                        Action
                      </th>
                      <th class="text-left" scope="col">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Inserted By
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        on 17/07/2023 1:40:14 PM
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Updated By
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Muneeb Hussain on 19/07/2023 12:11:46 PM
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Sent for translation By
                      </td>
                      <td
                        class="text-left"
                        style={{ paddingLeft: "23px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Translation Approved By{" "}
                      </td>
                      <td
                        class="text-left"
                        style={{ paddingLeft: "23px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Deleted By
                      </td>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Muneeb Hussain on 19/07/2023 12:11:49 PM
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style={{ paddingLeft: "23px" }}>
                        Recovered By{" "}
                      </td>
                      <td
                        class="text-left"
                        style={{ paddingLeft: "23px" }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2
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
              </div>
              <h2
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
              </div>

              <h2
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
              </div>
              <h2
                style={{ color: " #666", marginTop: "25px", fontSize: "24px" }}
              >
                File Status History
              </h2>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        File Status
                      </th>
                      <th class="text-center" scope="col">
                        Date
                      </th>
                      <th class="text-center" scope="col">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuestionFileHistoryData.length > 0 &&
                      QuestionFileHistoryData.map((item, index) => (
                        <tr>
                          <td class="text-center">{item.SR}</td>
                          <td class="text-center">{item.fileStatus}</td>
                          <td class="text-center">{item.fileStatusDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSQuestionDetail;
