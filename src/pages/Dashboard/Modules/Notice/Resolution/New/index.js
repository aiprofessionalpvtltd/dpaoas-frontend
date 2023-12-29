import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { createResolution, getAllSessions } from "../../../../../../api/APIs";
import TimePicker from "react-time-picker";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  fkSessionNo: Yup.number().required("Session No is required"),
  noticeOfficeDiaryNo: Yup.string().required(
    "Notice Office Diary No is required",
  ),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required",
  ),
  // noticeOfficeDiaryTime: Yup.string().required('Notice Office Diary Time is required'),
  resolutionType: Yup.string().required("Resolution Type is required"),
  resolutionMovers: Yup.array().required("Movers are required"),
  // englishText: Yup.string().required('English Text is required'),
  // urduText: Yup.string().required('Urdu Text is required'),
  // fkResolutionStatus: Yup.number().required('Resolution Status is required'),
});

function NewResolution() {
  const navigate = useNavigate();
  const { members, sessions } = useContext(AuthContext);
  console.log("members", members);
  const [showModal, setShowModal] = useState(false);

  const [formValues, setFormValues] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    CreateResolutionApi(formValues);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fkSessionNo: sessions[0]?.id,
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDate: null,
      noticeOfficeDiaryTime: "",
      resolutionType: "",
      resolutionMovers: [],
      englishText: "",
      urduText: "",
      fkResolutionStatus: null,
      attachment: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleShow();
      setFormValues(values);
    },
    enableReinitialize: true,
  });

  const CreateResolutionApi = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionNo", values.fkSessionNo);
    formData.append("noticeOfficeDiaryNo", Number(values.noticeOfficeDiaryNo));
    formData.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    formData.append("noticeOfficeDiaryTime", "11:40am");
    formData.append("resolutionType", values.resolutionType);

    // Assuming resolutionMovers is an array of objects with a fkMemberId property
    values.resolutionMovers.forEach((mover, index) => {
      formData.append(`resolutionMovers[${index}][fkMemberId]`, mover.value);
    });

    formData.append("englishText", values.englishText);
    formData.append("urduText", values.urduText);
    formData.append("fkResolutionStatus", 1);
    formData.append("attachment", values.attachment);

    try {
      const response = await createResolution(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const moversOptions = [
    { value: 1, label: "saqib" },
    { value: 2, label: "umar" },
    // Add other options as needed
  ];

  const handleProcedureContentChange = (content) => {
    console.log(content);
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
        addLink1={"/notice/dashboard"}
        addLink2={"/notice/resolution/new"}
        title1={"Notice"}
        title2={"New Resolution"}
      />

      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>NEW RESOLUTION</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Session No</label>
                        <select
                          class={`form-select ${
                            formik.touched.fkSessionNo &&
                            formik.errors.fkSessionNo
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Session No"
                          value={formik.values.fkSessionNo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="fkSessionNo"
                        >
                          <option value={sessions[0]?.id} selected disabled>
                            {sessions[0]?.sessionName}
                          </option>
                        </select>
                        {formik.touched.fkSessionNo &&
                          formik.errors.fkSessionNo && (
                            <div className="invalid-feedback">
                              {formik.errors.fkSessionNo}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Notice Office Diary No</label>
                        <input
                          className="form-control"
                          type="number"
                          id="noticeOfficeDiaryNo"
                          value={formik.values.noticeOfficeDiaryNo}
                          name="noticeOfficeDiaryNo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo && (
                            <div class="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryNo}
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
                          class={`form-select ${
                            formik.touched.resolutionType &&
                            formik.errors.resolutionType
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionType || ""}
                          name="resolutionType"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
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
                        {formik.touched.resolutionType &&
                          formik.errors.resolutionType && (
                            <div class="invalid-feedback">
                              {formik.errors.resolutionType}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Member Senate</label>
                        <Select
                          options={members.map((item) => ({
                            value: item.id,
                            label: item.memberName,
                          }))}
                          isMulti
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "resolutionMovers",
                              selectedOptions,
                            )
                          }
                          onBlur={formik.handleBlur}
                          value={formik.values.resolutionMovers}
                          name="resolutionMovers"
                        />
                        {formik.touched.resolutionMovers &&
                          formik.errors.resolutionMovers && (
                            <div class="invalid-feedback">
                              {formik.errors.resolutionMovers}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">
                          Notice Office Diary Date{" "}
                        </label>
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
                          minDate={new Date()}
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
                        />
                        {formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate && (
                            <div className="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryDate}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">
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
                          className={`form-control`}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Attachment
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          id="formFile"
                          name="attachment"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "attachment",
                              event.currentTarget.files[0],
                            );
                          }}
                        />
                      </div>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewResolution;
