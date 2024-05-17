import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import {
  NoticeSidebarItems,
  QMSSideBarItems,
} from "../../../../../../../utils/sideBarItems";
import {
  createDivision,
  getDivisionsByID,
  updateDivisions,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  createPrivateBill,
  getPrivateBillById,
  updatePrivateBill,
} from "../../../../../../../api/APIs/Services/Legislation.service";
import { AuthContext } from "../../../../../../../api/AuthContext";
import moment from "moment";
import { getAllBillStatus } from "../../../../../../../api/APIs/Services/LegislationModule.service";

const validationSchema = Yup.object({
  SerialNo: Yup.string().required("Serial No is required"),
  fileNo: Yup.string().required("file No is required"),
  date: Yup.string().required("Date is required"),
  fromReceived: Yup.string().required("Received From is required"),
  briefSubject: Yup.string().required("Brief Subject is required"),
  remarks: Yup.string().required("Remarks is required"),
});
function AddEditPrivateBill() {
  const location = useLocation();
  const [billById, setBillById] = useState();
  const [billStatusesData, setBillStatusesData] = useState([]);

  const formik = useFormik({
    initialValues: {
      SerialNo: "",
      fileNo: "",
      date: "",
      fromReceived: "",
      briefSubject: "",
      remarks: "",
      billStatus: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      if (location?.state?.id) {
        handleEditBill(values);
      } else {
        handleCreateBill(values);
      }
    },
  });

  const handleCreateBill = async (values) => {
    const data = {
      SerialNo: values?.SerialNo,
      fileNo: values.fileNo,
      date: values.date,
      fromReceived: values.fromReceived,
      briefSubject: values.briefSubject,
      remarks: values.remarks,
      fkBillStatus: values.billStatus
    };

    try {
      const response = await createPrivateBill(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditBill = async (values) => {
    const data = {
      SerialNo: values?.SerialNo,
      fileNo: values.fileNo,
      date: values.date,
      fromReceived: values.fromReceived,
      briefSubject: values.briefSubject,
      remarks: values.remarks,
      fkBillStatus: values.billStatus,
    };

    try {
      const response = await updatePrivateBill(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getBillByIdApi = async () => {
    try {
      const response = await getPrivateBillById(location.state?.id);
      if (response?.success) {
        setBillById(response?.data[0]);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };


  const billTransfromData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      billStatusName: item.billStatusName,
      billStatus: item.billStatus,
    }));
  };

  const GetBillStatusesAPi = async () => {
    try {
      const response = await getAllBillStatus(0, 1000);

      const billData = billTransfromData(response?.data?.billStatus);
      setBillStatusesData(billData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getBillByIdApi();
    }
    GetBillStatusesAPi();
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (billById) {
      formik.setValues({
        SerialNo: billById?.SerialNo || "",
        fileNo: billById.fileNo || "",
        date: new Date(billById.date) || "",
        fromReceived: billById.fromReceived || "",
        briefSubject: billById.briefSubject || "",
        remarks: billById.remarks || "",
        billStatus: billById.billStatuses?.id || "",
      });
    }
  }, [billById, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/legislation/private-bill"}
        title1={"Private Member Bills"}
        addLink2={"/notice/legislation/private-bill"}
        title2={location && location?.state ? "Edit Bill" : "Add Bill"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Bill</h1>
            ) : (
              <h1>Add Bill</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Serial No</label>
                      <input
                        type="text"
                        placeholder={"Serial No"}
                        value={formik.values.SerialNo}
                        className={`form-control ${
                          formik.touched.SerialNo && formik.errors.SerialNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="SerialNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.SerialNo && formik.errors.SerialNo && (
                        <div className="invalid-feedback">
                          {formik.errors.SerialNo}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">File No</label>
                      <input
                        type="text"
                        placeholder={"File No"}
                        value={formik.values.fileNo}
                        className={`form-control ${
                          formik.touched.fileNo && formik.errors.fileNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fileNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fileNo && formik.errors.fileNo && (
                        <div className="invalid-feedback">
                          {formik.errors.fileNo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Date</label>
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
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.date && formik.errors.date
                            ? "is-invalid"
                            : ""
                        }`}
                        dateFormat={"dd-MM-yyyy"}
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Received From</label>
                      <input
                        type="text"
                        placeholder={"Received From"}
                        value={formik.values.fromReceived}
                        className={`form-control ${
                          formik.touched.fromReceived &&
                          formik.errors.fromReceived
                            ? "is-invalid"
                            : ""
                        }`}
                        id="fromReceived"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fromReceived &&
                        formik.errors.fromReceived && (
                          <div className="invalid-feedback">
                            {formik.errors.fromReceived}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Brief Subject</label>
                      <input
                        type="text"
                        placeholder={"Brief Subject"}
                        value={formik.values.briefSubject}
                        className={`form-control ${
                          formik.touched.briefSubject &&
                          formik.errors.briefSubject
                            ? "is-invalid"
                            : ""
                        }`}
                        id="briefSubject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.briefSubject &&
                        formik.errors.briefSubject && (
                          <div className="invalid-feedback">
                            {formik.errors.briefSubject}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Remarks</label>
                      <input
                        type="text"
                        placeholder={"Remarks"}
                        value={formik.values.remarks}
                        className={`form-control ${
                          formik.touched.remarks && formik.errors.remarks
                            ? "is-invalid"
                            : ""
                        }`}
                        id="remarks"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.remarks && formik.errors.remarks && (
                        <div className="invalid-feedback">
                          {formik.errors.remarks}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Bill Status</label>
                      <select
                        class="form-select"
                        placeholder={formik.values.billStatus}
                        id="billStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled hidden>
                          Select
                        </option>
                        {billStatusesData &&
                          billStatusesData.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item?.billStatusName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditPrivateBill;
