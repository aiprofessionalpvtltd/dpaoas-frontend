import React, { useContext, useEffect, useState } from 'react'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { useLocation } from 'react-router'
import { UpdateContactList, createContactList, getallMembers } from '../../../../../../api/APIs'
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { useFormik } from 'formik'
import { AuthContext } from '../../../../../../api/AuthContext'
import Select from "react-select";
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


function SMSAddList({ modalisOpan, hendleModal, Data, getContactListApi }) {
    // const location = useLocation()
    // const Data = [{listName:"",listDescription:"",contactMembers:[]}]
    const userData = getUserData();



    const { members } = useContext(AuthContext)

    console.log("Data ? Data[0]?.listActive", Data[0]?.isPublicList);


    const [isChecked, setChecked] = useState(Data ? Data[0]?.isPublicList : false)
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const formik = useFormik({
        initialValues: {
            listName: Data ? Data[0].listName : "",
            listDescription: Data ? Data[0].listDescription : "",
            contactMembers: Data
                ? Data[0].contactMembers.map((contact) => ({
                    value: contact.fkMemberId,
                    label: contact.member.memberName,
                }))
                : [],
            status: Data ? Data[0]?.listActive : "",
        },

        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            if (Data[0]?.id) {
                UpdateContactListApi(values);
            } else {
                CreateCOntactListApi(values);
            }
        },
    });


    const CreateCOntactListApi = async (values) => {

        const data = {
            listName: values?.listName,
            listDescription: values?.listDescription,
            fkUserId: userData?.fkUserId,
            isPublicList: isChecked,
            contactMembers: values.contactMembers.map(mover => ({
                fkMemberId: mover.value
            }))
        };
        try {
            const response = await createContactList(data);
            if (response.success) {
                showSuccessMessage(response.message);
                getContactListApi()
                hendleModal()
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    const UpdateContactListApi = async (values) => {
        const data = {
            listName: values?.listName,
            listDescription: values?.listDescription,
            fkUserId: userData?.fkUserId,
            isPublicList: isChecked,
            contactMembers: values?.contactMembers?.map(mover => ({
                fkMemberId: mover.value
            })),
            listActive: values?.status
        };
        try {
            const response = await UpdateContactList(Data[0]?.id, data);
            if (response.success) {
                showSuccessMessage(response.message);
                getContactListApi()
                hendleModal()
            }
        } catch (error) {
            showErrorMessage(error.response.data.message)
        }
    };



    return (
        // <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
        //    
        //     <Header
        //         dashboardLink={"/sms/dashboard"}
        //         title1={
        //             Data && Data? ? "Edit List" : "Add List"
        //         }
        //         addLink1={"/sms/phone-book/add"}
        //     />
        <Modal
            isOpen={modalisOpan}
            onRequestClose={() => hendleModal()}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        {Data && Data[0]?.id ? (
                            <h1>Edit Phone List</h1>
                        ) : <h1>Add Phone List</h1>}

                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">List Name * </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id='listName'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.listName}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Member List</label>
                                            <Select
                                                options={members.map((item) => ({
                                                    value: item.id,
                                                    label: item.memberName,
                                                }))}
                                                isMulti
                                                onChange={(selectedOptions) =>
                                                    formik.setFieldValue("contactMembers", selectedOptions)
                                                }
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactMembers}
                                                name="contactMembers"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Remarks</label>
                                            <input
                                                className={`form-control`}
                                                id='listDescription'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.listDescription}
                                            />

                                        </div>
                                    </div>
                                    {Data[0]?.id && (
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
                                                        {Data ? Data[0]?.listActive : "Select"}
                                                    </option>
                                                    <option value={"active"}>
                                                        Active
                                                    </option>
                                                    <option value={"inactive"}>
                                                        Inactive
                                                    </option>

                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='row'>
                                    <div class="col mt-3">
                                        <div class="mb-3">
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckDefault"
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Public List
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex row justify-content-center align-items-center">
                                    <div className="col-4" style={{ marginTop: "30px" }}>
                                        <button className="btn btn-primary" type="button" onClick={() => hendleModal()}>
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="col-4" style={{ marginTop: "30px" }}>
                                        <button className="btn btn-primary" type="submit">
                                            Save
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
        // </Layout>
    )
}

export default SMSAddList
