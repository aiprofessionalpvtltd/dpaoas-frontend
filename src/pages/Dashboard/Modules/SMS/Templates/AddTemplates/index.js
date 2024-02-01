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
import Modal from "react-modal";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "50%",
        transform: 'translate(-50%, -50%)',
    },
};

function SMSAddEditTemplate({ modalisOpan, hendleModal, selectedData, getTemplate }) {
    // const location = useLocation()
    const userData = getUserData();
    console.log("selectedData.Status",selectedData.Status);


    const formik = useFormik({
        initialValues: {
            templateName: selectedData ? selectedData.templateName : "",
            msgText: selectedData ? selectedData.description : "",
            status:  selectedData ? selectedData.Status :""
        },

        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            if (selectedData?.id) {
                UpdateContactTemplateAPi(values);
            } else {
                CreateContactTemplateApi(values);
            }
        },
    });

    const CreateContactTemplateApi = async (values) => {
        const data = {
            templateName: values?.templateName,
            msgText: values?.msgText,
            fkUserId: userData?.fkUserId,
            isActive: true
        };
        try {
            const response = await createContactTemplate(data);
            if (response.success) {
                showSuccessMessage(response.message);
                hendleModal()
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const UpdateContactTemplateAPi = async (values) => {
        const data = {
            templateName: values?.templateName,
            msgText: values?.msgText,
            fkUserId: userData?.fkUserId,
            isActive: values?.status
        };
        try {
            const response = await UpdateContactTemplate(selectedData.id, data);
            if (response.success) {
                showSuccessMessage(response.message);
                getTemplate()
                hendleModal()
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    return (
        <Modal
            isOpen={modalisOpan}
            onRequestClose={() => hendleModal()}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        {selectedData && selectedData.id ? (
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
                                    {selectedData?.id && (
                                        <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Status</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.status}
                                                onChange={formik.handleChange}
                                                id="status"
                                                onBlur={formik.handleBlur}
                                            >
                                                <option selected disabled hidden>
                                                   {selectedData ? selectedData.Status : "Select"}
                                                </option>
                                                <option value={"true"}>
                                                    True
                                                </option>
                                                <option value={"false"}>
                                                    False
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    )}
                                    
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Message Text</label>
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
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SMSAddEditTemplate
