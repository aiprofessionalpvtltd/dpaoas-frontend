import { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { CommitteesSideBarItems } from "../../../../../../utils/sideBarItems";
import {
  SearchedOrdinance,
  getAllBillStatus,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import { AuthContext } from "../../../../../../api/AuthContext";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { useNavigate } from "react-router-dom";

const SearchCommittees = () => {
  const { sessions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [billStatus, setBillStatus] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [searchedCommitteeData, setsearchedCommitteeData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 4;

  console.log("Oriidnance Data", searchedCommitteeData);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (
      formik?.values?.parliamentaryYear ||
      formik?.values?.statusId ||
      formik?.values?.keywords ||
      formik?.values?.fromSession ||
      formik?.values?.toSessionId
    ) {
      SearchOrdinanceApi(formik?.values, page);
    }

    SearchOrdinanceApi(formik?.values, page);
  };

  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeType: "",
      committeeRoom: "",
      chairperson_convener: "",
      committeeSecretery: "",
      members: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      //   if (location?.state?.id) {
      //     //   handleEditBill(values);
      //     console.log(values);
      //   } else {
      //     // CreateOrdinance(values);
      //   }
    },
  });

  const GetBillStatusApi = async () => {
    try {
      const response = await getAllBillStatus(0, 500);
      console.log("bill statuses", response?.data);
      if (response.success) {
        setBillStatus(response?.data?.billStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetParlimentaryYearApi = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 200);
      console.log("bill statuses", response?.data);
      if (response?.success) {
        setParliamentaryYearData(response?.data?.parliamentaryYear);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const trnasformOridinaceData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      ordinanceTitle: item.ordinanceTitle,
      parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
      session: item?.sessions?.sessionName,
      ordinanceStatus: item.ordinanceStatus,
      billStatus: item?.billStatuses?.billStatusName,
    }));
  };

  const SearchOrdinanceApi = useCallback(
    async (values, page) => {
      const searchParams = {
        fkParliamentaryYearId: values?.parliamentaryYear,
        fkOrdinanceStatus: values?.statusId,
        fkSessionIdFrom: values?.fromSession,
        fkSessionIdto: values?.toSessionId,
        keyword: values?.keywords,
      };
      try {
        const response = await SearchedOrdinance(page, pageSize, searchParams);
        console.log(response);
        if (response?.success) {
          showSuccessMessage(response?.message);
          const transformedData = trnasformOridinaceData(
            response.data?.ordinance
          );
          setsearchedCommitteeData(transformedData);
          setCount(response?.data?.count);
        }
        // formik.resetForm();
      } catch (error) {
        // showErrorMessage(error?.response?.data?.message);
      }
    },
    [currentPage, pageSize, setCount, setsearchedCommitteeData]
  );
  useEffect(() => {
    GetBillStatusApi();
    GetParlimentaryYearApi();
  }, []);

  const handleResetForm = () => {
    formik.resetForm();
    setsearchedCommitteeData([]);
  };
  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"Search Committees"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>List of Committees</h1>
          </div>
          <div class="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Committee Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.committeeName &&
                            formik.errors.committeeName
                              ? "is-invalid"
                              : ""
                          }`}
                          id="committeeName"
                          value={formik.values.committeeName}
                          // placeholder={formik.values.committeeName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.committeeName &&
                          formik.errors.committeeName && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeName}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label class="form-label">Committee Type</label>
                        <select
                          // className="form-select"
                          id="committeeType"
                          name="committeeType"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.committeeType}
                          className={`form-select  ${
                            formik.touched.committeeType &&
                            formik.errors.committeeType
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option>Standing Committees</option>
                          <option>Functional Committees</option>
                          <option>Domestics Committees</option>
                          <option>Other Committees</option>
                          <option>Special Committee</option>
                        </select>
                        {formik.touched.committeeType &&
                          formik.errors.committeeType && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeType}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Parliamentary Year</label>
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
                      {parliamentaryYearData &&
                        parliamentaryYearData.map((item) => (
                          <option value={item.id}>
                            {item.parliamentaryTenure}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Session</label>
                    <select
                      id="session"
                      name="session"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.session}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions &&
                        sessions.map((item) => (
                          <option value={item.id}>{item.sessionName}</option>
                        ))}
                    </select>
                  </div>
                </div> */}
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label class="form-label">Committee Room</label>
                        <select
                          // className="form-select"
                          id="committeeRoom"
                          name="committeeRoom"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.committeeRoom}
                          className={`form-select  ${
                            formik.touched.committeeRoom &&
                            formik.errors.committeeRoom
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option>Room 106</option>
                          <option>Room 207</option>
                          <option>Room 322</option>
                        </select>
                        {formik.touched.committeeRoom &&
                          formik.errors.committeeRoom && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeRoom}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Secretary</label>
                        <select
                          id="toSessionId"
                          name="toSessionId"
                          className="form-select"
                          onChange={formik.handleChange}
                          value={formik.values.toSessionId}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          <option>Saqib Ali Khan</option>
                          <option>Mohsin Ali</option>
                          <option>Fayyaz khan</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" type="submit">
                          Search
                        </button>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <CustomTable
                  hidebtn1={true}
                  tableTitle={"Searched Committee "}
                  data={searchedCommitteeData}
                  hideBtn={true}
                  singleDataCard={true}
                  // ActionHide={true}
                  // hideDeleteIcon={true}
                  // hideEditIcon={true}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  handleEdit={(item) =>
                    navigate("/lgms/dashboard/ordinances/edit/ordinance", {
                      state: item,
                    })
                  }
                  //   handleDelete={(item) => handleDeleteOrdinance(item?.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchCommittees;
