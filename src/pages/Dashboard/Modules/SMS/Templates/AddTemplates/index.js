import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useLocation } from 'react-router'
import { useFormik } from 'formik'
import { UpdateContactTemplate, createContactTemplate } from '../../../../../../api/APIs'
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { getUserData } from '../../../../../../api/Auth'

function SMSAddEditTemplate() {
    const location = useLocation()
    console.log("asld;al", location.state);
    const userData = getUserData();


    const formik = useFormik({
        initialValues: {
            templateName: location.state ? location.state.templateName : "",
            msgText: location.state ? location.state.description : "",
            //   status: location.state ? location.state.departmentStatus : "",
        },

        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            if (location.state) {
                UpdateContactTemplateAPi();
            } else {
                CreateContactTemplateApi(values);
            }
        },
    });

    const CreateContactTemplateApi = async (values) => {
        const data = {
            templateName: values?.templateName,
            msgText: values?.msgText,
            fkUserId: userData?.id,
            isActive: true
        };
        try {
            const response = await createContactTemplate(data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    const UpdateContactTemplateAPi = async (values) => {
        const data = {
            templateName: values?.templateName,
            msgText: values?.msgText,
            fkUserId: userData?.id,
            isActive: true
        };
        try {
            const response = await UpdateContactTemplate(location.state.id, data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <ToastContainer />
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={
                    location && location?.state ? "Edit Template" : "Add Template"
                }
                addLink1={"/sms/template/add"}
            />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        {location && location.state ? (
                            <h1>Edit Template</h1>
                        ) : <h1>Add Template</h1>}

                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">templateName * </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id='templateName'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.templateName}
                                            />

                                        </div>
                                    </div>
                                    {/* <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">List Field</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id=""
                                    />
                                </div>
                            </div> */}
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className={`form-control`}
                                                id='msgText'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.msgText}

                                            ></textarea>

                                        </div>

                                        {/* Add validation and error display for other fields */}
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-primary" type="submit">
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

export default SMSAddEditTemplate
