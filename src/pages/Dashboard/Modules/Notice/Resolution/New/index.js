import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { createResolution, getAllSessions } from "../../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
    fkSessionNo: Yup.number().required('Session No is required'),
    noticeOfficeDiaryNo: Yup.string().required('Notice Office Diary No is required'),
    noticeOfficeDiaryDate: Yup.string().required('Notice Office Diary Date is required'),
    // noticeOfficeDiaryTime: Yup.string().required('Notice Office Diary Time is required'),
    resolutionType: Yup.string().required('Resolution Type is required'),
    resolutionMovers: Yup.array().required('Movers are required'),
    // englishText: Yup.string().required('English Text is required'),
    // urduText: Yup.string().required('Urdu Text is required'),
    // fkResolutionStatus: Yup.number().required('Resolution Status is required'),
  });

function NewResolution() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [formValues, setFormValues] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    CreateResolutionApi(formValues);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fkSessionNo: null,
      noticeOfficeDiaryNo: "",
      noticeOfficeDiaryDate: null,
      noticeOfficeDiaryTime: "",
      resolutionType: "",
      resolutionMovers: [],
      englishText: '',
      urduText: '',
      fkResolutionStatus: null,
      attachment: null
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
  
    formData.append("englishText", "English text");
    formData.append("urduText", "Urdu text");
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
  

    const getAllSessionsApi = async () => {
      try {
        const response = await getAllSessions();
        if (response?.success) {
          setSessions(response?.data);
        }
      } catch (error) {
        // showErrorMessage(error?.response?.data?.message);
      }
    };

    useEffect(() => {
      getAllSessionsApi();
    }, [])

  const moversOptions = [
    { value: 1, label: 'saqib' },
    { value: 2, label: 'umar' },
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

      <div class="dashboard-content">
        <div class="container-fluid">
          <div class="card mt-5">
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
                        formik.touched.fkSessionNo && formik.errors.fkSessionNo
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Session No"
                      value={formik.values.fkSessionNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="fkSessionNo"
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
                    </select>
                    {formik.touched.fkSessionNo && formik.errors.fkSessionNo && (
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
                          <option value="Government Resolution">Government Resolution</option>
                          <option value="Private Member Resolution">Private Member Resolution</option>
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
          <label class="form-label">Movers</label>
          <Select
            options={moversOptions}
            isMulti
            onChange={(selectedOptions) => formik.setFieldValue('resolutionMovers', selectedOptions)}
            onBlur={formik.handleBlur}
            value={formik.values.resolutionMovers}
            name="resolutionMovers"
          />
          {formik.touched.resolutionMovers && formik.errors.resolutionMovers && (
            <div class="invalid-feedback">{formik.errors.resolutionMovers}</div>
          )}
        </div>
      </div>
                  </div>

                  <div class="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Notice Office Diary Date{" "}</label>
                    <DatePicker
                      selected={formik.values.noticeOfficeDiaryDate}
                      onChange={(date) =>
                        formik.setFieldValue("noticeOfficeDiaryDate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate && (
                      <div className="invalid-feedback">
                        {formik.errors.noticeOfficeDiaryDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Notice Office Diary Time</label>
                    <input
                    className="form-control"
                    type="text"
                    id="noticeOfficeDiaryTime"
                    value={formik.values.noticeOfficeDiaryTime}
                    name="noticeOfficeDiaryTime"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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
                      formik.setFieldValue('attachment', event.currentTarget.files[0]);
                    }}
                  />
                </div>
              </div>
                  </div>

                    <div style={{ marginTop: 10 }}>
                        <Editor title={"English Text"} onChange={handleProcedureContentChange} />
                    </div>

                    <div style={{ marginTop: 70, marginBottom: 40 }}>
                        <Editor title={"Urdu Text"} onChange={handleProcedureContentChange} />
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
      <div class="footer">© Copyright AI Professionals</div>
    </Layout>
  );
}

export default NewResolution;
