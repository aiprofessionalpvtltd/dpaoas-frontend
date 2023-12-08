import React from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  sessionNo: Yup.number().required("Session Number is required"),
  noticeOfficeDiaryNo: Yup.number().required(
    "Notice Office Diary Number is required",
  ),
  noticeOfficeDiaryDate: Yup.string(),
  noticeOfficeDiaryTime: Yup.string(),
  resolutionType: Yup.string(),
  resolutionStatus: Yup.string(),
  resolutionMovers: Yup.string(),
});

function QMSNoticeResolutionDetail() {
  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      resolutionType: "",
      resolutionStatus: "",
      resolutionMovers: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/notice/notice-resolution-detail"}
        title2={"Notice Resolution Detail"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Notice Resolution Detail</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <input
                        type="text"
                        placeholder={formik.values.sessionNo}
                        className={`form-control ${
                          formik.touched.sessionNo && formik.errors.sessionNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryNo}
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeOfficeDiaryNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeOfficeDiaryNo &&
                        formik.errors.noticeOfficeDiaryNo && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Date</label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryDate}
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeOfficeDiaryDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeOfficeDiaryDate &&
                        formik.errors.noticeOfficeDiaryDate && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">
                        Notice Office Diary Time{" "}
                      </label>
                      <input
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryTime}
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                        id="noticeOfficeDiaryTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.noticeOfficeDiaryTime &&
                        formik.errors.noticeOfficeDiaryTime && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
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
                      <label class="form-label">Resolution Status</label>
                      <select
                        class="form-control form-select"
                        id="resolutionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Movers</label>
                      <select
                        class="form-control form-select"
                        id="resolutionMovers"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-warning" type="">
                      No File Attached
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Save
                    </button>
                    <button class="btn btn-primary" type="">
                      Send for Translation
                    </button>
                  </div>
                </div>
              </form>
              <p>Resolution text here</p>
              <p>Urdu text here</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeResolutionDetail;
