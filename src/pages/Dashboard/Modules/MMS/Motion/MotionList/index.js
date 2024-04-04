import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { MMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  createNewMotionList,
  getAllMotion,
  getMotionByID,
  searchMotion,
} from "../../../../../../api/APIs/Services/Motion.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const validationSchema = Yup.object({
  sessionNumber: Yup.string().required("Session is Required"),
  motionType: Yup.string().required("Motion Type is Required"),
  motionWeek: Yup.string().required("Motion Week is Required"),
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
      // console.log("Form submitted with values:", values);
      createNewMotionListApi(values);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
 

  const transformMotionData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: `${index + 1}`,
      SessionName: item?.sessionName,
      listName: item?.listName,
      listDate: moment(item?.listDate).format("YYYY/MM/DD"),
    }));
  };

  const transfrerMinistryData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: `${index + 1}`,
      Date: moment(item?.createdAt).format("YYYY/MM/DD"),
      NameOfTheMover:item?.motionMovers.map(mover => mover.members.memberName).join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.motionStatuses?.statusName,
      motionMinistries: item?.motionMinistries.length > 0 ? item?.motionMinistries[0]?.ministries?.ministryName:"----",
    }));
  };


  const createNewMotionListApi = async (values) => {
    const data = {
      fkSessionId: values?.sessionNumber,
      motionWeek: values?.motionWeek,
      motionType: values?.motionType,
      listName:values?.listName,
      listDate:values?.listDate
    };
    
    try {
      const response = await createNewMotionList(data); // Add await here
      if (response?.success) {
        showSuccessMessage(response?.message);
        console.log("ryyryryrryry",response?.data );

        const transformedData = transformMotionData(response?.data);
        console.log("-------------------",transformedData );
        const ministryData = transfrerMinistryData(response?.data[0]?.motions);
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
  // const handleEdit = async (id) => {
  //   try {
  //     const response = await getMotionByID(id);
  //     if (response?.success) {
  //       navigate("/mms/motion/detail", { state: response?.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/mms/motion/list"}
        title1={"Motion List"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1 className="float-start mt-2">MOTION LIST</h1>
            
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
                            <option value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.sessionNumber && formik.errors.sessionNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Type</label>
                      <select
                        className={
                          formik.errors.motionType &&
                          formik.touched.motionType
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        id="motionType"
                        onChange={formik.handleChange}
                        value={formik.values.motionType}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""}>Select</option>
                        <option value={"Adjournment Motion"}>Adjournment Motion</option>
                        <option value={"Call Attention Notice"}>Call Attention Notice</option>
                        <option value={"Privilege Motion"}>Privilege Motion</option>
                        <option value={"Motion Under Rule 218"}>Motion Under Rule 218</option>
                        <option value={"Motion Under Rule 60"}>Motion Under Rule 60</option>
                      </select>
                      {formik.touched.motionType && formik.errors.motionType && (
                        <div className="invalid-feedback">
                          {formik.errors.motionType}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Week</label>
                      <select
                        className={
                          formik.errors.motionWeek &&
                          formik.touched.motionWeek
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        id="motionWeek"
                        onChange={formik.handleChange}
                        value={formik.values.motionWeek}
                        onBlur={formik.handleBlur}
                      >
                        <option value={""}>Select</option>
                        <option value={"Not Applicable"}>Not Applicable</option>
                        <option value={"1st Week"}>1st Week</option>
                        <option value={"2nd Week"}>2nd Week</option>
                        <option value={"3rd Week"}>3rd Week</option>
                        <option value={"4th Week"}>4th Week</option>
                        <option value={"5th Week"}>5th Week</option>
                      </select>
                      {formik.touched.motionWeek && formik.errors.motionWeek && (
                        <div className="invalid-feedback">
                          {formik.errors.motionWeek}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
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
                  <div class="col-4">
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
                    <button class="btn btn-primary" type="button" onClick={() => formik.resetForm()}>
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 mb-3">
                <CustomTable
                  block={false}
                  hideBtn={true}
                  hidebtn1={true}
                  data={motionData}
                  tableTitle="Motion List"
                  // headerShown={true}
                  // handleDelete={(item) => alert(item.id)}
                  // handleEdit={(item) => handleEdit(item.id)}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  ActionHide={true}
                />
              </div>
              <CustomTable
               hidebtn1={true}
                data={ministryData}
                tableTitle="Motion Detail"
                // headerShown={true}
                hideBtn={true}
                // handleDelete={(item) => alert(item.id)}
                // handleEdit={(item) =>
                //   navigate("/mms/motion/detail", { state: item })
                // }
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideEditIcon={true}
                ActionHide={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MMSMotionList;
