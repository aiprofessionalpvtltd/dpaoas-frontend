import React from 'react';
import { useFormik } from 'formik';
import { Layout } from '../../../../../../components/Layout';
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems';
import Header from '../../../../../../components/Header';
import { useLocation } from 'react-router-dom';

const AddEditFR = () => {
    const location = useLocation();
    const formik = useFormik({
        initialValues: {
            DiaryNo: '',
            diaryDate: '',
            diaryTime: '',
            frType: '',
            selectedId: ''
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleFrTypeChange = (e) => {
        formik.setFieldValue('frType', e.target.value);
        formik.setFieldValue('selectedId', ''); // Reset selected ID when FR type changes
    };

    return (
        <Layout module={true} sidebarItems={EfilingSideBarItem} centerlogohide={true}>
            <Header dashboardLink={"/"} title1={"Fresh Receipts"} addLink1={"/efiling/dashboard/fresh-receipt"} title2={location.state?.id ? "Edit Fresh Receipt" : "Add Fresh Receipt"} addLink2={"/efiling/dashboard/fresh-receipt/addedit"} />

            <div className="container-fluid">
                <div className="card">
                <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
                    <h1>Fresh Receipts</h1>
                </div>

                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label htmlFor="DiaryNo" className="form-label">Diary No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="DiaryNo"
                                            value={formik.values.DiaryNo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="diaryDate" className="form-label">Diary Date</label>
                                    <input
                                        type="text"
                                        id="diaryDate"
                                        name="diaryDate"
                                        value={formik.values.diaryDate}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="diaryTime" className="form-label">Diary Time</label>
                                    <input
                                        type="text"
                                        id="diaryTime"
                                        name="diaryTime"
                                        value={formik.values.diaryTime}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="Refno" className="form-label">Ref No</label>
                                    <input
                                        type="text"
                                        id="refno"
                                        value={formik.values.refno}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label htmlFor="Subject" className="form-label">Subject</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="SubjectId"
                                            value={formik.values.SubjectId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>

                                <div className="col-3">
                                    <label htmlFor="frDate" className="form-label">FR Date</label>
                                    <input
                                        type="text"
                                        id="frDate"
                                        value={formik.values.frDate}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="ShortDescription" className="form-label">Short description</label>
                                    <input
                                        type="text"
                                        id="ShortDescription"
                                        value={formik.values.ShortDescription}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="attachment" className="form-label">Attachment</label>
                                    <input
                                        type="file" // Change the input type to file
                                        id="attachment"
                                        onChange={(e) => formik.setFieldValue("attachment", e.target.files[0])} // Set the field value to the selected file
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className=" mb-3 col-3">
                                    <label htmlFor="frType" className="form-label">FR Type</label>
                                    <select
                                        id='frType'
                                        className="form-select"
                                        value={formik.values.frType}
                                        onChange={handleFrTypeChange}
                                    >
                                        <option value="" >
                                            Select FreshReceipt
                                        </option>
                                        <option value="Internal">Internal</option>
                                        <option value="External">External</option>
                                    </select>
                                </div>
                                {formik.values.frType === 'Internal' && (
                                    <div className="mb-3 col-3">
                                        <label htmlFor="BranchId" className="form-label">Branch ID</label>
                                        <select
                                            id='BranchId'
                                            className="form-select"
                                            value={formik.values.selectedId}
                                            onChange={(e) => formik.setFieldValue("selectedId", e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Branch ID
                                            </option>
                                            <option id='1'>BranchId 1</option>
                                            <option id='2'>BranchId 2</option>
                                            <option id='3'>BranchId 3</option>
                                        </select>
                                    </div>
                                )}
                                {formik.values.frType === 'External' && (
                                    <div className="mb-3 col-3">
                                        <label htmlFor="MinistryId" className="form-label">Ministry ID</label>
                                        <select
                                            id='MinistryId'
                                            className="form-select"
                                            value={formik.values.selectedId}
                                            onChange={(e) => formik.setFieldValue("selectedId", e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Ministry ID
                                            </option>
                                            <option id='1'>MinistryId 1</option>
                                            <option id='2'>MinistryId 2</option>
                                            <option id='3'>MinistryId 3</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div class="row mt-2">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Create Fresh Receipt
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

export default AddEditFR;