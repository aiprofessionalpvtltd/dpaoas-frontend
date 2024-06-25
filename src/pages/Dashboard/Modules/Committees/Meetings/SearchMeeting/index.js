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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

const committeesData = [
    {
      id: 1,
      committeeName:
        "Committee to consider and make recommendations on the Money Bill 2024",
      committeeType: "Domestic Committees",
      chairPerson: "Syed Yousaf Raza Gilani",
      committeeSecretary: "Syed Hasnain Haider",
      members: "View Members",
      status: "active",
    },
    {
      id: 2,
      committeeName: "Senate House Committee",
      committeeType: "House Committee",
      chairPerson: "Syedaal Khan",
      committeeSecretary: "Muhammad Zubair Thaheem",
      members: "View Members",
      status: "inactive",
    },
    {
      id: 3,
      committeeName: "Senate Finance Committee",
      committeeType: "Domestic Committee",
      chairPerson: "Syed Yousaf Raza Gilani",
      committeeSecretary: "Syed Hasnain Haider",
      members: "View Members",
      status: "active",
    },
    {
      id: 4,
      committeeName: "Business Advisory Committee",
      committeeType: "Domestic Committee",
      chairPerson: "Syed Yousaf Raza Gilani",
      committeeSecretary: "Syed Hasnain Haider",
      members: "View Members",
      status: "active",
    },
  ];
const SearchMeetings = () => {
  const { sessions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [billStatus, setBillStatus] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [searchedCommitteeData, setsearchedCommitteeData] = useState([]);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [count, setCount] = useState(null);
  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // if (
    //   formik?.values?.parliamentaryYear ||
    //   formik?.values?.statusId ||
    //   formik?.values?.keywords ||
    //   formik?.values?.fromSession ||
    //   formik?.values?.toSessionId
    // ) {
    //   SearchOrdinanceApi(formik?.values, page);
    // }

    // SearchOrdinanceApi(formik?.values, page);
  };

  const formik = useFormik({
    initialValues: {
      committeeName: "",
      fromDate: "",
      toDate: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

 
  
  //   const GetBillStatusApi = async () => {
  //     try {
  //       const response = await getAllBillStatus(0, 500);
  //       console.log("bill statuses", response?.data);
  //       if (response.success) {
  //         setBillStatus(response?.data?.billStatus);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const GetParlimentaryYearApi = async () => {
  //     try {
  //       const response = await getAllParliamentaryYears(0, 200);
  //       console.log("bill statuses", response?.data);
  //       if (response?.success) {
  //         setParliamentaryYearData(response?.data?.parliamentaryYear);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const trnasformOridinaceData = (apiData) => {
  //     return apiData.map((item) => ({
  //       id: item.id,
  //       ordinanceTitle: item.ordinanceTitle,
  //       parliamentaryYear: item?.parliamentaryYears?.parliamentaryTenure,
  //       session: item?.sessions?.sessionName,
  //       ordinanceStatus: item.ordinanceStatus,
  //       billStatus: item?.billStatuses?.billStatusName,
  //     }));
  //   };

  //   const SearchOrdinanceApi = useCallback(
  //     async (values, page) => {
  //       const searchParams = {
  //         fkParliamentaryYearId: values?.parliamentaryYear,
  //         fkOrdinanceStatus: values?.statusId,
  //         fkSessionIdFrom: values?.fromSession,
  //         fkSessionIdto: values?.toSessionId,
  //         keyword: values?.keywords,
  //       };
  //       try {
  //         const response = await SearchedOrdinance(page, pageSize, searchParams);
  //         console.log(response);
  //         if (response?.success) {
  //           showSuccessMessage(response?.message);
  //           const transformedData = trnasformOridinaceData(
  //             response.data?.ordinance
  //           );
  //           setsearchedCommitteeData(transformedData);
  //           setCount(response?.data?.count);
  //         }
  //         // formik.resetForm();
  //       } catch (error) {
  //         // showErrorMessage(error?.response?.data?.message);
  //       }
  //     },
  //     [currentPage, pageSize, setCount, setsearchedCommitteeData]
  //   );
  //   useEffect(() => {
  //     GetBillStatusApi();
  //     GetParlimentaryYearApi();
  //   }, []);

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
        title1={"Search Meeting"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Searching</h1>
          </div>
          <div class="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                      <label className="form-label">Committee Name</label>
                      <select
                          class="form-select"
                          id="committeeName"
                          name="committeeName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.committeeName}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {committeesData &&
                            committeesData?.map((item) => (
                              <option
                                value={item.id}
                              >{`${item?.committeeName}`}</option>
                            ))}
                        </select>
                        {formik.touched.committeeName &&
                          formik.errors.committeeName && (
                            <div className="invalid-feedback">
                              {formik.errors.committeeName}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">From Date</label>
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
                        selected={formik.values.fromDate}
                        onChange={(date) =>
                          formik.setFieldValue("fromDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.fromDate && formik.errors.fromDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.fromDate && formik.errors.fromDate && (
                        <div className="invalid-feedback">
                          {formik.errors.fromDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">To Date</label>
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
                        selected={formik.values.toDate}
                        onChange={(date) =>
                          formik.setFieldValue("toDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.toDate && formik.errors.toDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.toDate && formik.errors.toDate && (
                        <div className="invalid-feedback">
                          {formik.errors.toDate}
                        </div>
                      )}
                    </div>
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

export default SearchMeetings;
