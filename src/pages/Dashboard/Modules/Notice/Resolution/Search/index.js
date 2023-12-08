import React, { useState } from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { searchResolution } from '../../../../../../api/APIs';
import { Field, Form, Formik } from 'formik';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { ToastContainer } from 'react-toastify';


function SearchResolution() {
    const navigate = useNavigate();
    const [searchedData, setSearchedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 10; // Set your desired page size
    
    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

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
                colourResNo: "",
                keyword: values.keyword,
                resolutionId: values.resolutionID,
                resolutionDiaryNo: values.resolutionDiaryNo,
                fkResolutionStatus: values.resolutionStatus,
                noticeOfficeDiaryNo: "",
                noticeOfficeDiaryDateFrom: values.fromNoticeDate,
                noticeOfficeDiaryDateTo: values.toNoticeDate,
                resolutionMovers: "",
          };

        try {
          const response = await searchResolution(searchParams);
          if (response?.success) {
            setCount(count);
            const transformedData = transformLeavesData(response.data);
                setSearchedData(transformedData);
            showSuccessMessage(response?.message);
          }
        } catch (error) {
          showErrorMessage(error?.response?.data?.message);
        }
      };
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
        <ToastContainer />

            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/resolution/search"} title1={"Notice"} title2={"Search Resolution"} />
            <div class='dashboard-content'>
            <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
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
                                            {/* Add other options as needed */}
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

                                <div class="dash-detail-container" style={{marginTop: "20px"}}>

                                <CustomTable
                        block={true}
                        hideBtn={true}
                        data={searchedData}
                        tableTitle="Resolutions"
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        showPrint={true}
                        pageSize={pageSize}
                        handleAdd={(item) => navigate('/')}
                        handleEdit={(item) => navigate('/')}
                        totalCount={count}
                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchResolution
