import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Layout } from '../../../../../../components/Layout';
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems';
import Header from '../../../../../../components/Header';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import { UpdateComplaint, createComplaint, getInventoryRecordByUserId, getallcomplaintCategories, getallcomplaintTypes } from '../../../../../../api/APIs/Services/Complaint.service';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { getUserData } from '../../../../../../api/Auth';
import { AuthContext } from '../../../../../../api/AuthContext';
import Select from "react-select";
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import moment from 'moment';
import * as Yup from "yup";
import { getAllEmployee } from '../../../../../../api/APIs/Services/organizational.service';
import { getBranches } from '../../../../../../api/APIs/Services/Branches.services';
import AddTonarModal from '../../../../../../components/AddTonerModal';
import { getAllTonerModels } from '../../../../../../api/APIs/Services/TonerInstallation.service';

const validationSchema = Yup.object({
  fkComplaintTypeId: Yup.string().required("Branch/Office is required"),
  complaintDescription: Yup.string().required("Complaint Description is required")
});

function CMSAddEditUserComplaint() {
  const location = useLocation()
  const userData = getUserData();
  const {  employeesAsEngineersData } = useContext(AuthContext)
  const [employeeData, setEmployeeData] = useState([]);
  const [complaintType, setComplaintType] = useState([])
  const [complaintCategories, setComplaintCategories] = useState([])
  const [userinventoryData, setUserInventoryData] = useState([])
  const [, set] = useState(false);
  const [modalData, setModalData] = useState([]);


  const formik = useFormik({
    initialValues: {
      fkComplaineeUserId: location.state ? location.state.fkComplaineeUserId : `${userData.firstName} ${userData.lastName}`,
      fkComplaintTypeId: "",
      fkComplaintCategoryId: "",
      complaintDescription: location.state ? location?.state?.complaintDescription : "",
      complaintIssuedDate: new Date(),
      fkAssignedResolverId: "",
      complaintAttachment: "",
      userName:"",
      quantity:"",
      tonerModels:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Handle form submission here
      await CreateComplaintApi(values, { resetForm });
    },
  });

  
  const CreateComplaintApi = async (values, { resetForm }) => {
    const Data = {
      fkComplaineeUserId: values?.fkComplaineeUserId?.value,
      fkComplaintTypeId: values.fkComplaintTypeId,
      fkComplaintCategoryId: values.fkComplaintCategoryId,
      complaintDescription: values.complaintDescription,
      complaintIssuedDate: values?.complaintIssuedDate,
      fkAssignedResolverId: values?.fkAssignedResolverId?.value,
      userName:values?.userName,
      tonerQuantity:values?.quantity,
      fkTonerModelId:values?.tonerModels.value
    }
    try {
      const response = await createComplaint(Data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };


  const AllComplaintTypeApi = async () => {
    try {
      const response = await getBranches(0,200);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setComplaintType(response?.data?.rows);
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

  const getInventoryRecordById = async (selectedOptions) => {
    try {
      const response = await getInventoryRecordByUserId(selectedOptions.value);
      if (response?.success) {
        setUserInventoryData(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getAllEmployee(0, 1000);
      if(response?.success) {
        setEmployeeData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    AllComplaintTypeApi()
    AllComplaintCategoriesApi()
    getEmployeeData();
  }, [])

  // Get All Toner MOdels
  const GetAllTonerModelsData = async () => {
    try {
      const response = await getAllTonerModels(0, 100);
      if (response.success) {
        setModalData(response?.data?.tonerModels);
      }
    } catch (error) {
      console.log(error);
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  console.log("fkComplaintCategoryId",formik.values.fkComplaintCategoryId);

  useEffect(() => {
    GetAllTonerModelsData();
  }, []);

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/dashboard"}
        addLink1={"/cms/dashboard/addedit"}
        title1={
          location && location?.state ? "Edit User Complaint" : "Add User Complaint"
        }
      />
      {/* {modalisOpan && (
        <AddTonarModal
          modaisOpan={modalisOpan}
          hendleModal={() => setModalIsOpan(!modalisOpan)}
        />
      )} */}
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
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Complainee</label>
                      {/* <input
                        type="text"
                        className={`form-control`}
                        id="fkComplaineeUserId"
                        placeholder={formik.values.fkComplaineeUserId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly
                      /> */}
                      <Select
                        options={employeeData && employeeData?.map((item) => ({
                          value: item.fkUserId,
                          label: `${item.firstName}${item.lastName}`,
                        }))}

                        onChange={(selectedOptions) => {
                          formik.setFieldValue("fkComplaineeUserId", selectedOptions)
                          getInventoryRecordById(selectedOptions)
                        }
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.fkComplaineeUserId}
                        name="fkComplaineeUserId"
                        isClearable={true}
                      />
                    </div>
                  </div>
                  <div className='col'>
                  <div className="mb-3">
                      <label className="form-label">Complainee</label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="userName"
                        placeholder='Enter Complainee Name'
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> 
                      </div>
                      </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Branch/Office</label>
                      <select class={`form-control ${formik.touched.fkComplaintTypeId &&
                        formik.errors.fkComplaintTypeId
                        ? "is-invalid"
                        : ""
                        }`}
                        id="fkComplaintTypeId"
                        name="fkComplaintTypeId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkComplaintTypeId}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {complaintType &&
                          complaintType.map((item) => (
                            <option value={item.id}>{item.branchName}</option>
                          ))}
                      </select>
                      {formik.touched.fkComplaintTypeId &&
                        formik.errors.fkComplaintTypeId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkComplaintTypeId}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* Add similar validation logic for other fields */}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Complaint Description</label>
                      <textarea
                        className={`form-control ${formik.touched.complaintDescription &&
                          formik.errors.complaintDescription
                          ? "is-invalid"
                          : ""
                          }`}
                        id="complaintDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.complaintDescription}
                      ></textarea>
                      {formik.touched.complaintDescription &&
                        formik.errors.complaintDescription && (
                          <div className="invalid-feedback">
                            {formik.errors.complaintDescription}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Nature of Complaint</label>
                      <select class="form-select"
                        id="fkComplaintCategoryId"
                        name="fkComplaintCategoryId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkComplaintCategoryId}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {complaintCategories &&
                          complaintCategories.map((item) => (
                            <option value={item.id}>{item.complaintCategoryName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {formik.values.fkComplaintCategoryId == 5 && (
                <div className="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Toner Modal
                      </label>

                      <Select
                        options={modalData.map((item) => ({
                          value: item.id,
                          label: item.tonerModel,
                        }))}
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("tonerModels", selectedOptions)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.tonerModels}
                        name="tonerModels"
                        isClearable={true}
                        className={`.form-select`}
                      />  
                    </div>
                    {/* <div
                      className="ms-2"
                      style={{ position: "relative" }}
                      onClick={() => setModalIsOpan(!modalisOpan)}
                    >
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{
                          position: "absolute",
                          top: "-55px",
                          right: "-50px",
                          fontSize: "41px",
                          color: "#14ae5c",
                        }}
                      />
                    </div> */}
                  </div>
                <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="text"
                        // className={`form-control`}
                        id="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                  
                </div>
                )}

                <div class="row">
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
                        // minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("complaintIssuedDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />

                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Assign To (IT Engineer)</label>
                      <Select
                        options={
                          employeesAsEngineersData &&
                          employeesAsEngineersData?.map((item) => ({
                            value: item.id,
                            label: `${item.firstName}${item.lastName}`,
                          }))
                        }
                        onChange={(selectedOptions) => formik.setFieldValue("fkAssignedResolverId", selectedOptions)}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkAssignedResolverId}
                        name="fkAssignedResolverId"
                        isClearable={true}
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
        {userinventoryData.length > 0 && (
          <div class="row mt-5">
            <div class="col-12">
              <table class="table red-bg-head th">
                <thead>
                  <tr>
                    <th class="text-center" scope="col">
                      productName
                    </th>
                    <th class="text-center" scope="col">
                      Serial No
                    </th>
                    <th class="text-center" scope="col">
                      manufacturer
                    </th>

                    <th class="text-center" scope="col">
                      Status
                    </th>
                    <th class="text-center" scope="col">
                      issuedDate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userinventoryData && userinventoryData?.length > 0 &&
                    userinventoryData.map((item, index) => (
                      <tr>
                        <td class="text-center">{item?.assignedInventory?.productName}</td>
                        <td class="text-center">{item?.assignedInventory?.serialNo}</td>
                        <td class="text-center">{item?.assignedInventory?.manufacturer}</td>
                        <td class="text-center">{item?.assignedInventory?.status}</td>
                        <td class="text-center">{item?.issuedDate}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default CMSAddEditUserComplaint