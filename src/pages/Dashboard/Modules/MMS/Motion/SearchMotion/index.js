import React, { useState } from 'react'
import { MMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    motionDiaryNo: Yup.string().required('Motion Diary No is required'),
    memberName: Yup.string().required('Member Name is required'),
});

function MMSSearchMotion() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size

    const formik = useFormik({
        initialValues: {
            motionDiaryNo: '',
            memberName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const data = [
        {
            "Sr#": 1,
            "MID": "21-11-2023",
            "M-File No": "Ali Ahmad Jan",
            "Motion Diary No": "Additional Secretary Office",
            "Session Number": "Educational Trip",
            "Motion Type": "Personal",
            "Subject Matter": "AI Professionals Pvt Limited",
            "Notice No./Date": "21-11-2023",
            "Motion Week": "30-11-2023",
            "Motion Status": [
                "Saturday"
            ],
            "Movers": "Visit",
            "Ministries": "Inactive",
        },
        {
            "Sr#": 1,
            "MID": "21-11-2023",
            "M-File No": "Ali Ahmad Jan",
            "Motion Diary No": "Additional Secretary Office",
            "Session Number": "Educational Trip",
            "Motion Type": "Personal",
            "Subject Matter": "AI Professionals Pvt Limited",
            "Notice No./Date": "21-11-2023",
            "Motion Week": "30-11-2023",
            "Motion Status": [
                "Saturday"
            ],
            "Movers": "Visit",
            "Ministries": "Inactive",
        },
    ]

    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/motion/search"} title2={"Search Motion"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>SEARCH MOTION</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <form onSubmit={formik.handleSubmit}>

                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Diary No</label>
                                            <input
                                                type='text'
                                                placeholder={formik.values.motionDiaryNo}
                                                className={`form-control ${formik.touched.motionDiaryNo && formik.errors.motionDiaryNo ? 'is-invalid' : ''}`}
                                                id='motionDiaryNo'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.motionDiaryNo && formik.errors.motionDiaryNo && (
                                                <div className='invalid-feedback'>{formik.errors.motionDiaryNo}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion ID</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Keyword</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Member Name</label>
                                            <input
                                                type='text'
                                                placeholder={formik.values.memberName}
                                                className={`form-control ${formik.touched.memberName && formik.errors.memberName ? 'is-invalid' : ''}`}
                                                id='memberName'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.memberName && formik.errors.memberName && (
                                                <div className='invalid-feedback'>{formik.errors.memberName}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">From Session</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                                <option>121</option>
                                                <option>122</option>
                                                <option>123</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">To Session</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                                <option>121</option>
                                                <option>122</option>
                                                <option>123</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Type</label>
                                            <select class="form-select">
                                                <option>Motion Type</option>
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
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Ministry</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Status</label>
                                            <select class="form-select">
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
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">From Notice Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">To Notice Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">File No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Search</button>
                                        <button class="btn btn-primary" type="">Reset</button>
                                    </div>
                                </div>




                                <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                    <CustomTable
                                        block={true}
                                        data={data}
                                        tableTitle=""
                                        addBtnText="Print Motion"
                                        handleAdd={() => alert("Print")}
                                        handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                                        hideUserIcon={true}
                                        handleUser={() => navigate("/vms/visitor")}
                                        handleDuplicate={() => navigate("/vms/duplicatepass")}
                                        // seachBarShow={true}
                                        handlePageChange={handlePageChange}
                                        currentPage={currentPage}
                                        pageSize={pageSize}
                                    // handlePrint={}
                                    // handleUser={}
                                    // handleDelete={(item) => handleDelete(item.id)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MMSSearchMotion
