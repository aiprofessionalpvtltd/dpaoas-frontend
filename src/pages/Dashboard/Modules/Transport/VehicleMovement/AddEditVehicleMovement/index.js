import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { UpdateFlagApi, createFlagApi, getSingleFlagById } from '../../../../../../api/APIs/Services/efiling.service'
import { getUserData } from '../../../../../../api/Auth'
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import TimePicker from 'react-time-picker'

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

function AddEditVehicleMovement() {
    const location = useLocation();
  const userData = getUserData()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("selectDate", date);
    setIsCalendarOpen(false);
  };
    const navigate = useNavigate()
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.SrNo);

  const formik = useFormik({
    initialValues: {
      selectDate : "",
      fromTime:  "",
      toTime : "",
      NameDesignationOftheOfficer : "",
      detailOfJourney:"",
      JourneytoTime : "",
      JourneyfromTime : "",
      purposeOfJourney : "",
      MeterReadingBeforeJourney : "",
      MeterReadingAfterJourney : "",
      kMeterMilageCovered : "",
      signatureOfOfficer:"",
      remark : ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if(fileId){
        handleUpdateFlag(values)
      }else{
        console.log("Please enter", values);
        handleCreateFlag(values)
      }
    },
  });

  const handleCreateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await createFlagApi(Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/flags");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleUpdateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await UpdateFlagApi(filesData?.id, Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/flags");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getSingleHeadingAPi = async () => {
   
    try {
      const response = await getSingleFlagById(fileId)
      if (response.success) {
        // showSuccessMessage(response?.message)
        setFileData(response?.data)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (fileId) {
        getSingleHeadingAPi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (filesData) {
      formik.setValues({
        flagName: filesData?.flag || ""
      });
    }
  }, [filesData, formik.setValues]);

  return (
    <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
    <ToastContainer />
    <div class="container-fluid">
      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {fileId ? <h1>Update Vehicle</h1> :  <h1>Create Vehicle</h1>}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">

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
                        zIndex: "1",
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
                      // onClick={handleCalendarToggle}
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


                <div class="col-2">
                  <div class="mb-3">
                    <label class="form-label">From Time</label>
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

                <div class="col-2">
                  <div class="mb-3">
                    <label class="form-label">To Time</label>
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

                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Name & Designation of the Officer<span className='text-danger'>*</span></label>
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

              <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Detail Of Journey<span className='text-danger'>*</span></label>
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

                <div class="col-2">
                  <div class="mb-3">
                    <label class="form-label">From Time</label>
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

                <div class="col-2">
                  <div class="mb-3">
                    <label class="form-label">To Time</label>
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

                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Purpose of journey i.e whether (Official / Private)  <span className='text-danger'>*</span></label>
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

              </div>

              <div className='row'>

                
              <div class="col-3">
                  <div class="mb-3">
                    <label class="form-label">Meter Reading Before Journey <span className='text-danger'>*</span></label>
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

                
                <div class="col-3">
                  <div class="mb-3">
                    <label class="form-label">Meter Reading After Journey  <span className='text-danger'>*</span></label>
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

                <div class="col-3">
                  <div class="mb-3">
                    <label class="form-label">K. Meter/Mileage Covered  <span className='text-danger'>*</span></label>
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

                <div class="col-3">
                  <div class="mb-3">
                    <label class="form-label">Signature of Officer <span className='text-danger'>*</span></label>
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

              <div className='row'>
              <div className="mb-4">
                <label className="form-label">Remark</label>
                <textarea
                  placeholder={""}
                  class={`form-control`}
                  value={formik?.values?.remark}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="remark"
                  name="remark"
                ></textarea>
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

export default AddEditVehicleMovement;