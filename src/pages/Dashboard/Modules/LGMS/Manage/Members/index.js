import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import {
  deleteMembers,
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getallMembers } from "../../../../../../api/APIs/Services/Motion.service";
import UpdateMemberParliamentaryYear from "../../../../../../components/MemberUpdateParliamentaryYearModal";
import { useFormik } from "formik";
import Select from "react-select";

function LGMSMembers() {
  const navigate = useNavigate();
  const [tenures, setTenures] = useState([]);
  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [members, setMembers] = useState([]);
  const [oldMembers, setOldMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toUpdateMemberId, setToUpdateMemberId] = useState(null);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );

  console.log("members", members);
  const pageSize = 200; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    console.log("apiData", apiData);
    return apiData.map((item) => ({
      id: item.id,
      memberName: `${item?.memberName}`,
      // politicalParty: `${item?.politicalParties?.partyName}`,
      // electionType: item?.electionType,
      memberTenure: item?.tenures?.tenureName
        ? item?.tenures?.tenureName
        : "---",
      memberTerm: item?.terms?.termName ? item?.terms?.termName : "---",
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure
        ? item?.parliamentaryYears?.parliamentaryTenure
        : "---",
      memberProvince: item?.memberProvince ? item?.memberProvince : "---",
      // phoneNo: item?.phoneNo ? item?.phoneNo : "---",
      // gender: item?.gender,
      // fromDate: moment(item.fromDate).format("YYYY/MM/DD"),
      // toDate: moment(item.toDate).format("YYYY/MM/DD"),
      // memberStatus: item?.memberStatus,
    }));
  };

  const OldMembertransformData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      memberName: `${item?.memberName}`,
      politicalParty: `${item?.politicalParties?.partyName}`,
      electionType: item?.electionType,
      // memberTenure: item?.tenures?.tenureName
      //   ? item?.tenures?.tenureName
      //   : "---",
      // memberTerm: item?.terms?.termName ? item?.terms?.termName : "---",
      // parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure
      //   ? item?.parliamentaryYears?.parliamentaryTenure
      //   : "---",
      // memberProvince: item?.memberProvince ? item?.memberProvince : "---",
      // phoneNo: item?.phoneNo ? item?.phoneNo : "---",
      // gender: item?.gender,
      // fromDate: item.fromDate
      //   ? moment(item.fromDate).format("YYYY/MM/DD")
      //   : "---",
      // toDate: item.toDate ? moment(item.toDate).format("YYYY/MM/DD") : "---",
      // memberStatus: item?.memberStatus,
    }));
  };

  const formik = useFormik({
    initialValues: {
      memberTenure: "",
      memberTerm: "",
      parliamentaryYear: "",
    },
    onSubmit: (values) => {
      const parliamentaryYearId = values?.parliamentaryYear?.value;
      console.log("values", values);
      SearchMemberApi(parliamentaryYearId);
    },
  });

  const SearchMemberApi = async (parliamentaryYearId) => {
    try {
      const response =
        await getMemberByParliamentaryYearID(parliamentaryYearId);
      console.log("response ", response);
      if (response?.success) {
        const transformedData = OldMembertransformData(response?.data);
        console.log("apiData", transformedData);

        setOldMembers(transformedData);
        setCount(response?.data?.length); // Update count for pagination
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      showErrorMessage(
        error?.response?.data?.message || "Error fetching members"
      );
    }
  };

  // Handle Models
  const openModal = (id) => {
    setToUpdateMemberId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMembers = async () => {
    try {
      const response = await getallMembers(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformData(response.data?.members);
        setMembers(transformedData);
        setCount(response?.data?.count);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleMembers();
    fetchTenures();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteMembers(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        handleMembers();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  // Fetch Tenures Based on Condition
  const fetchTenures = async () => {
    try {
      // Call `handleTenures` for Senators
      const response = await getAllTenures(0, 5000, "Senators");
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }

      // Update the state to store combined tenures
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  // Handle Member Tenures Terms
  const handleTenuresTerms = async (id) => {
    try {
      const response = await getTermByTenureID(id);
      if (response?.success) {
        setTenuresTerms(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const fetchParliamentaryYears = async (id) => {
    try {
      // Call API for Senators
      const response = await getParliamentaryYearsByTermID(id);
      if (response?.success) {
        setParliamentaryYearData(response?.data); // Update state for Senators
      }
    } catch (error) {
      console.error(
        "Error fetching parliamentary years:",
        error?.response?.data?.message || error.message
      );
    }
  };

  const handleResetForm = () => {
    formik.resetForm();
    setTenuresTerms([]);
    setParliamentaryYearData([]);
    setOldMembers([]);
    handleMembers();
  };

  console.log("old Mem", oldMembers);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Members"}
      />
      <ToastContainer />

      {showModal && showModal && (
        <UpdateMemberParliamentaryYear
          closeModal={closeModal}
          UpdateMemberId={toUpdateMemberId}
          showModal={showModal}
          handleMembers={handleMembers}
          member="Senators"
          // toUpdateMemberData={toUpdateMemberData}
        />
      )}

      <div className="container-fluid">
        <div className="card mt-4">
          <div
            className="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Search</h1>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label class="form-label">Member Tenure</label>
                      <Select
                        options={
                          Array.isArray(tenures) && tenures?.length > 0
                            ? tenures.map((item) => ({
                                value: item?.id,
                                label: `${item?.tenureName} (${item?.tenureType})`,
                                tenureType: item?.tenureType,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("memberTenure", selectedOption);
                          formik.setFieldValue("memberTerm", "");
                          formik.setFieldValue("parliamentaryYear", "");
                          setTenuresTerms([]);
                          setParliamentaryYearData([]);
                          if (selectedOption?.value) {
                            handleTenuresTerms(selectedOption?.value);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberTenure}
                        id="memberTenure"
                        name="memberTenure"
                        isClearable={true}
                      />
                      {formik.touched.memberTenure &&
                        formik.errors.memberTenure && (
                          <div className="invalid-feedback">
                            {formik.errors.memberTenure}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Member Term</label>
                      <Select
                        options={
                          Array.isArray(tenuresTerms) &&
                          tenuresTerms?.length > 0
                            ? tenuresTerms.map((item) => ({
                                value: item?.id,
                                label: `${item?.termName}`,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("memberTerm", selectedOption);
                          formik.setFieldValue("parliamentaryYear", "");
                          setParliamentaryYearData([]);
                          if (selectedOption?.value) {
                            fetchParliamentaryYears(selectedOption?.value);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberTerm}
                        id="memberTerm"
                        name="memberTerm"
                        isClearable={true}
                      />
                      {formik.touched.memberTerm &&
                        formik.errors.memberTerm && (
                          <div className="invalid-feedback">
                            {formik.errors.memberTerm}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        Member parliamentary Year
                      </label>
                      <Select
                        options={
                          Array.isArray(parliamentaryYearData) &&
                          parliamentaryYearData?.length > 0
                            ? parliamentaryYearData.map((item) => ({
                                value: item?.id,
                                label: `${item?.parliamentaryTenure}`,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue(
                            "parliamentaryYear",
                            selectedOption
                          );
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.parliamentaryYear}
                        id="parliamentaryYear"
                        name="parliamentaryYear"
                        isClearable={true}
                      />

                      {formik.touched.parliamentaryYear &&
                        formik.errors.parliamentaryYear && (
                          <div className="invalid-feedback">
                            {formik.errors.parliamentaryYear}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    {/* <button
                      class="btn btn-primary"
                      type="button"
                      // onClick={() => handlePreviewNotingDoc(searchedData)}
                      // disabled={searchedData?.length > 0 ? false : true}
                    >
                      Preview PDF
                    </button> */}
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
                  </div>
                </div>
              </form>
              <div className="row">
                <div class="col-12">
                  {oldMembers?.length > 0 ? (
                    <CustomTable
                      data={oldMembers?.length > 0 ? oldMembers : members}
                      tableTitle="Old Members List"
                      addBtnText="Add Member"
                      handleAdd={() =>
                        navigate("/lgms/dashboard/manage/members/addedit")
                      }
                      handleEdit={(item) =>
                        navigate("/lgms/dashboard/manage/members/addedit", {
                          state: item,
                        })
                      }
                      handleDelete={(item) => handleDelete(item.id)}
                      headertitlebgColor={"#666"}
                      headertitletextColor={"#FFF"}
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      pageSize={pageSize}
                      totalCount={count}
                      showSent={true}
                      handleSent={(item) => openModal(item?.id)}
                    />
                  ) : (
                    <CustomTable
                      data={members}
                      tableTitle="Current Member List"
                      addBtnText="Add Member"
                      handleAdd={() =>
                        navigate("/lgms/dashboard/manage/members/addedit")
                      }
                      handleEdit={(item) =>
                        navigate("/lgms/dashboard/manage/members/addedit", {
                          state: item,
                        })
                      }
                      handleDelete={(item) => handleDelete(item.id)}
                      headertitlebgColor={"#666"}
                      headertitletextColor={"#FFF"}
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      pageSize={pageSize}
                      totalCount={count}
                      showSent={true}
                      handleSent={(item) => openModal(item?.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSMembers;
