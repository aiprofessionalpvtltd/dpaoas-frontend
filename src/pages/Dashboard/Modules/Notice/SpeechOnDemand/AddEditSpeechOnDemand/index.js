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

function CMSAddEditSpeechOnDemand() {
  const location = useLocation();
  const { employeeData, sessions } = useContext(AuthContext);

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
      selectType: location.state ? location?.state?.fkBranchRequestId : "",
      isWhatsapp: location.state ? location?.state?.fkBranchRequestId : false,
      whatsappno: location.state ? location?.state?.quantity : "",
      justification: location.state ? location?.state?.quantity : "",
      //   status: location.state ? location?.state?.status : "",
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
        dashboardLink={"/notice/speech-on-demand"}
        addLink1={"/notice/speech-on-demand/addedit"}
        title1={
          location && location?.state
            ? "Edit Speech On Demand"
            : "Add Speech On Demand"
        }
      />

      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Speech On Demand </h1>
            ) : (
              <h1>Add Speech On Demand </h1>
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
                        selected={formik.values.fromDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("fromDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                      {formik.touched.fromDate && formik.errors.fromDate && (
                        <div className="invalid-feedback">
                          {formik.errors.fromDate}
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
                          formik.touched.toDate && formik.errors.toDate
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.toDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("toDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                      {formik.touched.toDate && formik.errors.toDate && (
                        <div className="invalid-feedback">
                          {formik.errors.toDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Select type</label>
                      <select
                        class={`form-select ${
                          formik.touched.complaintStatus &&
                          formik.errors.complaintStatus
                            ? "is-invalid"
                            : ""
                        }`}
                        id="selectType"
                        name="selectType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.selectType}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="CD">CD</option>
                        <option value="DVD">DVD</option>
                      </select>
                      {formik.touched.selectType &&
                        formik.errors.selectType && (
                          <div className="invalid-feedback">
                            {formik.errors.selectType}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-4 mt-3">
                    <div class="mb-3 mt-4">
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.isWhatsapp &&
                            formik.errors.isWhatsapp
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="isWhatsapp"
                          checked={formik.values.isWhatsapp}
                          onChange={() =>
                            formik.setFieldValue(
                              "isWhatsapp",
                              !formik.values.isWhatsapp
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Whatsapp
                        </label>
                        {formik.touched.isWhatsapp &&
                          formik.errors.isWhatsapp && (
                            <div className="invalid-feedback">
                              {formik.errors.isWhatsapp}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      {formik.values.isWhatsapp && (
                        <>
                          <label className="form-label">Whatsapp No</label>
                          <input
                            className={`form-control ${
                              formik.touched.whatsappno &&
                              formik.errors.whatsappno
                                ? "is-invalid"
                                : ""
                            }`}
                            type="number"
                            id="whatsappno"
                            value={formik.values.whatsappno}
                            name="whatsappno"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                        </>
                      )}

                      {formik.touched.whatsappno &&
                        formik.errors.whatsappno && (
                          <div className="invalid-feedback">
                            {formik.errors.whatsappno}
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
                          formik.touched.justification &&
                          formik.errors.justification
                            ? "is-invalid"
                            : ""
                        }`}
                        id="justification"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.justification}
                      ></textarea>
                      {formik.touched.justification &&
                        formik.errors.justification && (
                          <div className="invalid-feedback">
                            {formik.errors.justification}
                          </div>
                        )}
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
export default CMSAddEditSpeechOnDemand;
