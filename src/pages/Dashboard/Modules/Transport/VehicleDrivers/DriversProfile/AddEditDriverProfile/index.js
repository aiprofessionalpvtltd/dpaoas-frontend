import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { Layout } from '../../../../../../../components/Layout';
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems';
import { createDrivers, updateDrivers } from '../../../../../../../api/APIs/Services/Transport.service';
import { useLocation, useNavigate } from 'react-router-dom';



// Updated validation schema to include new fields
const validationSchema = Yup.object().shape({
  NameDriver: Yup.string().required("Name of Driver is required"),
  VehicleNo: Yup.string().required("Vehicle Number is required"),
  Make: Yup.string().required("Make is required"),
  OfficesBranch: Yup.string().required("Offices Branch is required"),
  EngineCapacity: Yup.string(), // Optional field
  PetrolLimit: Yup.string(), // Optional field
  Remarks: Yup.string(), // Optional field
  NameofSenatorAndOfficer: Yup.string(), // Can be left empty, so no validation
});

function AddEditDriversProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const driverData = location.state?.driver; 


  const formik = useFormik({
    initialValues: {
      NameDriver: "",
      VehicleNo: "",
      Make: "",
      OfficesBranch: "",
      EngineCapacity: "", // New field
      PetrolLimit: "", // New field
      Remarks: "", // New field
      NameofSenatorAndOfficer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (driverData) {
          // Update existing driver
          await updateDrivers(driverData.id, values);
        } else {
          // Create new driver
          await createDrivers(values);
        }
        navigate("/transport/drivers"); // Navigate back to the drivers list
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
                  {/* Existing fields */}
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

                {/* New fields */}
                <div className="row">
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Engine Capacity
                      </label>
                      <input
                        type="text"
                        placeholder="Engine Capacity"
                        name="EngineCapacity"
                        value={formik.values.EngineCapacity}
                        className={`form-control ${
                          formik.touched.EngineCapacity && formik.errors.EngineCapacity
                            ? "is-invalid"
                            : ""
                        }`}
                        id="EngineCapacity"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.EngineCapacity && formik.errors.EngineCapacity && (
                        <div className="invalid-feedback">
                          {formik.errors.EngineCapacity}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Petrol Limit
                      </label>
                      <input
                        type="text"
                        placeholder="Petrol Limit"
                        name="PetrolLimit"
                        value={formik.values.PetrolLimit}
                        className={`form-control ${
                          formik.touched.PetrolLimit && formik.errors.PetrolLimit
                            ? "is-invalid"
                            : ""
                        }`}
                        id="PetrolLimit"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.PetrolLimit && formik.errors.PetrolLimit && (
                        <div className="invalid-feedback">
                          {formik.errors.PetrolLimit}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Remarks
                      </label>
                      <input
                        type="text"
                        placeholder="Remarks"
                        name="Remarks"
                        value={formik.values.Remarks}
                        className={`form-control ${
                          formik.touched.Remarks && formik.errors.Remarks
                            ? "is-invalid"
                            : ""
                        }`}
                        id="Remarks"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Remarks && formik.errors.Remarks && (
                        <div className="invalid-feedback">
                          {formik.errors.Remarks}
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

export default AddEditDriversProfile;
