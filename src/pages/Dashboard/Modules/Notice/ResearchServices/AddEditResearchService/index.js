import { useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../api/AuthContext";
import Header from "../../../../../../components/Header";

function CMSAddEditResearchService() {
  const location = useLocation();
  const { employeeData } = useContext(AuthContext);

  // Validation Schema For Toner Installation
  const validationSchema = Yup.object({
    sessionNo: Yup.string().required("Session No is required"),
    fromDate: Yup.object().required("From Date is required"),
    toDate: Yup.string().required("To Date is required"),
    justification: Yup.object().required("Justification is required"),
  });
  const formik = useFormik({
    initialValues: {
      sessionNo: location.state ? new Date(location?.state?.requestDate) : "",
      fromDate: location.state ? location?.state?.fkBranchRequestId : "",
      toDate: location.state ? location?.state?.fkBranchRequestId : "",

      justification: location.state ? location?.state?.quantity : "",
      status: location.state ? location?.state?.status : "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  // Handle Create Toner Installation
  //   const hendleAddToner = async (values) => {
  //     const Data = {
  //       requestDate: values?.requestDate,
  //       fkUserRequestId: values?.fkUserRequestId?.value,
  //       fkBranchRequestId: values?.fkBranchRequestId,
  //       fkTonerModelId: values?.tonerModels?.value,
  //       quantity: values?.quantity,
  //     };

  //     try {
  //       const response = await createTonar(Data);
  //       if (response.success) {
  //         showSuccessMessage(response.message);
  //       }
  //     } catch (error) {
  //       showErrorMessage(error?.response?.data?.message);
  //     }
  //   };

  //Update Toner Installations
  //   const UpdateTonerAPi = async (values) => {
  //     const data = {
  //       requestDate: values?.requestDate,
  //       fkUserRequestId: values?.fkUserRequestId?.value,
  //       fkBranchRequestId: values?.fkBranchRequestId,
  //       fkTonerModelId: values?.tonerModels?.value,
  //       quantity: values?.quantity,
  //       status: values?.status,
  //     };
  //     try {
  //       const response = await UpdateTonner(location.state.id, data);
  //       if (response.success) {
  //         showSuccessMessage(response.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/research-services"}
        // addLink1={"/notice/speech-on-demand/addedit"}
        title1={
          location && location?.state
            ? "Edit Research Service"
            : "Add Research Service"
        }
      />

      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Research Service </h1>
            ) : (
              <h1>Add Research Service </h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div class="col-4">
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
                        className={`.form-select  ${
                          formik.touched.fkUserRequestId &&
                          formik.errors.fkUserRequestId
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.fkUserRequestId &&
                        formik.errors.fkUserRequestId && (
                          <div className="invalid-feedback">
                            {formik.errors.fkUserRequestId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">From Date</label>
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
                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">To Date</label>
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
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <label className="form-label">Justification</label>
                      <textarea
                        className={`form-control  ${
                          formik.touched.tonardescription &&
                          formik.errors.tonardescription
                            ? "is-invalid"
                            : ""
                        }`}
                        id="tonardescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tonardescription}
                      ></textarea>
                      {formik.touched.tonardescription &&
                        formik.errors.tonardescription && (
                          <div className="invalid-feedback">
                            {formik.errors.tonardescription}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 mt-4">
                      <label className="form-label">Select type</label>
                      <select
                        class={`form-select ${
                          formik.touched.complaintStatus &&
                          formik.errors.complaintStatus
                            ? "is-invalid"
                            : ""
                        }`}
                        id="complaintStatus"
                        name="complaintStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.complaintStatus}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="CD">CD</option>
                        <option value="DVD">DVD</option>
                      </select>
                      {formik.touched.complaintStatus &&
                        formik.errors.complaintStatus && (
                          <div className="invalid-feedback">
                            {formik.errors.complaintStatus}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.committeeWhole &&
                            formik.errors.committeeWhole
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="committeeWhole"
                          checked={formik.values.committeeWhole}
                          onChange={() =>
                            formik.setFieldValue(
                              "committeeWhole",
                              !formik.values.committeeWhole
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Whatsapp
                        </label>
                        {formik.touched.committeeWhole &&
                          formik.errors.committeeWhole && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeWhole}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-4 d-md-flex justify-content-md-end">
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
export default CMSAddEditResearchService;
