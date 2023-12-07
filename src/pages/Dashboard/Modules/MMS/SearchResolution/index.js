import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { MMSSideBarItems } from '../../../../../utils/sideBarItems';
import Header from '../../../../../components/Header';
import { Field, Form, Formik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import { searchResolution } from '../../../../../api/APIs';


function MMSSearchResolution() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [searchedData, setSearchedData] = useState([]);

    const pageSize = 4; // Set your desired page size

    const initialValues = {
        resolutionDiaryNo: "",
        resolutionID: "",
        keyword: "",
        memberName: "",
        fromSession: "",
        toSession: "",
        resolutionType: "",
        resolutionStatus: "",
        fromNoticeDate: "",
        toNoticeDate: "",
        colourResNo: "",
        noticeOfficeDiaryNo: ""
    };

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const transformLeavesData = (apiData) => {
        return apiData.map((res) => {
            const movers = res?.resolutionMoversAssociation.map((item) => (
                item?.memberAssociation?.memberName
            )) || [];

            return {
                RID: res.id,
                ResDN: res.resolutionDiaries,
                SessionNumber: res.session?.sessionName,
                ResolutionType: res.resolutionType,
                SubjectMatter: "",
                NoticeNo: res.noticeDiary?.noticeOfficeDiaryNo,
                ResolutionStatus: res.resolutionStatus?.resolutionStatus,
                Movers: movers,
            };
        });
    };

    const handleSubmit = (values) => {
        // Handle form submission
        SearchResolutionApi(values);
    };

    const SearchResolutionApi = async (values) => {
        const searchParams = {
            fkSessionNoFrom: values.fromSession,
            fkSessionNoTo: values.toSession,
            resolutionType: values.resolutionType,
            colourResNo: values.colourResNo,
            keyword: values.keyword,
            resolutionId: values.resolutionID,
            resolutionDiaryNo: values.resolutionDiaryNo,
            fkResolutionStatus: values.resolutionStatus,
            noticeOfficeDiaryNo: values.noticeOfficeDiaryNo,
            noticeOfficeDiaryDateFrom: values.fromNoticeDate,
            noticeOfficeDiaryDateTo: values.toNoticeDate,
            resolutionMovers: "",
        };

        try {
            const response = await searchResolution(searchParams);
            if (response?.success) {
                const transformedData = transformLeavesData(response.data);
                setSearchedData(transformedData);
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/resolution/search"} title2={"Search Resolution"} />
            <ToastContainer />

            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>SEARCH RESOLUTION</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Resolution Diary No</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="resolutionDiaryNo"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Resolution ID</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="resolutionID"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Keyword</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="keyword"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Member Name</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="memberName"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">From Session</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="fromSession"
                                                    >
                                                        <option>Select</option>
                                                        <option>121</option>
                                                        <option>122</option>
                                                        <option>123</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">To Session</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="toSession"
                                                    >
                                                        <option>Select</option>
                                                        <option>121</option>
                                                        <option>122</option>
                                                        <option>123</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Resolution Type</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="resolutionType"
                                                    >
                                                        <option>Resolution Type</option>
                                                        <option>Government Resolution</option>
                                                        <option>Private Member Resolution</option>
                                                        <option>Govt. Resolution Supported by others</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Resolution Status</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="resolutionStatus"
                                                    >
                                                        <option selected="selected" value="0">
                                                            Resolution Status
                                                        </option>
                                                        <option>Resolution Status</option>
                                                        <option>Allowed</option>
                                                        <option>Disallowed</option>
                                                        <option>Withdraw</option>
                                                        <option>Admitted</option>
                                                        <option>Under Process</option>
                                                        <option>Admitted and Selected in Balloting</option>
                                                        <option>Dropped by the House</option>
                                                        <option>Admitted but Lapsed</option>
                                                        <option>Included in the order of day</option>
                                                        <option>Passed by the House</option>
                                                        <option>Passed As Amended</option>
                                                        <option>Withdrawn by the Member</option>
                                                        <option>Rejected by the House</option>
                                                        <option>Passed Unanimously</option>
                                                        <option>Under Correspondence</option>
                                                        <option>Moved and Pending for Discussion</option>
                                                        <option>Lapsed</option>
                                                        <option>Deferred</option>
                                                        <option>Refered to Standing Committee</option>
                                                        <option>Move To Session</option>
                                                        <option>Move in the House</option>
                                                        <option>Pending for further discussion</option>
                                                        <option>NFA</option>
                                                        <option>Admitted as Call Attention Notice</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">From Notice Date</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="fromNoticeDate"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">To Notice Date</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="toNoticeDate"
                                                    />
                                                </div>
                                            </div>
                                        </div>




                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Notice Diary No</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="noticeOfficeDiaryNo"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Colour Res.No</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="colourResNo"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <button className="btn btn-primary" type="submit">
                                                    Search
                                                </button>
                                                <button className="btn btn-primary" type="reset">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <div style={{ marginTop: "20px" }}>

                                <CustomTable
                                    block={true}
                                    data={searchedData}
                                    tableTitle=""
                                    addBtnText="Print Resolution"
                                    handleAdd={() => alert("Print")}
                                    // seachBarShow={true}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    headertitlebgColor={"#666"}
                                    headertitletextColor={"#FFF"}
                                    hideEditIcon={true}
                                    ActionHide={true}
                                // handlePrint={}
                                // handleUser={}
                                // handleDelete={(item) => handleDelete(item.id)}
                                />
                                <div class="row mt-3">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution Status</label>
                                            <select class="form-select">
                                                <option>Resolution Status</option>
                                                <option>Allowed</option>
                                                <option>Disallowed</option>
                                                <option>Withdraw</option>
                                                <option>Admitted</option>
                                                <option>Under Process</option>
                                                <option>Admitted and Selected in Balloting</option>
                                                <option>Dropped by the House</option>
                                                <option>Admitted but Lapsed</option>
                                                <option>Included in the order of day</option>
                                                <option>Passed by the House</option>
                                                <option>Passed As Amended</option>
                                                <option>Withdrawn by the Member</option>
                                                <option>Rejected by the House</option>
                                                <option>Passed Unanimously</option>
                                                <option>Under Correspondence</option>
                                                <option>Moved and Pending for Discussion</option>
                                                <option>Lapsed</option>
                                                <option>Deferred</option>
                                                <option>Refered to Standing Committee</option>
                                                <option>Move To Session</option>
                                                <option>Move in the House</option>
                                                <option>Pending for further discussion</option>
                                                <option>NFA</option>
                                                <option>Admitted as Call Attention Notice</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Status Date</label>
                                            <input class="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MMSSearchResolution
