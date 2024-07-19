import React from "react";
import { Layout } from "../../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  UpdateDesignation,
  createDesignation,
} from "../../../../../../api/APIs/Services/organizational.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  designationname: Yup.string().required("Designation name is required"),
  designationdescription: Yup.string().required("description is required"),
  designationstatus: Yup.string(),
});
function HRMAddEditDesignation() {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      designationname: location.state ? location.state.designationName : "",
      designationdescription: location.state ? location.state.description : "",
      status: location.state ? location.state.designationStatus : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location.state) {
        UpdateDesignationApi(values);
      } else {
        CreateDesignationApi(values);
      }
    },
  });

  const CreateDesignationApi = async (values) => {
    const data = {
      designationName: values?.designationname,
      description: values?.designationdescription,
    };
    try {
      const response = await createDesignation(data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDesignationApi = async (values) => {
    const data = {
      designationName: values?.designationname,
      description: values?.designationdescription,
      designationStatus: values.status,
    };
    try {
      const response = await UpdateDesignation(location?.state?.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message)
      console.log(error);
    }
  };

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/designation"}
        addLink1={"/hrm/designation"}
        title1={"Designation"}
        addLink2={"/hrm/addeditdesignation"}
        title2={
          location && location?.state ? "Edit Designation" : "Add Designation"
        }
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Designation</h1>
            ) : (
              <h1>Add Designation</h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Designation name * </label>
                      <input
                        type="text"
                        placeholder={"Designation Name"}
                        value={formik.values.designationname}
                        className={`form-control ${
                          formik.touched.designationname &&
                          formik.errors.designationname
                            ? "is-invalid"
                            : ""
                        }`}
                        id="designationname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.designationname &&
                        formik.errors.designationname && (
                          <div className="invalid-feedback">
                            {formik.errors.designationname}
                          </div>
                        )}
                    </div>
                  </div>
                  {location && location?.state && (
                    <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        class={`form-select ${formik.touched.status &&
                            formik.errors.status
                            ? "is-invalid"
                            : ""
                            }`}
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="active">Active</option>
                        <option value="inactive">InActive</option>
                      </select>
                      {formik.touched.status &&
                        formik.errors.status && (
                          <div className="invalid-feedback">
                            {formik.errors.status}
                          </div>
                        )}
                    </div>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder={formik.values.designationdescription}
                        className={`form-control ${
                          formik.touched.designationdescription &&
                          formik.errors.designationdescription
                            ? "is-invalid"
                            : ""
                        }`}
                        id="designationdescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.designationdescription}
                      ></textarea>
                      {formik.touched.designationdescription &&
                        formik.errors.designationdescription && (
                          <div className="invalid-feedback">
                            {formik.errors.designationdescription}
                          </div>
                        )}
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMAddEditDesignation;
