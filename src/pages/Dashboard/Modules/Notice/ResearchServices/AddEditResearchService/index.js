import { useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../api/AuthContext";
import Header from "../../../../../../components/Header";
import {
  UpdateResearchServices,
  createResearchServices,
  getResearchServicesById,
} from "../../../../../../api/APIs/Services/Notice.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";

function CMSAddEditResearchService() {
  const location = useLocation();
  const [researchData, setresearchData] = useState([]);
  const serviceTypeData = [
    {
      id: 1,
      description: "Statistical Data",
    },
    {
      id: 2,
      description: "Brief",
    },
    {
      id: 3,
      description: "General Information",
    },
    {
      id: 4,
      description: "Talking Points",
    },
    {
      id: 5,
      description: "Backgrounders",
    },
    {
      id: 6,
      description: "Country Papers/Profiles",
    },
    {
      id: 7,
      description: "Statistical Analyses",
    },
    {
      id: 8,
      description: "Research Reports from Other Sources",
    },
    {
      id: 9,
      description: "Basic Information",
    },
  ];

  // Validation Schema For Toner Installation
  const validationSchema = Yup.object({
    service_type: Yup.object().required("Service Type is required"),
    details: Yup.string().required("Details is required"),
  });
  const formik = useFormik({
    initialValues: {
      service_type: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        UpdateResearchServicesApi(values);
      } else {
        hendleCreateResarchServices(values);
      }
    },
  });

  // Handle Create Reseacrch Services
  const hendleCreateResarchServices = async (values) => {
    const Data = {
      service_type: values?.service_type.value,
      details: values?.details,
    };

    try {
      const response = await createResearchServices(Data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // Update Research Services
  const UpdateResearchServicesApi = async (values) => {
    const Data = {
      service_type: values?.service_type.value,
      details: values?.details,
    };
    try {
      const response = await UpdateResearchServices(location.state.id, Data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getReserchServicesByIdApi = async () => {
    try {
      const response = await getResearchServicesById(location.state.id);
      if (response.success) {
        setresearchData(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getReserchServicesByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (researchData) {
      formik.setValues({
        service_type:
          {
            value: researchData[0]?.service_type,
            label: researchData[0]?.service_type,
          } || "",
        details: researchData[0]?.details || "",
      });
    }
  }, [researchData, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/research-services"}
        // addLink1={"/notice/speech-on-demand/addedit"}
        title1={
          location && location?.state
            ? "Edit Research Service"
            : "Add Research Service"
        }
      />

      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state?.id ? (
              <h1>Edit Research Service </h1>
            ) : (
              <h1>Add Research Service </h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Service Type</label>
                      <Select
                        options={
                          serviceTypeData &&
                          serviceTypeData?.map((item) => ({
                            value: item.description,
                            label: item?.description,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("service_type", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.service_type}
                        name="service_type"
                        isClearable={true}
                        className={`.form-select  ${
                          formik.touched.service_type &&
                          formik.errors.service_type
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.service_type &&
                        formik.errors.service_type && (
                          <div className="invalid-feedback">
                            {formik.errors.service_type}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Details</label>
                    <textarea
                      className={`form-control  ${
                        formik.touched.details && formik.errors.details
                          ? "is-invalid"
                          : ""
                      }`}
                      id="details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                    ></textarea>
                    {formik.touched.details && formik.errors.details && (
                      <div className="invalid-feedback">
                        {formik.errors.details}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-grid gap-2 mt-4 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    {location?.state?.id
                      ? "Update Services"
                      : "Create Services"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CMSAddEditResearchService;
