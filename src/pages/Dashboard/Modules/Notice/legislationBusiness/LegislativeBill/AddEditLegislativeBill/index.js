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
import { getUserData } from "../../../../../../../api/Auth";
import { imagesUrl } from "../../../../../../../api/APIs";

function AddEditLegislativeBill() {
  const location = useLocation();
  const navigate = useNavigate();
  const { members } = useContext(AuthContext);
  const userData = getUserData();
  const [imageLinks, setImageLinks] = useState([]);
  const [billData, setBillData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  console.log("billData", billData);
  const formik = useFormik({
    initialValues: {
      sessionNo: "",
      title: "",
      date: moment(new Date()).format("YYYY-MM-DD"),
      noticeOfficeDiaryTime: moment().format("HH:mm A"),
      billFrom: "",
      status: "",
      attachment: null,
      description: "",
      diary_number: "",
      legislationMovers: "",
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
    // formik.setFieldValue("date", date);
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

  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.currentTarget.files);
  //   const links = selectedFiles.map((file) => URL.createObjectURL(file));
  //   setImageLinks(links);
  //   formik.setFieldValue("attachment", event.currentTarget.files);
  // };

  const handleCreateLegislativeBill = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    // formData.append("fkSessionNo", values?.sessionNo.value);
    formData.append("description", values?.description);
    // if (values?.attachment) {
    //   formData.append("billdocumentlegis", values?.attachment);
    // }

    if (values?.attachment) {
      Array.from(values?.attachment).map((file, index) => {
        formData.append(`billdocumentlegis`, file);
      });
    }
    // formData.append("date", values?.date.toDate());
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
    // Assuming resolutionMovers is an array of objects with a fkMemberId property
    values?.legislationMovers.forEach((mover, index) => {
      formData.append(`legislationMovers[${index}][fkMemberId]`, mover.value);
    });
    formData.append(
      "fkUserId",
      userData && userData?.fkUserId && userData?.fkUserId
    );
    formData.append("billFrom", "From Senate");

    try {
      const response = await createLegislativeBill(formData);
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/bills/private-member-bills");
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
      formData.append("billdocumentlegis", values?.attachment);
    }
    formData.append("date", values?.date);
    // formData.append("date", new Date(values?.date));
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    // formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
    // formData.append("status", values?.status);
    // formData.append("diary_number", values?.diary_number);
    values?.legislationMovers.forEach((mover, index) => {
      formData.append(`legislationMovers[${index}][fkMemberId]`, mover.value);
    });

    formData.append("billFrom", "From Senate");

    try {
      const response = await UpdateLegislativeBillById(
        location?.state?.id,
        formData
      );
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/bills/private-member-bills");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getLegislativeBillByIdApi = async () => {
    try {
      const response = await getLegislativeBillById(location?.state?.id);
      console.log("responseeeeee", response);
      if (response.success) {
        setBillData(response?.data?.[0]?.legislativeBill);
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
            value: billData?.session?.id,
            label: billData?.session?.sessionName,
          } || "",

        date: billData?.date ? new Date(billData?.date) : "",
        status: billData?.status || "",
        description: billData?.description || "",
        title: billData?.title || "",
        diary_number: billData?.diary_number || "",
        noticeOfficeDiaryTime: billData?.noticeOfficeDiaryTime || "",
        legislationMovers:
          billData?.legislationMovers?.length > 0
            ? billData?.legislationMovers?.map((item) => ({
                value: item?.member?.id,
                label: item?.member?.memberName,
              }))
            : [],
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
                    <div className="mb-3">
                      <label className="form-label">Mover(s)</label>
                      <Select
                        options={
                          members &&
                          members.map((item) => ({
                            value: item.id,
                            label: item.memberName,
                          }))
                        }
                        isMulti
                        onChange={(selectedOptions) =>
                          formik.setFieldValue(
                            "legislationMovers",
                            selectedOptions
                          )
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.legislationMovers}
                        name="legislationMovers"
                      />
                      {formik.touched.legislationMovers &&
                        formik.errors.legislationMovers && (
                          <div class="invalid-feedback">
                            {formik.errors.legislationMovers}
                          </div>
                        )}
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
                        readOnly
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
                </div>
                <div className="row">
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
                      <TimePicker
                        // value={formik.values.noticeOfficeDiaryTime}
                        value={
                          formik.values.noticeOfficeDiaryTime
                            ? moment(
                                formik.values.noticeOfficeDiaryTime,
                                "hh:mm A"
                              ).toDate()
                            : null
                        }
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

                  <div class="col-4">
                    <div class="mb-3">
                      <label className="form-label">Attachment</label>
                      {/* <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="attachment"
                        name="attachment"
                        onChange={handleFileChange}
                        // onChange={(event) => {
                        //   formik.setFieldValue(
                        //     "attachment",
                        //     event.currentTarget.files[0]
                        //   );
                        // }}
                      /> */}
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="file"
                        name="file"
                        multiple
                        onChange={(event) => {
                          formik.setFieldValue(
                            "attachment",
                            event.currentTarget.files
                          );
                        }}
                      />

                      {imageLinks.length > 0 && (
                        <div>
                          {imageLinks.map((link, index) => (
                            <div className="col mt-2" key={index}>
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Attachement {index + 1}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                      {billData &&
                        billData?.billDocumentsLegis &&
                        billData?.billDocumentsLegis.map((doc) => (
                          <div key={doc.id} className="document-section">
                            {doc.documentType && (
                              <div
                                className="document-type"
                                style={{
                                  display: "flex",
                                  color: "black",
                                  alignItems: "center",
                                }}
                              >
                                <h6
                                  style={{
                                    display: "flex",
                                    color: "black",
                                    fontSize: "14px",
                                    marginTop: "15px",
                                  }}
                                >
                                  {doc.documentType}
                                </h6>
                                <h6
                                  style={{
                                    display: "flex",
                                    color: "black",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    marginTop: "15px",
                                    marginLeft: "14px",
                                  }}
                                >
                                  {doc?.documentDate
                                    ? moment(doc?.documentDate).format(
                                        "DD-MM-YYYY"
                                      )
                                    : ""}
                                </h6>
                              </div>
                            )}
                            {doc.file?.map((file) => (
                              <div
                                className="MultiFile-label mt-1"
                                key={file.id}
                              >
                                {/* <a
                                  className="MultiFile-remove"
                                  style={{
                                    marginRight: "10px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  // onClick={() =>
                                  //   alert(
                                  //     `File ID: ${file.id}, Document Type: ${doc.documentType}`
                                  //   )
                                  // }
                                  onClick={() =>
                                    hendleRemoveImage(
                                      doc?.documentType,
                                      file?.id
                                    )
                                  }
                                >
                                  x
                                </a> */}
                                <span
                                  className="MultiFile-label"
                                  title={file.path.split("/").pop()}
                                >
                                  <span className="MultiFile-title">
                                    <a
                                      href={`${imagesUrl}${file.path}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {file.path.split("/").pop()}
                                    </a>
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        ))}
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
