import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../../components/Header";
import { DeleteResolution, createNewResolutionList, getAllResolutions, getResolutionBYID } from "../../../../../../api/APIs/Services/Resolution.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useFormik } from "formik";

function QMSResolutionList() {
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  // const [count, setCount] = useState(null);
  const [resolutionListData, setResolutionListData] = useState([]);
  const [ministryData, setMinistryData] = useState([]);

  const pageSize = 4; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      sessionNumber: "",
      listName: "",
      listDate: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("Form submitted with values:", values);
      createNewMotionListApi(values);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
 

  const trenformNewResolution = (apiData) => {
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
      NameOfTheMover:item?.memberNames.map(mover => mover.memberName).join(", "),
      ContentsOfTheMotion: item?.englishText.replace(/(<([^>]+)>)/gi, ""),
      Status: item?.resolutionStatus?.resolutionStatus,
      // motionMinistries: item?.motionMinistries.length > 0 ? item?.motionMinistries[0]?.ministries?.ministryName:"----",
    }));
  };


  const createNewMotionListApi = async (values) => {
    const data = {
      fkSessionId: values?.sessionNumber,
      listName:values?.listName,
      listDate:values?.listDate
    };
    
    try {
      const response = await createNewResolutionList(data); // Add await here
      if (response?.success) {
        showSuccessMessage(response?.message);
        console.log("ryyryryrryry",response?.data );

        const transformedData = trenformNewResolution(response?.data);
        console.log("-------------------",transformedData );
        const ministryData = transfrerMinistryData(response?.data[0]?.resolutions);
        setResolutionListData(transformedData);
        setMinistryData(ministryData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/rsolution/list"}
        title1={"Resolution List"}
      />
      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Resolution List</h1>
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
                  data={resolutionListData}
                  tableTitle="Resolution List"
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
                tableTitle="Resolution Detail"
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

export default QMSResolutionList;
