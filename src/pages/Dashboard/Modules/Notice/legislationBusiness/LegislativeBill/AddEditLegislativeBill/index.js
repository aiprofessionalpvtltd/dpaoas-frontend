import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Layout } from "../../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { useFormik } from "formik";
import {
  UpdateLegislativeBillById,
  getLegislativeBillById,
} from "../../../../../../../api/APIs/Services/Notice.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

function AddEditLegislativeBill() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const [billData, setBillData] = useState([]);
  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      title: "",
      billdate: "",
      status: "",
      attachment: "",
      description: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        UpdateLegislativeBillAPi(values);
      } else {
        // handleCreateLegislativeBill(values);
      }
    },
  });

  const UpdateLegislativeBillAPi = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("fkSessionNo", values?.sessionNo.value);
    formData.append("description", values?.description);
    if (values?.attachment) {
      formData.append("attachment", values?.attachment);
    }
    formData.append("date", values?.billdate);
    formData.append("status", values?.status);
    // formData.append("device", "Web")

    try {
      const response = await UpdateLegislativeBillById(
        location?.state?.id,
        formData
      );
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/legislation/legislative-bill");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getLegislativeBillByIdApi = async () => {
    try {
      const response = await getLegislativeBillById(location?.state?.id);
      if (response.success) {
        setBillData(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getLegislativeBillByIdApi();
    }
  }, []);
  useEffect(() => {
    // Update form values when termsById changes
    if (billData) {
      formik.setValues({
        sessionNo:
          {
            value: billData[0]?.session?.id,
            label: billData[0]?.session?.sessionName,
          } || "",

        billdate: billData[0]?.date ? new Date(billData[0]?.date) : "",
        status: billData[0]?.status || "",
        description: billData[0]?.description || "",
        title: billData[0]?.title || "",
      });
    }
  }, [billData, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/legislation/legislative-bill"}
        addLink1={"/notice/legislation/legislative-bill/addedit"}
        title1={
          location && location?.state?.id
            ? "Edit Legislative Bill"
            : "Add Legislative Bill"
        }
      />

      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Legislative Bill</h1>
            ) : (
              <h1>Edit Legislative Bill</h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <Select
                        options={
                          sessions &&
                          sessions?.map((item) => ({
                            value: item?.id,
                            label: item?.sessionName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("sessionNo", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNo}
                        name="sessionNo"
                        // isClearable={true}
                        className={`.form-select  ${
                          formik.touched.sessionNo && formik.errors.sessionNo
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.sessionNo && formik.errors.sessionNo && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionNo}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        className={`form-control`}
                        type="text"
                        id="title"
                        value={formik.values.title}
                        name="title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-4">
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
                        className={`.form-select`}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.billdate}
                        // minDate={new Date()}

                        onChange={(date) =>
                          formik.setFieldValue("billdate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        class={`form-select`}
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="under process">under process</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mb-3">
                      <label className="form-label">Attachment</label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="attachment"
                        name="attachment"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "attachment",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div>
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
                </div>

                <div className="d-grid gap-2 mt-4 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    {location?.state?.id ? "Update Bill" : "Create Bill"}
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

export default AddEditLegislativeBill;
