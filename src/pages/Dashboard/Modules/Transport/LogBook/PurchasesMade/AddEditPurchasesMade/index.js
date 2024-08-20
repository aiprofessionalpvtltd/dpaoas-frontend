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
    ParticularRepairsExecutedPurchaseMade : Yup.string().required('Field is required'),
    CostOfRepairs : Yup.string().required('Field is required'),
    ContingentVoucherNo : Yup.string().required('Field is required'),
    SignatureOfOfficerInCharge: Yup.string().required('Field is required'),
  });

function AddEditPurchasesMade() {
    const location = useLocation();
  const userData = getUserData()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("DateInWorkShop", date);
    setIsCalendarOpen(false);
  };

    const navigate = useNavigate()
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.SrNo);

  const formik = useFormik({
    initialValues: {
      DateInWorkShop : "",
      ParticularRepairsExecutedPurchaseMade:  "",
      CostOfRepairs : "",
      ContingentVoucherNo : "",
      SignatureOfOfficerInCharge:""
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
            {fileId ? <h1>Update Purchase</h1> :  <h1>Create Purchase</h1>}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">

              <div className="col-4">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">
                      Date In WorkShop (IN / OUT) <span className='text-danger'>*</span>
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
                    <label class="form-label">Particulars Repairs executed. Purchase Made<span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.ParticularRepairsExecutedPurchaseMade}
                      className={`form-control ${formik.touched.ParticularRepairsExecutedPurchaseMade &&
                          formik.errors.ParticularRepairsExecutedPurchaseMade
                          ? "is-invalid"
                          : ""
                        }`}
                      id="ParticularRepairsExecutedPurchaseMade"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.ParticularRepairsExecutedPurchaseMade &&
                      formik.errors.ParticularRepairsExecutedPurchaseMade && (
                        <div className="invalid-feedback">
                          {formik.errors.ParticularRepairsExecutedPurchaseMade}
                        </div>
                      )}
                  </div>
                </div>

                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Cost Of Repairs<span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.CostOfRepairs}
                      className={`form-control ${formik.touched.CostOfRepairs &&
                          formik.errors.CostOfRepairs
                          ? "is-invalid"
                          : ""
                        }`}
                      id="CostOfRepairs"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.CostOfRepairs &&
                      formik.errors.CostOfRepairs && (
                        <div className="invalid-feedback">
                          {formik.errors.CostOfRepairs}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className='row'>
              <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Contingent Voucher No<span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.ContingentVoucherNo}
                      className={`form-control ${formik.touched.ContingentVoucherNo &&
                          formik.errors.ContingentVoucherNo
                          ? "is-invalid"
                          : ""
                        }`}
                      id="ContingentVoucherNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.ContingentVoucherNo &&
                      formik.errors.ContingentVoucherNo && (
                        <div className="invalid-feedback">
                          {formik.errors.ContingentVoucherNo}
                        </div>
                      )}
                  </div>
                </div>

                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Signature of officer-in-charge staff car<span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={""}
                      value={formik.values.SignatureOfOfficerInCharge}
                      className={`form-control ${formik.touched.SignatureOfOfficerInCharge &&
                          formik.errors.SignatureOfOfficerInCharge
                          ? "is-invalid"
                          : ""
                        }`}
                      id="SignatureOfOfficerInCharge"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.SignatureOfOfficerInCharge &&
                      formik.errors.SignatureOfOfficerInCharge && (
                        <div className="invalid-feedback">
                          {formik.errors.SignatureOfOfficerInCharge}
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

export default AddEditPurchasesMade