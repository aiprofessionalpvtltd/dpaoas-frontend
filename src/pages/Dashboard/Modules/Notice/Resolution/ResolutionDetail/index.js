import React, { useContext } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import {
  NoticeSidebarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router";
import {
  UpdateResolution,
  sendResolutionForTranslation,
} from "../../../../../../api/APIs/Services/Resolution.service";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../api/AuthContext";
import Select from "react-select";
import moment from "moment";
const validationSchema = Yup.object({
  sessionNo: Yup.number(),
  noticeOfficeDiaryNo: Yup.number(),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required"
  ),
  noticeOfficeDiaryTime: Yup.string().required(
    "Notice Office Diary Time is required"
  ),
  resolutionType: Yup.string(),
  resolutionStatus: Yup.string(),
  resolutionMovers: Yup.array(),
  urduText: Yup.string(),
  englishText: Yup.string(),
});

function NoticeResolutionDetail() {
  const location = useLocation();
  const { members, sessions, resolutionStatus } = useContext(AuthContext);
  console.log("dksfifsdpoipfosdpfiopf", location.state);
  console.log(
    "location?.state?.resolutionMoversAssociatio",
    location?.state?.resolutionMoversAssociation?.map(
      (item) => item?.memberAssociation?.id
    )
  );
  const formik = useFormik({
    initialValues: {
      //   sessionNo: location?.state?.session?.sessionName,
      sessionNo: location?.state?.session
        ? {
            value: location?.state?.session?.id,
            label: location?.state?.session?.sessionName,
          }
        : "",
      noticeOfficeDiaryNo: location?.state?.noticeDiary?.noticeOfficeDiaryNo
        ? location?.state?.noticeDiary?.noticeOfficeDiaryNo
        : "",
      noticeOfficeDiaryDate: location?.state?.noticeDiary?.noticeOfficeDiaryDate
        ? moment(
            location?.state?.noticeDiary?.noticeOfficeDiaryDate,
            "YYYY-MM-DD"
          ).toDate()
        : "",
      noticeOfficeDiaryTime: location?.state?.noticeDiary?.noticeOfficeDiaryTime
        ? location?.state?.noticeDiary?.noticeOfficeDiaryTime
        : "",
      resolutionType: location?.state?.resolutionType
        ? location?.state?.resolutionType
        : "",
      resolutionStatus: location?.state?.resolutionStatus
        ? {
            value: location?.state?.resolutionStatus?.id,
            label: location?.state?.resolutionStatus?.resolutionStatus,
          }
        : "",
      resolutionMovers:
        location?.state?.resolutionMoversAssociation.length > 0
          ? location?.state?.resolutionMoversAssociation.map((item) => ({
              value: item?.memberAssociation?.id,
              label: item?.memberAssociation?.memberName,
            }))
          : [],

      englishText: location?.state?.englishText
        ? location?.state?.englishText
        : "",
      urduText: location?.state?.urduText ? location?.state?.urduText : "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleUpdate(values);
    },
  });

  const hendleUpdate = async (values) => {
    const data = new FormData();
    data.append("fkSessionNo", values?.sessionNo?.value);
    data.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    data.append("noticeOfficeDiaryTime", values.noticeOfficeDiaryTime);
    data.append("resolutionType", values.resolutionType);
    data.append("fkResolutionStatus", values.resolutionStatus?.value);
    values?.resolutionMovers?.forEach((mover, index) => {
      data.append(`resolutionMovers[${index}][fkMemberId]`, mover.value);
    });
    // data.append("resolutionMovers[]", values.resolutionMovers?.value);
    data.append("resolutionDiaryNo", values?.noticeOfficeDiaryNo);
    data.append("englishText", values.englishText);
    data.append("urduText", values.urduText);

    try {
      const response = await UpdateResolution(location.state.id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleSendResolutionForTranslation = async () => {
    try {
      const response = await sendResolutionForTranslation(location?.state?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-resolution-detail"}
        title1={"Notice Resolution Detail"}
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
                      {/* <input
                        type="text"
                        readOnly={true}
                        placeholder={formik.values.sessionNo}
                        className={`form-control`}
                        id="sessionNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
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
                        // className="form-select"
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        type="text"
                        value={formik.values.noticeOfficeDiaryNo}
                        className={`form-control`}
                        id="noticeOfficeDiaryNo"
                        // readOnly={true}
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
                        maxDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("noticeOfficeDiaryDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat={"dd-MM-yyyy"}
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
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryTime &&
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
                        value={formik?.values?.resolutionType}
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
                      {/* <select
                        class="form-control form-select"
                        id="resolutionStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option value={"1"}>under Process</option>
                      </select> */}
                      <Select
                        options={
                          resolutionStatus &&
                          resolutionStatus?.map((item) => ({
                            value: item?.id,
                            label: item?.resolutionStatus,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "resolutionStatus",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.resolutionStatus}
                        name="resolutionStatus"
                        isClearable={true}
                        // className="form-select"
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Movers</label>
                      {/* <select
                        class="form-control form-select"
                        id="resolutionMovers"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option value={"1"}>Saqib Khan</option>
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
                          formik.setFieldValue(
                            "resolutionMovers",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.resolutionMovers}
                        name="resolutionMovers"
                        isClearable={true}
                        isMulti
                        // className="form-select"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => hendleSendResolutionForTranslation()}
                    >
                      Send for Translation
                    </button>
                  </div>
                </div>

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

                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NoticeResolutionDetail;
