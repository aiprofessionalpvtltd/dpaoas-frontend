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
import { useNavigate } from "react-router-dom";

import {
  UpdateQuestionById,
  getAllQuestionStatus,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../../../../../api/AuthContext";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import moment from "moment";
import Select from "react-select";

const validationSchema = Yup.object({
  sessionNo: Yup.object().required("Session No is required"),
  noticeOfficeDiaryNo: Yup.string().required("Diary No is required"),
  noticeOfficeDiaryDate: Yup.string().required("Date is required"),
  noticeOfficeDiaryTime: Yup.string().required("Time is required"),
  // priority: Yup.string(),
  // questionId: Yup.string(),
  // questionDiaryNo: Yup.string(),
  // category: Yup.string(),
  // questionStatus: Yup.string(),
  // replyDate: Yup.string(),
  senator: Yup.object().required("Senator Name is required"),
  questionStatus: Yup.object().required("Question Status is required"),
  // group: Yup.string(),
  // division: Yup.string(),
  // fileStatus: Yup.string(),
  // urduText: Yup.string(),

  // ammendedText: Yup.string(),
  // originalText: Yup.string(),
});

function NoticeQuestionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  const [filesData, setFilesData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [allQuestionStatus, setAllQuestionStatus] = useState([]);
  
  const pageSize = 10;

  const handleStatusPageChange = (page) => {
    setCurrentPage(page);
  };

  // Getting Question Statuses
  const GetAllQuestionStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        setAllQuestionStatus(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      sessionNo: location.state
        ? {
            value: location?.state?.question?.session?.id,
            label: location?.state?.question?.session?.sessionName,
          }
        : "",
      noticeOfficeDiaryNo:
        location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate: location?.state?.question?.noticeOfficeDiary
        ?.noticeOfficeDiaryDate
        ? moment(
            location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryDate,
            "YYYY-MM-DD"
          ).toDate()
        : "",
      noticeOfficeDiaryTime: location?.state?.question?.noticeOfficeDiary
        ?.noticeOfficeDiaryTime
        ? location?.state?.question?.noticeOfficeDiary?.noticeOfficeDiaryTime
        : "",
      priority: "",
      questionId: location?.state?.question?.id,
      questionDiaryNo: location?.state?.question?.fkNoticeDiary,
      category: location?.state?.question?.questionCategory,
      // questionStatus: location?.state?.question?.fkQuestionStatus,
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
      questionStatus: location?.state?.question?.questionStatus
        ? {
            value: location?.state?.question?.questionStatus?.id,
            label: location?.state?.question?.questionStatus?.questionStatus,
          }
        : "",
      ammendedText: "",
      originalText: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      // Handle form submission here
      updateQuestion(values);
    },
  });

  useEffect(() => {
    GetAllQuestionStatus();
  }, []);

  
  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("noticeOfficeDiaryDate", date);
    setIsCalendarOpen(false);
  };

  const updateQuestion = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.sessionNo?.value);
    formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
    formData.append(
      "noticeOfficeDiaryDate",
      values?.noticeOfficeDiaryDate &&
        moment(values?.noticeOfficeDiaryDate).format("YYYY-MM-DD")
    );
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    formData.append("questionCategory", values?.category);
    formData.append("fkMemberId", values?.senator?.value);
    formData.append("fkQuestionStatus", values?.questionStatus?.value);
    formData.append("urduText", values.urduText);
    formData.append("englishText", values.englishText);
    if (values?.questionImage) {
      Array.from(values?.questionImage).map((file, index) => {
        formData.append(`questionImage`, file);
      });
    }
    try {
      const response = await UpdateQuestionById(
        location?.state?.question?.id,
        formData
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/question/sent");
        }, 2500);
        // navigate("/notice/question/sent");
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
        dashboardLink={"/notice/dashboard"}
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

                      <Select
                        options={
                          sessions &&
                          sessions?.map((item) => ({
                            value: item?.id,
                            label: item?.sessionName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("sessionNo", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNo}
                        name="sessionNo"
                        isClearable={true}
                        className={` ${
                          formik.touched.sessionNo && formik.errors.sessionNo
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ border: "none" }}
                      />
                      {formik.touched.sessionNo && formik.errors.sessionNo && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionNo}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.noticeOfficeDiaryNo}
                        type="text"
                        id="noticeOfficeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeOfficeDiaryNo &&
                        formik.errors.noticeOfficeDiaryNo && (
                          <div class="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Notice Office Diary Date</label>
                      {/* <span
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
                      </span> */}
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      {/* <DatePicker
                        selected={formik.values.noticeOfficeDiaryDate}
                        onChange={(date) =>
                          formik.setFieldValue("noticeOfficeDiaryDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      /> */}
                      <DatePicker
                        selected={formik.values.noticeOfficeDiaryDate}
                        onChange={handleDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate
                            ? "is-invalid"
                            : ""
                        }`}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onInputClick={handleCalendarToggle}
                        // onClick={handleCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                      {formik.touched.noticeOfficeDiaryDate &&
                        formik.errors.noticeOfficeDiaryDate && (
                          <div
                            class="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {formik.errors.noticeOfficeDiaryDate}
                          </div>
                        )}
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
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.noticeOfficeDiaryTime &&
                        formik.errors.noticeOfficeDiaryTime && (
                          <div
                            class="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {formik.errors.noticeOfficeDiaryTime}
                          </div>
                        )}
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
                        className="form-control small-control"
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
                            value: item?.id,
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
                        className={` ${
                          formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.senator && formik.errors.senator && (
                        <div
                          class="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.senator}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      {/* <input
                        className={`form-control ${
                          formik.touched.questionStatus &&
                          formik.errors.questionStatus
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.questionStatus}
                        type="text"
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      {/* <select
                        id="questionStatus"
                        name="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.questionStatus}
                        className={`form-select  ${
                          formik.touched.questionStatus &&
                          formik.errors.questionStatus
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {allQuestionStatus &&
                          allQuestionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.questionStatus}
                            </option>
                          ))}
                      </select> */}
                      <Select
                        options={
                          allQuestionStatus &&
                          allQuestionStatus?.map((item) => ({
                            value: item?.id,
                            label: item?.questionStatus,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "questionStatus",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.questionStatus}
                        name="questionStatus"
                        isClearable={true}
                        className={` ${
                          formik.touched.questionStatus &&
                          formik.errors.questionStatus
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.questionStatus &&
                        formik.errors.questionStatus && (
                          <div class="invalid-feedback">
                            {formik.errors.questionStatus}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="" className="form-label">
                    Selected Images
                  </label>
                  {location?.state?.question?.questionImage?.length > 0 ? (
                    location?.state?.question?.questionImage?.map((item) => (
                      <div class="MultiFile-label mt-3">
                        <a
                          href={`http://172.16.170.8:5252${item?.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i class="fas fa-download"></i>
                        </a>
                        <a class="MultiFile-remove" href="#T7">
                          x
                        </a>
                        <span
                          class="MultiFile-label"
                          title={item?.path?.split("\\").pop().split("/").pop()}
                        >
                          <span class="MultiFile-title">
                            <a
                              href={`http://172.16.170.8:5252${item?.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item?.path?.split("\\").pop().split("/").pop()}
                            </a>
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="row">
                      <div className="col-6 ">
                        <div className="mt-5">
                          <input
                            className="form-control"
                            type="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            id="formFile"
                            name="questionImage"
                            multiple
                            onChange={(event) => {
                              formik.setFieldValue(
                                "questionImage",
                                event.currentTarget.files
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
