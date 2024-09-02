import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import {
  createParliamentaryYears,
  getAllTenures,
  getAllTerms,
  getParliamentaryYearsByID,
  getTermByTenureID,
  updateParliamentaryYears,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import moment from "moment";
const validationSchema = Yup.object({
  parliamentaryTenure: Yup.string().required("Tenure is required"),
  fkTenureId: Yup.string().required("Tenure ID is required"),
  fromDate: Yup.string().required("From Date is required"),
  toDate: Yup.string().required("To Date is required"),
  description: Yup.string().required("Description is required"),
});
function LGMSAddEditParliamentaryYearForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [singleParliamentaryYear, setSingleParliamentaryYear] = useState([]);

  const [tenures, setTenures] = useState([]);
  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [selectedTenureType, setSelectedTenureType] = useState(null);

  const formik = useFormik({
    // initialValues: {
    //   parliamentaryTenure: location.state
    //     ? location.state?.parliamentaryTenure
    //     : "",
    //   fkTenureId: location.state ? location?.state?.tenure?.id : "",
    //   fkTermId: location.state ? location.state?.fkTermId : "",
    //   fromDate: location.state ? new Date(location.state?.fromDate) : "",
    //   toDate: location.state ? new Date(location.state?.toDate) : "",
    //   description: location.state ? location.state?.description : "",
    // },
    initialValues: {
      parliamentaryTenure: "",
      fkTenureId: "",
      fkTermId: "",
      fromDate: "",
      toDate: "",
      description: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        handleEditParliamentaryYear(values);
      } else {
        handleCreateParliamentaryYear(values);
      }
    },
  });

  // Handel Tenures
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
  const handleTenuresTerms = async (id) => {
    try {
      const response = await getTermByTenureID(id);
      if (response?.success) {
        setTenuresTerms(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  // Calling API
  const getParliamentaryYearByIdApi = async () => {
    try {
      const response = await getParliamentaryYearsByID(
        location.state?.id && location.state?.id
      );
      if (response?.success) {
        setSingleParliamentaryYear(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Update form values when termsById changes
    if (singleParliamentaryYear) {
      formik.setValues({
        parliamentaryTenure: singleParliamentaryYear?.parliamentaryTenure || "",
        fkTenureId: singleParliamentaryYear?.tenure
          ? {
              value: singleParliamentaryYear?.tenure?.id,
              label: singleParliamentaryYear?.tenure?.tenureName,
            }
          : "",
        fkTermId: singleParliamentaryYear.term
          ? {
              value: singleParliamentaryYear?.term?.id,
              label: singleParliamentaryYear?.term?.termName,
            }
          : "",
        fromDate: singleParliamentaryYear?.fromDate
          ? moment(singleParliamentaryYear.fromDate).toDate()
          : "",
        toDate: singleParliamentaryYear?.toDate
          ? moment(singleParliamentaryYear.toDate).toDate()
          : "",
        description: singleParliamentaryYear?.description || "",
      });
      if (singleParliamentaryYear?.fkTenureId) {
        handleTenuresTerms(singleParliamentaryYear?.fkTenureId);
      }
      setSelectedTenureType(
        singleParliamentaryYear?.tenure?.tenureType &&
          singleParliamentaryYear?.tenure?.tenureType
      );
    }
  }, [singleParliamentaryYear, formik.setValues]);

  useEffect(() => {
    handleTenures();
    if (location?.state?.id) {
      getParliamentaryYearByIdApi();
    }
  }, [location?.state?.id]);

  const handleCreateParliamentaryYear = async (values) => {
    const data = {
      parliamentaryTenure: values.parliamentaryTenure,
      fkTenureId: values.fkTenureId?.value,
      fkTermId: values.fkTermId?.value,
      fromDate: values.fromDate,
      toDate: values.toDate,
      description: values.description,
    };

    try {
      const response = await createParliamentaryYears(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/parliamentary-year/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditParliamentaryYear = async (values) => {
    const data = {
      parliamentaryTenure: values?.parliamentaryTenure,
      fkTenureId: values.fkTenureId?.value,
      fkTermId: values.fkTermId?.value,
      fromDate: values?.fromDate,
      toDate: values?.toDate,
      description: values?.description,
    };

    try {
      const response = await updateParliamentaryYears(
        location?.state?.id,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/parliamentary-year/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

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
                        value={formik.values.parliamentaryTenure}
                        // placeholder={formik.values.parliamentaryTenure}
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
                      <label class="form-label">Select Tenure</label>
                      <Select
                        options={
                          Array.isArray(tenures) && tenures?.length > 0
                            ? tenures.map((item) => ({
                                value: item?.id,
                                label: `${item?.tenureName} (${item?.tenureType})`,
                                tenureType: item?.tenureType,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("fkTenureId", selectedOption);
                          setSelectedTenureType(
                            selectedOption?.tenureType || null
                          );
                          if (selectedOption?.value) {
                            handleTenuresTerms(selectedOption?.value);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkTenureId}
                        id="fkTenureId"
                        name="fkTenureId"
                        isClearable={true}
                      />

                      {formik.touched.fkTenureId &&
                        formik.errors.fkTenureId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkTenureId}
                          </div>
                        )}
                    </div>
                  </div>

                  {selectedTenureType === "Senators" && (
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">
                          Select Senator Term
                        </label>
                        <Select
                          options={
                            Array.isArray(tenuresTerms) &&
                            tenuresTerms?.length > 0
                              ? tenuresTerms.map((item) => ({
                                  value: item?.id,
                                  label: `${item?.termName}`,
                                }))
                              : []
                          }
                          onChange={(selectedOption) => {
                            formik.setFieldValue("fkTermId", selectedOption);
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.fkTermId}
                          id="fkTermId"
                          name="fkTermId"
                          isClearable={true}
                        />
                      </div>
                    </div>
                  )}
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
                        // minDate={new Date()}
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
                        // minDate={new Date()}
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
