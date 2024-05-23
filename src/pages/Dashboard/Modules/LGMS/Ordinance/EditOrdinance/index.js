import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  createNewOrdinance,
  getSingleOrdinanceByID,
  updatedOrdinance,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { getUserData } from "../../../../../../api/Auth";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import moment from "moment";
function EditOrdinance() {
  const location = useLocation();
  const navigate = useNavigate();

  const { sessions } = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNACalendarOpen, setIsNACalendarOpen] = useState(false);
  const [isDocumentCalendarOpen, setIsDocumnetCalendarOpen] = useState(false);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [singleOrdinanceData, setSingleOrdinanceData] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  const userData = getUserData();

  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("dateOfLayingInTheSenate", date);
    setIsCalendarOpen(false);
  };
  // Handle Claneder Toggel
  const handleNACalendarToggle = () => {
    setIsNACalendarOpen(!isNACalendarOpen);
  };
  // Handale DateCHange
  const handleNADateSelect = (date) => {
    formik.setFieldValue("dateOfLayingInTheNA", date);
    setIsNACalendarOpen(false);
  };

  const handleDocumentCalendarToggle = () => {
    setIsDocumnetCalendarOpen(!isDocumentCalendarOpen);
  };
  // Handale DateCHange
  const handleDocumentDateSelect = (date) => {
    formik.setFieldValue("documentDate", date);
    setIsDocumnetCalendarOpen(false);
  };

  const GetParlimentaryYearsApi = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 300);
      if (response.success) {
        setParliamentaryYearData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetParlimentaryYearsApi();
  }, []);

  const formik = useFormik({
    initialValues: {
      fkParliamentaryYearId: "",
      fkSessionId: "",
      dateOfLayingInTheNA: "",
      dateOfLayingInTheSenate: "",
      ordinanceTitle: "",
      ordinanceRemarks: "",
      ordinanceStatusDate: "",
      documentDate: "",
      documentDiscription: "",
      ordinanceStatus: "",
      file: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        updateOrdinance(values);
      }
    },
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
    const links = selectedFiles.map((file) => URL.createObjectURL(file));
    setImageLinks(links);
    formik.setFieldValue("file", event.currentTarget.files);
  };

  const getOrdinanceByIdApi = async () => {
    try {
      const response = await getSingleOrdinanceByID(
        location.state && location.state?.id
      );
      if (response?.success) {
        setSingleOrdinanceData(response?.data[0]);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getOrdinanceByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (singleOrdinanceData) {
      formik.setValues({
        fkParliamentaryYearId: singleOrdinanceData?.fkParliamentaryYearId || "",
        ordinanceTitle: singleOrdinanceData?.ordinanceTitle || "",
        dateOfLayingInTheNA: singleOrdinanceData?.dateOfLayingInTheNA
          ? moment(singleOrdinanceData?.dateOfLayingInTheNA).toDate()
          : "",
        dateOfLayingInTheSenate: singleOrdinanceData?.dateOfLayingInTheSenate
          ? moment(singleOrdinanceData?.dateOfLayingInTheSenate).toDate()
          : "",
        fkSessionId: singleOrdinanceData?.fkSessionId,
        ordinanceTitle: singleOrdinanceData?.ordinanceTitle
          ? singleOrdinanceData?.ordinanceTitle
          : "",
        ordinanceRemarks: singleOrdinanceData?.ordinanceRemarks
          ? singleOrdinanceData?.ordinanceRemarks
          : "",
        documentDiscription: singleOrdinanceData?.documentDiscription
          ? singleOrdinanceData?.documentDiscription
          : "",
        documentDate: singleOrdinanceData?.documentDate
          ? moment(singleOrdinanceData?.documentDate).toDate()
          : "",
        ordinanceStatus: singleOrdinanceData?.ordinanceStatus
          ? singleOrdinanceData?.ordinanceStatus
          : "",
        // file: singleOrdinanceData?.file ? singleOrdinanceData?.file : "",
      });
    }
  }, [singleOrdinanceData, formik.setValues]);

  const updateOrdinance = async (values) => {
    const formData = new FormData();
    formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("fkUserId", userData && userData?.id);
    formData.append("ordinanceTitle", values?.ordinanceTitle);
    formData.append("ordinanceRemarks", values?.ordinanceRemarks);
    formData.append("documentDiscription", values?.documentDiscription);
    formData.append(
      "documentDate",
      values?.documentDate ? values?.documentDate : ""
    );
    formData.append("ordinanceStatus", values?.ordinanceStatus);
    if (values?.file) {
      Array.from(values?.file).map((file, index) => {
        formData.append(`file`, file);
      });
    }

    try {
      const response = await updatedOrdinance(location?.state?.id, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/ordinances/ordinance-list");
        }, [3000]);
      }
    } catch (error) {
      console.log("error");
      // showErrorMessage(error?.response?.data?.message);
    }
  };
  // const updateOrdinance = async (values) => {
  //   const formData = new FormData();
  //   formData.append("fkParliamentaryYearId", values?.fkParliamentaryYearId);
  //   formData.append("fkSessionId", values?.fkSessionId);
  //   formData.append("fkUserId", userData && userData?.id);
  //   formData.append("ordinanceTitle", values?.ordinanceTitle);
  //   formData.append("ordinanceRemarks", values?.ordinanceRemarks);
  //   formData.append("documentDiscription", values?.documentDiscription);
  //   formData.append("documentDate", values?.documentDate);
  //   formData.append("ordinanceStatus", values?.ordinanceStatus);
  //   if (values?.file) {
  //     Array.from(values?.file).map((file, index) => {
  //       formData.append(`file`, file);
  //     });
  //   }

  //   try {
  //     const response = await updatedOrdinance(location?.state?.id, formData);
  //     console.log("response", response);
  //     if (response?.success) {
  //       showSuccessMessage(response?.message);
  //       formik.resetForm();
  //       setTimeout(() => {
  //         navigate("/lgms/dashboard/ordinances/ordinance-list");
  //       }, [3000]);
  //     }
  //     console.log(response?.data);
  //   } catch (error) {}
  // };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={location?.state ? "Edit Ordinance" : ""}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>Edit Ordinance</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Parliamentary Year</label>
                    <select
                      id="fkParliamentaryYearId"
                      name="fkParliamentaryYearId"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.fkParliamentaryYearId}
                    >
                      <option value="" disabled hidden>
                        Select Parliamentary Year
                      </option>
                      {parliamentaryYearData &&
                        parliamentaryYearData.map((item) => (
                          <option value={item.id}>
                            {item.parliamentaryTenure}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Session</label>
                    <select
                      id="fkSessionId"
                      name="fkSessionId"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.fkSessionId}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions &&
                        sessions.map((item) => (
                          <option value={item.id}>{item.sessionName}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">Documnent Date</label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      onClick={handleCalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.dateOfLayingInTheSenate}
                      onChange={handleDateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.dateOfLayingInTheSenate &&
                        formik.errors.dateOfLayingInTheSenate
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isCalendarOpen}
                      onClickOutside={() => setIsCalendarOpen(false)}
                      onInputClick={handleCalendarToggle}
                      // onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                    />
                    {formik.touched.dateOfLayingInTheSenate &&
                      formik.errors.dateOfLayingInTheSenate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.dateOfLayingInTheSenate}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">
                      Date of Laying in the National Assembly
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
                        cursor: "pointer",
                      }}
                      onClick={handleNACalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.dateOfLayingInTheNA}
                      onChange={handleNADateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.dateOfLayingInTheNA &&
                        formik.errors.dateOfLayingInTheNA
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isNACalendarOpen}
                      onClickOutside={() => setIsNACalendarOpen(false)}
                      onInputClick={handleNACalendarToggle}
                      // onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                    />
                    {formik.touched.dateOfLayingInTheNA &&
                      formik.errors.dateOfLayingInTheNA && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.dateOfLayingInTheNA}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <textarea
                      name="ordinanceTitle"
                      id="ordinanceTitle"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ordinanceTitle}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col">
                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      name="ordinanceRemarks"
                      id="ordinanceRemarks"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ordinanceRemarks}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className=" col">
                  <div className="mb-3">
                    <label className="form-label">Document Description</label>
                    <textarea
                      name="documentDiscription"
                      id="documentDiscription"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.documentDiscription}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className=" col">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">Document Date</label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      onClick={handleDocumentCalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.documentDate}
                      onChange={handleDocumentDateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.documentDate &&
                        formik.errors.documentDate
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isDocumentCalendarOpen}
                      onClickOutside={() => setIsDocumnetCalendarOpen(false)}
                      onInputClick={handleDocumentCalendarToggle}
                      // onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                    />
                    {formik.touched.documentDate &&
                      formik.errors.documentDate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.documentDate}
                        </div>
                      )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      Attach Document File{" "}
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      id="formFile"
                      name="file"
                      multiple
                      // onChange={(event) => {
                      //   formik.setFieldValue(
                      //     "file",
                      //     event.currentTarget.files
                      //   );
                      // }}
                      onChange={handleFileChange}
                    />

                    {imageLinks.length > 0 && (
                      <div>
                        <div className="col ">
                          {imageLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mx-1"
                            >
                              Image {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default EditOrdinance;
