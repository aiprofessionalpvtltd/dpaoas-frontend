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
  getAllQuestionStatus,
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
import moment from "moment";
import Select from "react-select";
const validationSchema = Yup.object({
  sessionNo: Yup.string(),
  noticeOfficeDiaryNo: Yup.string(),
  noticeOfficeDiaryDate: Yup.date(),
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
  const { members } = useContext(AuthContext);
  const [filesData, setFilesData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;

  const handleStatusPageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  console.log("memeber", location?.state?.question?.member?.id);
  console.log("SESSIONID", location?.state?.question?.session);
  const formik = useFormik({
    initialValues: {
      sessionNo: location?.state?.question?.session?.sessionName,
      noticeOfficeDiaryNo:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate: moment(
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryDate,
        "DD-MM-YYYY"
      ).toDate(),
      noticeOfficeDiaryTime:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryTime,
      priority: "",
      questionId: location?.state?.question?.id,
      questionDiaryNo: location?.state?.question?.fkNoticeDiary,
      category: location?.state?.question?.questionCategory,
      questionStatus: location?.state?.question?.fkQuestionStatus,
      replyDate: new Date(location?.state?.question?.replyDate),
      senator: location.state
        ? {
            value: location?.state?.question?.member?.id,
            label: location?.state?.question?.member?.memberName,
          }
        : "",
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
    formData.append("fkSessionId", 1);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
    formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append("questionCategory", values?.category);
    formData.append("questionDiaryNo", values?.questionDiaryNo);
    formData.append("fkMemberId", values?.senator?.value);
    formData.append("urduText", values.urduText);
    formData.append("englishText", values.englishText);
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
                        readOnly={true}
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
                      {/* <select
                        className={`form-select`}
                        id="senator"
                        name="senator"
                        value={formik.values.senator}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {members &&
                          members.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.memberName}
                            </option>
                          ))}
                      </select> */}
                      <Select
                        options={
                          members &&
                          members?.map((item) => ({
                            value: item.id,
                            label: item?.memberName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("senator", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.senator}
                        name="senator"
                        isClearable={true}
                        className="form-select"
                      />
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
                <div className="row">
                  {location?.state?.question &&
                    location?.state?.question?.questionImage?.map((item) => (
                      <div class="MultiFile-label mt-3">
                        <a href={`http://172.16.170.8:5252${item}`}>
                          <i class="fas fa-download"></i>
                        </a>
                        <a class="MultiFile-remove" href="#T7">
                          x
                        </a>
                        <span
                          class="MultiFile-label"
                          title={item.filename
                            ?.split("\\")
                            .pop()
                            .split("/")
                            .pop()}
                        >
                          <span class="MultiFile-title">
                            <a href={`http://172.16.170.8:5252${item}`}>
                              {item?.split("\\").pop().split("/").pop()}
                            </a>
                          </span>
                        </span>
                      </div>
                    ))}
                </div>
                <div
                  class="d-grid gap-2 d-md-flex"
                  style={{ marginTop: 70, marginBottom: 40 }}
                >
                  <button class="btn btn-primary" type="submit">
                    Update
                  </button>
                  {/* <button class="btn btn-primary" type="">
                    Upload File
                  </button> */}
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
                handlePageChange={handleStatusPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NoticeQuestionDetail;
