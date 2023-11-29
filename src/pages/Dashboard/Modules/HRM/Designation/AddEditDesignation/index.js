import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UpdateDesignation, createDesignation } from '../../../../../../api/APIs'

const validationSchema = Yup.object({
    designationname: Yup.string().required('Designation name is required'),
    designationdescription: Yup.string().required('description is required'),
    designationstatus: Yup.string().required('status is required'),
});
function HRMAddEditDesignation() {
    const location = useLocation()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            designationname: '',
            designationdescription: '',
            designationstatus: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            CreateDesignationApi(values)
        },
    });

    const CreateDesignationApi = async (values) => {
        const data = { name: values?.designationname, description: values?.designationdescription }
        try {
            const response = await createDesignation(data)
            if (response.success) {
                navigate("/hrm/designation")
            }
        } catch (error) {
            console.log(error);
        }
    }


    const UpdateDesignationApi = async (values) => {
        const data = { name: values?.departmentName, description: values?.description, desginationStatus: values.status }
        try {
            const response = await UpdateDesignation(data)
            if (response.success) {
                navigate("/hrm/designation")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/designation"} addLink1={"/hrm/designation"} title1={"Designation"} addLink2={"/hrm/addeditdesignation"} title2={location && location?.state ? "Edit Designation" : "Add Designation"} />
            <div className='container-fluid'>
                <div className='card'>
                    <div className='card-header red-bg' style={{ background: "#666" }}>
                        {location && location?.state ? (
                            <h1>Edit Designation</h1>
                        ) : <h1>Add Designation</h1>}
                    </div>
                    <div className='card-body'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Designation name * </label>
                                            <input
                                                type='text'
                                                placeholder={formik.values.designationname}
                                                className={`form-control ${formik.touched.designationname && formik.errors.designationname ? 'is-invalid' : ''}`}
                                                id='designationname'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.designationname && formik.errors.designationname && (
                                                <div className='invalid-feedback'>{formik.errors.designationname}</div>
                                            )}
                                        </div>
                                    </div>
                                    {location && location?.state && (
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label className="form-label">Staus</label>
                                                <input type="email" className={`form-control ${formik.touched.designationstatus && formik.errors.designationstatus ? 'is-invalid' : ''}`}
                                                    id="designationstatus"
                                                    placeholder={formik.values.designationstatus}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.designationstatus} />
                                                {formik.touched.designationstatus && formik.errors.designationstatus && (
                                                    <div className='invalid-feedback'>{formik.errors.designationstatus}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                placeholder={formik.values.designationdescription}
                                                className={`form-control ${formik.touched.designationdescription && formik.errors.designationdescription ? 'is-invalid' : ''}`}
                                                id='designationdescription'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.designationdescription}
                                            ></textarea>
                                            {formik.touched.designationdescription && formik.errors.designationdescription && (
                                                <div className='invalid-feedback'>{formik.errors.designationdescription}</div>
                                            )}
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button className="btn btn-primary" type="submit" >Submit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HRMAddEditDesignation
