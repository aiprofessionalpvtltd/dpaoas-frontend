import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
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
} from "../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";
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
});

function QMSQuestionDetail() {
  const location = useLocation();

  console.log("Question Id", location?.state?.id);

  const [showDeferForm, setShowDeferForm] = useState(false);
  const [showRetriveForm, setShowRetriveForm] = useState(false);

  const [allquestionStatus, setAllQuestionStatus] = useState([]);

  const [deferState, setDeferState] = useState({
    sessionNo: "",
    deferDate: ""
  })

  const [reviveState, setReviveState] = useState({
    sessionNo: "",
    qroup: "",
    division: "",
    noticeDiaryNo: "",
    noticeDiaryDate: "",
    noticeDiaryTime: "",
    questionStatus: "",
    questionDiaryNo: ""
  })

  const formik = useFormik({
    initialValues: {
      sessionNo: location?.state?.session?.fkSessionId,
      noticeOfficeDiaryNo:
        location?.state?.noticeOfficeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate:
        location?.state?.noticeOfficeDiary?.noticeOfficeDiaryDate,
      noticeOfficeDiaryTime:
        location?.state?.noticeOfficeDiary?.noticeOfficeDiaryTime,
      priority: "",
      questionId: location?.state?.fkSessionId,
      questionDiaryNo: location?.state?.fkNoticeDiary,
      category: location?.state?.questionCategory,
      questionStatus: location?.state?.fkQuestionStatus,
      replyDate: location?.state?.replyDate,
      senator: location?.state?.member.memberName,
      group: location?.state?.groups,
      division: location?.state?.divisions,
      fileStatus: location?.state?.fileStatus,
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

    formData.append("ammendedText", "dkals");
    formData.append("urduText", "dkpad");
    formData.append("originalText", "dkpad");
    try {
      const response = await UpdateQuestionById(location?.state?.id, formData);
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
      const response = await sendQuestionTranslation(location?.state?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const hendleDeffer = async () => {
    const DefferData = { fkSessionId: 1, deferredDate: deferState.deferDate, deferredBy: "login user ID" }
    try {
      const response = await createDefferQuestion(location?.state?.id, DefferData)
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  }

  const hendleRevive = async () => {
    const reviveData = {
      fkFromSessionId: reviveState.sessionNo,
      fkToSessionId: 1,
      fkGroupId: reviveState.qroup,
      fkDivisionId: reviveState.division,
      fkQuestionStatus: reviveState.questionStatus
    }
    try {
      const response = await createReviveQuestion(location?.state?.id, reviveData)
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    GetALlStatus();
  }, []);
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/question/detail"}
        title2={"Question Detail"}
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
                    <button class="btn btn-primary" type="button" onClick={() => {
                      setShowRetriveForm(!showRetriveForm)
                      setShowDeferForm(false)
                    }}>
                      Revive
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setShowDeferForm(!showDeferForm)
                        setShowRetriveForm(false)
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
                          <select class="form-select" value={deferState.sessionNo} onChange={(e) => setDeferState({ ...deferState, sessionNo: e.target.value })}>
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"2"}>123</option>
                            <option>12123</option>
                            <option>45456</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Deffer Date</label>
                          <input class="form-control" type="text" value={deferState.deferDate} onChange={(e) => setDeferState({ ...deferState, deferDate: e.target.value })} />
                        </div>
                      </div>
                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary" type="button" onClick={hendleDeffer}>
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
                          <select class="form-select" value={deferState.sessionNo} onChange={(e) => setDeferState({ ...deferState, sessionNo: e.target.value })}>
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"2"}>123</option>
                            <option>12123</option>
                            <option>45456</option>
                          </select>
                        </div>

                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Group</label>
                          <select class="form-select" value={reviveState.qroup} onChange={(e) => setReviveState({ ...reviveState, qroup: e.target.value })}>
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"2"}>123</option>
                            <option>Qroup 1</option>
                            <option>45456</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Division</label>
                          <select class="form-select" value={reviveState.division} onChange={(e) => setReviveState({ ...reviveState, division: e.target.value })}>
                            <option value={""} selected disabled hidden>
                              select
                            </option>
                            <option value={"2"}>Division 1</option>
                            <option>12123</option>
                            <option>45456</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Notice Diary No</label>
                          <input class="form-control" type="text" value={reviveState.noticeDiaryNo} onChange={(e) => setReviveState({ ...reviveState, noticeDiaryNo: e.target.value })} />
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Notice Diary Date</label>
                          <input class="form-control" type="text" value={reviveState.noticeDiaryDate} onChange={(e) => setReviveState({ ...reviveState, noticeDiaryDate: e.target.value })} />
                        </div>
                      </div>

                      <div className="row">
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Notice Diary Time</label>
                            <input class="form-control" type="text" value={reviveState.noticeDiaryTime} onChange={(e) => setReviveState({ ...reviveState, noticeDiaryTime: e.target.value })} />
                          </div>
                        </div>
                        <div class="col">
                          <div class="mb-3">
                            <label class="form-label">Question Status</label>
                            <select class="form-select" value={reviveState.questionStatus} onChange={(e) => setReviveState({ ...reviveState, questionStatus: e.target.value })}>
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
                            <input class="form-control" type="text" value={reviveState.questionDiaryNo} onChange={(e) => setReviveState({ ...reviveState, questionDiaryNo: e.target.value })} />
                          </div>
                        </div>
                      </div>

                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary" type="button" onClick={hendleRevive}>
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
                      <select
                        class="form-select"
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        <option value={"1"}>123</option>
                        <option>12123</option>
                        <option>45456</option>
                      </select>
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
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Date</label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryDate}
                        className={"form-control"}
                        id="noticeOfficeDiaryDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Time</label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryTime}
                        className={"form-control"}
                        id="noticeOfficeDiaryTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value={"Starred"}>Starred</option>
                        <option value={"Un-Starred"}>Un-Starred</option>
                        <option value={"Short Notice"}>Short Notice</option>
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
                    <div class="mb-3">
                      <label class="form-label">Reply Date</label>
                      <input
                        type="text"
                        placeholder={formik.values.replyDate}
                        className={`form-control`}
                        id="replyDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
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
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value={"2"}>Saqib khan</option>
                        <option>Ali Khan</option>
                        <option>Mohsin Khan</option>
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
                        <option value={"1"}>1st Group</option>
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
                        class="form-control small-control"
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option value={"1"}>Aviation Division</option>
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
                        <option>Textile Division</option>
                      </select>
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
                <p>Original Question text here</p>
                <p>Ammended Question Text here</p>
                <p>Urdu Text here</p>
                <div class="d-grid gap-2 d-md-flex">
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
              <p>Reply Text here</p>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
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
                      <th class="text-center" scope="col">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">1</td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                    </tr>
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
                    <tr>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                    </tr>
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
                    <tr>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                    </tr>
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
                    <tr>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                    </tr>
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
