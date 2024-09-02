import React, { useContext, useEffect, useState } from 'react'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Header from '../../../../../components/Header'
import { Layout } from '../../../../../components/Layout'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from '../../../../../api/AuthContext';
import moment from "moment";
import Select from "react-select";
import { showErrorMessage , showSuccessMessage } from '../../../../../utils/ToastAlert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { MMSSideBarItems } from '../../../../../utils/sideBarItems';
import { getallMotionStatus, searchMiscelleneousList } from '../../../../../api/APIs/Services/Motion.service';
import { getAllPoliticalParties } from '../../../../../api/APIs/Services/ManageQMS.service';


const Miscellaneous = () => {
    const navigate = useNavigate();
    const { members, sessions } = useContext(AuthContext);
    const [data , setData] = useState([])
    const [senatorData , setSenatorData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [motionStatus, setMotionStatus] = useState([]);
    const [count, setCount] = useState(null);
    const [allparties , setAllParties] = useState([])
    const pageSize = 1000;



    const formik = useFormik({
        initialValues: {
          memberName: "",
          fromSession: "",
          toSession: "",
          governmentType: "",
          motionStatus: "",
          motionType:"",
          politicalParty:""
        },
        onSubmit: (values) => {
          // Handle form submission here
          console.log(values)
          searchMiscelleneous(values , currentPage);
        },
      });
    
      const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
        if (
          formik?.values?.memberName ||
          formik?.values?.fromSession ||
          formik?.values?.toSession ||
          formik?.values?.motionType ||
          formik?.values?.governmentType ||
          formik?.values?.motionStatus ||
          formik?.values?.politicalParty
        ) {
            searchMiscelleneous(formik?.values, page);
        }
      };

      const transformMiscelleneousData = (apiData) => {
        console.log("API", apiData)
        return apiData?.rows?.map((item, index) => {
          const English = [item?.englishText].filter(Boolean).join(", ");
          const EnglishText = English.replace(/(<([^>]+)>)/gi, "");
    
          const Urdu = [item?.urduText].filter(Boolean).join(", ");
          const UrduText = Urdu.replace(/(<([^>]+)>)/gi, "");
          return {
            id: item?.id,
            SessionName: item?.sessions?.sessionName
              ? item?.sessions?.sessionName
              : "",
            motionStatus: item?.motionStatuses?.statusName ? item?.motionStatuses?.statusName : "",
            fileNumber: item?.fileNumber
              ? item?.fileNumber
              : "",
    
            // noticeOfficeDiaryDate: item?.noticeOfficeDairies?.noticeOfficeDiaryDate
            //   ? moment(item?.noticeOfficeDairies?.noticeOfficeDiaryDate).format(
            //       "DD-MM-YYYY"
            //     )
            //   : "--",
            // noticeOfficeDiaryTime: moment(
            //   item?.noticeOfficeDairies?.noticeOfficeDiaryTime,
            //   "hh:ss A"
            // ).format("hh:ss A") ? item?.noticeOfficeDairies?.noticeOfficeDiaryTime  :"--",
            englishText: EnglishText ? EnglishText : "",
            urduText: UrduText ? UrduText : "",
            memberPosition:item?.memberPosition,
            createdAt:moment(item?.createdAt).format("DD-MM-YYYY")
          };
        });
      };

      const searchMiscelleneous = async (values) => {
        const data = {
          page : currentPage,
          pageSize : pageSize,
          fkMotionStatus: values?.motionStatus,
          fkMemberId: values?.memberName?.value,
          sessionStartRange: values?.fromSession,
          sessionEndRange: values?.toSession,
          motionType: values?.motionType,
          governmentType:values?.governmentType,
          politicalParty:values.politicalParty
          
        };
        setCount(null);
    
        try {
          const response = await searchMiscelleneousList(data); 
          if (response?.success) {
            setSenatorData(response?.data?.memberCountsByMotionType)
            const transformedData = transformMiscelleneousData(response?.data);
            setData(transformedData);
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

      const AllPoliticalPartiesList = async () => {
        try {
          const response = await getAllPoliticalParties(0, 100);
          if (response?.success) {
            // const transformedData = transformTonerModelsData(
            //   response?.data?.tonerModels
            // );
            setAllParties(response?.data?.politicalParties);
            // setTonerModels(transformedData);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getMotionStatus();
        AllPoliticalPartiesList()
      }, []);

      const handlePDF = async () =>{
        const encodedJsonString = encodeURIComponent(JSON.stringify({data , senatorData}));
        console.log("object", encodedJsonString)
        const url = `/mms/motion-miscelleneuos/pdf-preview?state=${encodedJsonString}`;
        window.open(url, "_blank");
      }
    
  return (
    <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/mms/dashboard"}
        addLink1={"/mms/motion-miscelleneuos"}
        title1={"Search Miscelleneuos"}
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
                <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.fromSession}
                        value={formik.values.fromSession}
                        onChange={formik.handleChange}
                        id="fromSession"
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Session</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.toSession}
                        value={formik.values.toSession}
                        onChange={formik.handleChange}
                        id="toSession"
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Motion Type</label>
                      <select
                        class="form-select"
                        // placeholder={formik.values.motionType}
                        value={formik.values.motionType}
                        onChange={formik.handleChange}
                        id="motionType"
                        onBlur={formik.handleBlur}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>

                        <option value={"Adjournment Motion"}>
                          Adjournment Motion
                        </option>
                        <option value={"Call Attention Notice"}>
                          Call Attention Notice
                        </option>

                        <option value={"Motion Under Rule 218"}>
                          Motion Under Rule 218
                        </option>
                        <option value={"Privilege Motion"}>
                            Privilege Motion
                          </option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      <Select
                        options={members.map((item) => ({
                          value: item.id,
                          label: item.memberName,
                        }))}
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("memberName", selectedOptions)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.memberName}
                        name="memberName"
                      />
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div class="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                 
                </div>

                <div class="row">
                  <div class="col-3">
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
                        {motionStatus &&
                          motionStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.statusName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Member Position</label>
                        <select
                          class={`form-select`}
                          placeholder="Member Position"
                          value={formik.values.governmentType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="governmentType"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value={"Treasury"}>Opposition</option>
                          <option value={"Government"}>Government</option>
                          <option value={"Independent"}>Independent</option>
                          <option value={"Minister"}>Minister</option>
                          <option value={"Treasury"}>Treasury</option>
                          <option value={"Anyside"}>Anyside</option>
                          {/* <option value={"Joint"}>Joint</option> */}
                        </select>
                      </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Political Party</label>
                      <select
                        class="form-select"
                        id="politicalParty"
                        name="politicalParty"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.politicalParty}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {allparties &&
                          allparties.map((item) => (
                            <option value={item.id}>{item.shortName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  
                </div>
                

                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                      className="btn btn-primary col-1"
                      type="button"
                      onClick={handlePDF}
                    >
                      Print PDF
                    </button>
                    <button class="btn btn-primary" type="submit">
                      Search
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                    //   onClick={handleResetForm}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    data={data}
                    headerShown={true}
                    hideDeleteIcon={true}
                    // handleEdit={(item) => handleEdit(item?.id)}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    showPrint={true}
                    hideEditIcon={true}
                    ActionHide={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Miscellaneous
