import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import {
  createParliamentaryYears,
  getAllTenures,
  updateParliamentaryYears,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  parliamentaryTenure: Yup.string().required("Tenure is required"),
  fkTenureId: Yup.string().required("Tenure ID is required"),
  fromDate: Yup.string().required("From Date is required"),
  toDate: Yup.string().required("To Date is required"),
  description: Yup.string().required("Description is required"),
});
function LGMSAddEditParliamentaryYearForm() {
  const location = useLocation();
  const [tenures, setTenures] = useState([]);

  console.log("location.state", location.state);
  const formik = useFormik({
    initialValues: {
      parliamentaryTenure: location.state
        ? location.state?.parliamentaryTenure
        : "",
      fkTenureId: location.state ? location?.state?.tenure?.id : "",
      fromDate: location.state ? new Date(location.state?.fromDate) : "",
      toDate: location.state ? new Date(location.state?.toDate) : "",
      description: location.state ? location.state?.description : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditParliamentaryYear(values);
      } else {
        handleCreateParliamentaryYear(values);
      }
    },
  });

  const handleTenures = async () => {
    try {
      const response = await getAllTenures(0, 100);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleCreateParliamentaryYear = async (values) => {
    const data = {
      parliamentaryTenure: values.parliamentaryTenure,
      fkTenureId: values.fkTenureId,
      fromDate: values.fromDate,
      toDate: values.toDate,
      description: values.description,
    };

    try {
      const response = await createParliamentaryYears(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditParliamentaryYear = async (values) => {
    const data = {
      parliamentaryTenure: values.parliamentaryTenure,
      fkTenureId: values.fkTenureId,
      fromDate: values.fromDate,
      toDate: values.toDate,
      description: values.description,
    };

    try {
      const response = await updateParliamentaryYears(
        location?.state?.id,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleTenures();
  }, []);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/parliamentary-year/list"}
        title1={"Parliamentary Year"}
        addLink2={"/lgms/dashboard/manage/parliamentary-year/addedit"}
        title2={
          location && location?.state
            ? "Edit Parliamentary Year"
            : "Add Parliamentary Year"
        }
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Parliamentary Year</h1>
            ) : (
              <h1>Add Parliamentary Year</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Parliamentary Tenure</label>
                      <input
                        type="text"
                        placeholder={formik.values.parliamentaryTenure}
                        className={`form-control ${
                          formik.touched.parliamentaryTenure &&
                          formik.errors.parliamentaryTenure
                            ? "is-invalid"
                            : ""
                        }`}
                        id="parliamentaryTenure"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.parliamentaryTenure &&
                        formik.errors.parliamentaryTenure && (
                          <div className="invalid-feedback">
                            {formik.errors.parliamentaryTenure}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Tenure ID</label>

                      <select
                        class="form-select"
                        id="fkTenureId"
                        name="fkTenureId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          location.state?.tenure?.id ||
                          formik.values.fkTenureId ||
                          ""
                        }
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        {tenures.length > 0 &&
                          tenures.map((tenure) => (
                            <option value={tenure?.id}>
                              {tenure?.tenureName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.fkTenureId &&
                        formik.errors.fkTenureId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkTenureId}
                          </div>
                        )}
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
                        selected={formik.values.fromDate}
                        onChange={(date) =>
                          formik.setFieldValue("fromDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.fromDate && formik.errors.fromDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.fromDate && formik.errors.fromDate && (
                        <div className="invalid-feedback">
                          {formik.errors.fromDate}
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
                        selected={formik.values.toDate}
                        onChange={(date) =>
                          formik.setFieldValue("toDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.toDate && formik.errors.toDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.toDate && formik.errors.toDate && (
                        <div className="invalid-feedback">
                          {formik.errors.toDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className={`form-control`}
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
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

export default LGMSAddEditParliamentaryYearForm;
