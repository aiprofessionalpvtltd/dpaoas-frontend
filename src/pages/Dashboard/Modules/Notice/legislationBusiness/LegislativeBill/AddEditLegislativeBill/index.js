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
  createLegislativeBill,
  getLegislativeBillById,
  getPrivateMemberBillNoticeDiaryNumber,
} from "../../../../../../../api/APIs/Services/Notice.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";

function AddEditLegislativeBill() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const [billData, setBillData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      title: "",
      date: moment(new Date()).format("YYYY-MM-DD"),
      noticeOfficeDiaryTime: moment().format("HH:mm A"),
      status: "",
      attachment: "",
      description: "",
      diary_number: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        UpdateLegislativeBillAPi(values);
      } else {
        handleCreateLegislativeBill(values);
      }
    },
  });

  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    // formik.setFieldValue("noticeOfficeDiaryDate", date);
    formik.setFieldValue("date", moment(date).format("YYYY-MM-DD"));
    setIsCalendarOpen(false);
  };

  // Getting Notice Office Diary Number
  const getPrivateMemberNoticeOfficeDiaryNumberApi = async () => {
    try {
      const response = await getPrivateMemberBillNoticeDiaryNumber();

      if (response?.success) {
        // setQuestionNoticeOfficeDiaryNumber(response?.data);
        formik.setFieldValue(
          "diary_number",
          response?.data?.newDiaryNumber ? response?.data?.newDiaryNumber : ""
        );
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    getPrivateMemberNoticeOfficeDiaryNumberApi();
  }, []);

  const handleCreateLegislativeBill = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    // formData.append("fkSessionNo", values?.sessionNo.value);
    formData.append("description", values?.description);
    if (values?.attachment) {
      formData.append("attachment", values?.attachment);
    }
    formData.append("date", values?.date);
    // formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    // formData.append("status", values?.status);
    formData.append("diary_number", values?.diary_number);
    formData.append("device", "Web");

    try {
      const response = await createLegislativeBill(formData);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/legislation/private-bill");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const UpdateLegislativeBillAPi = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    // formData.append("fkSessionNo", values?.sessionNo.value);
    formData.append("description", values?.description);
    if (values?.attachment) {
      formData.append("attachment", values?.attachment);
    }
    formData.append("date", values?.date);
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    // formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    // formData.append("status", values?.status);
    formData.append("diary_number", values?.diary_number);
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
          navigate("/notice/legislation/private-bill");
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
    if (billData.length > 0) {
      formik.setValues({
        sessionNo:
          {
            value: billData[0]?.session?.id,
            label: billData[0]?.session?.sessionName,
          } || "",

        date: billData[0]?.date ? new Date(billData[0]?.date) : "",
        status: billData[0]?.status || "",
        description: billData[0]?.description || "",
        title: billData[0]?.title || "",
        diary_number: billData[0]?.diary_number || "",
        noticeOfficeDiaryTime: billData[0]?.noticeOfficeDiaryTime || "",
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
            ? "Edit Private Member Bill"
            : "Add Private Member Bill"
        }
      />

      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Private Member Bill</h1>
            ) : (
              <h1>Add Private Member Bill</h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  {/* <div class="col-4">
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
                  </div> */}
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
                  {/* <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Notice Office Diary Date
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
                        className={`.form-select`}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.date}
                        // minDate={new Date()}

                        onChange={(date) =>
                          formik.setFieldValue("date", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div> */}

                  <div className="col-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Notice Office Diary Date{" "}
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
                          cursor: "pointer",
                        }}
                        onClick={handleCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        // selected={
                        //   formik.values.noticeOfficeDiaryDate &&
                        //   formik.values.noticeOfficeDiaryDate
                        // }
                        selected={
                          formik.values.date
                            ? moment(formik.values.date, "YYYY-MM-DD").toDate()
                            : null
                        }
                        onChange={handleDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.date && formik.errors.date
                            ? "is-invalid"
                            : ""
                        }`}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onInputClick={handleCalendarToggle}
                        // onClick={handleCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />

                      {formik.touched.date && formik.errors.date && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Notice Office Diary Time
                      </label>

                      {/* <TimePicker
                        value={formik.values.noticeOfficeDiaryTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("noticeOfficeDiaryTime", time)
                        }
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                      /> */}
                      <TimePicker
                        value={formik.values.noticeOfficeDiaryTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("noticeOfficeDiaryTime", time)
                        }
                        className={`form-control ${
                          formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.noticeOfficeDiaryTime &&
                        formik.errors.noticeOfficeDiaryTime && (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {formik.errors.noticeOfficeDiaryTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-4">
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
                  </div> */}
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
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Diary Number</label>
                      <input
                        className={`form-control`}
                        type="text"
                        id="diary_number"
                        value={formik.values.diary_number}
                        name="diary_number"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
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
                    {location?.state?.id ? "Submit" : "Submit"}
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
