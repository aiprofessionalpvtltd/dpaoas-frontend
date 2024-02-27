import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import Select from "react-select";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { createEfiling } from "../../../../../api/APIs/Services/efiling.service";
import { useContext } from "react";
import { AuthContext } from "../../../../../api/AuthContext";
import { getDepartment } from "../../../../../api/APIs/Services/organizational.service";
import { getBranches } from "../../../../../api/APIs/Services/Branches.services";
import { getUserData } from "../../../../../api/Auth";

const validationSchema = Yup.object({
  fileNumber: Yup.string().required("File No is required"),
  fileSubject: Yup.string().required("File Subject is required"),
  priority: Yup.string().required("Priority is required"),
  fileCategory: Yup.string().required("File Category is required"),
  fileType: Yup.string().required("Document Type is required"),
  fkBranchId: Yup.string().optional(),
  fkdepartmentId: Yup.string().optional(),
  fkMinistryId: Yup.string().optional(),
  receivedOn: Yup.string().optional(),
  year: Yup.string().required("Year is required"),
  attachment: Yup.string().required("Attachment is required")
});

function AddEditFileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentTypeVal, setDocumentTypeVal] = useState('');
  const { ministryData } = useContext(AuthContext)
  const [departmentData, setDepartmentData] = useState([])
  const [branchesData, setBranchesData] = useState([])

  const UserData = getUserData()
  const yaerData = [
    {
      name: "2024"
    },
    {
      name: "2023"
    },
    {
      name: "2022"
    },
    {
      name: "2021"
    }, {
      name: "2020"
    },
    {
      name: "2019"
    },
    {
      name: "2018"
    },
    {
      name: "2017"
    },
    {
      name: "2016"
    },
    {
      name: "2015"
    }
  ]
  // const [divisionById, setDivisionById] = useState();

  const formik = useFormik({
    initialValues: {
      fileNumber: "",
      fileSubject: "",
      priority: "",
      fileCategory: "",
      fileType: "",
      fkBranchId: "",
      fkdepartmentId: "",
      fkMinistryId: "",
      receivedOn: "",
      year: "",
      attachment: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      CreateEfilingApi(values)
    },
  });

  const CreateEfilingApi = async (values) => {
    const formData = new FormData()
    formData.append('fileNumber', values?.fileNumber);
    formData.append('fileSubject', values?.fileSubject);
    formData.append('priority', values?.priority);
    formData.append('fileCategory', values?.fileCategory);
    formData.append('fileType', values?.fileType);
    formData.append('attachment', values?.attachment)
    formData.append('assignedTo', UserData?.fkUserId)
    if (values?.fkBranchId) {
      formData.append('fkBranchId', values?.fkBranchId);
    }
    if (values?.fkdepartmentId) {
      formData.append('fkdepartmentId', values?.fkdepartmentId);
    }
    if (values?.fkMinistryId) {
      formData.append('fkMinistryId', values?.fkMinistryId);
    }
    if (values?.receivedOn) {
      formData.append('receivedOn', values?.receivedOn);
    }
    formData.append('year', values?.year);

    try {
      const response = await createEfiling(formData)
      if (response?.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
          navigate("/efiling/dashboard/files")
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  // const files = [
  //   {
  //     id: 1,
  //     fileName: "8(14)/2022/IT",
  //   },
  //   {
  //     id: 2,
  //     fileName: "8(14)/2023/QMS",
  //   },
  //   {
  //     id: 3,
  //     fileName: "8(14)/2024/IT",
  //   },
  // ];

  const handleDocumentType = (e) => {
    setDocumentTypeVal(e.target.value);
  }

  const getDepartmentData = async () => {
    try {
      const response = await getDepartment(0, 50);
      if (response?.success) {
        setDepartmentData(response?.data?.departments);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const getBranchesapi = async () => {
    try {
      const response = await getBranches(0, 50);
      if (response?.success) {
        setBranchesData(response?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getBranchesapi()
    getDepartmentData();
  }, [])

  return (
    <Layout centerlogohide={true} >
      <div className="dashboard-content" style={{ marginTop: 80 }}>
        <Header
          dashboardLink={"/"}
          addLink1={"/efiling/dashboard/files"}
          title1={"E-Filing"}
          addLink2={"/efiling/dashboard/addedit"}
          title2={location && location?.state ? "Edit File" : "Create File"}
          width={"500px"}
        />
        <ToastContainer />

        <div class="container-fluid">
          <div class="card">
            <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
              {location && location.state ? <h1>Edit File</h1> : <h1>Create File</h1>}
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">File Number</label>
                        <input
                          type="text"
                          placeholder={"File Number"}
                          value={formik.values.fileNumber}
                          className={`form-control ${formik.touched.fileNumber && formik.errors.fileNumber ? "is-invalid" : ""
                            }`}
                          id="fileNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.fileNumber && formik.errors.fileNumber && (
                          <div className="invalid-feedback">{formik.errors.fileNumber}</div>
                        )}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Subject</label>
                        <input
                          type="text"
                          placeholder={"File Subject"}
                          value={formik.values.fileSubject}
                          className={`form-control ${formik.touched.fileSubject && formik.errors.fileSubject ? "is-invalid" : ""
                            }`}
                          id="fileSubject"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.fileSubject && formik.errors.fileSubject && (
                          <div className="invalid-feedback">{formik.errors.fileSubject}</div>
                        )}

                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Priority</label>
                        <select
                          className={`form-select ${formik.touched.priority && formik.errors.priority ? "is-invalid" : ""
                            }`}
                          id="priority"
                          name="priority"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.priority}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"Normal"}>Normal</option>
                          <option value={"Immediate"}>Immediate</option>
                        </select>
                        {formik.touched.priority && formik.errors.priority && (
                          <div className="invalid-feedback">{formik.errors.priority}</div>
                        )}
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">File Category</label>
                        <select
                          className={`form-select ${formik.touched.fileCategory && formik.errors.fileCategory ? "is-invalid" : ""
                            }`}
                          id="fileCategory"
                          name="fileCategory"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fileCategory}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"A"}>A</option>
                          <option value={"B"}>B</option>
                        </select>
                        {formik.touched.fileCategory && formik.errors.fileCategory && (
                          <div className="invalid-feedback">{formik.errors.fileCategory}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Document Type</label>
                        <select
                          className={`form-select ${formik.touched.fileType && formik.errors.fileType ? "is-invalid" : ""
                            }`}
                          id="fileType"
                          name="fileType"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fileType}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"Internal"}>Internal</option>
                          <option value={"External"}>External</option>
                        </select>
                        {formik.touched.fileType && formik.errors.fileType && (
                          <div className="invalid-feedback">{formik.errors.fileType}</div>
                        )}
                      </div>
                    </div>

                    {formik.values.fileType === "Internal" ? (
                      <>
                        <div class="col-6">
                          <div class="mb-3">
                            <label class="form-label">Branch</label>
                            <select
                              class="form-select"
                              id="fkBranchId"
                              name="fkBranchId"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkBranchId}
                            >
                              <option value={""} selected disabled hidden>
                                Select
                              </option>
                              {branchesData &&
                                branchesData?.map((item) => (
                                  <option value={item.id}>{item.branchName}</option>
                                ))}
                            </select>
                          </div>
                        </div>

                        {/* <div class="col-3">
                          <div class="mb-3">
                            <label class="form-label">Department</label>
                            <select
                              class="form-select"
                              id="fkdepartmentId"
                              name="fkdepartmentId"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkdepartmentId}
                            >
                              <option value={""} selected disabled hidden>
                                Select
                              </option>
                              {departmentData &&
                                departmentData?.map((item) => (
                                  <option value={item.id}>{item.departmentName}</option>
                                ))}
                            </select>
                          </div>
                        </div> */}
                      </>
                    ) : formik.values.fileType === "External" ? (
                      <>
                        <div class="col-3">
                          <div class="mb-3">
                            <label class="form-label">Ministries</label>
                            <select
                              class="form-select"
                              id="fkMinistryId"
                              name="fkMinistryId"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkMinistryId}
                            >
                              <option value={""} selected disabled hidden>
                                Select
                              </option>
                              {ministryData &&
                                ministryData.map((item) => (
                                  <option value={item.id}>{item.ministryName}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="mb-3" style={{ position: "relative" }}>
                            <label className="form-label">Received On</label>
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
                              selected={formik.values.receivedOn}
                              onChange={(date) =>
                                formik.setFieldValue("receivedOn", date)
                              }
                              onBlur={formik.handleBlur}
                              minDate={new Date()}
                              className={`form-control ${formik.touched.receivedOn && formik.errors.receivedOn
                                ? "is-invalid"
                                : ""
                                }`}
                            />
                            {formik.touched.receivedOn && formik.errors.receivedOn && (
                              <div className="invalid-feedback">
                                {formik.errors.receivedOn}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Year</label>
                        <select
                          className={`form-select ${formik.touched.year && formik.errors.year ? "is-invalid" : ""
                            }`}
                          id="year"
                          name="year"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.year}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>

                          {yaerData &&
                            yaerData?.map((item) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        {formik.touched.year && formik.errors.year && (
                          <div className="invalid-feedback">
                            {formik.errors.year}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Attach FIle
                        </label>
                        <input
                          className={`form-control ${formik.touched.attachment && formik.errors.attachment
                            ? "is-invalid"
                            : ""
                            }`}
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          id="attachment"
                          name="attachment"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "attachment",
                              event.currentTarget.files[0],
                            );
                          }}
                        />
                        {formik.touched.attachment && formik.errors.attachment && (
                          <div className="invalid-feedback">
                            {formik.errors.attachment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary float-end" type="submit">
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

export default AddEditFileForm;
