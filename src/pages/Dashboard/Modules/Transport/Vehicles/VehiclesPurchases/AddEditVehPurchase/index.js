import React, { useEffect ,useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from '../../../../../../../components/Layout';
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems';
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import TimePicker from 'react-time-picker'
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert';
import { createMovement, updateMovement } from '../../../../../../../api/APIs/Services/Transport.service';

const validationSchema = Yup.object({
    selectDate: Yup.date().required("Date is required"),
    fromTime: Yup.string().required("From Time is required"),
    toTime: Yup.string().required("To Time is required"),
    NameDesignationOftheOfficer: Yup.string().required("Name & Designation of the Officer is required"),
    detailOfJourney: Yup.string().required("Detail Of Journey is required"),
    purposeOfJourney: Yup.string().required("Purpose of Journey is required"),
    MeterReadingBeforeJourney: Yup.string().required("Meter Reading Before Journey is required"),
    MeterReadingAfterJourney: Yup.string().required("Meter Reading After Journey is required"),
    kMeterMilageCovered: Yup.string().required("K. Meter/Mileage Covered is required"),
    signatureOfOfficer: Yup.string().required("Signature of Officer is required"),
  });

function AddEditVehiclePurchase() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [fileId, setFileId] = useState(null); // Initialize fileId

    const handleCalendarToggle = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (date) => {
        formik.setFieldValue("selectDate", date);
        setIsCalendarOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            selectDate: "",
            fromTime: "",
            toTime: "",
            NameDesignationOftheOfficer: "",
            detailOfJourney: "",
            JourneytoTime: "",
            JourneyfromTime: "",
            purposeOfJourney: "",
            MeterReadingBeforeJourney: "",
            MeterReadingAfterJourney: "",
            kMeterMilageCovered: "",
            signatureOfOfficer: "",
            remark: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (fileId) {
                    // Update existing record
                    await updateMovement(fileId, values);
                    showSuccessMessage("Movement updated successfully");
                } else {
                    // Create new record
                    await createMovement(values);
                    showSuccessMessage("Movement created successfully");
                }
                navigate('/path-to-redirect'); // Redirect after success
            } catch (error) {
                showErrorMessage("An error occurred while saving the movement");
            }
        },
    });

    return (
        <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
        <ToastContainer />
        <div className="container-fluid">
            <div className="card">
                <div className="card-header red-bg" style={{ background: "#14ae5c" }}>
                    {fileId ? <h1>Update Vehicle</h1> : <h1>Create Vehicle</h1>}
                </div>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <div className="mb-3" style={{ position: "relative" }}>
                                        <label className="form-label">
                                            Date <span className='text-danger'>*</span>
                                        </label>
                                        <span
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "36px",
                                                zIndex: 1,
                                                fontSize: "20px",
                                                color: "#666",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleCalendarToggle}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                        </span>
                                        <DatePicker
                                            selected={formik.values.selectDate}
                                            onChange={handleDateSelect}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${
                                                formik.touched.selectDate &&
                                                formik.errors.selectDate
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            open={isCalendarOpen}
                                            onClickOutside={() => setIsCalendarOpen(false)}
                                            onInputClick={handleCalendarToggle}
                                            maxDate={new Date()}
                                            dateFormat="dd-MM-yyyy"
                                        />
                                        {formik.touched.selectDate &&
                                            formik.errors.selectDate && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block" }}
                                                >
                                                    {formik.errors.selectDate}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">From Time</label>
                                        <TimePicker
                                            value={formik.values.fromTime}
                                            clockIcon={null}
                                            openClockOnFocus={false}
                                            format="hh:mm a"
                                            onChange={(time) =>
                                                formik.setFieldValue("fromTime", time)
                                            }
                                            className={`form-control`}
                                        />
                                        {formik.touched.fromTime &&
                                            formik.errors.fromTime && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.fromTime}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">To Time</label>
                                        <TimePicker
                                            value={formik.values.toTime}
                                            clockIcon={null}
                                            openClockOnFocus={false}
                                            format="hh:mm a"
                                            onChange={(time) =>
                                                formik.setFieldValue("toTime", time)
                                            }
                                            className={`form-control`}
                                        />
                                        {formik.touched.toTime &&
                                            formik.errors.toTime && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.toTime}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="mb-3">
                                        <label className="form-label">Name & Designation of the Officer<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.NameDesignationOftheOfficer}
                                            className={`form-control ${formik.touched.NameDesignationOftheOfficer &&
                                                formik.errors.NameDesignationOftheOfficer
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="NameDesignationOftheOfficer"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.NameDesignationOftheOfficer &&
                                            formik.errors.NameDesignationOftheOfficer && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.NameDesignationOftheOfficer}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label className="form-label">Detail Of Journey<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.detailOfJourney}
                                            className={`form-control ${formik.touched.detailOfJourney &&
                                                formik.errors.detailOfJourney
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="detailOfJourney"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.detailOfJourney &&
                                            formik.errors.detailOfJourney && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.detailOfJourney}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">From Time</label>
                                        <TimePicker
                                            value={formik.values.JourneyfromTime}
                                            clockIcon={null}
                                            openClockOnFocus={false}
                                            format="hh:mm a"
                                            onChange={(time) =>
                                                formik.setFieldValue("JourneyfromTime", time)
                                            }
                                            className={`form-control`}
                                        />
                                        {formik.touched.JourneyfromTime &&
                                            formik.errors.JourneyfromTime && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.JourneyfromTime}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">To Time</label>
                                        <TimePicker
                                            value={formik.values.JourneytoTime}
                                            clockIcon={null}
                                            openClockOnFocus={false}
                                            format="hh:mm a"
                                            onChange={(time) =>
                                                formik.setFieldValue("JourneytoTime", time)
                                            }
                                            className={`form-control`}
                                        />
                                        {formik.touched.JourneytoTime &&
                                            formik.errors.JourneytoTime && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.JourneytoTime}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="mb-3">
                                        <label className="form-label">Purpose of Journey<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.purposeOfJourney}
                                            className={`form-control ${formik.touched.purposeOfJourney &&
                                                formik.errors.purposeOfJourney
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="purposeOfJourney"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.purposeOfJourney &&
                                            formik.errors.purposeOfJourney && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.purposeOfJourney}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">Meter Reading Before Journey<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.MeterReadingBeforeJourney}
                                            className={`form-control ${formik.touched.MeterReadingBeforeJourney &&
                                                formik.errors.MeterReadingBeforeJourney
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="MeterReadingBeforeJourney"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.MeterReadingBeforeJourney &&
                                            formik.errors.MeterReadingBeforeJourney && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.MeterReadingBeforeJourney}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">Meter Reading After Journey<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.MeterReadingAfterJourney}
                                            className={`form-control ${formik.touched.MeterReadingAfterJourney &&
                                                formik.errors.MeterReadingAfterJourney
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="MeterReadingAfterJourney"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.MeterReadingAfterJourney &&
                                            formik.errors.MeterReadingAfterJourney && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.MeterReadingAfterJourney}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="form-label">K. Meter/Mileage Covered<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.kMeterMilageCovered}
                                            className={`form-control ${formik.touched.kMeterMilageCovered &&
                                                formik.errors.kMeterMilageCovered
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="kMeterMilageCovered"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.kMeterMilageCovered &&
                                            formik.errors.kMeterMilageCovered && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.kMeterMilageCovered}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="mb-3">
                                        <label className="form-label">Signature of Officer<span className='text-danger'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder={""}
                                            value={formik.values.signatureOfOfficer}
                                            className={`form-control ${formik.touched.signatureOfOfficer &&
                                                formik.errors.signatureOfOfficer
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="signatureOfOfficer"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.signatureOfOfficer &&
                                            formik.errors.signatureOfOfficer && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.signatureOfOfficer}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Remarks</label>
                                        <textarea
                                            rows="3"
                                            placeholder={""}
                                            value={formik.values.remark}
                                            className={`form-control ${formik.touched.remark &&
                                                formik.errors.remark
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="remark"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.remark &&
                                            formik.errors.remark && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.remark}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">
                                    {fileId ? "Update" : "Create"} Movement
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

export default AddEditVehiclePurchase;
