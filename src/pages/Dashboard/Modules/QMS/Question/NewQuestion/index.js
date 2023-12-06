import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object({
    questionId:Yup.string().required('Question Id is required'),
    sessionNo:Yup.string().required('Session Number is required'),
    noticeOfficeDiaryNo:Yup.number(),
    noticeOfficeDiaryDate : Yup.string(),
    noticeOfficeDiaryTime : Yup.string(),
    questionDiaryNo : Yup.string(),
    catagory : Yup.string(),
    senator : Yup.string(),
    division : Yup.string()
});

function QMSNewQuestion() {
    const formik = useFormik({
        initialValues: {
            questionId: '',
            sessionNo : '',
            noticeOfficeDiaryNo : '',
            noticeOfficeDiaryDate : '',
            noticeOfficeDiaryTime : '',
            questionDiaryNo : '',
            catagory : '',
            senator : '',
            division : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });
    return (
        <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/question/new"} title2={"New Question"} />
            <div class='container-fluid'>
                <div class='card mt-4'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>NEW QUESTION</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question ID</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.questionId}
                                        className={`form-control ${formik.touched.questionId && formik.errors.questionId ? 'is-invalid' : ''}`}
                                        id='questionId'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.questionId && formik.errors.questionId && (
                                            <div className='invalid-feedback'>{formik.errors.questionId}</div>
                                    )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Session No</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.sessionNo}
                                        className={`form-control ${formik.touched.sessionNo && formik.errors.sessionNo ? 'is-invalid' : ''}`}
                                        id='sessionNo'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.sessionNo && formik.errors.sessionNo && (
                                            <div className='invalid-feedback'>{formik.errors.sessionNo}</div>
                                    )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Office Diary No</label>
                                        <input
                                        type='number'
                                        placeholder={formik.values.noticeOfficeDiaryNo}
                                        className={`form-control ${formik.touched.noticeOfficeDiaryNo && formik.errors.noticeOfficeDiaryNo ? 'is-invalid' : ''}`}
                                        id='noticeOfficeDiaryNo'
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
                                        <input
                                        type='text'
                                        placeholder={formik.values.noticeOfficeDiaryDate}
                                        className={`form-control ${formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate ? 'is-invalid' : ''}`}
                                        id='noticeOfficeDiaryDate'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.noticeOfficeDiaryDate && formik.errors.noticeOfficeDiaryDate && (
                                            <div className='invalid-feedback'>{formik.errors.noticeOfficeDiaryDate}</div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Office Diary Time</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.noticeOfficeDiaryTime}
                                        className={`form-control ${formik.touched.noticeOfficeDiaryTime && formik.errors.noticeOfficeDiaryTime ? 'is-invalid' : ''}`}
                                        id='noticeOfficeDiaryTime'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.noticeOfficeDiaryTime && formik.errors.noticeOfficeDiaryTime && (
                                            <div className='invalid-feedback'>{formik.errors.noticeOfficeDiaryTime}</div>
                                    )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question Diary No</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.questionDiaryNo}
                                        className={`form-control ${formik.touched.questionDiaryNo && formik.errors.questionDiaryNo ? 'is-invalid' : ''}`}
                                        id='questionDiaryNo'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.questionDiaryNo && formik.errors.questionDiaryNo && (
                                            <div className='invalid-feedback'>{formik.errors.questionDiaryNo}</div>
                                    )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Catagory</label>
                                        <select class="form-select" id='catagory'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}>
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Senator</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.senator}
                                        className={`form-control ${formik.touched.senator && formik.errors.senator ? 'is-invalid' : ''}`}
                                        id='senator'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.senator && formik.errors.senator && (
                                            <div className='invalid-feedback'>{formik.errors.senator}</div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <div class="mb-3">
                                        <label class="form-label">Division</label>
                                        <input
                                        type='text'
                                        placeholder={formik.values.division}
                                        className={`form-control ${formik.touched.division && formik.errors.division ? 'is-invalid' : ''}`}
                                        id='division'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.division && formik.errors.division && (
                                            <div className='invalid-feedback'>{formik.errors.division}</div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                            </div>

                            <p>add english text editor here</p>
                            <p>add urdu text editor here</p>

                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Submit</button>
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

export default QMSNewQuestion
