import React, { useContext, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import Select from "react-select";
import {
  UpdateResolution,
  getResolutionBYID,
  sendResolutionForTranslation,
} from "../../../../../../api/APIs/Services/Resolution.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../api/AuthContext";
import moment from "moment";
import { imagesUrl } from "../../../../../../api/APIs";

function QMSNoticeResolutionDetail() {
  const location = useLocation();
  const { members, sessions, resolutionStatus, ministryData } = useContext(AuthContext);
  const [linkedIdData, setLinkedIdData] = useState(null)

  const formik = useFormik({
    initialValues: {
      resolutionClub:[],
      sessionNo: location?.state?.session
        ? {
          value: location?.state?.session?.id,
          label: location?.state?.session?.sessionName,
        }
        : "",
      noticeOfficeDiaryNo: location?.state?.noticeDiary?.noticeOfficeDiaryNo || "",
      noticeOfficeDiaryDate: location?.state?.noticeDiary?.noticeOfficeDiaryDate
        ? moment(location?.state?.noticeDiary?.noticeOfficeDiaryDate, "YYYY-MM-DD").toDate()
        : null,
      noticeOfficeDiaryTime: location?.state?.noticeDiary?.noticeOfficeDiaryTime || "",
      resolutionType: location?.state?.resolutionType || "",
      resolutionStatus: location?.state?.resolutionStatus
        ? {
          value: location?.state?.resolutionStatus?.id,
          label: location?.state?.resolutionStatus?.resolutionStatus,
        }
        : "",
      resolutionMovers:
        location?.state?.resolutionMoversAssociation?.length > 0
          ? location?.state?.resolutionMoversAssociation.map((item) => ({
            value: item?.memberAssociation?.id,
            label: item?.memberAssociation?.memberName,
          }))
          : [],
      ministries:
        location?.state?.resolutionMinistries?.length > 0
          ? location?.state?.resolutionMinistries.map((item) => ({
            value: item?.fkMinistryId,
            label: item?.ministries?.ministryName,
          }))
          : [],
      englishText: location?.state?.englishText || "",
      urduText: location?.state?.urduText || "",
      colourResNo: location?.state?.colourResNo || "",
      resolutionDiaryNo: location?.state?.resolutionDiaries?.resolutionDiaryNo || "",
      dateOfMovingHouse: location?.state?.dateOfMovingHouse
        ? moment(location?.state?.dateOfMovingHouse).toDate()
        : null,
      dateOfDiscussion: location?.state?.dateOfDiscussion
        ? moment(location?.state?.dateOfDiscussion).toDate()
        : null,
      dateOfPassing: location?.state?.dateOfPassing
        ? moment(location?.state?.dateOfPassing).toDate()
        : null,
      memberPosition: location?.state?.memberPosition || "",
      attachment: "",
      linkedResolutions:
        location?.state?.linkedResolutions?.length > 0
          ? location?.state?.linkedResolutions.map((item) => ({
            value: item.resolutionClubs?.id,
            label: item?.resolutionClubs?.linkedResolutionId,
          }))
          : [],

      linkedToResolutions:
        location?.state?.linkedToResolutions?.length > 0
          ? location?.state?.linkedToResolutions.map((item) => ({
            value: item.resolutionClubs?.id,
            label: item?.resolutionClubs?.linkedResolutionId,
          }))
          : [],
    },
    onSubmit: (values) => {
      hendleUpdate(values);
    },
  });


  const hendleUpdate = async (values) => {
    const data = new FormData();
    data.append("fkSessionNo", values?.sessionNo?.value);
    data.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);
    data.append("noticeOfficeDiaryTime", values.noticeOfficeDiaryTime);
    data.append("resolutionType", values.resolutionType);
    data.append("fkResolutionStatus", values.resolutionStatus?.value);
    values?.resolutionMovers?.forEach((mover, index) => {
      data.append(`resolutionMovers[${index}][fkMemberId]`, mover.value);
    });
    // data.append("resolutionMovers[]", values.resolutionMovers?.value);
    data.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);

    data.append("colourResNo", values.colourResNo);
    data.append("resolutionDiaryNo", values.resolutionDiaryNo);
    data.append("dateOfMovingHouse", values.dateOfMovingHouse);
    data.append("dateOfDiscussion", values.dateOfDiscussion);
    data.append("dateOfPassing", values.dateOfPassing);
    data.append("linkedResolutions", values.resolutionClub);

    values?.ministries.forEach((minister, index) => {
      data.append(`ministries[${index}][fkMinistryId]`, minister.value);
    });
    data.append("englishText", values.englishText);
    data.append("urduText", values.urduText);
    if (values?.memberPosition) {
      data.append("memberPosition", values?.memberPosition)
    }
    if (values?.attachment) {
      data.append("attachment", values?.attachment)
    }

    try {
      const response = await UpdateResolution(location.state.id, data);
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleSendResolutionForTranslation = async () => {
    try {
      const response = await sendResolutionForTranslation(location?.state?.id);
      if (response?.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePress = async (id) => {
    console.log("Linked Resolution ID clicked:", id);
    try {
      const response = await getResolutionBYID(id);
      if (response?.data) {
        showSuccessMessage(response?.message);
        setLinkedIdData(response?.data);

        // Update form fields dynamically using Formik's setFieldValue
        formik.setFieldValue('sessionNo', {
          value: response?.data?.session?.id,
          label: response?.data?.session?.sessionName,
        });
        formik.setFieldValue('noticeOfficeDiaryNo', response?.data?.noticeDiary?.noticeOfficeDiaryNo || '');
        formik.setFieldValue('noticeOfficeDiaryDate', response?.data?.noticeDiary?.noticeOfficeDiaryDate ? moment(response?.data?.noticeDiary?.noticeOfficeDiaryDate, "YYYY-MM-DD").toDate() : '');
        formik.setFieldValue('noticeOfficeDiaryTime', response?.data?.noticeDiary?.noticeOfficeDiaryTime || '');
        formik.setFieldValue('resolutionType', response?.data?.resolutionType || '');
        formik.setFieldValue('resolutionStatus', {
          value: response?.data?.resolutionStatus?.id,
          label: response?.data?.resolutionStatus?.resolutionStatus,
        });
        formik.setFieldValue('resolutionMovers', response?.data?.resolutionMoversAssociation?.map(item => ({
          value: item?.memberAssociation?.id,
          label: item?.memberAssociation?.memberName,
        })) || []);
        formik.setFieldValue('ministries', response?.data?.resolutionMinistries?.map(item => ({
          value: item?.fkMinistryId,
          label: item?.ministries?.ministryName,
        })) || []);
        formik.setFieldValue('englishText', response?.data?.englishText || '');
        formik.setFieldValue('urduText', response?.data?.urduText || '');
        formik.setFieldValue('colourResNo', response?.data?.colourResNo || '');
        formik.setFieldValue('resolutionDiaryNo', response?.data?.resolutionDiaries?.resolutionDiaryNo || "",);
        formik.setFieldValue('dateOfMovingHouse', response?.data?.dateOfMovingHouse ? moment(response?.data?.dateOfMovingHouse).toDate() : '');
        formik.setFieldValue('dateOfDiscussion', response?.data?.dateOfDiscussion ? moment(response?.data?.dateOfDiscussion).toDate() : '');
        formik.setFieldValue('dateOfPassing', response?.data?.dateOfPassing ? moment(response?.data?.dateOfPassing).toDate() : '');
        formik.setFieldValue('memberPosition', response?.data?.memberPosition || '');
        formik.setFieldValue('linkedResolutions', response?.data?.linkedResolutions?.length > 0
          ? response?.data?.linkedResolutions.map((item) => ({
            value: item.resolutionClubs?.id,
            label: item?.resolutionClubs?.linkedResolutionId,
          }))
          : [],)
        formik.setFieldValue('linkedToResolutions', response?.data?.linkedToResolutions?.length > 0
          ? response?.data?.linkedToResolutions.map((item) => ({
            value: item.resolutionClubs?.id,
            label: item?.resolutionClubs?.linkedResolutionId,
          }))
          : [],)
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };


  const imgArray = location?.state?.attachment.length > 0 ? JSON?.parse(location?.state?.attachment) : null
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/notice/notice-resolution-detail"}
        title1={"Notice Resolution Detail"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1> Resolution Detail</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
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
                        isClearable={true}
                        // className="form-select"
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Office Diary No</label>
                      <input
                        type="text"
                        value={formik.values.noticeOfficeDiaryNo}
                        className={`form-control`}
                        id="noticeOfficeDiaryNo"
                        // readOnly={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Notice Office Diary Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.noticeOfficeDiaryDate}
                        maxDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("noticeOfficeDiaryDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate
                          ? "is-invalid"
                          : ""
                          }`}
                        dateFormat={"dd-MM-yyyy"}
                      />
                      {formik.touched.noticeOfficeDiaryDate &&
                        formik.errors.noticeOfficeDiaryDate && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">
                        Notice Office Diary Time{" "}
                      </label>
                      <TimePicker
                        value={formik.values.noticeOfficeDiaryTime}
                        clockIcon={null} // Disable clock view
                        openClockOnFocus={false}
                        format="hh:mm a"
                        onChange={(time) =>
                          formik.setFieldValue("noticeOfficeDiaryTime", time)
                        }
                        className={`form-control ${formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime
                          ? "is-invalid"
                          : ""
                          }`}
                      />
                      {formik.touched.noticeOfficeDiaryTime &&
                        formik.errors.noticeOfficeDiaryTime && (
                          <div className="invalid-feedback">
                            {formik.errors.noticeOfficeDiaryTime}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Type</label>
                      <select
                        class="form-control form-select"
                        id="resolutionType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik?.values?.resolutionType}
                      >
                        <option>Select</option>
                        <option value="Government Resolution">
                          Government Resolution
                        </option>
                        <option value="Private Member Resolution">
                          Private Member Resolution
                        </option>
                        <option value="Govt. Resolution Supported by others">
                          Govt. Resolution Supported by others
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Status</label>

                      <Select
                        options={
                          resolutionStatus &&
                          resolutionStatus?.map((item) => ({
                            value: item?.id,
                            label: item?.resolutionStatus,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "resolutionStatus",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.resolutionStatus}
                        name="resolutionStatus"
                        isClearable={true}
                        // className="form-select"
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Movers</label>


                      <Select
                        options={
                          members &&
                          members?.map((item) => ({
                            value: item?.id,
                            label: item?.memberName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "resolutionMovers",
                            selectedOptions
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.resolutionMovers}
                        name="resolutionMovers"
                        isClearable={true}
                        isMulti
                      // className="form-select"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Color No</label>
                      <input
                        type="text"
                        value={formik.values.colourResNo}
                        className={`form-control`}
                        id="colourResNo"
                        // readOnly={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Diary No</label>
                      <input
                        type="text"
                        value={formik.values.resolutionDiaryNo}
                        className={`form-control`}
                        id="resolutionDiaryNo"
                        // readOnly={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date Of Moving House</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.dateOfMovingHouse}
                        maxDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateOfMovingHouse", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        dateFormat={"dd-MM-yyyy"}
                      />

                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date Of Discussion</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.dateOfDiscussion}
                        maxDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateOfDiscussion", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        dateFormat={"dd-MM-yyyy"}
                      />

                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Date Of Passing</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.dateOfPassing}
                        maxDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("dateOfPassing", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                        dateFormat={"dd-MM-yyyy"}
                      />

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div class="mb-2">
                      <label class="form-label">Member Position</label>
                      <select
                        class={`form-select ${formik.touched.memberPosition &&
                          formik.errors.memberPosition
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="Member Position"
                        value={formik.values.memberPosition}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="memberPosition"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"Treasury"}>Treasury</option>
                        <option value={"Opposition"}>Opposition</option>
                        <option value={"Independent"}>Independent</option>
                        <option value={"Anyside"}>Anyside</option>
                      </select>
                      {formik.touched.memberPosition &&
                        formik.errors.memberPosition && (
                          <div className="invalid-feedback">
                            {formik.errors.memberPosition}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Ministries</label>
                      <Select
                        options={
                          ministryData &&
                          ministryData.map((item) => ({
                            value: item.id,
                            label: item.ministryName,
                          }))
                        }
                        isMulti
                        onChange={(selectedOptions) =>
                          formik.setFieldValue(
                            "ministries",
                            selectedOptions
                          )
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.ministries}
                        name="ministries"
                      />
                      {formik.touched.ministries &&
                        formik.errors.ministries && (
                          <div class="invalid-feedback">
                            {formik.errors.ministries}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Linked Resolution</label>
                      <div className="form-control-plaintext" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

                        {formik.values.linkedResolutions.map((item, index) => (
                          <span
                            key={index}
                            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue', fontWeight: 'bold' }}
                            onClick={() => handlePress(item.value)} 
                          >
                            {item.label} 
                          </span>
                        ))}

                      </div>
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Linked to Resolution</label>
                      <div className="form-control-plaintext" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

                        {formik.values.linkedToResolutions.map((item, index) => (
                          <span
                            key={index}
                            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue', fontWeight: 'bold' }}
                            onClick={() => handlePress(item.value)}
                          >
                            {item.label}
                          </span>
                        ))}

                      </div>
                    </div>
                  </div>


                </div>
                <div className="row">
                <div className="col-3">
                      <div className="mb-3">
                        <label className="form-label">Resolution Club</label>
                        <input
                          className="form-control"
                          type="text"
                          id="resolutionClub"
                          name="resolutionClub"
                          value={formik.values.resolutionClub}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange} 
                          placeholder=""
                        />
                        
                      </div>
                    </div>
                </div>
                <div className="row">
                  <label htmlFor="" className="form-label">
                    Selected Images
                  </label>
                  {imgArray && imgArray ? (
                    //  imgArray && imgArray?.map((item) => (
                    <div class="MultiFile-label mt-3">
                      <a
                        href={`${imagesUrl}${imgArray?.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i class="fas fa-download"></i>
                      </a>
                      <a class="MultiFile-remove" href="#T7">
                        x
                      </a>
                      <span
                        class="MultiFile-label"
                        title={imgArray?.path?.split("\\").pop().split("/").pop()}
                      >
                        <span class="MultiFile-title">
                          <a
                            href={`${imagesUrl}${imgArray?.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {imgArray?.path?.split("\\").pop().split("/").pop()}
                          </a>
                        </span>
                      </span>
                    </div>
                    // ))
                  ) : (
                    <div className="row">
                      <div className="col-6 ">
                        <div className="mt-5">
                          <input
                            className="form-control"
                            type="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            id="formFile"
                            name="attachment"
                            // multiple
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
                  )}
                </div>


                <div style={{ marginTop: 10 }}>
                  <Editor
                    title={"English Text"}
                    onChange={(content) =>
                      formik.setFieldValue("englishText", content)
                    }
                    value={formik.values.englishText}
                  />
                </div>
                <div style={{ marginTop: 70, marginBottom: 40 }}>
                  <Editor
                    title={"Urdu Text"}
                    onChange={(content) =>
                      formik.setFieldValue("urduText", content)
                    }
                    value={formik.values.urduText}
                  />
                </div>

                <div class="row">
                  <div class="d-grid gap-4 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => hendleSendResolutionForTranslation()}
                    >
                      Send for Translation
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeResolutionDetail;
