import React, { useState, useContext, useEffect, useCallback } from "react";
import Select from "react-select";

import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AuthContext } from "../../../../../../api/AuthContext";
import { useFormik } from "formik";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
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

const validationSchema = Yup.object({
  //   fileNumber: Yup.number().required("File Number  is required"),
  keywords: Yup.string().required("KeyWord is required"),
  //   parliamentaryYear: Yup.number().required("Parliamentary Year is required"),
  //   selectedMinistry: Yup.object().required("Ministry is required"),
  //   selectedSenator: Yup.string().required("Member Name is required"),
  //   statusId: Yup.string().required("Status is required"),
  // englishText: Yup.string().required('English Text is required'),
  // urduText: Yup.string().required('Urdu Text is required'),
});

const SearchLegislationBills = () => {
  const { ministryData, members, sessions } = useContext(AuthContext);
  const [concerndCommitte, setConcerndCommitte] = useState(null);
  const [parliamentaryYears, setParliamentaryYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchdata, setSearchData] = useState([]);
  const [billdata, setBilldata] = useState([]);
  const pageSize = 8;
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
      fileNumber: "",
      FromNoticeDate: "",
      ToNoticeDate: "",
      PresetedInHOuseOn: "",
      concerndCommitties: "",
      committeeRecomendation: "",
      keywords: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSearch(values);
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
    console.log("members", members);
  }, []);

  const transFormsearchData = (apiData) => {
    return (
      apiData?.map((item) => ({
        id: item.id,
        billText: item.billText,
        billType: item.billType,
        billCategory: item.billCategory,
        billFrom: item.billFrom,
        billStatus: item.billStatus,
      })) || []
    );
  };
  const handleSearch = useCallback(
    async (values) => {
      const data = {
        fkSenatorId: values.selectedSenator?.value,
        fkParliamentaryYearId: values.parliamentaryYear,
        fkMinistryId: values.selectedMinistry?.value,
        keywords: values?.keywords,
        fkSessionIdFrom: values.fromSession?.value,
        fkSessionIdto: values.toSessionId?.value,
        // billFrom: values.originatedIn,
        // billCategory: values.billCategory,
        // fkBillStatus: values.statusId,
        // billType: values.billType,
        // fkManageCommitteeId: values.concerndCommitties,
        //
        // committeeRecomendation: values.committeeRecomendation,
        // fileNumber: values.fileNumber,
        // noticeDateFrom: values.FromNoticeDate,
        // noticeDateTo: values.ToNoticeDate,
        // introducedInHouseDate: values.PresetedInHOuseOn,
      };
      try {
        const response = await mainSearchApi(
          currentPage,
          pageSize,

          data
        );
        if (response?.success) {
          const transformedData = await transFormsearchData(
            response?.data?.senateBills
          );
          setSearchData(transformedData);
          showSuccessMessage(response?.message);
        }
      } catch (error) {
        showErrorMessage(error?.response?.message);
      }
    },
    [currentPage, pageSize]
  );

  const handleResetForm = () => {
    formik.resetForm();
    setSearchData([]);
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
                    <label htmlFor="fileNumber" className="form-label">
                      File Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="fileNumber"
                      name="fileNumber"
                      onChange={formik.handleChange}
                      value={formik.values.fileNumber}
                    />
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
                  <div className="form-group col-3">
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
                  </div>

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
                    <label htmlFor="concerndCommitties" className="form-label">
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
                      id="concerndCommitties"
                      name="concerndCommitties"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "concerndCommitties",
                          selectedOptions
                        )
                      }
                      value={formik.values.concerndCommitties}
                      isMulti={true}
                    />
                  </div>
                </div>

                <div className="row mt-3">
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
                      isMulti={true}
                    />
                  </div>

                  <div className="form-group col-3">
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
                  </div>

                  <div className="form-group col-3">
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
                  </div>

                  <div className="form-group col-3">
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
                  </div>
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
                    <button type="" className="btn btn-primary me-2">
                      Print
                    </button>
                    <button type="" className="btn btn-primary">
                      Annual Report
                    </button>
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
                // ActionHide={true}
                hideDeleteIcon={true}
                // hideEditIcon={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                //  handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchLegislationBills;
