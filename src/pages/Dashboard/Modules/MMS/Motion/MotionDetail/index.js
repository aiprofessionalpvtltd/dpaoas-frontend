import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import {
    getAllMinistry,
    getAllSessions,
    getallMembers,
    getallMotionStatus,
    sendMotionForTranslation,
    updateNewMotion,
} from "../../../../../../api/APIs";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";

const validationSchema = Yup.object({
    sessionNumber: Yup.number().required("Session No is required"),
    motionID: Yup.number(),
    fileNo: Yup.number().required("File No is required"),
    motionType: Yup.string(),
    motionWeek: Yup.string(),
    noticeOfficeDiaryNo: Yup.number().required(
        "Notice Office Diary No is required",
    ),
    noticeOfficeDiaryDate: Yup.date().required(
        "Notice Office Diary Date is required",
    ),
    noticeOfficeDiaryTime: Yup.string().required(
        "Notice Office Diary Time is required",
    ),
    motionStatus: Yup.string(),
    mover: Yup.string(),
    ministry: Yup.string(),
    dateofMovinginHouse: Yup.date().required(
        "Date Of Moving in House is required",
    ),
    dateofRefferingToSC: Yup.date().required(
        "Date Of Reffering To SC is required",
    ),
    dateofDiscussion: Yup.date().required("Date Of Discussion is required"),
    // Add more fields and validations as needed
});
function MMSMotionDetail() {
    const location = useLocation();

    const [ministryData, setMinistryData] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [members, setMembers] = useState([]);
    const [motionStatusData, setMotionStatusData] = useState([]);
    const formik = useFormik({
        initialValues: {
            sessionNumber: location?.state?.fkSessionId,
            motionID: location?.state?.motionMovers.length > 0 ?? location?.state?.motionMovers[0]?.fkMotionId,
            fileNo: location?.state?.fileNumber,
            motionType: location?.state?.motionType,
            motionWeek: location?.state?.motionWeek,
            noticeOfficeDiaryNo: "",
            noticeOfficeDiaryDate: "",
            noticeOfficeDiaryTime: "",
            motionStatus: "",
            dateofMovinginHouse: new Date(location?.state?.dateOfMovingHouse),
            dateofDiscussion: new Date(location?.state?.dateOfDiscussion),
            dateofRefferingToSC: new Date(location?.state?.dateOfReferringToSc),
            mover:
                location?.state?.motionMovers.length > 0 ??
                location?.state?.motionoMvers[0]?.fkMemberId,
            ministry:
                location?.state?.motionMinistries.length > 0 ??
                location?.state?.motionMinistries[0]?.fkMinistryId,
            // Add more fields as needed
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleEditMotion(values);
        },
    });

    const handleEditMotion = async (values) => {
        const formData = new FormData();
        formData.append("fkSessionId", values?.sessionNumber);
        formData.append("fileNumber", values?.fileNo);
        formData.append("motionType", values?.motionType);
        formData.append("motionWeek", values?.motionWeek);
        formData.append("noticeOfficeDiaryNo", values?.noticeOfficeDiaryNo);
        formData.append("moverIds[]", values?.mover);
        formData.append("ministryIds[]", values?.ministry);
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

    const AllMinistryData = async () => {
        try {
            const response = await getAllMinistry();
            if (response?.success) {
                // showSuccessMessage(response?.message);
                setMinistryData(response?.data);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.error);
        }
    };
    const getAllSessionsApi = async () => {
        try {
            const response = await getAllSessions();
            if (response?.success) {
                setSessions(response?.data);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const AllMembersData = async () => {
        const currentPage = 0;
        const pageSize = 100;
        try {
            const response = await getallMembers(currentPage, pageSize);
            if (response?.success) {
                // showSuccessMessage(response?.message);
                setMembers(response?.data?.rows);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.error);
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
    const transfrerMinistryData = (apiData) => {
        return apiData.map((leave, index) => ({
            SR: `${index + 1}`,
            fkMotionId: `${leave?.fkMotionId}`,
            motionStatuses: leave?.motionStatuses?.statusName,
        }));
    };
    const StatusHistoryData = transfrerMinistryData(
        location?.state?.motionStatusHistories,
    );
    console.log("sadkajhhhhhhh", StatusHistoryData);
    const hendlesendMotionForTranslation = async () => {
        try {
            const response = await sendMotionForTranslation(location?.state?.id);
            if (response?.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            console.log();
        }
    };
    useEffect(() => {
        getMotionStatus();
        AllMembersData();
        AllMinistryData();
        getAllSessionsApi();
        // transfrerMinistryData(location?.state?.motionStatusHistories)
    }, []);
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/"}
                addLink1={"/mms/dashboard"}
                title1={"Motion"}
                addLink2={"/mms/motion/detail"}
                title2={"Motion Detail"}
            />
            <ToastContainer />
            <div class="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div class="row mt-4">
                        <div class="">
                            <button class="btn btn-warning me-2" type="button">
                                View File
                            </button>
                            <button
                                class="btn btn-primary me-2"
                                type="button"
                                onClick={() => hendlesendMotionForTranslation()}
                            >
                                Send for Translation
                            </button>
                            <button class="btn btn-primary me-2" type="button">
                                Print
                            </button>
                            <button class="btn btn-primary me-2" type="submit">
                                Save
                            </button>
                            <button class="btn btn-danger float-end" type="button">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div
                            class="card-header red-bg"
                            style={{ background: "#14ae5c !important" }}
                        >
                            <h1>MOTION DETAIL</h1>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <select
                                                name="sessionNumber"
                                                id="sessionNumber"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.sessionNumber}
                                                className={
                                                    formik.errors.sessionNumber &&
                                                        formik.touched.sessionNumber
                                                        ? "form-select is-invalid"
                                                        : "form-select"
                                                }
                                            >
                                                <option value="" selected disabled hidden>
                                                    Select
                                                </option>
                                                {sessions &&
                                                    sessions.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item?.sessionName}
                                                        </option>
                                                    ))}
                                            </select>
                                            {formik.errors.sessionNumber &&
                                                formik.touched.sessionNumber && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.sessionNumber}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion ID</label>
                                            <input
                                                type='text'
                                                className={`form-control`}
                                                id='motionID'
                                                readOnly={true}
                                                placeholder={formik.values.motionID}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">File No</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.fileNo && formik.errors.fileNo
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                id="fileNo"
                                                placeholder={formik.values.fileNo}
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
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Type</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.motionType}
                                                onChange={formik.handleChange}
                                                id="motionType"
                                                onBlur={formik.handleBlur}
                                            >
                                                <option>Select</option>
                                                <option>Motion Under Rule 218</option>
                                                <option></option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Week</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.motionWeek}
                                                onChange={formik.handleChange}
                                                id="motionWeek"
                                                onBlur={formik.handleBlur}
                                            >
                                                <option>Motion Week</option>
                                                <option>Not Applicable</option>
                                                <option>1st Week</option>
                                                <option>2nd Week</option>
                                                <option>3rd Week</option>
                                                <option>4th Week</option>
                                                <option>5th Week</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary No</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.noticeOfficeDiaryNo &&
                                                        formik.errors.noticeOfficeDiaryNo
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                id="noticeOfficeDiaryNo"
                                                placeholder={formik.values.noticeOfficeDiaryNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.noticeOfficeDiaryNo &&
                                                formik.errors.noticeOfficeDiaryNo && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.noticeOfficeDiaryNo}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Date</label>
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
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Time</label>
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
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Status</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.motionStatus}
                                                onChange={formik.handleChange}
                                                id="motionStatus"
                                                onBlur={formik.handleBlur}
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
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Moving in House</label>
                                            <DatePicker
                                                selected={formik.values.dateofMovinginHouse}
                                                onChange={(date) =>
                                                    formik.setFieldValue("dateofMovinginHouse", date)
                                                }
                                                className={`form-control ${formik.errors.dateofMovinginHouse &&
                                                        formik.touched.dateofMovinginHouse
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                            />
                                            {formik.errors.dateofMovinginHouse &&
                                                formik.touched.dateofMovinginHouse && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.dateofMovinginHouse}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Discussion</label>
                                            <DatePicker
                                                selected={formik.values.dateofDiscussion}
                                                onChange={(date) =>
                                                    formik.setFieldValue("dateofDiscussion", date)
                                                }
                                                className={`form-control ${formik.errors.dateofDiscussion &&
                                                        formik.touched.dateofDiscussion
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                            />
                                            {formik.errors.dateofDiscussion &&
                                                formik.touched.dateofDiscussion && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.dateofDiscussion}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Reffering To SC</label>
                                            <DatePicker
                                                selected={formik.values.dateofRefferingToSC}
                                                onChange={(date) =>
                                                    formik.setFieldValue("dateofRefferingToSC", date)
                                                }
                                                className={`form-control ${formik.errors.dateofRefferingToSC &&
                                                        formik.touched.dateofRefferingToSC
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                            />
                                            {formik.errors.dateofRefferingToSC &&
                                                formik.touched.dateofRefferingToSC && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.dateofRefferingToSC}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row"></div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Movers</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.mover}
                                                onChange={formik.handleChange}
                                                id="mover"
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
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Ministries</label>
                                            <select
                                                class="form-select"
                                                placeholder={formik.values.ministry}
                                                onChange={formik.handleChange}
                                                id="ministry"
                                            >
                                                <option value={""} selected disabled hidden>
                                                    select
                                                </option>
                                                {ministryData &&
                                                    ministryData.map((item) => (
                                                        <option value={item.id}>{item.ministryName}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p>add text editor here</p>
                                <p>add text editor here</p>
                                <p>add text editor here</p>

                                <h2
                                    style={{ color: "#666", marginTop: "30px", fontSize: "21px" }}
                                >
                                    Status History
                                </h2>
                                <div
                                    class="dash-detail-container"
                                    style={{ marginTop: "20px" }}
                                >
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">
                                                    Sr#
                                                </th>
                                                <th class="text-center" scope="col">
                                                    MotionID
                                                </th>
                                                <th class="text-center" scope="col">
                                                    Motion Statuses
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {StatusHistoryData.length > 0 &&
                                                StatusHistoryData.map((item, index) => (
                                                    <tr>
                                                        <td class="text-center">{item.SR}</td>
                                                        <td class="text-center">{item.fkMotionId}</td>
                                                        <td class="text-center">{item.motionStatuses}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default MMSMotionDetail;
