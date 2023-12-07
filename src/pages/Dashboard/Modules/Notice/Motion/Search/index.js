import React, { useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import { searchMotion, searchQuestion } from "../../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Field, Form, Formik } from "formik";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";

function SearchMotion() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const initialValues = {
    noticeDiaryNo: "",
    motionID: "",
    keyword: "",
    memberName: "",
    fromSession: "",
    toSession: "",
    motionType: "",
    motionStatus: "",
    fromNoticeDate: "",
    toNoticeDate: "",
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res, index) => {
      return {
        SrNo: index,
        MID: res?.id,
        NoticeNo: res?.noticeOfficeDairies?.noticeOfficeDiaryNo,
        NoticeDate: res?.noticeOfficeDairies?.noticeOfficeDiaryDate,
        MotionType: res?.motionType,
        SessionNo: res?.session?.sessionName,
        SubjectMatter: [res?.englishText, res?.urduText]
          .filter(Boolean)
          .join(", "),
        Mover: res?.motionMovers?.map((item) => item?.members?.memberName),
        MotionStatus: res?.motionStatuses?.statusName,
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
      englishText: values.keyword,
      motionID: values.motionID,
      motionType: values.motionType,
      motionStatus: values.motionStatus,
      noticeDiaryNo: values.noticeDiaryNo,
      noticeOfficeDiaryDateFrom: values.fromNoticeDate,
      noticeOfficeDiaryDateTo: values.toNoticeDate,
    };

    try {
      const response = await searchMotion(searchParams);
      if (response?.success) {
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response.data.rows);
        setSearchedData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
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
        addLink2={"/notice/motion/search"}
        title1={"Notice"}
        title2={"Search Motion"}
      />
      <div  >
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SEARCH MOTION</h1>
            </div>
            <div class="card-body">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Notice Diary No</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="noticeDiaryNo"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Motion ID</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="motionID"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Keyword</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="keyword"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Member Name</label>
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
                            <option value="" selected disabled hidden>
                              Select
                            </option>
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
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option>121</option>
                            <option>122</option>
                            <option>123</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Motion Type</label>
                          <Field
                            as="select"
                            className="form-select"
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
                          </Field>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Motion Status</label>
                          <Field
                            as="select"
                            className="form-select"
                            name="motionStatus"
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option>Motion Status</option>
                            <option>Referred to Standing Committee</option>
                            <option>Ruled out of Order</option>
                            <option>Withdrawn in the House</option>
                            <option>Withdrawn at Secretariat Level</option>
                            <option>Under Process</option>
                            <option>Allowed</option>
                            <option>Disposed Off</option>
                            <option>Admitted for 2 Hr. Discussion</option>
                            <option>Disallowed in Chamber</option>
                            <option>Ruled out of Order in the house</option>
                            <option>Moved in the house without notice</option>
                            <option>Lapsed</option>
                            <option>Not Pressed</option>
                            <option>Ruling Reserved</option>
                            <option>Referred to Spl Cmt</option>
                            <option>Referred to Priv Cmt.</option>
                            <option>Infructuous</option>
                            <option>Moved and Deferred</option>
                            <option>Admitted</option>
                            <option>Disallowed</option>
                            <option>Discuss in the House</option>
                            <option>Withdrawn by the Member</option>
                            <option>Droped by the House</option>
                            <option>Under-Correspondence</option>
                            <option>Admitted but Lapsed</option>
                            <option>Deferred</option>
                            <option>Dropped</option>
                            <option>Discussed</option>
                            <option>Move To Session</option>
                            <option>To be heard but Lapsed</option>
                            <option>Referred to Special Committee</option>
                            <option>Moved in the House</option>
                            <option>Selected/Not Sel. for Statement</option>
                            <option>Notice Received for 2nd Time</option>
                            <option>
                              Referred to the Privileges Committee
                            </option>
                            <option>Moved and is Pending for Discussion</option>
                            <option>To be heard</option>
                            <option>
                              Admissibility not Allowed by the House
                            </option>
                            <option>Talked Out</option>
                            <option>Held in Order</option>
                            <option>Held out of Order</option>
                            <option>Approved</option>
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
                    <div class="row">
                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary" type="submit">
                          Search
                        </button>
                        <button class="btn btn-primary" type="submit">
                          Reset
                        </button>
                      </div>
                    </div>

                    <div
                      class="dash-detail-container"
                      style={{ marginTop: "20px" }}
                    >
                      <CustomTable
                        block={true}
                        hideBtn={true}
                        data={searchedData}
                        tableTitle="Motion"
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        showPrint={true}
                        pageSize={pageSize}
                        handleAdd={(item) => navigate('/')}
                        handleEdit={(item) => navigate('/')}
                        // handleDelete={(item) => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
       
    </Layout>
  );
}

export default SearchMotion;
