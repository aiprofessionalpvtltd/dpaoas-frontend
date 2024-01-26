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
import { UpdateComplaintByAdmin, createInventory } from '../../../../../../api/APIs';
import { getUserData } from '../../../../../../api/Auth';
import { AuthContext } from '../../../../../../api/AuthContext';
import Select from "react-select";


function CMSAddInventory() {
    const { employeeData } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            fkAssignedToUser: "",
            description: "",
            status: "",
            assignedDate: "",
            quantity: "",
            serialNo:"",
            productName:""
        },

        onSubmit: (values) => {
            // Handle form submission here
            // console.log(values);
            hendleAddInventory(values)

        },
    });

    const hendleAddInventory = async (values) => {

        const Data = {
            fkAssignedToUser: values?.fkAssignedToUser?.value,
            description:  values.description,
            status:  values.status,
            assignedDate: values.assignedDate,
            quantity: values.quantity,
            serialNo:values.serialNo,
            productName:values.productName
        }

        try {
            const response = await createInventory(Data);
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
                dashboardLink={"/cms/admin/inventory/dashboard"}
                addLink1={"/cms/admin/inventory/dashboard/add"}
                title1={
                    "Add Inventory"
                }
            />
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Add Inventory</h1>
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
                                                id="fkAssignedToUser"
                                                placeholder={formik.values.fkAssignedToUser}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            /> */}
                                            <Select
                                                options={employeeData && employeeData?.map((item) => ({
                                                    value: item.fkUserId,
                                                    label: `${item.firstName}${item.lastName}`,
                                                }))}

                                                onChange={(selectedOptions) =>
                                                    formik.setFieldValue("fkAssignedToUser", selectedOptions)
                                                }
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fkAssignedToUser}
                                                name="fkAssignedToUser"
                                                isClearable={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3" style={{ position: "relative" }}>
                                            <label className="form-label">
                                                Assigned Date
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
                                                selected={formik.values.assignedDate}
                                                minDate={new Date()}
                                                onChange={(date) =>
                                                    formik.setFieldValue("assignedDate", date)
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
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className={`form-control`}
                                                id="description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Assigned</label>
                                            <select class="form-select"
                                                id="status"
                                                name="status"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.status}
                                            >
                                                <option value={""} selected disabled hidden>
                                                    select
                                                </option>
                                                <option value="true">true</option>
                                                <option value="false">false</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Quantity
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id="quantity"
                                                placeholder={formik.values.quantity}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Serial No
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id="serialNo"
                                                placeholder={formik.values.serialNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id="productName"
                                                placeholder={formik.values.productName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

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

export default CMSAddInventory