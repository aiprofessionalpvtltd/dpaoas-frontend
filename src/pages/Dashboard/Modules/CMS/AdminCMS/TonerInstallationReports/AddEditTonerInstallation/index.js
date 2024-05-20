import { CMSsidebarItems } from "../../../../../../../utils/sideBarItems";
import { useLocation } from "react-router-dom";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import AddTonarModal from "../../../../../../../components/AddTonerModal";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { getallcomplaintTypes } from "../../../../../../../api/APIs/Services/Complaint.service";
import {
  UpdateTonner,
  createTonar,
  getAllTonerModels,
} from "../../../../../../../api/APIs/Services/TonerInstallation.service";
function CMSAddEditTonerInstallation() {
  const location = useLocation();
  const { employeeData } = useContext(AuthContext);
  const [modalisOpan, setModalIsOpan] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [requestedBranch, setRequestedBranch] = useState([]);

  // Validation Schema For Toner Installation
  const validationSchema = Yup.object({
    requestDate: Yup.string().required("Date  is required"),
    fkUserRequestId: Yup.object().optional(),
    fkBranchRequestId: Yup.string().required("Requested Branch  is required"),
    tonerModels: Yup.object().required("Toner Model is required"),
    quantity: Yup.string().required("Quantity is required"),
  });
  const formik = useFormik({
    initialValues: {
      requestDate: location.state ? new Date(location?.state?.requestDate) : "",

      fkUserRequestId: location.state
        ? {
            value: location?.state?.requestUser?.employee?.id,
            label:
              location?.state?.requestUser?.employee?.firstName +
              location?.state?.requestUser?.employee?.lastName,
          }
        : "",

      fkBranchRequestId: location.state
        ? location?.state?.fkBranchRequestId
        : "",
      tonerModels: location?.state
        ? {
            value: location?.state?.tonerModel?.id,
            label: location?.state?.tonerModel?.tonerModel,
          }
        : "",

        userRequestName: location.state ? location.state.userRequestName : "",

      quantity: location.state ? location?.state?.quantity : "",
      status: location.state ? location?.state?.status : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here

      if (location.state) {
        UpdateTonerAPi(values);
      } else {
        hendleAddToner(values);
      }
      formik.resetForm();
    },
  });

  // Handle Create Toner Installation
  const hendleAddToner = async (values) => {
    const Data = {
      requestDate: values?.requestDate,
      fkUserRequestId: values?.fkUserRequestId?.value,
      fkBranchRequestId: values?.fkBranchRequestId,
      fkTonerModelId: values?.tonerModels?.value,
      quantity: values?.quantity,
      userRequestName:values?.userRequestName
    };

    try {
      const response = await createTonar(Data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //Update Toner Installations
  const UpdateTonerAPi = async (values) => {
    const data = {
      requestDate: values?.requestDate,
      fkUserRequestId: values?.fkUserRequestId?.value,
      fkBranchRequestId: values?.fkBranchRequestId,
      fkTonerModelId: values?.tonerModels?.value,
      quantity: values?.quantity,
      status: values?.status,
      userRequestName:values?.userRequestName
    };
    try {
      const response = await UpdateTonner(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    GetAllTonerModelsData();
  }, [modalisOpan]);

  // Get Branch Request
  const BranchRequest = async () => {
    try {
      const response = await getallcomplaintTypes();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setRequestedBranch(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    BranchRequest();
  }, []);

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/admin/toner-installation-report"}
        addLink1={"/cms/dashboard/toner/addedit"}
        title1={location && location?.state ? "Edit Toner" : "Add Toner"}
      />
      {modalisOpan && (
        <AddTonarModal
          modaisOpan={modalisOpan}
          hendleModal={() => setModalIsOpan(!modalisOpan)}
        />
      )}
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Toner </h1>
            ) : (
              <h1>Add Toner </h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Request Date</label>
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
                        className={`.form-select  ${
                          formik.touched.requestDate &&
                          formik.errors.requestDate
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.requestDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("requestDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                      {formik.touched.requestDate &&
                        formik.errors.requestDate && (
                          <div className="invalid-feedback">
                            {formik.errors.requestDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">User Request</label>
                      <Select
                        options={
                          employeeData &&
                          employeeData?.map((item) => ({
                            value: item.fkUserId,
                            label: `${item.firstName}${item.lastName}`,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "fkUserRequestId",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkUserRequestId}
                        name="fkUserRequestId"
                        isClearable={true}
                        className={`.form-select`}
                      />
                    </div>
                  </div>

                  
                <div className='col'>
                  <div className="mb-3">
                      <label className="form-label">User Request</label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="userRequestName"
                        placeholder='Enter Complainee Name'
                        value={formik.values.userRequestName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> 
                      </div>
                      </div>

                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label class="form-label">Branch Request</label>
                      <select
                        // className="form-select"
                        id="fkBranchRequestId"
                        name="fkBranchRequestId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkBranchRequestId}
                        className={`form-select  ${
                          formik.touched.fkBranchRequestId &&
                          formik.errors.fkBranchRequestId
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {requestedBranch &&
                          requestedBranch.map((item) => (
                            <option value={item.id}>
                              {item.complaintTypeName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.fkBranchRequestId &&
                        formik.errors.fkBranchRequestId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkBranchRequestId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-5">
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
                        className={`.form-select  ${
                          formik.touched.tonerModels &&
                          formik.errors.tonerModels
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.tonerModels &&
                        formik.errors.tonerModels && (
                          <div className="invalid-feedback">
                            {formik.errors.tonerModels}
                          </div>
                        )}
                    </div>
                    <div
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
                    </div>
                  </div>
                </div>
                <div className="row">
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
                        className={`form-control  ${
                          formik.touched.quantity && formik.errors.quantity
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.quantity && formik.errors.quantity && (
                        <div className="invalid-feedback">
                          {formik.errors.quantity}
                        </div>
                      )}
                    </div>
                  </div>

                  {location?.state ? (
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Tonar status</label>
                        <select
                          className={`form-select  ${
                            formik.touched.status && formik.errors.status
                              ? "is-invalid"
                              : ""
                          }`}
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.status}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
  );
}
export default CMSAddEditTonerInstallation;
