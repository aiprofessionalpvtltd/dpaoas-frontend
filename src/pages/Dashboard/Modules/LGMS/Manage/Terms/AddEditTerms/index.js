import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems, QMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import { createTerm, getAllTenures, getTermByID, updateTerm } from "../../../../../../../api/APIs/Services/ManageQMS.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  termName: Yup.string().required("Term name is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  tenureId: Yup.string().required("Tenure ID is required"),
});
function LGMSAddEditTermsForm() {
  const location = useLocation();
  const [tenures, setTenures] = useState([]);
  const [termsById, setTermsById] = useState();

  const formik = useFormik({
    initialValues: {
      termName: "",
      startDate: "",
      endDate: "",
      tenureId: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditTerms(values);
      } else {
        handleCreateTerms(values);
      }
    },
  });

  const handleCreateTerms = async (values) => {
    const data = {
      termName: values?.termName,
      fkTenureId: Number(values?.tenureId),
      fromDate: values?.startDate,
      toDate: values?.endDate
    }

    try {
      const response = await createTerm(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditTerms = async (values) => {
    const data = {
      termName: values?.termName,
      fkTenureId: Number(values?.tenureId),
      fromDate: values?.startDate,
      toDate: values?.endDate
    }
    try {
      const response = await updateTerm(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleTenures = async () => {
    try {
      const response = await getAllTenures(0, 100);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const getTermByIdApi = async () => {
    try {
      const response = await getTermByID(location.state?.id);
      if (response?.success) {
        setTermsById(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleTenures();
    if (location.state?.id) {
      getTermByIdApi();
    }
  }, [])

  useEffect(() => {
    // Update form values when termsById changes
    if (termsById) {
      formik.setValues({
        termName: termsById.termName || "",
        startDate: new Date(termsById.fromDate) || "",
        endDate: new Date(termsById.toDate) || "",
        tenureId: termsById.fkTenureId || ""
      });
    }
  }, [termsById, formik.setValues]);

  return (
    <Layout module={true} sidebarItems={LegislationSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/terms/list"}
        title1={"Terms"}
        addLink2={"/lgms/dashboard/manage/terms/addedit"}
        title2={location && location?.state ? "Edit Terms" : "Add Terms"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? <h1>Edit Terms</h1> : <h1>Add Terms</h1>}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Term Name</label>
                      <input
                        type="text"
                        placeholder={"Term Name"}
                        value={formik.values.termName}
                        className={`form-control ${
                          formik.touched.termName && formik.errors.termName ? "is-invalid" : ""
                        }`}
                        id="termName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.termName && formik.errors.termName && (
                        <div className="invalid-feedback">{formik.errors.termName}</div>
                      )}
                    </div>
                  </div>

                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Tenure ID</label>
                        <select class="form-select"
                          id="tenureId"
                          name="tenureId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.tenureId}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            {tenures.length > 0 && tenures.map((tenure) => (
                              <option value={tenure?.id}>{tenure?.tenureName}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                </div>
                <div class="row">
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Start Date</label>
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
                        selected={formik.values.startDate}
                        onChange={(date) =>
                          formik.setFieldValue("startDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">End Date</label>
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
                        selected={formik.values.endDate}
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">
                          {formik.errors.endDate}
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
    </Layout>
  );
}

export default LGMSAddEditTermsForm;