import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../../api/AuthContext";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import {
  UpdateInventoryBill,
  createInventoryBill,
  getAllVendor,
} from "../../../../../../../api/APIs/Services/Complaint.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { useLocation } from "react-router";
import AddVendorModal from "../../../../../../../components/AddVendorModal";
import Select from "react-select";
import * as Yup from "yup";

const validationSchema = Yup.object({
  invioceNumber: Yup.string().required("InvioceNumber is required"),
  quantity: Yup.string().required("Quantity is required"),
  description: Yup.string().required("Description is required"),
});

function CMSAddInventoryBill() {
  const location = useLocation();
  const [modaisOpan, setModalIsOpan] = useState(false);
  const [vendorData, setVendorData] = useState([]);

  const formik = useFormik({
    initialValues: {
      invioceNumber: location?.state ? location?.state?.invoiceNumber : "",
      vendor: location?.state
        ? {
            value: location?.state?.vendor?.id,
            label: location?.state?.vendor?.vendorName,
          }
        : "",
      quantity: location?.state ? location?.state?.quantity : "",
      assignedDate: location?.state
        ? new Date(location?.state?.invoiceDate)
        : new Date(),
      description: location?.state ? location?.state?.description : "",
      billAttachment: "",
      status: location?.state ? location?.state?.status : "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (location?.state?.id) {
        handleUpdateInventoryBill(values);
      } else {
        hendleAddInventoryBill(values);
      }
    },
  });

  const hendleAddInventoryBill = async (values) => {
    const formData = new FormData();
    formData.append("invoiceNumber", values.invioceNumber);
    formData.append("fkVendorId", values?.vendor?.value);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("invoiceAttachment", values.billAttachment);
    formData.append("invoiceDate", values.assignedDate);

    try {
      const response = await createInventoryBill(formData);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const handleUpdateInventoryBill = async (values) => {
    const formData = new FormData();
    formData.append("invoiceNumber", values.invioceNumber);
    formData.append("fkVendorId", values?.vendor?.value);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("invoiceAttachment", values.billAttachment);
    formData.append("invoiceDate", values.assignedDate);
    formData.append("status", values.status);

    try {
      const response = await UpdateInventoryBill(location?.state?.id, formData);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const GetAllVendor = async () => {
    try {
      const response = await getAllVendor(0, 100);
      if (response.success) {
        setVendorData(response?.data?.vendors);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message)
    }
  };
  useEffect(() => {
    GetAllVendor();
  }, [modaisOpan]);
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/admin/inventory/inventory-bill"}
        addLink1={"/cms/admin/inventory/inventory-bill/add"}
        title1={"Add Inventory Bill"}
      />
      {modaisOpan && (
        <AddVendorModal
          modaisOpan={modaisOpan}
          hendleModal={() => setModalIsOpan(!modaisOpan)}
        />
      )}
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            <h1>Add Inventory Bill</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Invioce Number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.invioceNumber &&
                          formik.errors.invioceNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        id="invioceNumber"
                        value={formik.values.invioceNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.invioceNumber &&
                        formik.errors.invioceNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.invioceNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Vendor
                      </label>

                      <Select
                        options={vendorData.map((item) => ({
                          value: item.id,
                          label: item.vendorName,
                        }))}
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("vendor", selectedOptions)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.vendor}
                        name="vendor"
                        isClearable={true}
                      />
                    </div>
                    <div
                      className="ms-2"
                      style={{ position: "relative" }}
                      onClick={() => setModalIsOpan(!modaisOpan)}
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
                        className={`form-control ${
                          formik.touched.quantity && formik.errors.quantity
                            ? "is-invalid"
                            : ""
                        }`}
                        id="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.quantity && formik.errors.quantity && (
                        <div className="invalid-feedback">
                          {formik.errors.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        class={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Bill Attachment
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="billAttachment"
                        name="billAttachment"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "billAttachment",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <div>
                        <a
                          href={
                            location?.state
                              ? `http://172.16.170.8:5252${location?.state?.invoiceAttachment}`
                              : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {location?.state
                            ? location?.state?.invoiceAttachment
                                ?.split("/")
                                .pop()
                            : location?.state?.invoiceAttachment}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date</label>
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
                        onChange={(date) =>
                          formik.setFieldValue("assignedDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  {location?.state?.id && (
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Status
                        </label>
                        <select
                          class="form-select"
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.status}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>

                          <option value="active">Active</option>
                          <option value="inactive">In Active</option>
                        </select>
                      </div>
                    </div>
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

export default CMSAddInventoryBill;
