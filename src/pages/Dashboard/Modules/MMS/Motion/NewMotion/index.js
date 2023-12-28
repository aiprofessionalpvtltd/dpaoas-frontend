import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    createNewMotion,
    getAllMinistry,
    getAllSessions,
    getallMembers,
    getallMotionStatus,
    updateNewMotion,
} from "../../../../../../api/APIs";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import {
    showSuccessMessage,
    showErrorMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
    sessionNumber: Yup.string(),
    fileNo: Yup.string().required("File No is required"),
    motionType: Yup.string().required("Motion Type is required"),
    motionWeek: Yup.string().required("Motion Week is required"),
    noticeOfficeDiaryNo: Yup.string().required(
        "Notice Office Diary No is required",
    ),
    noticeOfficeDiaryDate: Yup.string().required(
        "Notice Office Diary Date is required",
    ),
    noticeOfficeDiaryTime: Yup.string().required(
        "Notice Office Diary Time is required",
    ),
    motionStatus: Yup.string().required("Motion Status is required"),
    mover: Yup.array().required("Mover is required"),
    ministry: Yup.array().required("Ministry is required"),
    englishText: Yup.string(),
    // Add more fields and validations as needed
});

function MMSNewMotion() {
    const location = useLocation();
    const { ministryData, members, sessions } = useContext(AuthContext);
    const [motionStatusData, setMotionStatusData] = useState([]);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };
    const noticeOfficeDiaryDate = location?.state?.noticeOfficeDiaryDate
        ? new Date(location?.state?.noticeOfficeDiaryDate)
        : new Date();
    const noticeOfficeDiaryTime = location?.state?.noticeOfficeDiaryTime
        ? new Date(location?.state?.noticeOfficeDiaryTime)
        : getCurrentTime();
    const formik = useFormik({
        initialValues: {
            sessionNumber: sessions[0]?.id,
            fileNo: location.state ? location.state.fileNumber : "",
            motionType: location.state ? location.state.motionType : "",
            motionWeek: location.state ? location.state.motionWeek : "",
            noticeOfficeDiaryNo: location.state
                ? location.state.noticeOfficeDiaryNo
                : "",
            noticeOfficeDiaryDate: noticeOfficeDiaryDate,
            noticeOfficeDiaryTime: noticeOfficeDiaryTime,
            motionStatus: location.state ? location.state.motionStatus : "",
            mover: location.state ? location.state.mover : [],
            ministry: location.state ? location.state.ministry : [],
            englishText: "",
            // Add more fields as needed
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('Form submitted with values:', values);
            if (location?.state) {
                handleEditMotion(values);
            } else {
                handleAddNewMotion(values);
            }
        },
    });
    const handleAddNewMotion = async (values) => {
        const formData = new FormData();
        formData.append("fkSessionId", sessions[0]?.id);
        formData.append("fileNumber", values?.fileNo);
        formData.append("motionType", values?.motionType);
        formData.append("motionWeek", values?.motionWeek);
        formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
        // formData.append("moverIds[]", values?.mover);
        values.mover.forEach((mover, index) => {
            formData.append(`moverIds[${index}]`, mover.value);
        });
        // formData.append("ministryIds[]", values?.ministry);
        values.ministry.forEach((mover, index) => {
            formData.append(`ministryIds[${index}]`, mover.value);
        });
        formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
        formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
        formData.append("businessType", "Motion");
        formData.append("englishText", values.englishText);
        formData.append("urduText", "dkpad");
        formData.append("fkMotionStatus", values?.motionStatus);
        try {
            const response = await createNewMotion(formData);
            if (response?.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const handleEditMotion = async (values) => {
        const formData = new FormData();
        formData.append("fkSessionId", sessions[0]?.id);
        formData.append("fileNumber", values?.fileNo);
        formData.append("motionType", values?.motionType);
        formData.append("motionWeek", values?.motionWeek);
        formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
        // formData.append("moverIds[]", values?.mover);
        values.mover.forEach((mover, index) => {
            formData.append(`moverIds[${index}]`, mover.value);
        });
        // formData.append("ministryIds[]", values?.ministry);
        values.ministry.forEach((mover, index) => {
            formData.append(`ministryIds[${index}]`, mover.value);
        });
        formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
        formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
        formData.append("businessType", "Motion");
        formData.append("englishText", "dkals");
        formData.append("urduText", "dkpad");
        formData.append("fkMotionStatus", values?.motionStatus);
        try {
            const response = await updateNewMotion(location?.state?.id, formData);
            if (response?.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const getMotionStatus = async () => {
        try {
            const response = await getallMotionStatus();
            if (response?.success) {
                setMotionStatusData(response?.data);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        getMotionStatus();
    }, []);
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/"}
                addLink1={"/mms/dashboard"}
                title1={"Motion"}
                addLink2={"/mms/motion/new"}
                title2={"New Motion"}
            />
            <ToastContainer />
            <div class="container-fluid">
                <div class="card mt-1">
                    <div
                        class="card-header red-bg"
                        style={{ background: "#14ae5c !important" }}
                    >
                        {location?.state ? <h1>Edit MOTION</h1> : <h1>NEW MOTION</h1>}
                    </div>
                    <div class="card-body">
                        <div class="container-fluid">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Session No</label>
                                            <select
                                                name="sessionNumber"
                                                id="sessionNumber"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.sessionNumber}
                                                className={"form-select"}
                                            >
                                                <option value={sessions[0]?.id} selected disabled>
                                                    {sessions[0]?.sessionName}
                                                </option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">File No</label>
                                            <input
                                                type="text"
                                                placeholder={formik.values.fileNo}
                                                className={`form-control ${formik.touched.fileNo && formik.errors.fileNo
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

                                {/* Add more fields */}
                                {/* Motion Type */}
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Motion Type</label>
                                            <select
                                                className="form-select"
                                                id="motionType"
                                                name="motionType"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.motionType}
                                                class={
                                                    formik.errors.motionType && formik.touched.motionType
                                                        ? "form-select is-invalid"
                                                        : "form-select"
                                                }
                                            >
                                                <option>Select</option>
                                                <option>Adjournment Motion</option>
                                                <option>Call Attention Notice</option>
                                                <option>Privilege Motion</option>
                                                <option>Motion Under Rule 218</option>
                                                <option>Motion Under Rule 60</option>
                                            </select>
                                            {formik.errors.motionType &&
                                                formik.touched.motionType && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.motionType}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    {/* Motion Week */}
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Motion Week</label>
                                            <select
                                                className="form-select"
                                                id="motionWeek"
                                                name="motionWeek"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.motionWeek}
                                                class={
                                                    formik.errors.motionWeek && formik.touched.motionWeek
                                                        ? "form-select is-invalid"
                                                        : "form-select"
                                                }
                                            >
                                                <option>Select</option>
                                                <option>Not Applicable</option>
                                                <option>1st Week</option>
                                                <option>2nd Week</option>
                                                <option>3rd Week</option>
                                                <option>4th Week</option>
                                                <option>5th Week</option>
                                            </select>
                                            {formik.errors.motionWeek &&
                                                formik.touched.motionWeek && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.motionWeek}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                {/* Add more fields */}
                                {/* Notice Office Diary No */}
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Notice Office Diary No
                                            </label>
                                            <select
                                                className="form-select"
                                                id="noticeOfficeDiaryNo"
                                                name="noticeOfficeDiaryNo"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.noticeOfficeDiaryNo}
                                                class={
                                                    formik.errors.noticeOfficeDiaryNo &&
                                                        formik.touched.noticeOfficeDiaryNo
                                                        ? "form-select is-invalid"
                                                        : "form-select"
                                                }
                                            >
                                                <option>select</option>
                                                <option>2655</option>
                                                <option>2556</option>
                                            </select>
                                            {formik.errors.noticeOfficeDiaryNo &&
                                                formik.touched.noticeOfficeDiaryNo && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.noticeOfficeDiaryNo}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    {/* Notice Office Diary Date */}
                                    <div className="col">
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
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </span>
                                            <DatePicker
                                                selected={formik.values.noticeOfficeDiaryDate}
                                                onChange={(date) =>
                                                    formik.setFieldValue("noticeOfficeDiaryDate", date)
                                                }
                                                className={`form-control ${formik.errors.noticeOfficeDiaryDate &&
                                                        formik.touched.noticeOfficeDiaryDate
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                            />
                                            {formik.errors.noticeOfficeDiaryDate &&
                                                formik.touched.noticeOfficeDiaryDate && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.noticeOfficeDiaryDate}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                {/* Add more fields */}
                                {/* Notice Office Diary Time */}
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Notice Office Diary Time
                                            </label>
                                            <TimePicker
                                                value={formik.values.noticeOfficeDiaryTime}
                                                clockIcon={null} // Disable clock view
                                                openClockOnFocus={false}
                                                format="hh:mm a"
                                                onChange={(time) =>
                                                    formik.setFieldValue("noticeOfficeDiaryTime", time)
                                                }
                                                className={`form-control ${formik.errors.noticeOfficeDiaryTime &&
                                                        formik.touched.noticeOfficeDiaryTime
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                            />
                                            {formik.errors.noticeOfficeDiaryTime &&
                                                formik.touched.noticeOfficeDiaryTime && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.noticeOfficeDiaryTime}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    {/* Motion Status */}
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Motion Status</label>
                                            <select
                                                className="form-control control-txt"
                                                id="motionStatus"
                                                name="motionStatus"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.motionStatus}
                                                class={
                                                    formik.errors.motionStatus &&
                                                        formik.touched.motionStatus
                                                        ? "form-select is-invalid"
                                                        : "form-select"
                                                }
                                            >
                                                <option selected disabled hidden>
                                                    Select
                                                </option>
                                                {motionStatusData &&
                                                    motionStatusData.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item?.statusName}
                                                        </option>
                                                    ))}
                                                {/* Add motion status options */}
                                            </select>
                                            {formik.errors.motionStatus &&
                                                formik.touched.motionStatus && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.motionStatus}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                {/* Add more fields */}
                                {/* Mover */}
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Member Senate</label>
                                            {/* <select
                        className="form-select"
                        id="mover"
                        name="mover"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mover}
                        class={
                          formik.errors.mover && formik.touched.mover
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        {members &&
                          members.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.memberName}
                            </option>
                          ))}
                      </select> */}
                                            <Select
                                                options={members.map((item) => ({
                                                    value: item.id,
                                                    label: item.memberName,
                                                }))}
                                                isMulti
                                                onChange={(selectedOptions) =>
                                                    formik.setFieldValue(
                                                        "mover",
                                                        selectedOptions,
                                                    )
                                                }
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mover}
                                                name="mover"
                                            />
                                            {formik.errors.mover && formik.touched.mover && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.mover}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Ministry */}
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Ministry</label>
                                            {/* <select
                        className="form-select"
                        id="ministry"
                        name="ministry"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministry}
                        class={
                          formik.errors.ministry && formik.touched.ministry
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                        {ministryData &&
                          ministryData.map((item) => (
                            <option value={item.id}>{item.ministryName}</option>
                          ))}
                      </select> */}
                                            <Select
                                                options={ministryData.map((item) => ({
                                                    value: item.id,
                                                    label: item.ministryName,
                                                }))}
                                                isMulti
                                                onChange={(selectedOptions) =>
                                                    formik.setFieldValue(
                                                        "ministry",
                                                        selectedOptions,
                                                    )
                                                }
                                                onBlur={formik.handleBlur}
                                                value={formik.values.ministry}
                                                name="ministry"
                                            />
                                            {formik.errors.ministry && formik.touched.ministry && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.ministry}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    <Editor
                                        title={"Motion Text"}
                                        onChange={(content) =>
                                            formik.setFieldValue("englishText", content)
                                        }
                                        value={formik.values.englishText}
                                    />
                                </div>

                                <div className="row mt-3">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-primary" type="submit">
                                            Save
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

export default MMSNewMotion;
