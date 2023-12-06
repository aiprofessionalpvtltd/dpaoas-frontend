import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { MMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

const validationSchema = Yup.object({
    sessionNumber: Yup.number().required('Session No is required'),
    motionID: Yup.number().required('Session No is required'),
    fileNo: Yup.number().required('File No is required'),
    motionType: Yup.string(),
    motionWeek: Yup.string(),
    noticeOfficeDiaryNo: Yup.number().required('Notice Office Diary No is required'),
    noticeOfficeDiaryDate: Yup.date().required('Notice Office Diary Date is required'),
    noticeOfficeDiaryTime: Yup.string().required('Notice Office Diary Time is required'),
    motionStatus: Yup.string().required('Motion Status is required'),
    mover: Yup.string(),
    ministry: Yup.string(),
    dateofMovinginHouse: Yup.date().required('Date Of Moving in House is required'),
    dateofRefferingToSC: Yup.date().required('Date Of Reffering To SC is required'),
    dateofDiscussion: Yup.date().required("Date Of Discussion is required")
    // Add more fields and validations as needed
});
function MMSMotionDetail() {
    const formik = useFormik({
        initialValues: {
            sessionNumber: '',
            motionID: '',
            fileNo: '',
            motionType: '',
            motionWeek: '',
            noticeOfficeDiaryNo: '',
            noticeOfficeDiaryDate: '',
            noticeOfficeDiaryTime: '',
            motionStatus: '',
            dateofMovinginHouse: '',
            dateofDiscussion: '',
            dateofRefferingToSC: '',
            mover: '',
            ministry: '',
            // Add more fields as needed
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("form submit")
            console.log('Form submitted with values:', values);

        }
    });
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/motion/detail"} title2={"Motion Detail"} />
            <div class='container-fluid'>
                <form onSubmit={formik.handleSubmit}>

                    <div class="row mt-4">
                        <div class="">
                            <button class="btn btn-warning me-2" type="button">View File</button>
                            <button class="btn btn-primary me-2" type="button">Send for Translation</button>
                            <button class="btn btn-primary me-2" type="button">Print</button>
                            <button class="btn btn-primary me-2" type="submit">Save</button>
                            <button class="btn btn-danger float-end" type="button">Delete</button>
                        </div>
                    </div>
                    <div class='card mt-3'>
                        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                            <h1>MOTION DETAIL</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                {/* <form onSubmit={formik.handleSubmit}></form> */}

                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <input
                                                type='text'
                                                className={`form-control ${formik.touched.sessionNumber && formik.errors.sessionNumber ? 'is-invalid' : ''}`}
                                                id='sessionNumber'
                                                placeholder={formik.values.sessionNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.sessionNumber && formik.errors.sessionNumber && (
                                                <div className='invalid-feedback'>{formik.errors.sessionNumber}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion ID</label>
                                            <input
                                                type='text'
                                                className={`form-control ${formik.touched.motionID && formik.errors.motionID ? 'is-invalid' : ''}`}
                                                id='motionID'
                                                placeholder={formik.values.motionID}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.motionID && formik.errors.motionID && (
                                                <div className='invalid-feedback'>{formik.errors.motionID}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">File No</label>
                                            <input
                                                type='text'
                                                className={`form-control ${formik.touched.fileNo && formik.errors.fileNo ? 'is-invalid' : ''}`}
                                                id='fileNo'
                                                placeholder={formik.values.fileNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.fileNo && formik.errors.fileNo && (
                                                <div className='invalid-feedback'>{formik.errors.fileNo}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Type</label>
                                            <select class="form-select" placeholder={formik.values.motionType}
                                                onChange={formik.handleChange}
                                                id='motionType'
                                                onBlur={formik.handleBlur}>
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
                                            <select class="form-select" placeholder={formik.values.motionWeek}
                                                onChange={formik.handleChange}
                                                id='motionWeek'
                                                onBlur={formik.handleBlur}>
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
                                                type='text'
                                                className={`form-control ${formik.touched.noticeOfficeDiaryNo && formik.errors.noticeOfficeDiaryNo ? 'is-invalid' : ''}`}
                                                id='noticeOfficeDiaryNo'
                                                placeholder={formik.values.noticeOfficeDiaryNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.noticeOfficeDiaryNo && formik.errors.noticeOfficeDiaryNo && (
                                                <div className='invalid-feedback'>{formik.errors.noticeOfficeDiaryNo}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Date</label>
                                            <DatePicker
                                                selected={formik.values.noticeOfficeDiaryDate}
                                                onChange={(date) => formik.setFieldValue('noticeOfficeDiaryDate', date)}
                                                className={`form-control ${formik.errors.noticeOfficeDiaryDate && formik.touched.noticeOfficeDiaryDate
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                            />
                                            {formik.errors.noticeOfficeDiaryDate && formik.touched.noticeOfficeDiaryDate && (
                                                <div className="invalid-feedback">{formik.errors.noticeOfficeDiaryDate}</div>
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
                                                onChange={(time) => formik.setFieldValue('noticeOfficeDiaryTime', time)}
                                                className={`form-control ${formik.errors.noticeOfficeDiaryTime && formik.touched.noticeOfficeDiaryTime
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                            />
                                            {formik.errors.noticeOfficeDiaryTime && formik.touched.noticeOfficeDiaryTime && (
                                                <div className="invalid-feedback">{formik.errors.noticeOfficeDiaryTime}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Status</label>
                                            <select class="form-select" placeholder={formik.values.motionStatus}
                                                onChange={formik.handleChange}
                                                id='motionStatus'
                                                onBlur={formik.handleBlur}>
                                                <option selected="selected" value="0">Motion Status</option>
                                                <option value="40">Admissibility not Allowed by the House</option>
                                                <option value="20">Admitted</option>
                                                <option value="26">Admitted but Lapsed</option>
                                                <option value="8">Admitted for 2 Hr. Discussion</option>
                                                <option value="6">Allowed</option>
                                                <option value="44">Approved</option>
                                                <option value="27">Deferred</option>
                                                <option value="21">Disallowed</option>
                                                <option value="9">Disallowed in Chamber</option>
                                                <option value="22">Discuss in the House</option>
                                                <option value="29">Discussed</option>
                                                <option value="7">Disposed Off</option>
                                                <option value="24">Droped by the House</option>
                                                <option value="28">Dropped</option>
                                                <option value="42">Held in Order</option>
                                                <option value="43">Held out of Order</option>
                                                <option value="18">Infructuous</option>
                                                <option value="12">Lapsed</option>
                                                <option value="30">Move To Session</option>
                                                <option value="19">Moved and Deferred</option>
                                                <option value="38">Moved and is Pending for Discussion</option>
                                                <option value="33">Moved in the House</option>
                                                <option value="11">Moved in the house without notice</option>
                                                <option value="14">Not Pressed</option>
                                                <option value="36">Notice Received for 2nd Time</option>
                                                <option value="17">Referred to Priv Cmt.</option>
                                                <option value="32">Referred to Special Committee</option>
                                                <option value="16">Referred to Spl Cmt</option>
                                                <option value="1">Referred to Standing Committee</option>
                                                <option value="37">Referred to the Privileges Committee</option>
                                                <option value="2">Ruled out of Order</option>
                                                <option value="10">Ruled out of Order in the house</option>
                                                <option value="15">Ruling Reserved</option>
                                                <option value="34">Selected/Not Sel. for Statement</option>
                                                <option value="41">Talked Out</option>
                                                <option value="39">To be heard</option>
                                                <option value="31">To be heard but Lapsed</option>
                                                <option value="5">Under Process</option>
                                                <option value="25">Under-Correspondence</option>
                                                <option value="4">Withdrawn at Secretariat Level</option>
                                                <option value="23">Withdrawn by the Member</option>
                                                <option value="3">Withdrawn in the House</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Moving in House</label>
                                            <DatePicker
                                                selected={formik.values.dateofMovinginHouse}
                                                onChange={(date) => formik.setFieldValue('dateofMovinginHouse', date)}
                                                className={`form-control ${formik.errors.dateofMovinginHouse && formik.touched.dateofMovinginHouse
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                            />
                                            {formik.errors.dateofMovinginHouse && formik.touched.dateofMovinginHouse && (
                                                <div className="invalid-feedback">{formik.errors.dateofMovinginHouse}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Discussion</label>
                                            <DatePicker
                                                selected={formik.values.dateofDiscussion}
                                                onChange={(date) => formik.setFieldValue('dateofDiscussion', date)}
                                                className={`form-control ${formik.errors.dateofDiscussion && formik.touched.dateofDiscussion
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                            />
                                            {formik.errors.dateofDiscussion && formik.touched.dateofDiscussion && (
                                                <div className="invalid-feedback">{formik.errors.dateofDiscussion}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Reffering To SC</label>
                                            <DatePicker
                                                selected={formik.values.dateofRefferingToSC}
                                                onChange={(date) => formik.setFieldValue('dateofRefferingToSC', date)}
                                                className={`form-control ${formik.errors.dateofRefferingToSC && formik.touched.dateofRefferingToSC
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                            />
                                            {formik.errors.dateofRefferingToSC && formik.touched.dateofRefferingToSC && (
                                                <div className="invalid-feedback">{formik.errors.dateofRefferingToSC}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">

                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Movers</label>
                                            <select class="form-select" placeholder={formik.values.mover}
                                                onChange={formik.handleChange}
                                                id='mover'>
                                                <option>Select</option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Ministries</label>
                                            <select class="form-select" placeholder={formik.values.ministry}
                                                onChange={formik.handleChange}
                                                id='ministry'>
                                                <option>Select</option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p>add text editor here</p>
                                <p>add text editor here</p>
                                <p>add text editor here</p>
                                <h2 style={{ color: "#666", marginTop: "30px", fontSize: "21px" }}>Status History</h2>
                                <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Sr#</th>
                                                <th class="text-center" scope="col">Notice Diary Number</th>
                                                <th class="text-center" scope="col">Notice Diary Date</th>
                                                <th class="text-center" scope="col">Notice Diary Time</th>
                                                <th class="text-center" scope="col">Session Number</th>
                                                <th class="text-center" scope="col">Mover</th>
                                                <th class="text-center" scope="col">Category</th>
                                                <th class="text-left" style={{ paddingLeft: "6px" }} scope="col">Description</th>
                                                <th class="text-center" scope="col">Receipt confirmed</th>
                                                <th class="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-left"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center">
                                                    <a href="#"><i class="fas fa-print"></i></a>
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>
                                </div>

                                <h2 style={{ color: "#666", marginTop: "30px", fontSize: "21px" }}>Revival History</h2>
                                <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Sr#</th>
                                                <th class="text-center" scope="col">Notice Diary Number</th>
                                                <th class="text-center" scope="col">Notice Diary Date</th>
                                                <th class="text-center" scope="col">Notice Diary Time</th>
                                                <th class="text-center" scope="col">Session Number</th>
                                                <th class="text-center" scope="col">Mover</th>
                                                <th class="text-center" scope="col">Category</th>
                                                <th class="text-left" style={{ paddingLeft: "6px" }} scope="col">Description</th>
                                                <th class="text-center" scope="col">Receipt confirmed</th>
                                                <th class="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center"></td>
                                                <td class="text-left"></td>
                                                <td class="text-center"></td>
                                                <td class="text-center">
                                                    <a href="#"><i class="fas fa-print"></i></a>
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>

    )
}

export default MMSMotionDetail
