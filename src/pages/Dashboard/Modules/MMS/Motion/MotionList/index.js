import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { showErrorMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  getAllMotion,
  getMotionByID,
  searchMotion,
} from "../../../../../../api/APIs";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const validationSchema = Yup.object({
  sessionNumber: Yup.string(),
  motionType: Yup.string(),
  motionWeek: Yup.string(),
  listName: Yup.string(),
  listDate: Yup.date(),
  // Add more fields and validations as needed
});
function MMSMotionList() {
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  // const [count, setCount] = useState(null);
  const [motionData, setMotionData] = useState([]);
  const [ministryData, setMinistryData] = useState([]);

  const pageSize = 4; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      sessionNumber: "",
      motionType: "",
      motionWeek: "",
      listName: "",
      listDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      searchMotionList(values);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const handleAdd = () => {
    navigate("/mms/motion/new");
  };

  const transformMotionData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave?.id,
      fkSessionId: leave?.sessions.id,
      fileNumber: leave?.fileNumber,
      motionType: leave?.motionType,
      motionWeek: leave?.motionWeek,
      noticeOfficeDiaryNo: leave?.noticeOfficeDairies?.noticeOfficeDiaryNo,
      // ministryName: leave?.motionMinistries?.ministries,
      // ministryIds: leave?.motionMinistries?.fkMinistryId,
      noticeOfficeDiaryDate: moment(leave?.noticeOfficeDairies?.noticeOfficeDiaryDate).format("YYYY/MM/DD"),
      noticeOfficeDiaryTime: leave?.noticeOfficeDairies?.noticeOfficeDiaryTime,
      // memberName:leave?.motionMovers?.members,
      englishText: leave?.englishText,
      urduText: leave?.urduText,
      fkMotionStatus: leave?.fkMotionStatus,
    }));
  };

  const transfrerMinistryData = (apiData) => {
    return apiData.map((leave, index) => ({
      SR: `${index + 1}`,
      MID: `${leave?.id}`,
      NameOfTheMovers: leave?.motionMovers[0]?.members?.memberName,
      ContentsOfTheMotion: leave?.englishText,
      Status: leave?.motionStatuses?.statusName,
      motionMinistries: leave?.motionMinistries[0]?.ministries?.ministryName,
    }));
  };

  // const getMotionListData = async () => {
  //     try {
  //         const response = await getAllMotion(currentPage, pageSize);
  //         if (response?.success) {
  //             // showSuccessMessage(response?.message);
  //             const transformedData = transformMotionData(response?.data?.rows);
  //             const ministryData = transfrerMinistryData(response?.data?.rows)
  //             setMotionData(transformedData);
  //             setMinistryData(ministryData)
  //         }
  //     } catch (error) {
  //         console.log(error);
  //         showErrorMessage(error?.response?.data?.error);
  //     }
  // };

  const searchMotionList = async (values) => {
    const data = {
      fkSessionId: values?.sessionNumber,
      motionWeek: values?.motionWeek,
      motionType: values?.motionType,
    };
    try {
      const response = await searchMotion(currentPage, pageSize, data); // Add await here
      if (response?.success) {
        const transformedData = transformMotionData(response?.data?.rows);
        const ministryData = transfrerMinistryData(response?.data?.rows);
        setMotionData(transformedData);
        setMinistryData(ministryData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  // useEffect(() => {
  //     // getMotionListData()
  // }, [])
  const handleEdit = async (id) => {
    try {
      const response = await getMotionByID(id);
      if (response?.success) {
        navigate("/mms/motion/detail", { state: response?.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/dashboard"}
        title1={"Motion"}
        addLink2={"/mms/motion/list"}
        title2={"Motion List"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1 className="float-start mt-2">MOTION LIST</h1>
            <button
              className="btn btn-primary float-end"
              type="button"
              onClick={handleAdd}
            >
              {"Add Motion"}
            </button>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        name="sessionNumber"
                        id="sessionNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNumber}
                        className={
                          formik.errors.sessionNumber &&
                          formik.touched.sessionNumber
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                      >
                        <option value="" selected disabled hidden>
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Type</label>
                      <select
                        class="form-select"
                        id="motionType"
                        onChange={formik.handleChange}
                        value={formik.values.motionType}
                        onBlur={formik.handleBlur}
                      >
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
                      <select
                        class="form-select"
                        id="motionWeek"
                        onChange={formik.handleChange}
                        value={formik.values.motionWeek}
                        onBlur={formik.handleBlur}
                      >
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
                      <label class="form-label">List Name</label>
                      <input
                        class="form-control"
                        type="text"
                        id="listName"
                        onChange={formik.handleChange}
                        value={formik.values.listName}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">List Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.listDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("listDate", date)
                        }
                        className={"form-control"}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Generate
                    </button>
                    <button class="btn btn-primary" type="">
                      Save
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 mb-3">
                <CustomTable
                  block={true}
                  data={motionData}
                  tableTitle="Motion Data"
                  headerShown={true}
                  handleDelete={(item) => alert(item.id)}
                  handleEdit={(item) => handleEdit(item.id)}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              </div>
              <CustomTable
                data={ministryData}
                tableTitle="Ministry Data"
                headerShown={true}
                handleDelete={(item) => alert(item.id)}
                handleEdit={(item) =>
                  navigate("/mms/motion/detail", { state: item })
                }
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSMotionList;
