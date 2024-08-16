import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { Layout } from '../../../../../../../components/Layout';
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems';

const validationSchema = Yup.object().shape({
  NameDriver: Yup.string().required("Name of Driver is required"),
  VehicleNo: Yup.string().required("Vehicle Number is required"),
  Make: Yup.string().required("Make is required"),
  OfficesBranch: Yup.string().required("Offices Branch is required"),
  NameofSenatorAndOfficer: Yup.string(), // Can be left empty, so no validation
});

function AddEditDrivers() {
  const formik = useFormik({
    initialValues: {
      NameDriver: "",
      VehicleNo: "",
      Make: "",
      OfficesBranch: "",
      NameofSenatorAndOfficer: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#14ae5c" }}>
            <h1>Add Driver</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Name of Driver <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name of Driver"
                        name="NameDriver"
                        value={formik.values.NameDriver}
                        className={`form-control ${
                          formik.touched.NameDriver && formik.errors.NameDriver
                            ? "is-invalid"
                            : ""
                        }`}
                        id="NameDriver"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.NameDriver && formik.errors.NameDriver && (
                        <div className="invalid-feedback">
                          {formik.errors.NameDriver}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Vehicle Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Vehicle Number"
                        name="VehicleNo"
                        value={formik.values.VehicleNo}
                        className={`form-control ${
                          formik.touched.VehicleNo && formik.errors.VehicleNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="VehicleNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.VehicleNo && formik.errors.VehicleNo && (
                        <div className="invalid-feedback">
                          {formik.errors.VehicleNo}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Make <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Make"
                        name="Make"
                        value={formik.values.Make}
                        className={`form-control ${
                          formik.touched.Make && formik.errors.Make
                            ? "is-invalid"
                            : ""
                        }`}
                        id="Make"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Make && formik.errors.Make && (
                        <div className="invalid-feedback">
                          {formik.errors.Make}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Offices Branches <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Offices Branches"
                        name="OfficesBranch"
                        value={formik.values.OfficesBranch}
                        className={`form-control ${
                          formik.touched.OfficesBranch && formik.errors.OfficesBranch
                            ? "is-invalid"
                            : ""
                        }`}
                        id="OfficesBranch"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.OfficesBranch && formik.errors.OfficesBranch && (
                        <div className="invalid-feedback">
                          {formik.errors.OfficesBranch}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Name of Senator & Officer
                      </label>
                      <input
                        type="text"
                        placeholder="Name of Senator & Officer"
                        name="NameofSenatorAndOfficer"
                        value={formik.values.NameofSenatorAndOfficer}
                        className={`form-control ${
                          formik.touched.NameofSenatorAndOfficer &&
                          formik.errors.NameofSenatorAndOfficer
                            ? "is-invalid"
                            : ""
                        }`}
                        id="NameofSenatorAndOfficer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.NameofSenatorAndOfficer &&
                        formik.errors.NameofSenatorAndOfficer && (
                          <div className="invalid-feedback">
                            {formik.errors.NameofSenatorAndOfficer}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <button className="btn btn-primary float-end" type="submit">
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

export default AddEditDrivers;
