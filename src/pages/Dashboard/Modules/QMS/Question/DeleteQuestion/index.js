import React, { useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  questionDiaryNo: Yup.number(),
  questionId: Yup.string(),
  keyword: Yup.string(),
  memberName: Yup.string(),
  fromSession: Yup.string(),
  toSession: Yup.string(),
  category: Yup.string(),
  group: Yup.string(),
  questionStatus: Yup.string(),
  noticeDiaryNo: Yup.string(),
  fromNoticeDate: Yup.string(),
  toNoticeDate: Yup.string(),
  gender: Yup.string(),
  religion: Yup.string(),
  notInReligion: Yup.string(),
  completeText: Yup.string(),
  division: Yup.string(),
});

function QMSDeleteQuestion() {
  const formik = useFormik({
    initialValues: {
      questionDiaryNo: "",
      questionId: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      category: "",
      group: "",
      questionStatus: "",
      noticeDiaryNo: "",
      fromNoticeDate: "",
      toNoticeDate: "",
      gender: "",
      religion: "",
      notInReligion: "",
      completeText: "",
      division: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 4; // Set your desired page size
  const data = [
    {
      "Sr#": 1,
      MID: "21-11-2023",
      "M-File No": "Saqib khan",
      "Motion Diary No": "Additional Secretary Office",
      "Session Number": "Educational Trip",
      "Motion Type": "Personal",
      "Subject Matter": "AI Professionals Pvt Limited",
      "Notice No./Date": "21-11-2023",
      "Motion Week": "30-11-2023",
      "Motion Status": ["Saturday"],
      Movers: "Visit",
      Ministries: "Inactive",
    },
    {
      "Sr#": 1,
      MID: "21-11-2023",
      "M-File No": "Ali Ahmad Jan",
      "Motion Diary No": "Additional Secretary Office",
      "Session Number": "Educational Trip",
      "Motion Type": "Personal",
      "Subject Matter": "AI Professionals Pvt Limited",
      "Notice No./Date": "21-11-2023",
      "Motion Week": "30-11-2023",
      "Motion Status": ["Saturday"],
      Movers: "Visit",
      Ministries: "Inactive",
    },
  ];
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/question/delete"}
        title2={"Delete Question"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>DELETED QUESTIONS</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.questionDiaryNo}
                        className={`form-control ${
                          formik.touched.questionDiaryNo &&
                          formik.errors.questionDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="questionDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.questionDiaryNo &&
                        formik.errors.questionDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.questionDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question ID</label>
                      <input
                        type="text"
                        placeholder={formik.values.questionId}
                        className={`form-control ${
                          formik.touched.questionId && formik.errors.questionId
                            ? "is-invalid"
                            : ""
                        }`}
                        id="questionId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.questionId &&
                        formik.errors.questionId && (
                          <div className="invalid-feedback">
                            {formik.errors.questionId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Keyword</label>
                      <input
                        type="text"
                        placeholder={formik.values.keyword}
                        className={`form-control ${
                          formik.touched.keyword && formik.errors.keyword
                            ? "is-invalid"
                            : ""
                        }`}
                        id="keyword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.keyword && formik.errors.keyword && (
                        <div className="invalid-feedback">
                          {formik.errors.keyword}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      <input
                        type="text"
                        placeholder={formik.values.memberName}
                        className={`form-control ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="memberName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-control form-select"
                        id="fromSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>333</option>
                        <option>332</option>
                        <option>331</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Session</label>
                      <select
                        class="form-control form-select"
                        id="toSession"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>333</option>
                        <option>332</option>
                        <option>331</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Category</label>
                      <select
                        class="form-control form-select"
                        id="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Category</option>
                        <option>Starred</option>
                        <option>Un-Starred</option>
                        <option>Short Notice</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Group</label>
                      <select
                        class="form-control form-select"
                        id="group"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Group1</option>
                        <option>Group1</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Question Status</label>
                      <select
                        class="form-control form-select"
                        id="questionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Question Status</option>
                        <option>Admitted</option>
                        <option>Admitted but Lapsed</option>
                        <option>Deferred</option>
                        <option>Disallowed</option>
                        <option>Disallowed on Reconsideration</option>
                        <option>File not Available</option>
                        <option>Lapsed</option>
                        <option>NFA</option>
                        <option>Replied</option>
                        <option>Replied/Referred to Standing Committee</option>
                        <option>Under Correspondence</option>
                        <option>Under Process</option>
                        <option>Withdrawn</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeDiaryNo}
                        className={`form-control ${
                          formik.touched.noticeDiaryNo &&
                          formik.errors.noticeDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeDiaryNo &&
                        formik.errors.noticeDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Notice Date</label>
                      <input
                        type="text"
                        placeholder={formik.values.fromNoticeDate}
                        className={`form-control ${
                          formik.touched.fromNoticeDate &&
                          formik.errors.fromNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fromNoticeDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fromNoticeDate &&
                        formik.errors.fromNoticeDate && (
                          <div className="invalid-feedback">
                            {formik.errors.fromNoticeDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Notice Date</label>
                      <input
                        type="text"
                        placeholder={formik.values.toNoticeDate}
                        className={`form-control ${
                          formik.touched.toNoticeDate &&
                          formik.errors.toNoticeDate
                            ? "is-invalid"
                            : ""
                        }`}
                        id="toNoticeDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.toNoticeDate &&
                        formik.errors.toNoticeDate && (
                          <div className="invalid-feedback">
                            {formik.errors.toNoticeDate}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select
                        class="form-control form-select"
                        id="gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Religion</label>
                      <select
                        class="form-control form-select"
                        id="religion"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                        <option>Hinduism</option>
                        <option>Sikh</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Not in Religion</label>
                      <select
                        class="form-control form-select"
                        id="notInReligion"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Not in Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                        <option>Hinduism</option>
                        <option>Sikh</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <div class="form-check" style={{ marginTop: "39px" }}>
                        <input
                          class="form-check-input "
                          type="checkbox"
                          id="completeText"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          {" "}
                          Complete Text
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <input
                        type="text"
                        placeholder={formik.values.division}
                        className={`form-control ${
                          formik.touched.division && formik.errors.division
                            ? "is-invalid"
                            : ""
                        }`}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.division && formik.errors.division && (
                        <div className="invalid-feedback">
                          {formik.errors.division}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Print Questions
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Annual Report
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <CustomTable
                  headerShown={true}
                  hideBtn={true}
                  block={true}
                  data={data}
                  handleAdd={() => alert("Print")}
                  handleEdit={(item) =>
                    navigate("/vms/addeditpass", { state: item })
                  }
                  hideUserIcon={true}
                  handleUser={() => navigate("/vms/visitor")}
                  handleDuplicate={() => navigate("/vms/duplicatepass")}
                  // seachBarShow={true}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  // handlePrint={}
                  // handleUser={}
                  // handleDelete={(item) => handleDelete(item.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSDeleteQuestion;
