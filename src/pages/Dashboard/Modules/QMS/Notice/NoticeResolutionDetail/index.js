import React from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router";
import { UpdateResolution, sendResolutionForTranslation } from "../../../../../../api/APIs";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { Editor } from "../../../../../../components/CustomComponents/Editor";

const validationSchema = Yup.object({
  sessionNo: Yup.number(),
  noticeOfficeDiaryNo: Yup.number(),
  noticeOfficeDiaryDate: Yup.string().required("Notice Office Diary Date is required"),
  noticeOfficeDiaryTime: Yup.string().required("Notice Office Diary Time is required"),
  resolutionType: Yup.string(),
  resolutionStatus: Yup.string(),
  resolutionMovers: Yup.array(),
});

function QMSNoticeResolutionDetail() {
  const location = useLocation()
  console.log("dksfifsdpoipfosdpfiopf", location.state.id);
  const formik = useFormik({
    initialValues: {
      sessionNo: location?.state?.session?.sessionName,
      noticeOfficeDiaryNo: location?.state?.noticeDiary?.noticeOfficeDiaryNo,
      noticeOfficeDiaryDate: "",
      noticeOfficeDiaryTime: "",
      resolutionType: "",
      resolutionStatus: "",
      resolutionMovers: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleUpdate(values);
    },
  });

  const hendleUpdate = async (values) => {
    const data = new FormData()
    data.append('noticeOfficeDiaryDate', values.noticeOfficeDiaryDate)
    data.append('noticeOfficeDiaryTime', values.noticeOfficeDiaryTime)
    data.append('resolutionType', values.resolutionType)
    data.append('fkResolutionStatus', values.resolutionStatus)
    data.append('resolutionMovers[]', values.resolutionMovers)
    data.append('resolutionDiaryNo', location?.state?.noticeDiary?.noticeOfficeDiaryNo)

    try {
      const response = await UpdateResolution(location.state.id, data)
      if (response?.success) {
        showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const hendleSendResolutionForTranslation = async () => {
    try {
      const response = await sendResolutionForTranslation(location?.state?.id)
      if (response?.success) {
        showSuccessMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
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
                        readOnly={true}
                        placeholder={formik.values.sessionNo}
                        className={`form-control`}
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
                        type="text"
                        placeholder={formik.values.noticeOfficeDiaryNo}
                        className={`form-control`}
                        id="noticeOfficeDiaryNo"
                        readOnly={true}
                      />

                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary Date</label>
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
                        Notice Office Diary Time{" "}
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
                      <label class="form-label">Resolution Type</label>
                      <select
                        class="form-control form-select"
                        id="resolutionType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option value="Government Resolution">
                          Government Resolution
                        </option>
                        <option value="Private Member Resolution">
                          Private Member Resolution
                        </option>
                        <option value="Govt. Resolution Supported by others">
                          Govt. Resolution Supported by others
                        </option>

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
                        <option value={"1"}>inactive</option>
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
                        <option value={"1"}>Saqib Khan</option>
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
                    <button class="btn btn-primary" type="button" onClick={() => hendleSendResolutionForTranslation()}>
                      Send for Translation
                    </button>
                  </div>
                </div>
              </form>
              <div style={{ marginTop: 10 }}>
                <Editor
                  title={"English Text"}
                // onChange={handleProcedureContentChange}
                />
              </div>
              <div style={{ marginTop: 70, marginBottom: 40 }}>
                <Editor
                  title={"Urdu Text"}
                // onChange={handleProcedureContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeResolutionDetail;
