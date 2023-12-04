import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { MMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    sessionNumber: Yup.string().required('Session Number is required'),
    fileNo: Yup.string().required('File Number is required'),
});

function MMSNewMotion() {
    const formik = useFormik({
        initialValues: {
            sessionNumber: '',
            fileNo: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/motion/new"} title2={"New Motion"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>NEW MOTION</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <form onSubmit={formik.handleSubmit}>

                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <select id="sessionNumber"
                                                name="sessionNumber"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.sessionNumber}
                                                className={formik.errors.sessionNumber && formik.touched.sessionNumber ? 'form-select is-invalid' : 'form-select'}>
                                                <option>331</option>
                                                <option>332</option>
                                                <option>333</option>
                                            </select>
                                            {formik.errors.sessionNumber && formik.touched.sessionNumber && (
                                                <div className="invalid-feedback">{formik.errors.sessionNumber}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">File No</label>
                                            <input
                                                type='text'
                                                placeholder={formik.values.fileNo}
                                                className={`form-control ${formik.touched.fileNo && formik.errors.fileNo ? 'is-invalid' : ''}`}
                                                id='fileNo'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.fileNo && formik.errors.fileNo && (
                                                <div className='invalid-feedback'>{formik.errors.fileNo}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Type</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                                <option>Adjournment Motion</option>
                                                <option>Call Attention Notice</option>
                                                <option>Privilege Motion</option>
                                                <option>Motion Under Rule 218</option>
                                                <option>Motion Under Rule 60</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Week</label>
                                            <select class="form-select">
                                                <option>Not Applicable</option>
                                                <option>1st Week</option>
                                                <option>2nd Week</option>
                                                <option>3rd Week</option>
                                                <option>4th Week</option>
                                                <option>5th Week</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary No</label>
                                            <select class="form-select">
                                                <option>2655</option>
                                                <option>2556</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Time</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Status</label>
                                            <select class="form-control control-txt">
                                                <option>Select</option>
                                                <option>Admissibility not Allowed by the House</option>
                                                <option>Admitted</option>
                                                <option>Admitted but Lapsed</option>
                                                <option>Admitted for 2 Hr. Discussion</option>
                                                <option>Allowed</option>
                                                <option>Approved</option>
                                                <option>Deferred</option>
                                                <option>Disallowed</option>
                                                <option>Disallowed in Chamber</option>
                                                <option>Discuss in the House</option>
                                                <option>Discussed</option>
                                                <option>Disposed Off</option>
                                                <option>Droped by the House</option>
                                                <option>Dropped</option>
                                                <option>Held in Order</option>
                                                <option>Held out of Order</option>
                                                <option>Infructuous</option>
                                                <option>Lapsed</option>
                                                <option>Move To Session</option>
                                                <option>Moved and Deferred</option>
                                                <option>Moved and is Pending for Discussion</option>
                                                <option>Moved in the House</option>
                                                <option>Moved in the house without notice</option>
                                                <option>Not Pressed</option>
                                                <option>Notice Received for 2nd Time</option>
                                                <option>Referred to Priv Cmt.</option>
                                                <option>Referred to Special Committee</option>
                                                <option>Referred to Spl Cmt</option>
                                                <option>Referred to Standing Committee</option>
                                                <option>Referred to the Privileges Committee</option>
                                                <option>Ruled out of Order</option>
                                                <option>Ruled out of Order in the house</option>
                                                <option>Ruling Reserved</option>
                                                <option>Selected/Not Sel. for Statement</option>
                                                <option>Talked Out</option>
                                                <option>To be heard</option>
                                                <option>To be heard but Lapsed</option>
                                                <option>Under Process</option>
                                                <option>Under-Correspondence</option>
                                                <option>Withdrawn at Secretariat Level</option>
                                                <option>Withdrawn by the Member</option>
                                                <option>Withdrawn in the House</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Mover</label>
                                            <select class="form-select">
                                                <option>2655</option>
                                                <option>2556</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Ministry</label>
                                            <select class="form-select">
                                                <option>2655</option>
                                                <option>2556</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p>Motion Text</p>

                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MMSNewMotion
