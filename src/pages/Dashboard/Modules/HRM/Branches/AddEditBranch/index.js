import React from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateDepartment, createDepartment } from "../../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch name is required"),
  description: Yup.string().required("description is required"),
  status: Yup.string(),
});
function HRMAddEditBranch() {
  const location = useLocation();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      branchName: location.state ? location.state.branchName : "",
      description: location.state ? location.state.description : "",
      status: location.state ? location.state.departmentStatus : "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      // if (location.state) {
      //   UpdateDepartmentApi();
      // } else {
      //   CreateDepartmentApi(values);
      // }
    },
  });

  // const CreateDepartmentApi = async (values) => {
  //   const data = {
  //     departmentName: values?.departmentName,
  //     description: values?.description,
  //     departmentStatus: "active",
  //   };
  //   try {
  //     const response = await createDepartment(data);
  //     if (response.success) {
  //       showSuccessMessage(response.message);
  //     }
  //   } catch (error) {
  //     showErrorMessage(error.response.data.message);
  //   }
  // };

  // const UpdateDepartmentApi = async (values) => {
  //   const data = {
  //     departmentName: values?.departmentName,
  //     description: values?.description,
  //     departmentStatus: values?.status,
  //   };
  //   try {
  //     const response = await UpdateDepartment(location.state.id, data);
  //     if (response.success) {
  //       showSuccessMessage(response.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/branches"}
        addLink1={"/hrm/branches"}
        title1={"Branches"}
        addLink2={"/hrm/addeditbranches"}
        title2={
          location && location?.state ? "Edit Branch" : "Add Branch"
        }
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Branch</h1>
            ) : (
              <h1>Add Branch</h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Branch name * </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.branchName &&
                          formik.errors.branchName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="branchName"
                        placeholder={formik.values.branchName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.branchName &&
                        formik.errors.branchName && (
                          <div className="invalid-feedback">
                            {formik.errors.branchName}
                          </div>
                        )}
                    </div>
                  </div>
                  {/* {location && location?.state && ( */}
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select"
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.status}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option>Select</option>
                            <option>Pending</option>
                            <option>Approved</option>
                        </select>
                      </div>
                    </div>
                  {/* )} */}
                </div>
                {/* Add similar validation logic for other fields */}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder={formik.values.description}
                        className={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        id="description"
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

                    {/* Add validation and error display for other fields */}
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
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

export default HRMAddEditBranch;
