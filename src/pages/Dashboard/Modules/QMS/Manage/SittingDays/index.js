import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllManageSessions } from "../../../../../../api/APIs/Services/SeatingPlan.service";
import moment from "moment";
import { AuthContext } from "../../../../../../api/AuthContext";
import { useFormik } from "formik";
import {
  deleteSessionsSitting,
  getSessionSitting,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function QMSSittingsDays() {
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const location = useLocation();
  const [sittingDays, setSittingDays] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const pageSize = 5; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  console.log("sessting", sittingDays);
  // formik
  const formik = useFormik({
    initialValues: {
      sessionId: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      SearchSessionSittingApi(values);
    },
  });
  const transformData = (apiData) => {
    return apiData?.map((item, index) => ({
      id: item?.id,
      session: `${item.session?.sessionName}`,
      sittingDate: moment(item?.sittingDate).format("YYYY/MM/DD"),
      sittingStartTime: moment(item?.sittingStartTime, "hh:mm:ss a").format(
        "hh:mm:ss a"
      ),
      sittingEndTime: moment(item?.sittingEndTime, "hh:mm:ss a").format(
        "hh:mm:ss a"
      ),
      breakStartTime: item?.breakStartTime,
      breakEndTime: item?.breakEndTime,
      AsWholeCommittee: String(item?.committeeWhole),
      committeeStartTime: item?.committeeStartTime,
      committeeEndTime: item?.committeeEndTime,
      sessionAdjourned: String(item?.sessionAdjourned),
      status: item?.status,
    }));
  };
  // Searching Data on Session
  // const SearchSessionSittingApi = async (values) => {
  //   const fksessionId = values.sessionId;

  //   try {
  //     const response = await getSessionSitting(
  //       fksessionId,
  //       currentPage,
  //       pageSize
  //     );
  //     console.log("response", response);
  //     if (response?.success) {
  //       const transformedData = transformData(response?.data?.sessionSittings);
  //       setSittingDays(transformedData);
  //       showSuccessMessage(response?.message);
  //       setCount(response?.data?.count);
  //     }
  //   } catch (error) {
  //     // showErrorMessage(error?.response?.data?.message);
  //   }
  // };

  const SearchSessionSittingApi = useCallback(
    async (values) => {
      const fksessionId = values.sessionId;
      try {
        const response = await getSessionSitting(
          fksessionId,
          currentPage,
          pageSize
        );
        console.log(response);

        if (response?.success) {
          const transformedData = transformData(
            response?.data?.sessionSittings
          );
          setSittingDays(transformedData);
          showSuccessMessage(response?.message);
          setCount(response?.data?.count);
        }
      } catch (error) {
        // showErrorMessage(error);
        console.log(error?.message);
      }
    },
    [currentPage, pageSize, setCount]
  );

  // useEffect(() => {
  //   SearchSessionSittingApi();
  // }, [SearchSessionSittingApi]);

  // const handleSittingDays = async () => {
  //   try {
  //     const response = await getAllManageSessions(currentPage, pageSize);
  //     console.log(response);
  //     if (response?.success) {
  //       setCount(response?.data?.count);
  //       const transformedData = transformData(response.data?.sessionSittings);
  //       setSittingDays(transformedData);
  //     }
  //   } catch (error) {
  //     console.log(error?.response?.data?.message);
  //   }
  // };

  // useEffect(() => {
  //   handleSittingDays();
  // }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteSessionsSitting(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        SearchSessionSittingApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleAssign = (id) => {
    navigate(`/qms/manage/attendence`, { state: id });
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/manage"}
        addLink1={"/qms/manage/sitting-days"}
        title1={"Sitting Days"}
      />
      <ToastContainer />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            {/* <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>SEARCH QUESTION</h1>
            </div> */}
            <div class="card-body">
              <div class="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3">
                          <label class="form-label">Session</label>
                          <select
                            className="form-select"
                            value={formik.values.sessionId}
                            // placeholder={formik.values.sessionid}
                            onChange={formik.handleChange}
                            id="sessionId"
                            onBlur={formik.handleBlur}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option value="3">session 1</option>
                            {/* {sessions &&
                              sessions.map((item) => (
                                <option value={item.id}>
                                  {item.sessionName}
                                </option>
                              ))} */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" type="submit">
                          Search
                        </button>
                        {/* <button className="btn btn-primary" type="reset">
                          Reset
                        </button> */}
                      </div>
                    </div>
                  </div>
                </form>

                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    block={true}
                    data={sittingDays}
                    tableTitle="Sitting Days List"
                    addBtnText="Add Sitting Days"
                    handleAdd={() =>
                      navigate("/qms/manage/sitting-days/addedit")
                    }
                    handleEdit={(item) =>
                      navigate("/qms/manage/sitting-days/addedit", {
                        state: item,
                      })
                    }
                    // hideDeleteIcon={true}
                    headertitlebgColor={"#666"}
                    headertitletextColor={"#FFF"}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={count}
                    handleDelete={(item) => handleDelete(item.id)}
                    showAssigned={true}
                    hendleAssigned={(item) => handleAssign(item.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="container-fluid dash-detail-container card">
        <div class="row">
          <div class="col-12">
            <CustomTable
              data={sittingDays}
              tableTitle="Sitting Days List"
              addBtnText="Add Sitting Days"
              handleAdd={() => navigate("/qms/manage/sitting-days/addedit")}
              handleEdit={(item) =>
                navigate("/qms/manage/sitting-days/addedit", { state: item })
              }
              hideDeleteIcon={true}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={count}
            />
          </div>
        </div>
      </div> */}
    </Layout>
  );
}

export default QMSSittingsDays;
