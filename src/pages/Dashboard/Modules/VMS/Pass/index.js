import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { VMSsidebarItems } from '../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../../../../components/Header';
import DatePicker from "react-datepicker";
import { UpdatePasses, createPasses } from '../../../../../api/APIs';
import { showSuccessMessage } from '../../../../../utils/ToastAlert';
import { ToastContainer } from 'react-toastify';


const validationSchema = Yup.object({
  passdate: Yup.string().required('Pass Date is required'),
  requestby: Yup.string().required('Request By is required'),
  branch: Yup.string(),
  visitpurpose: Yup.string(),
  cardtype: Yup.string(),
  companyname: Yup.string(),
  companyname: Yup.string(),
  fromdate: Yup.string().required('From Date is required'),
  todate: Yup.string().required('To Date is required'),
  passstatus: Yup.string(),
  passstatus: Yup.string(),
  allowoffdays: Yup.string(),
  remarks: Yup.string().required('Remarks is required'),

});
function VMSAddEditPass() {
  const location = useLocation()
  console.log("Pass Edit From data", location?.state?.id);
  const navigate = useNavigate()
  const passDate = location?.state?.passDate ? new Date(location?.state?.passDate) : null;
  const fromDate = location?.state?.fromDate ? new Date(location?.state?.fromDate) : null;
  const toDate = location?.state?.toDate ? new Date(location?.state?.toDate) : null;

  const formik = useFormik({
    initialValues: {
      passdate: location?.state ? passDate : '',
      requestby: location?.state ? location?.state?.requestedBy : '',
      branch: location?.state ? location?.state?.branch : '',
      visitpurpose: location?.state ? location?.state?.visitPurpose : '',
      cardtype: location?.state ? location?.state?.cardType : '',
      companyname: location?.state ? location?.state?.companyName : '',
      fromdate: location?.state ? fromDate : '',
      todate: location?.state ? toDate : '',
      passstatus: location?.state ? location?.state?.passStatus : '',
      allowoffdays: location?.state ? location?.state?.allowOffDays : '',
      remarks: location?.state ? location?.state?.remarks : ''
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        UpdatePassesApi(values)
      } else {
        CreatePassesApi(values)
      }
    },
  });

  const CreatePassesApi = async (values) => {
    const startDateObj = new Date(values.fromdate);
    const endDateObj = new Date(values.todate);

    // Calculate the time difference in milliseconds
    const timeDiff = endDateObj - startDateObj;

    // Calculate the number of days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const data = {
      passDate: values.passdate,
      requestedBy: values.requestby,
      branch: values.branch,
      visitPurpose: values.visitpurpose,
      fromDate: values.fromdate,
      toDate: values.todate,
      cardType: values.cardtype,
      companyName: values.companyname,
      allowOffDays: [
        String(daysDiff)
      ],
      remarks: values.remarks,
      passStatus: values.passstatus
    }
    console.log("Data frome", data);
    try {
      const response = await createPasses(data)
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const UpdatePassesApi = async (values) => {
    const startDateObj = new Date(values.fromdate);
    const endDateObj = new Date(values.todate);

    // Calculate the time difference in milliseconds
    const timeDiff = endDateObj - startDateObj;

    // Calculate the number of days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const data = {
      passDate: values.passdate,
      requestedBy: values.requestby,
      branch: values.branch,
      visitPurpose: values.visitpurpose,
      fromDate: values.fromdate,
      toDate: values.todate,
      cardType: values.cardtype,
      companyName: values.companyname,
      allowOffDays: [
        String(daysDiff)
      ],
      remarks: values.remarks,
      passStatus: values.passstatus
    }
    // console.log("Data frome", data);
    try {
      const response = await UpdatePasses(data, location?.state?.id)
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} addLink2={"/vms/addeditpass"} title2={location && location?.state ? "Edit Pass" : "Add Pass"} />
      <ToastContainer />
      <div class='card'>
        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
          {location && location?.state ? (
            <h1>Edit Pass</h1>
          ) : <h1>Add Pass</h1>}
        </div>
        <div class='card-body'>
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Pass Date</label>
                    <DatePicker
                      selected={formik.values.passdate}
                      onChange={(date) =>
                        formik.setFieldValue("passdate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.passdate && formik.errors.passdate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.passdate && formik.errors.passdate && (
                      <div className="invalid-feedback">
                        {formik.errors.passdate}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Requested By</label>
                    <input type="text" className={`form-control ${formik.touched.requestby && formik.errors.requestby ? 'is-invalid' : ''}`}
                      id="requestby"
                      placeholder={formik.values.requestby}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requestby} />
                    {formik.touched.requestby && formik.errors.requestby && (
                      <div className='invalid-feedback'>{formik.errors.requestby}</div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Branch</label>
                    <select
                      class="form-select"
                      id="branch"
                      onChange={formik.handleChange}
                      value={formik.values.branch}
                    >
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visit Purpose</label>
                    <textarea class="form-control" id="visitpurpose"
                      onChange={formik.handleChange}
                      value={formik.values.visitpurpose}></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Card Type</label>
                    <select class="form-select" id="cardtype"
                      onChange={formik.handleChange}
                      value={formik.values.cardtype}>
                      <option >Personal</option>
                      <option >Hamid</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input class="form-control" type="text" id="companyname"
                      onChange={formik.handleChange}
                      value={formik.values.companyname} />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Date</label>
                    <DatePicker
                      selected={formik.values.fromdate}
                      onChange={(date) =>
                        formik.setFieldValue("fromdate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.fromdate && formik.errors.fromdate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.fromdate && formik.errors.fromdate && (
                      <div className="invalid-feedback">
                        {formik.errors.fromdate}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Date</label>
                    <DatePicker
                      selected={formik.values.todate}
                      onChange={(date) =>
                        formik.setFieldValue("todate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.todate && formik.errors.todate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.todate && formik.errors.todate && (
                      <div className="invalid-feedback">
                        {formik.errors.todate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Active</label>
                    <select class="form-select" id='passstatus' onChange={formik.handleChange}
                      value={formik.values.passstatus}>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Allow Off Days</label>
                    <div style={{ display: "flex" }}>
                      <div class="form-check" style={{ marginTop: "14px" }}>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Saturday
                        </label>
                      </div>
                      <div class="form-check" style={{ marginTop: "14px", marginLeft: "20px" }}>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Sunday
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Remarks</label>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.remarks}
                      className={`form-control ${formik.touched.remarks && formik.errors.remarks ? 'is-invalid' : ''}`}
                      id='remarks'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.remarks}
                    ></textarea>
                    {formik.touched.remarks && formik.errors.remarks && (
                      <div className='invalid-feedback'>{formik.errors.remarks}</div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default VMSAddEditPass
