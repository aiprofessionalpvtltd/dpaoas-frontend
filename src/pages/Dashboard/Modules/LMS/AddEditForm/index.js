import React from 'react'
import { LMSsidebarItems } from '../../../../../utils/sideBarItems'
import { Layout } from '../../../../../components/Layout'
import logoImage from "../../../../../assets/profile-img.jpg"
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../../../../components/Header'

const validationSchema = Yup.object({
    reason: Yup.string().required('Reason is required'),
    comments: Yup.string().required('Comment is required'),
    startdate: Yup.string().required('Start Date is required'),

});
function LMSAddEdit() {
    const location = useLocation()
    const formik = useFormik({
        initialValues: {
            reason: '',
            comments: '',
            startdate: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });
    return (
        <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/lms/dashboard"} addLink1={"/lms/addedit"} title1={location && location.state ? "Edit Leave" : "Add Leave"} />
            <div class='card'>
                <div class='card-header red-bg' style={{ background: "#14ae5c " }}>
                    {location && location.state ? (
                        <h1>Edit Leave</h1>
                    ) : <h1>Add Leave</h1>}
                </div>
                <div class='card-body'>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Leave Forwarder</label>
                                        <select class="form-select">
                                            <option>Year</option>
                                            <option>2023</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Submitted To</label>
                                        <select class="form-select">
                                            <option>Year</option>
                                            <option>2023</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Leave Type </label>
                                        <select class="form-select">
                                            <option>Year</option>
                                            <option>2023</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Leave Subtype</label>
                                        <select class="form-select">
                                            <option>Year</option>
                                            <option>2023</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className='mb-3'>
                                        <label className='form-label'>Start Date </label>
                                        <select
                                            className={`form-select ${formik.touched.startdate && formik.errors.startdate ? 'is-invalid' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.startdate}
                                            name="startdate"
                                        >
                                            <option value="" label="Select an option" />
                                            <option value="Branch">Branch</option>
                                            <option value="Legislation">Legislation</option>
                                            <option value="IT">IT</option>
                                        </select>
                                        {formik.touched.startdate && formik.errors.startdate && (
                                            <div className='invalid-feedback'>{formik.errors.startdate}</div>
                                        )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">End Date </label>
                                        <select class="form-select">
                                            <option>Branch</option>
                                            <option>Legislation</option>
                                            <option>IT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Status </label>
                                        <select class="form-select">
                                            <option>Document Type</option>
                                            <option>External</option>
                                            <option>Internal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <div class="form-check" style={{ marginTop: "39px" }}>
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Leave Station
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Attachment </label>
                                        <input class="form-control" type="file" id="formFile" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Reason</label>
                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder={formik.values.reason}
                                            className={`form-control ${formik.touched.reason && formik.errors.reason ? 'is-invalid' : ''}`}
                                            id='reason'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.reason}
                                        ></textarea>
                                        {formik.touched.reason && formik.errors.reason && (
                                            <div className='invalid-feedback'>{formik.errors.reason}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Comment</label>
                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder={formik.values.comments}
                                            className={`form-control ${formik.touched.comments && formik.errors.comments ? 'is-invalid' : ''}`}
                                            id='comments'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.comments}
                                        ></textarea>
                                        {formik.touched.comments && formik.errors.comments && (
                                            <div className='invalid-feedback'>{formik.errors.comments}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                            {location.state && (
                                <div class="row">
                                    <div class="col">
                                        <div class="d-flex flex-row p-3" style={{ border: "#ddd solid 1px", marginTop: "25px" }}>
                                            <img style={{ marginBottom: "30px", marginRight: "15px" }} src={logoImage} width="40" height="40" class="rounded-circle mr-3" alt='logo' />
                                            <div class="w-100">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex flex-row align-items-center">
                                                        <span class="mr-2">Saqib</span>
                                                        <small style={{ marginLeft: "8px" }} class="c-badge">Pending</small>
                                                    </div>
                                                    <small>Mon, 07-18-2022 09:02 AM</small>
                                                </div>
                                                <p class="text-justify comment-text mb-0" style={{ marginTop: "7px" }}>I dont have any assistance from relatives, so I have to participate it.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LMSAddEdit
