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


function SMSAddList() {
    const location = useLocation()
    const userData = getUserData();
    
  const {members} = useContext(AuthContext)

  const damemember = [
    {
        id:1,
        memberName:"Saqib Khan"
    },
    {
        id:2,
        memberName:"Raja Khan"
    },
    {
        id:3,
        memberName:"Mohsin Khan"
    }
    
  ]

    const [isChecked, setChecked] = useState(false)
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
      };

      const formik = useFormik({
        initialValues: {
            listName: location.state ? location.state.listName : "",
            listDescription: location.state ? location.state.listDescription : "",
            contactMembers:[]
            //   status: location.state ? location.state.departmentStatus : "",
        },

        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            if (location.state) {
                UpdateContactListApi();
            } else {
                CreateCOntactListApi(values);
            }
        },
    });

    
    const CreateCOntactListApi = async (values) => {
        
        const data = {
            listName: values?.listName,
            listDescription: values?.listDescription,
            fkUserId: userData?.id,
            isPublicList: isChecked,
            contactMembers:values.contactMembers.map(mover => ({
                fkMemberId: mover.value
              }))
        };
        try {
            const response = await createContactList(data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    const UpdateContactListApi = async (values) => {
        const data = {
            listName: values?.listName,
            listDescription: values?.listDescription,
            fkUserId: userData?.id,
            isPublicList: isChecked,
            contactMembers:values?.contactMembers?.map(mover => ({
                fkMemberId: mover.value
              }))
        };
        try {
            const response = await UpdateContactList(location.state.id, data);
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
                    location && location?.state ? "Edit List" : "Add List"
                  }
                addLink1={"/sms/phone-book/add"}
            />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        {location && location.state ? (
                            <h1>Edit Phone List</h1>
                        ): <h1>Add Phone List</h1>}
                       
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
                                            <label className="form-label">List Field</label>
                                            <Select
                                                    options={damemember.map((item) => ({
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
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className={`form-control`}
                                                id='listDescription'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.listDescription}
                                            ></textarea>

                                        </div>
                                    </div>
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
                          isPublicList
                        </label>
                      </div>
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

export default SMSAddList
