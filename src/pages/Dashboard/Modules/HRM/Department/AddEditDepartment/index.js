import React from 'react'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    departmentName: Yup.string().required('Department name is required'),
    description: Yup.string().required('description is required'),
    status: Yup.string().required('status is required'),
});
function HRMAddEditDepartment() {
    const location = useLocation()

    const formik = useFormik({
        initialValues: {
            departmentName: '',
            description: '',
            status: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });





    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/department"} addLink1={"/hrm/department"} title1={"Department"} addLink2={"/hrm/addeditdepartment"} title2={location && location?.state ? "Edit Department" : "Add Department"} />
            <div className='container-fluid'>
                <div className='card'>
                    <div className='card-header red-bg' style={{ background: '#666' }}>
                        {location && location?.state ? (

                            <h1>Edit Department</h1>
                        ) : <h1>Add Department</h1>}
                    </div>
                    <div className='card-body'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='mb-3'>
                                            <label className='form-label'>Department name * </label>
                                            <input
                                                type='text'
                                                className={`form-control ${formik.touched.departmentName && formik.errors.departmentName ? 'is-invalid' : ''}`}
                                                id='departmentName'
                                                placeholder={formik.values.departmentName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.departmentName && formik.errors.departmentName && (
                                                <div className='invalid-feedback'>{formik.errors.departmentName}</div>
                                            )}
                                        </div>
                                    </div>
                                    {location && location?.state && (
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label className="form-label">Staus</label>
                                                <input type="email" className={`form-control ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                                                    id="exampleFormControlInput1"
                                                    placeholder={formik.values.status}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.status} />
                                                {formik.touched.status && formik.errors.status && (
                                                    <div className='invalid-feedback'>{formik.errors.status}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='mb-3'>
                                            <label className='form-label'>Description</label>
                                            <textarea
                                                placeholder={formik.values.description}
                                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                                id='description'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                            ></textarea>
                                            {formik.touched.description && formik.errors.description && (
                                                <div className='invalid-feedback'>{formik.errors.description}</div>
                                            )}
                                        </div>

                                        {/* Add validation and error display for other fields */}
                                    </div>
                                </div>
                                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                    <button className='btn btn-primary' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default HRMAddEditDepartment
