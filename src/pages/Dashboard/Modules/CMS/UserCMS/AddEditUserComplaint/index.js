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
import { UpdateComplaint, createComplaint, getallcomplaintCategories, getallcomplaintTypes } from '../../../../../../api/APIs';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { getUserData } from '../../../../../../api/Auth';




function CMSAddEditUserComplaint() {
  const location = useLocation()
  const userData = getUserData();
  console.log("asdlsa", userData);
  const [complaintType, setComplaintType] = useState([])
  const [complaintCategories, setComplaintCategories] = useState([])



  const formik = useFormik({
    initialValues: {
      fkComplaineeUserId: location.state ? location.state.fkComplaineeUserId : `${userData.firstName} ${userData.lastName}`,
      fkComplaintTypeId: "",
      fkComplaintCategoryId: "",
      complaintDescription: location.state ? location?.state?.complaintDescription : "",
      complaintIssuedDate: "",
      complaintAttachment: ""
    },

    onSubmit: (values) => {
      // Handle form submission here
      // console.log(values);
      if (location.state) {
        UpdateComplaintAPi();
      } else {
        CreateComplaintApi(values);
      }
    },
  });

  const CreateComplaintApi = async (values) => {
    const formData = new FormData()
    formData.append("fkComplaineeUserId", userData?.id)
    formData.append("fkComplaintTypeId", values.fkComplaintTypeId)
    formData.append("fkComplaintCategoryId", values.fkComplaintCategoryId)
    formData.append("complaintDescription", values.complaintDescription)
    formData.append('complaintIssuedDate', values.complaintIssuedDate)
    formData.append('complaintAttachment', values.complaintAttachment)

    try {
      const response = await createComplaint(formData);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const UpdateComplaintAPi = async (values) => {
    const data = {
      departmentName: values?.departmentName,
      description: values?.description,
      departmentStatus: values?.status,
    };
    try {
      const response = await UpdateComplaint(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };






  const AllComplaintTypeApi = async () => {
    try {
      const response = await getallcomplaintTypes();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setComplaintType(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const AllComplaintCategoriesApi = async () => {
    try {
      const response = await getallcomplaintCategories();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setComplaintCategories(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    AllComplaintTypeApi()
    AllComplaintCategoriesApi()
  }, [])

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/dashboard"}
        addLink1={"/cms/dashboard/addedit"}
        title1={
          location && location?.state ? "Edit User Complaint" : "Add User Complaint"
        }
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit User Complaint</h1>
            ) : (
              <h1>Add User Complaint</h1>
            )}
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
                        id="fkComplaineeUserId"
                        placeholder={formik.values.fkComplaineeUserId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Complaint Type</label>
                      <select class="form-select"
                        id="fkComplaintTypeId"
                        name="fkComplaintTypeId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkComplaintTypeId}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        {complaintType &&
                          complaintType.map((item) => (
                            <option value={item.id}>{item.complaintTypeName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Staus</label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="exampleFormControlInput1"
                        placeholder={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                      />
                    </div>
                  </div> */}
                </div>
                {/* Add similar validation logic for other fields */}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Complaint Description</label>
                      <textarea
                        className={`form-control`}
                        id="complaintDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.complaintDescription}
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Complaint Category</label>
                      <select class="form-select"
                        id="fkComplaintCategoryId"
                        name="fkComplaintCategoryId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkComplaintCategoryId}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        {complaintCategories &&
                          complaintCategories.map((item) => (
                            <option value={item.id}>{item.complaintCategoryName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Question Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="formFile"
                        name="complaintAttachment"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "complaintAttachment",
                            event.currentTarget.files[0],
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Complaint Issued Date
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
                        selected={formik.values.complaintIssuedDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("complaintIssuedDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
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

export default CMSAddEditUserComplaint