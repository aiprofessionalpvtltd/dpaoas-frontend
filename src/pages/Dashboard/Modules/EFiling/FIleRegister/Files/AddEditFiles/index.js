import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { Layout } from "../../../../../../../components/Layout";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { getRegisterID, getUserData } from "../../../../../../../api/Auth";
import {
  createFiles,
  getAllFileRegister,
  getAllYear,
  geteHeadingNumberbyMainHeadingId,
  geteHeadingbyBranchId,
} from "../../../../../../../api/APIs/Services/efiling.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  mainHeading: Yup.string().required("Main Heading is required"),
  // numberOfMainHeading: Yup.string().required(
  //   "Number Of Main Heading is required"
  // ),
  // year: Yup.string().required("Year is required"),
  // serialNumber: Yup.string().required("Serial Number is required"),
  fileNumber: Yup.string().required("File Number is required"),
  subject: Yup.string().required("Subject is required"),
  // fileType: Yup.string().required("File Type is required"),
  dateOfRecord: Yup.string().optional(),
  classification: Yup.string().optional(),
  movement: Yup.string().optional(),
  // fileCategory: Yup.string().optional(),
});

function AddEditFiles() {
  const { allBranchesData } = useContext(AuthContext);
  const location = useLocation();
  const userData = getUserData();
  const navigate = useNavigate();
  const registerId = getRegisterID();
  const [yearData, setYearData] = useState([]);
  const [mainheadingData, setMainHeadingData] = useState([]);
  const [numberMainHeading, setNumberMainHeading] = useState([]);
  const [registerData, setRegisterData] = useState({});
  const [fileNumberValid, setFileNumberValid] = useState(true);
  const [selectedHeadNumber, setSelectedHeadNumber] = useState("");
  
  // const [divisionById, setDivisionById] = useState();

  const formik = useFormik({
    initialValues: {
      mainHeading: "",
      numberOfMainHeading: "",
      year: "",
      serialNumber: "",
      fileNumber: "",
      fileNumberDerived: true,
      subject: "",
      // fileType:"",
      dateOfRecord: "",
      classification: "",
      movement: "",
      fileCategory: null,
      registerDataid: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      hendleSubmit(values);
    },
  });

  const hendleSubmit = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      fkMainHeadingId: values?.mainHeading,
      // year: values?.year,
      serialNumber: values?.serialNumber,
      fileNumber: values?.fileNumber,
      fileSubject: values?.subject,
      fileType: null,
      dateOfRecording: values?.dateOfRecord,
      fileClassification: values?.classification,
      fileMovement: values?.movement,
      ...(values?.fileCategory && { fileCategory: values?.fileCategory }),
    };
    try {
      const response = await createFiles(
        location.state ? registerId : registerData?.id,
        Data
      );
      if (response.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/efiling/dashboard/file-register-list/files-list");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getAllYearApi = async () => {
    try {
      const response = await getAllYear();
      if (response.success) {
        // showSuccessMessage(response?.message)
        setYearData(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllYearApi();
  }, []);

  const handleBranch = async (event) => {
    try {
      const response = await geteHeadingbyBranchId(userData?.fkBranchId);
      if (response.success) {
        // showSuccessMessage(response?.message)
        setMainHeadingData(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // hendleMainHeading
  const hendleMainHeading = async (event) => {
    try {
      const response = await geteHeadingNumberbyMainHeadingId(
        event?.target?.value
      );
      if (response.success) {
        // showSuccessMessage(response?.message)
        setNumberMainHeading(response?.data);
        setSelectedHeadNumber(response?.data[0]?.mainHeadingNumber)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const getAllRegisterApi = async () => {
    try {
      const response = await getAllFileRegister(userData?.fkBranchId, 0, 100);
      if (response.success) {
        setRegisterData(response?.data?.fileRegisters[0]);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRegisterApi();
  }, []);

  useEffect(() => {
    handleBranch();
  }, []);

  useEffect(() => {
    // Set the value of the fileNumber field if it's derived
      const fileNumber = `F.No. ${selectedHeadNumber} (${formik.values.serialNumber}) - ${registerData?.year}`;
      formik.setFieldValue("fileNumber", fileNumber);
  }, [selectedHeadNumber, formik.values.serialNumber, registerData]);
  
  // Handle onChange event for the fileNumber field
  const handleFileNumberChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <Layout
      module={false}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      {/* <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-register-list/files-list"} title1={"Register Index"} title2={"Create File"} addLink2={"/efiling/dashboard/file-register-list/files-list/addedit-file"} width={"500px"} /> */}
      <ToastContainer />

      <div class="container-fluid">
        <div className="row">
          <div className="col">
            <div
              class="top-head-left"
              style={{ marginLeft: "15px", marginBottom: "15px" }}
            >
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>S-92</p>
              <p style={{ fontSize: "15px", marginBottom: "5px" }}>
                (See Appendix E-Instructions)
              </p>
              <p style={{ fontSize: "15px", marginBottom: "5px" }}>
                Secretariat Instructions
              </p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Update File</h1>
            ) : (
              <h1>Create File</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Register</label>
                      <select
                        className={`form-select`}
                        id="registerDataid"
                        name="registerDataid"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={registerData?.year}
                        disabled
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {/* {mainheadingData && mainheadingData?.filter((filteredItem) => filteredItem?.status === "active")?.map((item) => (
                          
                        ))} */}
                        {/* {registerData &&
                          registerData.map((item) => ( */}
                            <option value={registerData?.id}>{registerData?.year}</option>
                          {/* ))} */}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Main Head</label>
                      <select
                        className={`form-select ${
                          formik.touched.mainHeading &&
                          formik.errors.mainHeading
                            ? "is-invalid"
                            : ""
                        }`}
                        id="mainHeading"
                        name="mainHeading"
                        onChange={(event) => {
                          formik.handleChange(event);
                          hendleMainHeading(event); // Call handleBranch function
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.mainHeading}
                      >
                        <option value={""} selected>
                          Select
                        </option>
                        {mainheadingData &&
                          mainheadingData
                            ?.filter(
                              (filteredItem) =>
                                filteredItem?.status === "active"
                            )
                            ?.map((item) => (
                              <option value={item.id}>
                                {item?.mainHeading}
                              </option>
                            ))}
                      </select>
                      {formik.touched.mainHeading &&
                        formik.errors.mainHeading && (
                          <div className="invalid-feedback">
                            {formik.errors.mainHeading}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Head Number</label>
                      <select
                        className={`form-select ${
                          formik.touched.numberOfMainHeading &&
                          formik.errors.numberOfMainHeading
                            ? "is-invalid"
                            : ""
                        }`}
                        id="numberOfMainHeading"
                        name="numberOfMainHeading"
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        value={selectedHeadNumber}
                        disabled
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {numberMainHeading &&
                          numberMainHeading.map((item) => (
                            <option value={item.id}>
                              {item?.mainHeadingNumber}
                            </option>
                          ))}
                      </select>
                      {formik.touched.numberOfMainHeading &&
                        formik.errors.numberOfMainHeading && (
                          <div className="invalid-feedback">
                            {formik.errors.numberOfMainHeading}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Serial Number</label>
                      <input
                        type="text"
                        placeholder={"Serial Number"}
                        value={formik.values.serialNumber}
                        className={`form-control ${
                          formik.touched.serialNumber &&
                          formik.errors.serialNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="serialNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.serialNumber &&
                        formik.errors.serialNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.serialNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  {/* <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Year</label>
                      <select
                        className={`form-select ${
                          formik.touched.year && formik.errors.year
                            ? "is-invalid"
                            : ""
                        }`}
                        id="year"
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                      >
                        <option value={""} selected>
                          Select
                        </option>
                        {yearData &&
                          yearData?.map((item) => (
                            <option value={item?.year}>{item?.year}</option>
                          ))}
                      </select>
                      {formik.touched.year && formik.errors.year && (
                        <div className="invalid-feedback">
                          {formik.errors.year}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>

                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">File Number</label>
                      <input
                        type="text"
                        placeholder={"File Number"}
                        value={formik.values.fileNumber}
                        className={`form-control ${
                          formik.touched.fileNumber && formik.errors.fileNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fileNumber"
                        onChange={handleFileNumberChange}
                        onBlur={formik.handleBlur}
                        disabled={fileNumberValid ? true : false}
                      />
                      {formik.touched.fileNumber &&
                        formik.errors.fileNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.fileNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-1">
                    <div style={{ marginTop: "35px" }}>
                      <div class="form-check">
                        <input
                          class={`form-check-input`}
                          type="checkbox"
                          id="fileNumberEdit"
                          checked={fileNumberValid}
                          onChange={() => {
                              setFileNumberValid(!fileNumberValid);
                            }
                          }
                        />
                        <label class="form-check-label" for="fileNumberEdit">
                          Valid
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Subject</label>
                      <input
                        type="text"
                        placeholder={"Subject"}
                        value={formik.values.subject}
                        className={`form-control ${
                          formik.touched.subject && formik.errors.subject
                            ? "is-invalid"
                            : ""
                        }`}
                        id="subject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <div className="invalid-feedback">
                          {formik.errors.subject}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">File Type</label>
                      <select
                        className={`form-select ${formik.touched.fileType && formik.errors.fileType
                            ? "is-invalid"
                            : ""
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
                        <option value={"Urgent"}>Urgent</option>
                        <option value={"Priority"}>Priority</option>
                        <option value={"Immediate"}>Immediate</option>
                        <option value={"Routine"}>Routine</option>
                      </select>
                      {formik.touched.fileType && formik.errors.fileType && (
                        <div className="invalid-feedback">
                          {formik.errors.fileType}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>

                <div
                  class="row"
                  style={{
                    background: "rgb(242, 242, 242)",
                    padding: "20px 20px 0 20px",
                  }}
                >
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Data Of Record</label>
                      <input
                        type="text"
                        placeholder={"Data Of Record"}
                        value={formik.values.dateOfRecord}
                        className={`form-control`}
                        id="dateOfRecord"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Category</label>
                      <select
                        className={`form-select`}
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
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Classification</label>
                      <input
                        type="text"
                        placeholder={"Classification"}
                        value={formik.values.classification}
                        className={`form-control`}
                        id="classification"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>

                <div
                  className="row"
                  style={{
                    background: "rgb(242, 242, 242)",
                    padding: "0 20px",
                  }}
                >
                  <div class="col-9">
                    <div class="mb-3">
                      <label className="form-label">Movement</label>
                      <textarea
                        className={`form-control`}
                        id="movement"
                        placeholder="Enter Movement..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.movement}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col p-0">
                    <button class="btn btn-primary float-end" type="submit">
                      Create FIle
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditFiles;
