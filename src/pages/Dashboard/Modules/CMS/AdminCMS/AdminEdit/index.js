import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
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

function CMSAdminEditComplaint() {
    const location = useLocation();
    const userData = getUserData();

    const formik = useFormik({
        initialValues: {
            fkResolverUserId: location.state ? location.state.fkComplaineeUserId : `${userData?.firstName} ${userData?.lastName}`,
            complaintRemark: "",
            complaintStatus: "",
            complaintResolvedDate: "",
        },

        onSubmit: (values) => {
            // Handle form submission here
            // console.log(values);
            UpdateComplaintAPi(values)

        },
    });

    const UpdateComplaintAPi = async (values) => {
        const data = {
            fkResolverUserId: userData?.id,
            complaintResolvedDate: values?.complaintResolvedDate,
            complaintRemark: values?.complaintRemark,
            complaintStatus: values?.complaintStatus
        };
        try {
            const response = await UpdateComplaintByAdmin(location.state.id, data);
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
                        <h1>Edit Admin Complaint</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">User name</label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id="fkResolverUserId"
                                                placeholder={formik.values.fkResolverUserId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readOnly
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
                                                <option value="closed">closed</option>
                                            </select>
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