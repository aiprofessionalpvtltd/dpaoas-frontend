import React from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";

const validationSchema = Yup.object({
  sessionNumber: Yup.string().required("Session No is required"),
  noticeOfficeDiaryNumber: Yup.string().required(
    "Notice Office Diary Number is required",
  ),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required",
  ),
  noticeOfficeDiaryTime: Yup.string().required(
    "Notice Office Diary Time is required",
  ),
  questionDiaryNumber: Yup.string().required(
    "Question Diary Number is required",
  ),
  category: Yup.string(),
});

function QMSNoticeQuestionDetail() {
  const formik = useFormik({
    initialValues: {
      sessionNumber: "",
      noticeOfficeDiaryNumber: "",
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      questionDiaryNumber: "",
      category: "",
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
        addLink2={"/qms/notice/notice-question-detail"}
        title2={"Notice Question Detail"}
      />
      <div class="container-fluid">
        <div class="row mt-4">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="submit">
              Send for Translation
            </button>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div class="row">
            <div class="col-3">
              <div class="mb-3">
                <input class="form-control" type="text" />
              </div>
            </div>
            <div class="col-6">
              <button class="btn btn-primary me-2" type="submit">
                Update
              </button>
              <button class="btn btn-warning me-2" type="">
                View File
              </button>
              <button class="btn btn-primary me-2" type="">
                Revive
              </button>
              <button class="btn btn-primary me-2" type="">
                Duplicate
              </button>
              <button class="btn btn-danger" type="">
                Delete
              </button>
            </div>
          </div>
          <div class="card mt-4">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>NOTICE QUESTION DETAIL</h1>
            </div>
            <div class="card-body">
              <div class="container-fluid">
                <div class="dash-detail-container mb-4">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Session No</label>
                        <input
                          type="text"
                          placeholder={formik.values.sessionNumber}
                          className={`form-control ${formik.touched.sessionNumber &&
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
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">
                          Notice Office Diary No{" "}
                        </label>
                        <input
                          type="text"
                          placeholder={formik.values.noticeOfficeDiaryNumber}
                          className={`form-control ${formik.touched.noticeOfficeDiaryNumber &&
                              formik.errors.noticeOfficeDiaryNumber
                              ? "is-invalid"
                              : ""
                            }`}
                          id="noticeOfficeDiaryNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.noticeOfficeDiaryNumber &&
                          formik.errors.noticeOfficeDiaryNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">
                          Notice Office Diary Date
                        </label>
                        <DatePicker
                          selected={formik.values.noticeOfficeDiaryDate}
                          onChange={(date) =>
                            formik.setFieldValue("noticeOfficeDiaryDate", date)
                          }
                          onBlur={formik.handleBlur}
                          className={`form-control ${formik.touched.noticeOfficeDiaryDate &&
                              formik.errors.noticeOfficeDiaryDate
                              ? "is-invalid"
                              : ""
                            }`}
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
                          Notice Office Diary Time
                        </label>
                        <TimePicker
                          value={formik.values.noticeOfficeDiaryTime}
                          clockIcon={null} // Disable clock view
                          openClockOnFocus={false}
                          format="hh:mm a"
                          onChange={(time) =>
                            formik.setFieldValue("noticeOfficeDiaryTime", time)
                          }
                          className={`form-control ${formik.touched.noticeOfficeDiaryTime &&
                              formik.errors.noticeOfficeDiaryTime
                              ? "is-invalid"
                              : ""
                            }`}
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
                        <label class="form-label">Question Diary No</label>
                        <input
                          type="text"
                          placeholder={formik.values.questionDiaryNumber}
                          className={`form-control ${formik.touched.questionDiaryNumber &&
                              formik.errors.questionDiaryNumber
                              ? "is-invalid"
                              : ""
                            }`}
                          id="questionDiaryNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.questionDiaryNumber &&
                          formik.errors.questionDiaryNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.questionDiaryNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Assigned Question ID</label>
                        <input class="form-control" type="text" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select
                          class="form-select"
                          id="category"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Starred</option>
                          <option>Un-Starred</option>
                          <option>Short Notice</option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Senator</label>
                        <select class="form-select">
                          <option></option>
                        </select>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Division</label>
                        <input class="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <p>English Test Here</p>
                <p>Urdu Text Here</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default QMSNoticeQuestionDetail;
