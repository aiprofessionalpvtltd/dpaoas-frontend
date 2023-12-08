import React from "react";
import { VMSsidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../../../../components/Header";
import {
  UpdateVisitorsByVisitorId,
  createVisitorsByPassId,
} from "../../../../../../api/APIs";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getPassID } from "../../../../../../api/Auth";

const validationSchema = Yup.object({
  name: Yup.string().required("Visitor Name is required"),
  cnic: Yup.string().required("Cnic is required"),
  details: Yup.string().required("Visitor Detail By is required"),
});
function VMSAddEditVisitors() {
  const location = useLocation();
  const passID = getPassID();
  console.log("Passss id", location?.state);
  const formik = useFormik({
    initialValues: {
      name: location?.state?.name ? location?.state?.name : "",
      cnic: location?.state?.cnic ? location?.state?.cnic : "",
      details: location?.state?.details ? location?.state?.details : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      if (location?.state?.id) {
        updateVisitorsApi(values);
      } else {
        CreateVisitorsApi(values);
      }
    },
  });

  const CreateVisitorsApi = async (values) => {
    console.log("Create Visitors Api", values);
    try {
      const response = await createVisitorsByPassId(passID, values);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateVisitorsApi = async (values) => {
    try {
      const response = await UpdateVisitorsByVisitorId(
        location?.state?.id,
        values,
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/vms/dashboard"}
        addLink1={"/vms/visitor"}
        title1={"Visitors"}
        addLink2={"/vms/addeditvisitor"}
        title2={location && location.state ? "Edit Visitors" : "Add Visitors"}
      />
      <ToastContainer />

      <div class="card">
        <div
          class="card-header red-bg"
          style={{ background: "#14ae5c !important" }}
        >
          {location && location?.state?.cnic ? (
            <h1>Edit Visitors</h1>
          ) : (
            <h1>Add Visitors</h1>
          )}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visitor Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      id="name"
                      placeholder={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">CNIC</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.cnic && formik.errors.cnic
                          ? "is-invalid"
                          : ""
                      }`}
                      id="cnic"
                      placeholder={formik.values.cnic}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cnic}
                    />
                    {formik.touched.cnic && formik.errors.cnic && (
                      <div className="invalid-feedback">
                        {formik.errors.cnic}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visitor Details</label>

                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.details}
                      className={`form-control ${
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
    </Layout>
  );
}

export default VMSAddEditVisitors;
