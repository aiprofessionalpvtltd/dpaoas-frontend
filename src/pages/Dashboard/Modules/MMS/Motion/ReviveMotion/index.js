import React, { useContext, useEffect, useState } from "react";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import moment from "moment";
import Select from "react-select";
import {
  createReviveMotion,
  getAllMotion,
  getMotionByID,
  getallMotionStatus,
  searchMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function MMSReviveMotion() {
  const navigate = useNavigate();
  const { ministryData, members, sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [motionStatus, setMotionStatus] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [isFromNoticeOpen, setIsFromNoticeOpen] = useState(false);
  const [isToNoticeOpen, setIsToNoticeOpen] = useState(false);
  const pageSize = 10; // Set your desired page size
  const [isChecked, setIsChecked] = useState([]);

  const formik = useFormik({
    initialValues: {
      session: "",
      motionStatus: "0",
    },
    onSubmit: (values) => {
      // Handle form submission here
      searchMotionList(values, currentPage);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.session ||
      formik?.values?.motionStatus
    ) {
      searchMotionList(formik?.values, page);
    }
  };

  const transformMotionData = (apiData) => {
    return apiData.map((item, index) => {
      const English = [item?.englishText].filter(Boolean).join(", ");
      const EnglishText = English.replace(/(<([^>]+)>)/gi, "");

      const Urdu = [item?.urduText].filter(Boolean).join(", ");
      const UrduText = Urdu.replace(/(<([^>]+)>)/gi, "");
      return {
        internalId: item?.id,
        SrNo: item?.id,
        SessionName: item?.sessions?.sessionName
          ? item?.sessions?.sessionName
          : "",
        motionType: item?.motionType ? item?.motionType : "",
        noticeOfficeDiaryNo: item?.noticeOfficeDairies?.noticeOfficeDiaryNo
          ? item?.noticeOfficeDairies?.noticeOfficeDiaryNo
          : "",

        noticeOfficeDiaryDate: item?.noticeOfficeDairies?.noticeOfficeDiaryDate
          ? moment(item?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
              "DD-MM-YYYY"
            )
          : "",
        noticeOfficeDiaryTime: moment(
          item?.noticeOfficeDairies?.noticeOfficeDiaryTime,
          "hh:ss A"
        ).format("hh:ss A"),
        englishText: EnglishText ? EnglishText : "",
        urduText: UrduText ? UrduText : "",
        memberPosition:item?.memberPosition,
        createdBy:item?.motionSentStatus === "toMotion" ? "From Notice Office": item?.motionSentStatus === "inMotion" ? "Motion Branch":"---"
      };
    });
  };

  const searchMotionList = async (values, page) => {
    const data = {
      // fileNumber: ,
      fkMotionStatus: values?.motionStatus,
      motionSentStatus:"inMotion",
    };
    setCount(null);

    try {
      const response = await searchMotion(page, pageSize, data); // Add await here
      if (response?.success) {
        // showSuccessMessage(response?.message);
        const transformedData = transformMotionData(response?.data?.rows);
        setMotionData(transformedData);
        showSuccessMessage(response?.message);
        setCount(response?.data?.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMotionStatus = async () => {
    try {
      const response = await getallMotionStatus();
      if (response?.success) {
        setMotionStatus(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getMotionStatus();
  }, []);

  const handleResetForm = () => {
    formik.resetForm();
    setMotionData([]);
  };
  const handleEdit = async (id) => {
    try {
      // const { question, history } = await getMotionByID(id);
      const response = await getMotionByID(id);
      if (response?.success) {
        navigate("/mms/motion/detail", { state: response?.data });
        //   navigate("/notice/question/detail", {
        //     state: { question: question?.data, history: history?.data },
        //   });
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };
  const hendlePrint = async (id) => {
    const encodedJsonString = encodeURIComponent(id);
    const url = `/mms/motion/preview-pdf?state=${encodedJsonString}`;
    window.open(url, "_blank");
  };

  const handleReviveForm = async () => {
    const data = {
      motionIds: isChecked,
      fkSessionId: formik?.values?.session
    };
    try {
      const response = await createReviveMotion(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  }

  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/motion/search"}
        title1={"Search Motion"}
      />
      <ToastContainer />
      <div>
        <div class="container-fluid dash-detail-container">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Search</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Motion Status</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.motionStatus}
                        value={formik.values.motionStatus}
                        onChange={formik.handleChange}
                        id="motionStatus"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} >
                          Select
                        </option>
                        <option key={2} value={"2"}>Admitted</option>
                        <option key={3} value={"3"}>Admitted but Lapsed</option>
                      </select>
                    </div>
                  </div>
                  
                  {isChecked?.length > 0 && (
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Session</label>
                      <select
                        class="form-select"
                        placeholder={"Session"}
                        value={formik.values.session}
                        onChange={formik.handleChange}
                        id="session"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  )}
                </div>

                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={handleResetForm}
                    >
                      Reset
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={handleReviveForm}
                    >
                      Revive
                    </button>
                  </div>
                </div>
                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    data={motionData}
                    headerShown={true}
                    hideDeleteIcon={true}
                    tableTitle="Revive Motion Detail"
                    handleEdit={(item) => handleEdit(item?.id)}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    showPrint={true}
                    handlePrint={(item) => hendlePrint(item?.id)}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    isCheckbox={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSReviveMotion;
