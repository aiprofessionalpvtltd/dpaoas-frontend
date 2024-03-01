import React, { useContext } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems'
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../../../../../../api/AuthContext';
import Header from '../../../../../../components/Header';

const validationSchema = Yup.object({
  registerNumber: Yup.string().required("File No is required"),
  registerHeading: Yup.string().required("File Subject is required"),
  fkBranchId: Yup.string().optional(),
  year: Yup.string().required("Year is required"),
});
function AddEditFileRegister() {
  const {allBranchesData} = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      registerNumber: "",
      registerHeading: "",
      fkBranchId: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log("values",values);
    },
  });
  return (
   <Layout sidebarItems={EfilingSideBarItem} module={true}>
    <Header dashboardLink={"/efiling/dashboard/file-register-list"} addLink1={"/efiling/dashboard/addedit-file-register"} title1={"Add File Register"} width={"500px"} />
    <div class="container-fluid">
          <div class="card">
            <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
             <h1>File Register</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Register Number</label>
                        <input
                          type="text"
                          placeholder={"Register Number"}
                          value={formik.values.registerNumber}
                          className={`form-control ${
                            formik.touched.registerNumber &&
                            formik.errors.registerNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          id="registerNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.registerNumber &&
                          formik.errors.registerNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.registerNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Register Heading</label>
                        <input
                          type="text"
                          placeholder={"Register Heading"}
                          value={formik.values.registerHeading}
                          className={`form-control ${
                            formik.touched.registerHeading &&
                            formik.errors.registerHeading
                              ? "is-invalid"
                              : ""
                          }`}
                          id="registerHeading"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.registerHeading &&
                          formik.errors.registerHeading && (
                            <div className="invalid-feedback">
                              {formik.errors.registerHeading}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Branch</label>
                        <select
                          className={`form-select ${
                            formik.touched.fkBranchId && formik.errors.fkBranchId
                              ? "is-invalid"
                              : ""
                          }`}
                          id="fkBranchId"
                          name="fkBranchId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fkBranchId}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {allBranchesData && allBranchesData.map((item) => (
                            <option value={item?.id}>{item?.branchName}</option>
                          ))}
                        </select>
                        {formik.touched.fkBranchId && formik.errors.fkBranchId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkBranchId}
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Year</label>
                        <select
                          className={`form-select ${
                            formik.touched.year &&
                            formik.errors.year
                              ? "is-invalid"
                              : ""
                          }`}
                          id="year"
                          name="year"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.year}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value={"2024"}>2024</option>
                          <option value={"2023"}>2023</option>
                        </select>
                        {formik.touched.year &&
                          formik.errors.year && (
                            <div className="invalid-feedback">
                              {formik.errors.year}
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
  )
}

export default AddEditFileRegister