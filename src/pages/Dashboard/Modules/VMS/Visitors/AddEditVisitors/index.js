import React from 'react'
import { VMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../../../../../components/Header';
import { UpdateVisitorsByVisitorId, createVisitorsByPassId } from '../../../../../../api/APIs';

const validationSchema = Yup.object({
    visitorname: Yup.string().required('Visitor Name is required'),
    cnic: Yup.string().required('Cnic is required'),
    visitordetail: Yup.string().required('Visitor Detail By is required'),

});
function VMSAddEditVisitors() {
    const location = useLocation()
    const formik = useFormik({
        initialValues: {
            visitorname: '',
            cnic: '',
            visitordetail: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            CreateVisitorsApi(values)
        },
    });

    const CreateVisitorsApi = async (values) => {
        try {
            const response = await createVisitorsByPassId(values)
        } catch (error) {
            console.log(error);
        }
    }

    const updateVisitorsApi = async (values) => {
        try {
            const response = await UpdateVisitorsByVisitorId(values)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/visitor"} title1={"Visitors"} addLink2={"/vms/addeditvisitor"} title2={location && location.state ? "Edit Visitors" : "Add Visitors"} />

            <div class='card'>
                <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                    {location && location.state ? (
                        <h1>Edit Visitors</h1>
                    ) : <h1>Add Visitors</h1>}
                </div>
                <div class='card-body'>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Visitor Name</label>
                                        <input type="text" className={`form-control ${formik.touched.visitorname && formik.errors.visitorname ? 'is-invalid' : ''}`}
                                            id="visitorname"
                                            placeholder={formik.values.visitorname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.visitorname} />
                                        {formik.touched.visitorname && formik.errors.visitorname && (
                                            <div className='invalid-feedback'>{formik.errors.visitorname}</div>
                                        )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">CNIC</label>
                                        <input type="text" className={`form-control ${formik.touched.cnic && formik.errors.cnic ? 'is-invalid' : ''}`}
                                            id="cnic"
                                            placeholder={formik.values.cnic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.cnic} />
                                        {formik.touched.cnic && formik.errors.cnic && (
                                            <div className='invalid-feedback'>{formik.errors.cnic}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Visitor Details</label>

                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder={formik.values.visitordetail}
                                            className={`form-control ${formik.touched.visitordetail && formik.errors.visitordetail ? 'is-invalid' : ''}`}
                                            id='visitordetail'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.visitordetail}
                                        ></textarea>
                                        {formik.touched.visitordetail && formik.errors.visitordetail && (
                                            <div className='invalid-feedback'>{formik.errors.visitordetail}</div>
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

export default VMSAddEditVisitors
