import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { MMSSideBarItems } from '../../../../../utils/sideBarItems';
import Header from '../../../../../components/Header';
import { Field, Form, Formik } from "formik";
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import { searchQuestion } from '../../../../../api/APIs';


function MMSSearchQuestion() {
    const navigate = useNavigate()
    const [searchedData, setSearchedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 4; // Set your desired page size

    const initialValues = {
        questionDiaryNo: "",
        questionID: "",
        keyword: "",
        memberName: "",
        fromSession: "",
        toSession: "",
        category: "",
        questionStatus: "",
        fromNoticeDate: "",
        toNoticeDate: "",
        divisions: "",
        noticeOfficeDiaryNo: ""
    };
    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformLeavesData = (apiData) => {
        return apiData.map((res, index) => {
            return {
                SrNo: index,
                QID: res?.id,
                QDN: res?.questionDiary,
                NoticeDate: res?.noticeOfficeDiary?.noticeOfficeDiaryDate,
                NoticeTime: res?.noticeOfficeDiary?.noticeOfficeDiaryTime,
                SessionNumber: res?.session?.sessionName,
                SubjectMatter: [res?.englishText, res?.urduText].filter(Boolean).join(', '),
                Category: res?.questionCategory,
                // SubmittedBy: res.category,
                Status: res.questionStatus?.questionStatus
            };
        });
    };
    const handleSubmit = (values) => {
        // Handle form submission
        SearchQuestionApi(values);
    };

    const SearchQuestionApi = async (values) => {
        const searchParams = {
            fromSessionNo: values.fromSession,
            toSessionNo: values.toSession,
            memberName: values.memberName,
            questionCategory: values.category,
            keyword: values.keyword,
            questionID: values.questionID,
            questionStatus: values.resolutionStatus,
            questionDiaryNo: values.questionDiaryNo,
            noticeOfficeDiaryDateFrom: values.fromNoticeDate,
            noticeOfficeDiaryDateTo: values.toNoticeDate,
        };

        try {
            const response = await searchQuestion(searchParams);
            if (response?.success) {
                showSuccessMessage(response?.message);
                setCount(response.data?.count)
                const transformedData = transformLeavesData(response.data);
                setSearchedData(transformedData);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/question/search"} title2={"Search Queston"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>SEARCH QUESTIONS</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">

                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Question Diary No
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="questionDiaryNo"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Question ID</label>
                                                    <Field
                                                        className="form-control"
                                                        type="number"
                                                        name="questionID"
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
                                                    <label className="form-label">
                                                        Category
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="category"
                                                    >
                                                        <option value="Starred">
                                                            Starred
                                                        </option>
                                                        <option value="UnStarred">
                                                            UnStarred
                                                        </option>
                                                        <option value="Short Notice">
                                                            Short Notice
                                                        </option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Question Status
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        name="questionStatus"
                                                    >
                                                        <option selected="selected" value="" hidden>
                                                            Select
                                                        </option>
                                                        <option>Question Status</option>
                                                        <option>Admitted</option>
                                                        <option>Admitted but Lapsed</option>
                                                        <option>Deferred</option>
                                                        <option>Disallowed</option>
                                                        <option>Disallowed on Reconsideration</option>
                                                        <option>File not Available</option>
                                                        <option>Lapsed</option>
                                                        <option>NFA</option>
                                                        <option>Replied</option>
                                                        <option>Replied/Referred to Standing Committee</option>
                                                        <option>Under Correspondence</option>
                                                        <option>Under Process</option>
                                                        <option>Withdrawn</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        From Notice Date
                                                    </label>
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
                                        <div className='row'>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Division</label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="divisions"
                                                    />
                                                </div>

                                            </div>
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
                                        </div>
                                        {/* <div className='row'>
                      <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Complete Text</label>
                            <Field
                              className="form-control"
                              type="checkbox"
                              name="completeText"
                            />
                          </div>
                          
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Exact Match</label>
                            <Field
                              className="form-control"
                              type="checkbox"
                              name="exactMatch"
                            />
                          </div>
                        </div>
                      </div> */}
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
                            <div className='mt-3'>
                                <CustomTable
                                    headerShown={true}
                                    data={searchedData}
                                    // handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    headertitlebgColor={"#666"}
                                    headertitletextColor={"#FFF"}
                                    hideEditIcon={true}
                                    ActionHide={true}
                                    totalCount={count}
                                // handleDelete={(item) => handleDelete(item.id)}
                                />
                            </div>

                            <div class="row mt-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question Status</label>
                                        <select class="form-select">
                                            <option>Question Status</option>
                                            <option>Admitted</option>
                                            <option>Admitted but Lapsed</option>
                                            <option>Deferred</option>
                                            <option>Disallowed</option>
                                            <option>Disallowed on Reconsideration</option>
                                            <option>File not Available</option>
                                            <option>Lapsed</option>
                                            <option>NFA</option>
                                            <option>Replied</option>
                                            <option>Replied/Referred to Standing Committee</option>
                                            <option>Under Correspondence</option>
                                            <option>Under Process</option>
                                            <option>Withdrawn</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Status Date</label>
                                        <input class="form-control" />
                                    </div>
                                </div>
                                <div class="col">
                                    <button style={{ marginTop: "30px" }} class="btn btn-primary" type="submit">Change Status</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MMSSearchQuestion
