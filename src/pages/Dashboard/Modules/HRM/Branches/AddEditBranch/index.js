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
import { createBranches, updateBranches } from "../../../../../../api/APIs/Services/Branches.services";

const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch name is required"),
  description: Yup.string().required("description is required"),
  branchStatus: Yup.string(),
});
function HRMAddEditBranch() {
  const location = useLocation();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      branchName: location.state ? location.state.branchName : "",
      description: location.state ? location.state.description : "",
      branchStatus: location.state ? location.state.branchStatus : "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location.state) {
        UpdateBranchApi(values);
      } else {
        CreateBranchApi(values);
      }
    },
  });

  const CreateBranchApi = async (values) => {
    const data = {
      branchName: values?.branchName,
      description: values?.description,
      branchStatus: "active",
    };
    try {
      const response = await createBranches(data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const UpdateBranchApi = async (values) => {
    const data = {
      branchName: values?.branchName,
      description: values?.description,
      branchStatus: values?.branchStatus,
    };

    try {
      const response = await updateBranches(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/branches"}
        addLink1={"/hrm/branches"}
        title1={"Branches"}
        addLink2={"/hrm/addeditbranches"}
        title2={location && location?.state ? "Edit Branch" : "Add Branch"}
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
                        className={`form-control ${formik.touched.branchName && formik.errors.branchName
                            ? "is-invalid"
                            : ""
                          }`}
                        id="branchName"
                        value={formik.values.branchName}
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
                  {location && location?.state && (
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">branchStatus</label>
                        <select
                          class="form-select"
                          id="branchStatus"
                          name="branchStatus"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.branchStatus}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                          <option>Select</option>
                          <option value={"active"}>Active</option>
                          <option value={"inactive"}>In Active</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                {/* Add similar validation logic for other fields */}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder={formik.values.description}
                        className={`form-control ${formik.touched.description &&
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
