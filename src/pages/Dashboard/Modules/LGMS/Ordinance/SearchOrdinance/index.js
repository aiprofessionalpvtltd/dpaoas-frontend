import { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
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

const SearchOrdinance = () => {
  const { sessions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [billStatus, setBillStatus] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [searchedOrdinanceData, setSearchedOrdinanceData] = useState([]);
  const [count, setCount] = useState(null);
  const pageSize = 10;

 
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
      parliamentaryYear: "",
      statusId: "",
      fromSession: "",
      toSessionId: "",
      keywords: "",
    },
    onSubmit: (values) => {
      //   console.log(values);
      SearchOrdinanceApi(values, currentPage);
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
          setSearchedOrdinanceData(transformedData);
          setCount(response?.data?.count);
          
        }
        // formik.resetForm();
      } catch (error) {
        // showErrorMessage(error?.response?.data?.message);
      }
    },
    [currentPage, pageSize, setCount, setSearchedOrdinanceData]
  );
  useEffect(() => {
    GetBillStatusApi();
    GetParlimentaryYearApi();
  }, []);

  const handleResetForm = () => {
    formik.resetForm();
    setSearchedOrdinanceData([]);
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"Search Ordinances"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>List Of Ordinances</h1>
          </div>
          <div class="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Keywords</label>
                        <input
                          id="keywords"
                          name="keywords"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.keywords}
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Bill Status</label>
                        <select
                          id="statusId"
                          name="statusId"
                          className="form-select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.statusId}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {billStatus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.billStatusName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
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
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">To Session</label>
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
                  tableTitle={"Searched Ordinances "}
                  data={searchedOrdinanceData}
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

export default SearchOrdinance;
