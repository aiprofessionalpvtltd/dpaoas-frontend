import React from 'react'
import { useLocation } from 'react-router'
import { CMSsidebarItems } from '../../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../../components/Layout'
import Header from '../../../../../../../components/Header'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import { UpdateVendor } from '../../../../../../../api/APIs'
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert'

function CMSEditVendor() {
    const location = useLocation()
    const formik = useFormik({
        initialValues: {
            vendorName: location.state ? location.state.vendorName : "",
            description: location.state ? location.state.description : "",
            status: location.state ? location.state.status : "",
        },

        // validationSchema: validationSchema,
        onSubmit: (values) => {
            CreateVendorAPI(values)
        },
    });

    const CreateVendorAPI = async (values) => {
        const data = {
            vendorName: values?.vendorName,
            description: values?.description,
            status: values.status,
        };
        try {
            const response = await UpdateVendor(location?.state?.id, data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };
    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/admin/inventory/vendor-list"}
                addLink1={"/cms/admin/inventory/vendor-list/edit"}
                title1={"Edit Vendor"}

            />
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Edit Vendor</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Vendor Name * </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.vendorName &&
                                                        formik.errors.vendorName
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                id="vendorName"
                                                placeholder={formik.values.vendorName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.vendorName &&
                                                formik.errors.vendorName && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.vendorName}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    {location && location?.state?.id && (
                                        <div className="col-6">

                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label">
                                                    Status
                                                </label>
                                                <select class="form-select"
                                                    id="status"
                                                    name="status"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.status}
                                                >
                                                    <option value={""} selected disabled hidden>
                                                        Select
                                                    </option>

                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>


                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                placeholder={formik.values.description}
                                                className={`form-control ${formik.touched.description &&
                                                        formik.errors.description
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                id="description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                            ></textarea>
                                            {formik.touched.description &&
                                                formik.errors.description && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.description}
                                                    </div>
                                                )}
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

export default CMSEditVendor