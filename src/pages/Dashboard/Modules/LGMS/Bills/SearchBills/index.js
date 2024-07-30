import React, { useState, useContext, useEffect, useCallback } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { useFormik } from "formik";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  DeleteLegislationBill,
  getAllBillStatus,
  getAllCommitties,
  mainSearchApi,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// const validationSchema = Yup.object({
//   //   fileNumber: Yup.number().required("File Number  is required"),
//   keywords: Yup.string().required("KeyWord is required"),
//   //   parliamentaryYear: Yup.number().required("Parliamentary Year is required"),
//   //   selectedMinistry: Yup.object().required("Ministry is required"),
//   //   selectedSenator: Yup.string().required("Member Name is required"),
//   //   statusId: Yup.string().required("Status is required"),
//   // englishText: Yup.string().required('English Text is required'),
//   // urduText: Yup.string().required('Urdu Text is required'),
// });



 
const SearchLegislationBills = () => {
  const navigate = useNavigate();
  const { ministryData, members, sessions } = useContext(AuthContext);
  const [concerndCommitte, setConcerndCommitte] = useState(null);
  const [parliamentaryYears, setParliamentaryYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchdata, setSearchData] = useState([]);
  const [billdata, setBilldata] = useState([]);
  const [count, setCount] = useState(null);
  const [pageValue, setPageValue] = useState(null)
  const [isFromNoticeDateCalenderOpen, setIsFromNoticeDateCalenderOpen] =
    useState(false);
  const [isToNoticeDateCalenderOpen, setIsToNoticeDateCalenderOpen] =
    useState(false);
  const [isPresentedCalenderOpen, setIsPresentedCalenderOpen] = useState(false);
  const pageSize = 10;

  const handleFromNoticeCalendarToggle = () => {
    setIsFromNoticeDateCalenderOpen(!isFromNoticeDateCalenderOpen);
  };
  // Handale DateCHange
  const handleFromNoticeDateSelect = (date) => {
    formik.setFieldValue("FromNoticeDate", date);
    setIsFromNoticeDateCalenderOpen(false);
  };
  const handleToNoticeCalendarToggle = () => {
    setIsToNoticeDateCalenderOpen(!isToNoticeDateCalenderOpen);
  };
  // Handale DateCHange
  const handleToNoticeDateSelect = (date) => {
    formik.setFieldValue("ToNoticeDate", date);
    setIsToNoticeDateCalenderOpen(false);
  };
  const handlePresentedHouseCalendarToggle = () => {
    setIsPresentedCalenderOpen(!isPresentedCalenderOpen);
  };
  // Handale DateCHange
  const handlePresentedHouseDateSelect = (date) => {
    formik.setFieldValue("PresetedInHOuseOn", date);
    setIsPresentedCalenderOpen(false);
  };

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
    if (
      formik?.values?.selectedMinistry ||
      formik?.values?.selectedSenator ||
      formik?.values?.parliamentaryYear ||
      formik?.values?.fromSession ||
      formik?.values?.toSessionId ||
      formik?.values?.billCategory ||
      formik?.values?.billType ||
      formik?.values?.FromNoticeDate ||
      formik?.values?.ToNoticeDate ||
      formik?.values?.keywords ||
      formik?.values?.concerndCommitties ||
      formik?.values?.committeeRecomendation ||
      formik?.values?.remarks ||
      formik?.values?.billFrom ||
      formik?.values?.billStatus
    ) {
      handleSearch(formik?.values, page);
    }

    handleSearch(formik?.values, page);
  };

  const formik = useFormik({
    initialValues: {
      selectedMinistry: "",
      selectedSenator: "",
      parliamentaryYear: "",
      fromSession: "",
      toSessionId: "",
      originatedIn: "",
      billCategory: "",
      statusId: "",
      billType: "",
      billFrom: "",
      FromNoticeDate: "",
      ToNoticeDate: "",
      PresetedInHOuseOn: "",
      concerndCommitties: "",
      committeeRecomendation: "",
      keywords: "",
    },
    onSubmit: (values) => {
      handleSearch(values, currentPage);
    },
  });


  const handleParliamentaryYears = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 200);
      if (response?.success) {
        setParliamentaryYears(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getBillstatus = async () => {
    try {
      const response = await getAllBillStatus(0, 200);
      if (response?.success) {
        setBilldata(response?.data?.billStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformCommittiesData = async (apiData) => {
    return (
      apiData?.map((item) => ({
        id: item.id,
        committeeName: item.committeeName,
      })) || []
    );
  };
  const getCommitties = async () => {
    const response = await getAllCommitties(currentPage, pageSize);
    if (response?.success) {
      // console.log(response?.data)
      const transformedData = await transformCommittiesData(
        response?.data?.manageCommittees
      );
      setConcerndCommitte(transformedData);
    }
    // console.log("errroorro")
  };

  useEffect(() => {
    handleParliamentaryYears();
    getBillstatus();
    getCommitties();
  }, []);

  // const transFormsearchData = (apiData) => {
  //   return (
  //     apiData?.map((item) => ({
  //       id: item.id,
  //       parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
  //       session: item?.sessions?.sessionName,
  //       billType: item.billType,
  //       billCategory: item.billCategory,
  //       billFrom: item.billFrom,
  //       concerndCommittes:
  //         item?.introducedInHouses?.manageCommittees?.committeeName,
  //       billStatus: item?.billStatuses?.billStatusName,
  //       Status: item.billStatus,
  //     })) || []
  //   );
  // };

  const transFormsearchData = (apiData) => {
   
    return apiData?.map((item) => ({
      id: item.id,
      billTitle: item?.billTitle,
      // dateOfIntroductionInSenate: item?.introducedInHouses?.introducedInHouseDate
      //   ? moment(item?.introducedInHouses?.introducedInHouseDate).format("DD-MM-YYYY")
      //   : "---",
      dateOfPresentationReport: item?.introducedInHouses?.reportPresentationDate
        ? moment(item?.introducedInHouses?.reportPresentationDate,"YYYY-MM-DD" ).format("DD-MM-YYYY")
        : "---",
      dateOfTransmission: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA,"YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      remarks: item?.billRemarks,
      movers: item?.senateBillMnaMovers
        ? item?.senateBillMnaMovers.map((mover) => mover?.mna?.mnaName).join(", ")
        : "---",
      billCategory: item?.billCategory,
      fileNumber: item?.fileNumber,
      billFrom: item?.billFrom,
      
    }))|| [];
  };
 
  const handleSearch = useCallback(
    async (values, page) => {
      const data = {
        fkSenatorId: values?.selectedSenator?.value,
        fkParliamentaryYearId: values?.parliamentaryYear,
        fkMinistryId: values?.selectedMinistry?.value,
        keyword: values?.keywords,
        fkSessionIdFrom: values?.fromSession,
        fkSessionIdto: values?.toSessionId,
        billFrom: values?.billFrom,
        billCategory: values?.billCategory,
        fkBillStatus: values?.statusId,
        billType: values?.billType,
        fkManageCommitteeId: values?.concerndCommitties?.value,
        committeeRecomendation: values?.committeeRecomendation?.value,
        // fileNumber: values.fileNumber,
        noticeDateFrom: values?.FromNoticeDate && moment(values?.FromNoticeDate).format("YYYY-MM-DD"),
        noticeDateTo: values?.ToNoticeDate && moment(values?.ToNoticeDate).format("YYYY-MM-DD"),
        introducedInHouseDate: values?.PresetedInHOuseOn && moment(values?.PresetedInHOuseOn).format("YYYY-MM-DD"),
      };
      setPageValue(page)
      try {
        const response = await mainSearchApi(page, pageSize, data);
        if (response?.success) {
          const transformedData = await transFormsearchData(
            response?.data?.senateBills
          );
          setCount(response?.data?.count);
          setSearchData(transformedData);
          showSuccessMessage(response?.message);
        }
      } catch (error) {
        showErrorMessage(error?.response?.message);
      }
    },
    [currentPage, pageSize, setCount, setSearchData]
  );

  const handleResetForm = () => {
    formik.resetForm();
    setSearchData([]);
  };

  // const handleEditSenateBill = (id) => {
  //   navigate("/lgms/dashboard/bills/edit/senate-bills", { state: id });
  // };
  // const handleEditNABill = (id) => {
  //   navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: id });
  // };
  
  const handleEditSenateBill = (id, item) => {
    navigate("/lgms/dashboard/bills/edit/senate-bills",  { state: {id, item} });
  };
  //Handle Edit NA Bills
  const handleEditNABill = (id,item) => {
    navigate("/lgms/dashboard/bills/edit/NA-bills/", { state: {id,item}});
  };
  // Handle Delete Bills
  const handleDeleteLegislationBill = async (id) => {
    try {
      const resposne = await DeleteLegislationBill(id);
      if (resposne?.success) {
        showSuccessMessage(resposne?.message);
        handleSearch(formik?.values, pageValue);
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"Search Legislation"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>Search Bill</h1>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="keywords" className="form-label">
                      Keywords
                    </label>
                    <input
                      id="keywords"
                      name="keywords"
                      type="text"
                      value={formik.values.keywords}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.keywords && formik.errors.keywords
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.keywords && formik.errors.keywords && (
                      <div className="invalid-feedback">
                        {formik.errors.keywords}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="" className="form-label">
                      Bill Type
                    </label>
                    <select
                      id="billFrom"
                      name="billFrom"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.billFrom}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="From Senate">Introdced In Senate</option>
                      <option value="From NA">Received From NA</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="ministry" className="form-label">
                      Search Ministry
                    </label>
                    <Select
                      options={
                        ministryData &&
                        ministryData?.map((item) => ({
                          value: item.id,
                          label: item?.ministryName,
                        }))
                      }
                      name="selectedMinistry"
                      id="selectedMinistry"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "selectedMinistry",
                          selectedOptions
                        )
                      }
                      value={formik.values.selectedMinistry}
                    />
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="senator" className="form-label">
                      Member Name
                    </label>
                    <Select
                      options={
                        members &&
                        members?.map((item) => ({
                          value: item.id,
                          label: item?.memberName,
                        }))
                      }
                      id="selectedSenator"
                      name="selectedSenator"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("selectedSenator", selectedOptions)
                      }
                      value={formik.values.selectedSenator}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="form-group col-3">
                    <label htmlFor="parliamentaryYear" className="form-label">
                      Parliamentary Year
                    </label>
                    <select
                      id="parliamentaryYear"
                      name="parliamentaryYear"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.parliamentaryYear}
                    >
                      <option value="" disabled hidden>
                        Select Parliamentary Year
                      </option>
                      {parliamentaryYears.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.parliamentaryTenure}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="fromSession" className="form-label">
                      From Session
                    </label>
                    <select
                      id="fromSession"
                      name="fromSession"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.fromSession}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.sessionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="toSessionId" className="form-label">
                      To Session
                    </label>
                    <select
                      id="toSessionId"
                      name="toSessionId"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.toSessionId}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.sessionName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="billCategory" className="form-label">
                      Bill Category
                    </label>
                    <select
                      className="form-select"
                      id="billCategory"
                      name="billCategory"
                      onChange={formik.handleChange}
                      value={formik.values.billCategory}
                    >
                      <option value="" disabled hidden>
                        Select Bill Category
                      </option>
                      <option value="Government Bill">Government Bill</option>
                      <option value="Private Member Bill">
                        Private Member Bill
                      </option>
                    </select>
                  </div>
                </div>

                <div className="row mt-3">
                  {/* <div className="form-group col-3">
                    <label htmlFor="originatedIn" className="form-label">
                      Origniated In
                    </label>
                    <select
                      id="originatedIn"
                      name="originatedIn"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.originatedIn}
                    >
                      <option value="" disabled hidden>
                        Select Origination
                      </option>
                      <option value="InSenate">In Senate</option>
                      <option value="InAssembly">In Assembly</option>
                    </select>
                  </div> */}

                  <div className="form-group col-3">
                    <label htmlFor="statusId" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="statusId"
                      name="statusId"
                      onChange={formik.handleChange}
                      value={formik.values.statusId}
                    >
                      <option value="" disabled>
                        Select Option
                      </option>
                      {billdata.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.billStatusName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="billType" className="form-label">
                      Bill Type
                    </label>
                    <select
                      id="billType"
                      name="billType"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.billType}
                    >
                      <option value="" disabled hidden>
                        Select Bill Type
                      </option>
                      <option value="Amendment Bill">Amendment Bill</option>
                      <option value="Constitutional Amendment Bill">
                        Constitutional Amendment Bill
                      </option>
                      <option value="Finance Bill">Finance Bill</option>
                      <option value="Money Bill">Money Bill</option>
                      <option value="New Bill">New Bill</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="?.value" className="form-label">
                      Concernd Committes
                    </label>
                    <Select
                      options={
                        concerndCommitte &&
                        concerndCommitte?.map((item) => ({
                          value: item.id,
                          label: item?.committeeName,
                        }))
                      }
                      id="?.value"
                      name="?.value"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "concerndCommitties",
                          selectedOptions
                        )
                      }
                      value={formik.values.concerndCommitties}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label
                      htmlFor="committeeRecomendation"
                      className="form-label"
                    >
                      Committee Recommendation
                    </label>
                    <Select
                      options={[
                        {
                          value: "Ammended By Standing Committee",
                          label: "Ammended By Standing Committee",
                        },
                        {
                          value: "May be Passed as Introduced in the House",
                          label: "May be Passed as Introduced in the House",
                        },
                        {
                          value: "Passed without sending to Committee",
                          label: "Passed without sending to Committee",
                        },
                      ]}
                      id="committeeRecomendation"
                      name="committeeRecomendation"
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "committeeRecomendation",
                          selectedOption
                        )
                      }
                      value={formik.values.committeeRecomendation}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                 

                  {/* <div className="form-group col-3">
                    <label htmlFor="FromNoticeDate" className="form-label">
                      From Notice Date
                    </label>
                    <input
                      type="date"
                      id="FromNoticeDate"
                      name="FromNoticeDate"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.FromNoticeDate}
                    />
                  </div> */}

                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">From Notice Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleFromNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.FromNoticeDate}
                        onChange={handleFromNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isFromNoticeDateCalenderOpen}
                        onClickOutside={() =>
                          setIsFromNoticeDateCalenderOpen(false)
                        }
                        onInputClick={handleFromNoticeCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">To Notice Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleToNoticeCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.ToNoticeDate}
                        onChange={handleToNoticeDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isToNoticeDateCalenderOpen}
                        onClickOutside={() =>
                          setIsToNoticeDateCalenderOpen(false)
                        }
                        onInputClick={handleToNoticeCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3" style={{ position: "relative" }}>
                      <label class="form-label">Presented In House On</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handlePresentedHouseCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.PresetedInHOuseOn}
                        onChange={handlePresentedHouseDateSelect}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        open={isPresentedCalenderOpen}
                        onClickOutside={() => setIsPresentedCalenderOpen(false)}
                        onInputClick={handlePresentedHouseCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  {/* <div className="form-group col-3">
                    <label htmlFor="ToNoticeDate" className="form-label">
                      To Notice Date
                    </label>
                    <input
                      type="date"
                      id="ToNoticeDate"
                      name="ToNoticeDate"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.ToNoticeDate}
                    />
                  </div> */}

                  {/* <div className="form-group col-3">
                    <label htmlFor="PresetedInHOuseOn" className="form-label">
                      Preseted In House On
                    </label>
                    <input
                      type="date"
                      id="PresetedInHOuseOn"
                      name="PresetedInHOuseOn"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.PresetedInHOuseOn}
                    />
                  </div> */}
                </div>

                <div className="row col mt-3">
                  <div className="col d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={handleResetForm}
                    >
                      Reset
                    </button>
                    {/* <button type="" className="btn btn-primary me-2">
                      Print
                    </button>
                    <button type="" className="btn btn-primary">
                      Annual Report
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-3">
              <CustomTable
                data={searchdata}
                tableTitle={"Bills Data"}
                hidebtn1={true}
                hideBtn={true}
                singleDataCard={true}
                ActionHide={false}
                hideDeleteIcon={false}
                hideEditIcon={false}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={count}

                handleEdit={(item) => {
                  item?.billFrom === "From Senate"
                    ? handleEditSenateBill(item?.id)
                    : handleEditNABill(item?.id);
                }}
                handleDelete={(item) => handleDeleteLegislationBill(item?.id)}
                
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchLegislationBills;
