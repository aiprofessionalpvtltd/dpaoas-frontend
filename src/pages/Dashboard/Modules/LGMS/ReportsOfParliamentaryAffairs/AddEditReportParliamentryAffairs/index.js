import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import {
  createNewParliamentaryAffairReport,
  getAllMinisterTenures,
  getMinisterByParliamentaryYearID,
  getMinisterParliamentaryYearsByTenure,
  getMinsistriesByTenure,
  getParliamentaryAffairReportID,
  updateParliamentaryAffairsReport,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";

const validationSchema = Yup.object({
  //   ministerTenureId: Yup.string().required("Term name is required"),
  //   ministerId: Yup.string().required("Tenure ID is required"),
  //   startDate: Yup.string().required("Start date is required"),
  //   endDate: Yup.string().required("End date is required"),
});
function LGMSAddEditReportOfParliamentaryAffairs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ministerTenures, setMinisterTenures] = useState([]);
  const [ministerParliamentaryYears, setMinisterParliamentaryYears] = useState(
    []
  );
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [ministryOnTenureData, setMinistryOnTenureData] = useState([]);

  const formik = useFormik({
    initialValues: {
      ministerTenureId: "",
      ministerParliamentaryYearId: "",
      ministerId: "",
      ministryId: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleUpdateParliamentaryAffairsReport(values);
      } else {
        handleCreateParliamentaryAffairsReport(values);
      }
    },
  });

  //   Fetching Minister Tenures
  const fetchTenures = async () => {
    try {
      // Call `getAllMinisterTenure` for Ministers
      const response = await getAllMinisterTenures(0, 50000, "Ministers");
      if (response?.success) {
        setMinisterTenures(response?.data?.tenures);
      }

      // Update the state to store combined tenures
    } catch (error) {
      showErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  const fetchParliamentaryYears = async (id) => {
    try {
      // Call API for Ministers
      const ministerResponse = await getMinisterParliamentaryYearsByTenure(id);
      if (ministerResponse?.success) {
        setMinisterParliamentaryYears(ministerResponse?.data);
      }
    } catch (error) {
      console.error(
        "Error fetching parliamentary years:",
        error?.response?.data?.message || error.message
      );
    }
  };

  const fetchMinisterOnParliamentaryYear = async (id) => {
    try {
      const response = await getMinisterByParliamentaryYearID(id);
      if (response?.success) {
        setMinisterOnParliamentaryYear(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // Fetch Ministries On Tenure
  const fetchMinistriesOnTenure = async (id) => {
    try {
      const response = await getMinsistriesByTenure(id);
      if (response?.success) {
        setMinistryOnTenureData(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getSingleParliamentaryAffairReport = async (id) => {
    try {
      const response = await getParliamentaryAffairReportID(id);
      if (response?.success) {
        const data = response?.data;
        formik.setValues({
          ministerTenureId: data?.tenuresMinisters
            ? {
                label: data?.tenuresMinisters?.tenureName,
                value: data?.tenuresMinisters?.id,
              }
            : "",
          ministerParliamentaryYearId: data?.parliamentaryYearsMna
            ? {
                label: data?.parliamentaryYearsMna?.parliamentaryTenure,
                value: data?.parliamentaryYearsMna?.id,
              }
            : "",

          ministerId: data?.minister
            ? {
                label: data?.minister?.mnaName,
                value: data?.minister?.id,
              }
            : "",
          ministryId: data?.ministry
            ? {
                label: data?.ministry?.ministryName,
                value: data?.ministry?.id,
              }
            : "",
          description: data?.description || "",
        });
        // Fetch dependent data based on retrieved values
        if (data?.ministerTenureId)
          fetchParliamentaryYears(data?.ministerTenureId);
        if (data?.ministerParliamentaryYearId)
          fetchMinisterOnParliamentaryYear(data?.ministerParliamentaryYearId);
        if (data?.ministerTenureId)
          fetchMinistriesOnTenure(data?.ministerTenureId);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchTenures();
  }, []);

  //   Get Single Report
  useEffect(() => {
    if (location?.state?.id) {
      getSingleParliamentaryAffairReport(location?.state?.id);
    }
  }, [location?.state?.id]);

  const handleCreateParliamentaryAffairsReport = async (values) => {
    const data = {
      ministerTenureId:
        values?.ministerTenureId.value && values?.ministerTenureId.value,
      ministerParliamentaryYearId:
        values?.ministerTenureId?.value && values?.ministerTenureId?.value,
      ministerId: values?.ministerId?.value && values?.ministerId?.value,
      ministryId: values?.ministryId?.value && values?.ministryId?.value,
      description: values?.description,
    };

    console.log("dataa", data);

    try {
      const response = await createNewParliamentaryAffairReport(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/reports/parliamentaryaffairs/report");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleUpdateParliamentaryAffairsReport = async (values) => {
    const data = {
      ministerTenureId:
        values?.ministerTenureId.value && values?.ministerTenureId.value,
      ministerParliamentaryYearId:
        values?.ministerTenureId?.value && values?.ministerTenureId?.value,
      ministerId: values?.ministerId?.value && values?.ministerId?.value,
      ministryId: values?.ministryId?.value && values?.ministryId?.value,
      description: values?.description,
    };
    try {
      const response = await updateParliamentaryAffairsReport(
        location?.state?.id,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/reports/parliamentaryaffairs/report");
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
        dashboardLink={"/lgms/dashboard"}
        title1={"Parliamentary Affairs Reports"}
        addLink1={"/lgms/dashboard/reports/parliamentaryaffairs/report"}
        addLink2={"/lgms/dashboard/manage/terms/addedit"}
        title2={location && location?.state ? "Edit Report" : "Add Report"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Report</h1>
            ) : (
              <h1>Add Report</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Minister Tenure</label>
                      <Select
                        options={
                          Array.isArray(ministerTenures) &&
                          ministerTenures?.length > 0
                            ? ministerTenures.map((item) => ({
                                value: item?.id,
                                label: `${item?.tenureName} (${item?.tenureType})`,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue(
                            "ministerTenureId",
                            selectedOption
                          );

                          fetchParliamentaryYears(selectedOption?.value);
                          fetchMinistriesOnTenure(selectedOption?.value);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministerTenureId}
                        id="ministerTenureId"
                        name="ministerTenureId"
                        isClearable={true}
                      />
                      {formik.touched.ministerTenureId &&
                        formik.errors.ministerTenureId && (
                          <div className="invalid-feedback">
                            {formik.errors.ministerTenureId}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        Minister Parliamentary Year
                      </label>
                      <select
                        id="ministerParliamentaryYearId"
                        name="ministerParliamentaryYearId"
                        className={`form-select ${
                          formik.touched.ministerParliamentaryYearId &&
                          formik.errors.ministerParliamentaryYearId
                            ? "is-invalid"
                            : ""
                        }`}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          formik.handleChange(e);
                          fetchMinisterOnParliamentaryYear(selectedId);
                        }}
                        value={formik?.values?.ministerParliamentaryYearId}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {ministerParliamentaryYears &&
                          ministerParliamentaryYears?.length > 0 &&
                          ministerParliamentaryYears.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.parliamentaryTenure}
                            </option>
                          ))}
                      </select>
                      {formik.touched.ministerParliamentaryYearId &&
                        formik.errors.ministerParliamentaryYearId && (
                          <div className="invalid-feedback">
                            {formik.errors.ministerParliamentaryYearId}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Minister Name</label>
                      <Select
                        options={
                          Array.isArray(ministersOnParliamentaryYear) &&
                          ministersOnParliamentaryYear.length > 0
                            ? ministersOnParliamentaryYear.map((item) => ({
                                value: item?.id,
                                label: item?.mnaName,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("ministerId", selectedOption);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministerId}
                        name="ministerId"
                        className={`${
                          formik.touched.ministerId && formik.errors.ministerId
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.ministerId &&
                        formik.errors.ministerId && (
                          <div className="invalid-feedback">
                            {formik.errors.ministerId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">
                      Concerned Ministry / Division
                    </label>
                    <Select
                      options={
                        ministryOnTenureData &&
                        ministryOnTenureData?.map((item) => ({
                          value: item.id,
                          label: item?.ministryName,
                        }))
                      }
                      name="ministryId"
                      id="ministryId"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("ministryId", selectedOptions)
                      }
                      className={` ${
                        formik.touched.ministryId && formik.errors.ministryId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.ministryId}
                      // isMulti={true}
                    />
                    {formik.touched.ministryId && formik.errors.ministryId && (
                      <div class="invalid-feedback">
                        {formik.errors.ministryId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className={`form-control  ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
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

export default LGMSAddEditReportOfParliamentaryAffairs;
