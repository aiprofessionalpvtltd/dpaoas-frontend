import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getAllQuestionStatus,
  getResolutionBYID,
  searchResolution,
} from "../../../../../../api/APIs";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router";

function QMSNoticeResolution() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [allResolutionStatus, setAllResolutionStatus] = useState([]);

  const pageSize = 4;

  const formik = useFormik({
    initialValues: {
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
      noticeOfficeDiaryNo: "",
    },

    onSubmit: (values) => {
      // Handle form submission here
      SearchResolutionApi(values);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformLeavesData = (apiData) => {
    return apiData.map((res) => {
      const movers =
        res?.resolutionMoversAssociation.map(
          (item) => item?.memberAssociation?.memberName,
        ) || [];

      return {
        RID: res.id,
        ResDN: res.noticeDiary.noticeOfficeDiaryNo,
        SessionNumber: res.session?.sessionName,
        ResolutionType: res.resolutionType,

        NoticeNo: res.noticeDiary?.noticeOfficeDiaryNo,
        ResolutionStatus: res.resolutionStatus?.resolutionStatus,
        Movers: movers,
      };
    });
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
        showSuccessMessage(response?.message);
        const transformedData = transformLeavesData(response.data);
        setSearchedData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const GetALlStatus = async () => {
    try {
      const response = await getAllQuestionStatus();
      if (response?.success) {
        showSuccessMessage(response?.message);
        setAllResolutionStatus(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await getResolutionBYID(id);
      if (response?.success) {
        navigate("/qms/notice/notice-resolution-detail", {
          state: response?.data,
        });
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    GetALlStatus();
  }, []);
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/notice/notice-resolution"}
        title2={"Notice Resolution"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Notice Resolution</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Notice Diary No</label>
                      <input
                        class="form-control"
                        type="text"
                        id="noticeOfficeDiaryNo"
                        placeholder={formik.values.noticeOfficeDiaryNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution ID</label>
                      <input
                        class="form-control"
                        type="text"
                        id="resolutionID"
                        placeholder={formik.values.resolutionID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Keyword</label>
                      <input
                        class="form-control"
                        type="text"
                        id="keyword"
                        placeholder={formik.values.keyword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      <input
                        class="form-control"
                        type="text"
                        id="memberName"
                        placeholder={formik.values.memberName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-select"
                        id="fromSession"
                        placeholder={formik.values.fromSession}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
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
                      <select
                        class="form-select"
                        id="toSession"
                        placeholder={formik.values.toSession}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option>121</option>
                        <option>122</option>
                        <option>123</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Type</label>
                      <select
                        class="form-select"
                        id="resolutionType"
                        placeholder={formik.values.resolutionType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        <option>121</option>
                        <option>122</option>
                        <option>123</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Resolution Status</label>
                      <select
                        class="form-select"
                        id="resolutionStatus"
                        placeholder={formik.values.resolutionStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected disabled hidden>
                          select
                        </option>
                        {allResolutionStatus &&
                          allResolutionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.questionStatus}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Notice Date</label>
                      <DatePicker
                        selected={formik.values.fromNoticeDate}
                        onChange={(date) =>
                          formik.setFieldValue("fromNoticeDate", date)
                        }
                        className={`form-control`}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Notice Date</label>
                      <DatePicker
                        selected={formik.values.toNoticeDate}
                        onChange={(date) =>
                          formik.setFieldValue("toNoticeDate", date)
                        }
                        className={`form-control`}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button class="btn btn-primary" type="">
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div class="" style={{ marginTop: "20px" }}>
                <CustomTable
                  // block={true}
                  data={searchedData}
                  tableTitle=""
                  headerShown={true}
                  // seachBarShow={true}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  // handlePrint={}
                  // handleUser={}
                  handleEdit={(item) => handleEdit(item.RID)}
                  handleDelete={(item) => alert(item.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeResolution;
