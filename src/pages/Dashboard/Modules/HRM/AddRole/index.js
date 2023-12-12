import React from "react";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createRole } from "../../../../../api/APIs";
import { useNavigate } from "react-router";
import { showSuccessMessage } from "../../../../../utils/ToastAlert";

const validationSchema = Yup.object({
  roleName: Yup.string().required("Role name is required"),
  roledescription: Yup.string().required("Description is required"),
});
function HRMAddRole() {
  const navigate = useNavigate();
  const initialValues = {
    roleName: "",
    roledescription: "",
  };
  const CreateRoleApi = async (values) => {
    const data = {
      name: values?.roleName,
      description: values?.roledescription,
    };
    try {
      const response = await createRole(data);
      if (response.success) {
        showSuccessMessage(response?.message)
        // navigate("/hrm/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      CreateRoleApi(values);
    },
  });

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/dashboard"}
        addLink1={"/hrm/dashboard"}
        addLink2={"/hrm/addrole"}
        title1={"Roles"}
        title2={"Add Role"}
      />
      <div className="card">
        <div className="card-header red-bg" style={{ background: "#666" }}>
          <h1>Add Role</h1>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Role name * </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.roleName && formik.errors.roleName
                          ? "is-invalid"
                          : ""
                      }`}
                      id="roleName"
                      placeholder={formik.values.roleName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.roleName && formik.errors.roleName && (
                      <div className="invalid-feedback">
                        {formik.errors.roleName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder={formik.values.roledescription}
                      className={`form-control ${
                        formik.touched.roledescription &&
                        formik.errors.roledescription
                          ? "is-invalid"
                          : ""
                      }`}
                      id="roledescription"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.roledescription}
                    ></textarea>
                    {formik.touched.roledescription &&
                      formik.errors.roledescription && (
                        <div className="invalid-feedback">
                          {formik.errors.roledescription}
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
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMAddRole;
