import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { VMSsidebarItems } from '../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../../../../components/Header';
import DatePicker from "react-datepicker";
import { UpdatePasses, createPasses } from '../../../../../api/APIs';


const validationSchema = Yup.object({
  remarks: Yup.string().required('Remarks is required'),
  passdate: Yup.string().required('Pass Date is required'),
  requestby: Yup.string().required('Request By is required'),

});
function VMSAddEditPass() {
  const location = useLocation()
  const navigate = useNavigate()
  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      remarks: '',
      passdate: '',
      requestby: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      CreatePassesApi(values)
    },
  });

  const CreatePassesApi = async (values) => {
    try {
      const response = await createPasses(values)
      if (response.success) {
        navigate("/vms/dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const UpdatePassesApi = async (values) => {
    try {
      const response = await UpdatePasses(values)
      if (response.success) {
        navigate("/vms/dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} addLink2={"/vms/addeditpass"} title2={location && location?.state ? "Edit Pass" : "Add Pass"} />
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
                    <input type="text" className={`form-control ${formik.touched.passdate && formik.errors.passdate ? 'is-invalid' : ''}`}
                      id="passdate"
                      placeholder={formik.values.passdate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passdate} />
                    {formik.touched.passdate && formik.errors.passdate && (
                      <div className='invalid-feedback'>{formik.errors.passdate}</div>
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
                    <select class="form-select">
                      <option>IT</option>
                      <option>HR</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visit Purpose</label>
                    <textarea class="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Card Type</label>
                    <select class="form-select">
                      <option>Personal</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Date</label>
                    <DatePicker selected={fromdate} onChange={(date) => setFromDate(date)} className='form-control' />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Date</label>
                    <DatePicker selected={todate} onChange={(date) => setToDate(date)} className='form-control' />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Active</label>
                    <select class="form-select">
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
