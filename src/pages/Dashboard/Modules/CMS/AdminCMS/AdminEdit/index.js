import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Layout } from '../../../../../../components/Layout';
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems';
import Header from '../../../../../../components/Header';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { UpdateComplaintByAdmin } from '../../../../../../api/APIs';
import { getUserData } from '../../../../../../api/Auth';
import { AuthContext } from '../../../../../../api/AuthContext';
import Select from "react-select";


function CMSAdminEditComplaint() {
    const location = useLocation();
    const userData = getUserData();
    const { employeeData } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            fkResolverUserId: location.state ? location.state.fkComplaineeUserId : `${userData?.firstName} ${userData?.lastName}`,
            complaintRemark: "",
            complaintStatus: "",
            complaintResolvedDate: "",
            complaintAttachmentFromResolver: ""
        },

        onSubmit: (values) => {
            // Handle form submission here
            // console.log(values);
            UpdateComplaintAPi(values)

        },
    });

    const UpdateComplaintAPi = async (values) => {
        const formData = new FormData()

        formData.append("fkResolverUserId", values?.fkResolverUserId?.value)
        formData.append("complaintResolvedDate", values.complaintResolvedDate)
        formData.append("complaintRemark", values.complaintRemark)
        formData.append("complaintStatus", values.complaintStatus)
        formData.append('complaintAttachmentFromResolver', values.complaintAttachmentFromResolver)

        try {
            const response = await UpdateComplaintByAdmin(location.state.id, formData);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/admin/dashboard"}
                addLink1={"/cms/admin/dashboard/addedit"}
                title1={
                    "Edit Admin Complaint"
                }
            />
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Resolved Admin Complaint</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Complainee</label>
                                            {/* <input
                                                type="text"
                                                className={`form-control`}
                                                id="fkResolverUserId"
                                                placeholder={formik.values.fkResolverUserId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            /> */}
                                            <Select
                                                options={employeeData && employeeData?.map((item) => ({
                                                    value: item.fkUserId,
                                                    label: `${item.firstName}${item.lastName}`,
                                                }))}

                                                onChange={(selectedOptions) =>
                                                    formik.setFieldValue("fkResolverUserId", selectedOptions)
                                                }
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fkResolverUserId}
                                                name="fkResolverUserId"
                                                isClearable={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3" style={{ position: "relative" }}>
                                            <label className="form-label">
                                                Complaint Resolved Date
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
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </span>
                                            <DatePicker
                                                selected={formik.values.complaintResolvedDate}
                                                minDate={new Date()}
                                                onChange={(date) =>
                                                    formik.setFieldValue("complaintResolvedDate", date)
                                                }
                                                onBlur={formik.handleBlur}
                                                className={`form-control`}
                                            />

                                        </div>
                                    </div>
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Complaint Remarks</label>
                                            <textarea
                                                className={`form-control`}
                                                id="complaintRemark"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.complaintRemark}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Complaint Status</label>
                                            <select class="form-select"
                                                id="complaintStatus"
                                                name="complaintStatus"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.complaintStatus}
                                            >
                                                <option value={""} selected disabled hidden>
                                                    select
                                                </option>
                                                <option value="pending">pending</option>
                                                <option value="in-progress">in-progress</option>
                                                <option value="resolved">resolved</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Attachment
                                            </label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                accept=".pdf, .jpg, .jpeg, .png"
                                                id="complaintAttachmentFromResolver"
                                                name="complaintAttachmentFromResolver"
                                                onChange={(event) => {
                                                    formik.setFieldValue(
                                                        "complaintAttachmentFromResolver",
                                                        event.currentTarget.files[0],
                                                    );
                                                }}
                                            />
                                        </div>
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

export default CMSAdminEditComplaint