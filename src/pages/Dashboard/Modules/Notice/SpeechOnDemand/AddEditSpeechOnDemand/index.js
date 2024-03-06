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
import {
  UpdateSpeachOnDemand,
  createSpeachOnDemand,
  getSpeachOnDemandById,
} from "../../../../../../api/APIs/Services/Notice.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";

const validationSchema = Yup.object({
  sessionNo: Yup.string().required("Session No is required"),
  fromDate: Yup.object().required("From Date is required"),
  toDate: Yup.string().required("To Date is required"),
  justification: Yup.object().required("Justification is required"),
});

function CMSAddEditSpeechOnDemand() {
  const location = useLocation();
  const { sessions } = useContext(AuthContext);
  const [speachData, setSpeachData] = useState([]);

  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      fromDate: "",
      toDate: "",
      selectType: "",
      whatsappno: "",
      justification: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        UpdateSpeachOnDemandAPi(values);
      } else {
        handleCreateSpeachonDemand(values);
      }
    },
  });
  // Handle Create Speach On Demand
  const handleCreateSpeachonDemand = async (values) => {
    const Data = {
      fkSessionNo: values?.sessionNo?.value,
      date_to: values?.toDate,
      date_from: values?.fromDate,
      delivery_on: values?.selectType,
      whatsapp_number: values?.whatsappno,
      justification: values?.justification,
      is_certified: true,
    };

    try {
      const response = await createSpeachOnDemand(Data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //Update Speach On Demand
  const UpdateSpeachOnDemandAPi = async (values) => {
    const data = {
      fkSessionNo: values?.sessionNo?.value,
      date_to: values?.toDate,
      date_from: values?.fromDate,
      delivery_on: values?.selectType,
      whatsapp_number: values?.whatsappno,
      justification: values?.justification,
      is_certified: true,
    };
    try {
      const response = await UpdateSpeachOnDemand(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getSpeachOnDemandByIdAPi = async () => {
    try {
      const response = await getSpeachOnDemandById(location.state.id);
      if (response.success) {
        setSpeachData(response?.data);
        // showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getSpeachOnDemandByIdAPi();
    }
  }, []);
  console.log(speachData);
  useEffect(() => {
    // Update form values when termsById changes
    if (speachData) {
      formik.setValues({
        sessionNo:
          {
            value: speachData[0]?.session?.id,
            label: speachData[0]?.session?.sessionName,
          } || "",
        fromDate: speachData[0]?.date_from
          ? new Date(speachData[0]?.date_from)
          : "",
        toDate: speachData[0]?.date_to ? new Date(speachData[0]?.date_to) : "",
        selectType: speachData[0]?.delivery_on || "",
        whatsappno: speachData[0]?.whatsapp_number || "",
        justification: speachData[0]?.justification || "",
      });
    }
  }, [speachData, formik.setValues]);

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
                        // minDate={new Date()}
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
                        // minDate={new Date()}
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
                        <option value="WhatsApp">WhatsApp</option>
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
                      {/* <div class="form-check">
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
                      </div> */}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      {formik.values.selectType === "WhatsApp" && (
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
                    {location?.state?.id ? "Update Speach" : "Create Speach"}
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
