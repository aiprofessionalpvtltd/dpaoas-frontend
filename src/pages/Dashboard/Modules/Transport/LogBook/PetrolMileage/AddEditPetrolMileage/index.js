import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../../components/Layout'
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert'
import { UpdateFlagApi, createFlagApi, getSingleFlagById } from '../../../../../../../api/APIs/Services/efiling.service'
import { getUserData } from '../../../../../../../api/Auth'
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
    flagName: Yup.string().required("Flag is required"),
  });

function AddEditPetrolMileage() {
    const location = useLocation();
  const userData = getUserData()

    const navigate = useNavigate()
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.SrNo);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("DateMonth", date);
    setIsCalendarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      DateMonth : "",
      MileagePerformedDuringMonth:  "",
      PetrolSuppliedDuringMonth : "",
      AverageMilagePerLtrsForMonth : "",
      TotalMilageUptoDate : "",
      initalsOfficerInChargeStaffCar :"",
      remark : "",
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
            {fileId ? <h1>Update Petrol Mileage</h1> :  <h1>Create Petrol Mileage</h1>}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">

              <div className="col-4">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">
                      Date Month <span className='text-danger'>*</span>
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
                      selected={formik.values.DateMonth}
                      onChange={handleDateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.DateMonth &&
                        formik.errors.DateMonth
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
                    {formik.touched.DateMonth &&
                      formik.errors.DateMonth && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.DateMonth}
                        </div>
                      )}
                  </div>
                </div>


                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Mileage Performed During The Month <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.MileagePerformedDuringMonth}
                      className={`form-control ${formik.touched.MileagePerformedDuringMonth &&
                          formik.errors.MileagePerformedDuringMonth
                          ? "is-invalid"
                          : ""
                        }`}
                      id="MileagePerformedDuringMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.MileagePerformedDuringMonth &&
                      formik.errors.MileagePerformedDuringMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.MileagePerformedDuringMonth}
                        </div>
                      )}
                  </div>
                </div>


                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Petrol (Ltrs) Supplied During The Month <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.PetrolSuppliedDuringMonth}
                      className={`form-control ${formik.touched.PetrolSuppliedDuringMonth &&
                          formik.errors.PetrolSuppliedDuringMonth
                          ? "is-invalid"
                          : ""
                        }`}
                      id="MileagePerformedDuringMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.PetrolSuppliedDuringMonth &&
                      formik.errors.PetrolSuppliedDuringMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.PetrolSuppliedDuringMonth}
                        </div>
                      )}
                  </div>
                </div>


              </div>


              <div className='row'>

              <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Average Mileage per (Ltrs) For The Month <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.AverageMilagePerLtrsForMonth}
                      className={`form-control ${formik.touched.AverageMilagePerLtrsForMonth &&
                          formik.errors.AverageMilagePerLtrsForMonth
                          ? "is-invalid"
                          : ""
                        }`}
                      id="MileagePerformedDuringMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.AverageMilagePerLtrsForMonth &&
                      formik.errors.AverageMilagePerLtrsForMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.AverageMilagePerLtrsForMonth}
                        </div>
                      )}
                  </div>
                </div>


                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Total Mileage upto Date <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.TotalMilageUptoDate}
                      className={`form-control ${formik.touched.TotalMilageUptoDate &&
                          formik.errors.TotalMilageUptoDate
                          ? "is-invalid"
                          : ""
                        }`}
                      id="MileagePerformedDuringMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.TotalMilageUptoDate &&
                      formik.errors.TotalMilageUptoDate && (
                        <div className="invalid-feedback">
                          {formik.errors.TotalMilageUptoDate}
                        </div>
                      )}
                  </div>
                </div>

                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Initials of officer-in-charge staff car <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.initalsOfficerInChargeStaffCar}
                      className={`form-control ${formik.touched.initalsOfficerInChargeStaffCar &&
                          formik.errors.initalsOfficerInChargeStaffCar
                          ? "is-invalid"
                          : ""
                        }`}
                      id="MileagePerformedDuringMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.initalsOfficerInChargeStaffCar &&
                      formik.errors.initalsOfficerInChargeStaffCar && (
                        <div className="invalid-feedback">
                          {formik.errors.initalsOfficerInChargeStaffCar}
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

export default AddEditPetrolMileage