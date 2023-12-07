import React, { useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  resolutionDiaryNo: Yup.number(),
  resolutionID: Yup.string(),
  keyword: Yup.string(),
  memberName: Yup.string(),
  fromSession: Yup.string(),
  toSession: Yup.string(),
  resolutionType: Yup.string(),
  colourResNo: Yup.string(),
  resolutionStatus: Yup.string(),
  noticeDiaryNo: Yup.string(),
  fromNoticeDate: Yup.string(),
  toNoticeDate: Yup.string(),
  completeText: Yup.string(),
});

function QMSDeleteResolution() {
  const formik = useFormik({
    initialValues: {
      resolutionDiaryNo: "",
      resolutionID: "",
      keyword: "",
      memberName: "",
      fromSession: "",
      toSession: "",
      resolutionType: "",
      colourResNo: "",
      resolutionStatus: "",
      noticeDiaryNo: "",
      fromNoticeDate: "",
      toNoticeDate: "",
      completeText: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size
  const data = [
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
        addLink2={"/qms/resolution/delete"}
        title2={"Delete Resolution"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>DELETED RESOLUTION</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Diary No</label>
                      <input
                        type="text"
                        placeholder={formik.values.resolutionDiaryNo}
                        className={`form-control ${
                          formik.touched.resolutionDiaryNo && formik.errors.resolutionDiaryNo ? "is-invalid" : ""
                        }`}
                        id="resolutionDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.resolutionDiaryNo && formik.errors.resolutionDiaryNo && (
                        <div className="invalid-feedback">{formik.errors.resolutionDiaryNo}</div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution ID</label>
                      <input
                        type="text"
                        placeholder={formik.values.resolutionID}
                        className={`form-control ${
                          formik.touched.resolutionID && formik.errors.resolutionID ? "is-invalid" : ""
                        }`}
                        id="resolutionID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.resolutionID && formik.errors.resolutionID && (
                        <div className="invalid-feedback">{formik.errors.resolutionID}</div>
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
                          formik.touched.keyword && formik.errors.keyword ? "is-invalid" : ""
                        }`}
                        id="keyword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.keyword && formik.errors.keyword && (
                        <div className="invalid-feedback">{formik.errors.keyword}</div>
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
                          formik.touched.memberName && formik.errors.memberName ? "is-invalid" : ""
                        }`}
                        id="memberName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.memberName && formik.errors.memberName && (
                        <div className="invalid-feedback">{formik.errors.memberName}</div>
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
                      <label class="form-label">Resolution Type</label>
                      <select
                        class="form-control form-select"
                        id="resolutionType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Colour Res. No</label>
                      <select
                        class="form-control form-select"
                        id="colourResNo"
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
                      <label class="form-label">Resolution Status</label>
                      <select
                        class="form-control form-select"
                        id="resolutionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Resolution Status</option>
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
                          formik.touched.noticeDiaryNo && formik.errors.noticeDiaryNo ? "is-invalid" : ""
                        }`}
                        id="noticeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeDiaryNo && formik.errors.noticeDiaryNo && (
                        <div className="invalid-feedback">{formik.errors.noticeDiaryNo}</div>
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
                          formik.touched.fromNoticeDate && formik.errors.fromNoticeDate ? "is-invalid" : ""
                        }`}
                        id="fromNoticeDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fromNoticeDate && formik.errors.fromNoticeDate && (
                        <div className="invalid-feedback">{formik.errors.fromNoticeDate}</div>
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
                          formik.touched.toNoticeDate && formik.errors.toNoticeDate ? "is-invalid" : ""
                        }`}
                        id="toNoticeDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.toNoticeDate && formik.errors.toNoticeDate && (
                        <div className="invalid-feedback">{formik.errors.toNoticeDate}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <div class="form-check">
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
              <div class="" style={{ marginTop: "20px" }}>
                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Print Resolution
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Motion Annual Report
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
                  handleEdit={(item) => navigate("/vms/addeditpass", { state: item })}
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
                <div style={{ float: "right", marginTop: "10px" }}>
                  <button class="btn btn-primary" type="submit">
                    Recover
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSDeleteResolution;
