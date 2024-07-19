import React, { useMemo } from "react";
import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import Select from "react-select";
import countryList from "react-select-country-list";
import {
  UpdateEventCalendar,
  createEventCalendar,
} from "../../../../../../api/APIs/Services/EventCalendar.services";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import moment from "moment";

const validationSchema = Yup.object({
  title: Yup.string().required("Title name is required"),
  description: Yup.string().optional(),
  countryName: Yup.object().required("Country Name is required"),
  housetype: Yup.string().required("House Type is required"),
  electiontype: Yup.string().required("Election Type is required"),
  eventDate: Yup.string().required("Event Date is required"),
});
function AddEditEventCalendar() {
  const options = useMemo(() => countryList().getData(), []);
  const location = useLocation();
  console.log("location?.state?.housetype",location?.state);
  const formik = useFormik({
    initialValues: {
      title: location?.state ? location?.state?.title : "",
      countryName: location.state
        ? {
            value: location?.state?.countryName,
            label: location?.state?.countryName,
          }
        : "",
      housetype: location?.state ? location?.state?.houseType : "",
      electiontype: location?.state ? location?.state?.electionType : "",
      description: location?.state ? location?.state?.description : "",
      eventDate: location?.state ? moment(
        location?.state?.eventDate,
        "YYYY-MM-DD"
      ).toDate()
    : "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (location.state) {
        UpdateEventCalendarApi(values);
      } else {
        CreateEventCalendarApi(values);
      }
    },
  });

  const CreateEventCalendarApi = async (values) => {
    console.log("values.houseType",values?.housetype);
    const data = new FormData();
    data.append("title", values.title);
    data.append("countryName", values.countryName.value);
    data.append("houseType", values.housetype);
    data.append("electionType", values.electiontype);
    data.append("description", values.description);
    data.append("eventDate", moment(values?.eventDate).format("YYYY-MM-DD"));
    try {
      const response = await createEventCalendar(data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const UpdateEventCalendarApi = async (values) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("countryName", values.countryName.value);
    data.append("houseType", values.housetype);
    data.append("electionType", values.electiontype);
    data.append("description", values.description);
    data.append("eventDate", moment(values?.eventDate).format("YYYY-MM-DD"));
    try {
      const response = await UpdateEventCalendar(location?.state?.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/event-calendar"}
        title1={"Event Calendar"}
        addLink2={"/"}
        title2={location.state ? "Edit Event Calendar" : "Add Event Calandar"}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Event Calendar</h1>
            ) : (
              <h1>Add Event Calendar</h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Title </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.title && formik.errors.title
                            ? "is-invalid"
                            : ""
                        }`}
                        id="title"
                        placeholder={"Title"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.title && formik.errors.title && (
                        <div className="invalid-feedback">
                          {formik.errors.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Country name * </label>
                      <Select
                        options={
                          options &&
                          options?.map((item) => ({
                            value: item.label,
                            label: item.label,
                          }))
                        }
                        onChange={(selectedOptions) =>
                          formik.setValues({
                            ...formik.values,
                            countryName: selectedOptions,
                          })
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.countryName}
                        name="countryName"

                        // isClearable={true}
                      />
                      {formik.touched.countryName &&
                        formik.errors.countryName && (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {formik.errors.countryName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* Add similar validation logic for other fields */}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">House Type</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.housetype && formik.errors.housetype
                            ? "is-invalid"
                            : ""
                        }`}
                        id="housetype"
                        placeholder={"House Type"}
                        value={formik.values.housetype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.housetype && formik.errors.housetype && (
                        <div className="invalid-feedback">
                          {formik.errors.housetype}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Election Type</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.electiontype &&
                          formik.errors.electiontype
                            ? "is-invalid"
                            : ""
                        }`}
                        id="electiontype"
                        placeholder={"Election Type"}
                        value={formik.values.electiontype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.electiontype &&
                        formik.errors.electiontype && (
                          <div className="invalid-feedback">
                            {formik.errors.electiontype}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder={formik.values.description}
                        className={`form-control`}
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Event Date</label>
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
                        selected={formik.values.eventDate}
                        onChange={(date) =>
                          formik.setFieldValue("eventDate", date)
                        }
                        className={`form-control ${
                          formik.touched.eventDate && formik.errors.eventDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.eventDate && formik.errors.eventDate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.eventDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    {location.state
                      ? "Update Event Calendar"
                      : "Create Event Calendar"}
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

export default AddEditEventCalendar;
