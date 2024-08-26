import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from '../../../../../../../components/Layout';
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems';
import { createVehicle, updateVehicles } from '../../../../../../../api/APIs/Services/Transport.service';

const validationSchema = Yup.object().shape({
    VehicleNo: Yup.string().required("Vehicle Number is required"),
    Make: Yup.string().required("Make is required"),
    Model: Yup.string().required("Model is required"),
    EngCapp: Yup.string().required("Engine Capacity is required"),
    OfficesBranch: Yup.string().required("Offices Branch is required"),
    petrolLimit: Yup.string().required("Petrol Limit is required"),
    remarks: Yup.string(),
});

function AddVehicles({ location }) {
    const vehicleData = location?.state || null; // Get vehicle data if editing

    const formik = useFormik({
        initialValues: {
            VehicleNo: vehicleData ? vehicleData.VehicleNo : "",
            Make: vehicleData ? vehicleData.Make : "",
            Model: vehicleData ? vehicleData.Model : "",
            EngCapp: vehicleData ? vehicleData.EngCapp : "",
            OfficesBranch: vehicleData ? vehicleData.OfficesBranch : "",
            petrolLimit: vehicleData ? vehicleData.petrolLimit : "",
            remarks: vehicleData ? vehicleData.remarks : "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (vehicleData) {
                    await updateVehicles(vehicleData.id, values);
                    toast.success("Vehicle updated successfully.");
                } else {
                    await createVehicle(values);
                    toast.success("Vehicle added successfully.");
                }
            } catch (error) {
                toast.error("Error submitting vehicle data.");
            }
        },
    });

    return (
        <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#14ae5c" }}>
                        <h1>{vehicleData ? "Edit Vehicle" : "Add Vehicle"}</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
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
                                                Model <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Model"
                                                name="Model"
                                                value={formik.values.Model}
                                                className={`form-control ${
                                                    formik.touched.Model && formik.errors.Model
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="Model"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.Model && formik.errors.Model && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.Model}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Engine Capacity <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Engine Capacity"
                                                name="EngCapp"
                                                value={formik.values.EngCapp}
                                                className={`form-control ${
                                                    formik.touched.EngCapp && formik.errors.EngCapp
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="EngCapp"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.EngCapp && formik.errors.EngCapp && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.EngCapp}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Offices/Branches <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Offices/Branches"
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

                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Petrol Limit <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Petrol Limit"
                                                name="petrolLimit"
                                                value={formik.values.petrolLimit}
                                                className={`form-control ${
                                                    formik.touched.petrolLimit && formik.errors.petrolLimit
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="petrolLimit"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.petrolLimit && formik.errors.petrolLimit && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.petrolLimit}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <label className="form-label">Remarks</label>
                                    <textarea
                                        placeholder=""
                                        className="form-control"
                                        name="remarks"
                                        value={formik.values.remarks}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id="remarks"
                                    ></textarea>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <button className="btn btn-primary float-end" type="submit">
                                            {vehicleData ? "Update" : "Submit"}
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

export default AddVehicles;
