import React, { useContext, useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import Select from "react-select";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { ToastContainer } from "react-toastify";
import { createNewMotion, getAllSessions } from "../../../../../../api/APIs";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
    sessionNumber: Yup.number(),
    motionType: Yup.string().required("Motion Type is required"),
    noticeOfficeDiaryNo: Yup.number().required(
        "Notice Office Diary No is required",
    ),
    noticeOfficeDiaryDate: Yup.string().required(
        "Notice Office Diary Date is required",
    ),
    noticeOfficeDiaryTime: Yup.string().required(
        "Notice Office Diary Time is required",
    ),
    mover: Yup.array().required("Mover is required"),
    //   englishText: Yup.string().required("English Text is required"),
    //   urduText: Yup.string().required("Urdu Text is required"),
});

function NewMotion() {
    const navigate = useNavigate();
    const { members, sessions } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState([]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleOkClick = () => {
        CreateMotionApi(formValues);
        handleClose();
    };

    const formik = useFormik({
        initialValues: {
            sessionNumber: sessions[0]?.id,
            motionType: "",
            noticeOfficeDiaryNo: null,
            mover: [],
            noticeOfficeDiaryDate: "",
            noticeOfficeDiaryTime: "",
            englishText: "",
            urduText: "",
            attachment: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleShow();
            setFormValues(values);
        },
        enableReinitialize: true,
    });

    const CreateMotionApi = async (values) => {
        const formData = new FormData();
        formData.append("fkSessionId", values?.sessionNumber);
        formData.append("motionType", values?.motionType);
        formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
        // formData.append("moverIds[]", values?.mover);
        values?.mover.forEach((mover, index) => {
            formData.append(`moverIds[${index}]`, mover.value);
        });
        formData.append("noticeOfficeDiaryDate", values?.noticeOfficeDiaryDate);
        formData.append("noticeOfficeDiaryTime", values?.noticeOfficeDiaryTime);
        formData.append("businessType", "Motion");
        formData.append("englishText", values.englishText);
        formData.append("urduText", values.urduText);
        formData.append("file", values?.attachment);

        try {
            const response = await createNewMotion(formData);
            if (response?.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const handleProcedureContentChange = (content) => {
        console.log(content);
    };

    return (
        <Layout
            module={true}
            sidebarItems={NoticeSidebarItems}
            centerlogohide={true}
        >
            <ToastContainer />
            <Header
                dashboardLink={"/"}
                addLink1={"/notice/dashboard"}
                addLink2={"/notice/motion/new"}
                title1={"Notice"}
                title2={"New Motion"}
            />

            <CustomAlert
                showModal={showModal}
                handleClose={handleClose}
                handleOkClick={handleOkClick}
            />

            <div>
                <div class="container-fluid">
                    <div class="card mt-1">
                        <div
                            class="card-header red-bg"
                            style={{ background: "#14ae5c !important" }}
                        >
                            <h1>NEW MOTION</h1>
                        </div>
                        <div class="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Session No</label>
                                                <select
                                                    class={`form-select`}
                                                    placeholder="Session No"
                                                    value={formik.values.sessionNumber}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="sessionNumber"
                                                >
                                                    <option value={sessions[0]?.id} selected disabled>
                                                        {sessions[0]?.sessionName}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Motion Type</label>
                                                <select
                                                    class={`form-select ${formik.touched.motionType &&
                                                            formik.errors.motionType
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.motionType || ""}
                                                    name="motionType"
                                                >
                                                    <option value="" selected disabled hidden>
                                                        Select
                                                    </option>
                                                    <option>Motion Type</option>
                                                    <option>Adjournment Motion</option>
                                                    <option>Call Attention Notice</option>
                                                    <option>Privilege Motion</option>
                                                    <option>Laying of Copy</option>
                                                    <option>Motion For Consideration/Discussion</option>
                                                    <option>Motion Under Rule 194</option>
                                                    <option>Motion Under Rule 218</option>
                                                    <option>Motion Under Rule 60</option>
                                                </select>
                                                {formik.touched.motionType &&
                                                    formik.errors.motionType && (
                                                        <div class="invalid-feedback">
                                                            {formik.errors.motionType}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div className="col">
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
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                </span>
                                                <DatePicker
                                                    selected={formik.values.noticeOfficeDiaryDate}
                                                    onChange={(date) =>
                                                        formik.setFieldValue("noticeOfficeDiaryDate", date)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    className={`form-control ${formik.touched.noticeOfficeDiaryDate &&
                                                            formik.errors.noticeOfficeDiaryDate
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                />
                                                {formik.touched.noticeOfficeDiaryDate &&
                                                    formik.errors.noticeOfficeDiaryDate && (
                                                        <div className="invalid-feedback">
                                                            {formik.errors.noticeOfficeDiaryDate}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Notice Office Diary Time
                                                </label>
                                                {/* <input
                          className="form-control"
                          type="text"
                          id="noticeOfficeDiaryTime"
                          value={formik.values.noticeOfficeDiaryTime}
                          name="noticeOfficeDiaryTime"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        /> */}
                                                <TimePicker
                                                    value={formik.values.noticeOfficeDiaryTime}
                                                    clockIcon={null} // Disable clock view
                                                    openClockOnFocus={false}
                                                    format="hh:mm a"
                                                    onChange={(time) =>
                                                        formik.setFieldValue("noticeOfficeDiaryTime", time)
                                                    }
                                                    className={`form-control`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Notice Office Diary No</label>
                                                <input
                                                    class={`form-control ${formik.touched.noticeOfficeDiaryNo &&
                                                            formik.errors.noticeOfficeDiaryNo
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                    type="number"
                                                    id="noticeOfficeDiaryNo"
                                                    value={formik.values.noticeOfficeDiaryNo}
                                                    name="noticeOfficeDiaryNo"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.noticeOfficeDiaryNo &&
                                                    formik.errors.noticeOfficeDiaryNo && (
                                                        <div class="invalid-feedback">
                                                            {formik.errors.noticeOfficeDiaryNo}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="mb-3">
                                                {/* <label class="form-label">Movers</label>
                        <select
                          class={`form-select ${
                            formik.touched.mover && formik.errors.mover
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mover || ""}
                          name="mover"
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {members &&
                            members.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.memberName}
                              </option>
                            ))}
                        </select> */}
                                                <label class="form-label">Member Senate</label>
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
                                                {formik.touched.mover && formik.errors.mover && (
                                                    <div class="invalid-feedback">
                                                        {formik.errors.mover}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label for="formFile" class="form-label">
                                                    Attach Image File{" "}
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    accept=".pdf, .jpg, .jpeg, .png"
                                                    id="formFile"
                                                    name="attachment"
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            "attachment",
                                                            event.currentTarget.files[0],
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
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
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button class="btn btn-primary" type="submit">
                                                Submit
                                            </button>
                                        </div>
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

export default NewMotion;
