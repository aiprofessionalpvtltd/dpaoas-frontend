import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import {
  NoticeSidebarItems,
  QMSSideBarItems,
} from "../../../../../../utils/sideBarItems";
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

function ManageSittingsDays() {
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
      sittingStartTime: moment(item?.sittingStartTime, "hh:ss:a").format(
        "hh:ss:a"
      ),
      sittingEndTime: moment(item?.sittingEndTime, "hh:ss:a").format("hh:ss:a"),
      committeeTotalTime: item?.committeeTotalTime,
      totalBreakTime: item?.totalBreakTime,
      // breakStartTime: moment(item?.breakStartTime, "hh:ss:a").format("hh:ss:a"),
      // breakEndTime: moment(item?.breakEndTime, "hh:ss:a").format("hh:ss:a"),
      // AsWholeCommittee: String(item?.committeeWhole),
      // committeeStartTime: item?.committeeStartTime
      //   ? moment(item?.committeeStartTime, "hh:ss:a").format("hh:ss:a")
      //   : "No Start Time",
      // committeeEndTime: item?.committeeEndTime
      //   ? moment(item?.committeeEndTime, "hh:ss:a").format("hh:ss:a")
      //   : "No End Time",
      sessionAdjourned: String(item?.sessionAdjourned),
      privateMemberDay: String(item?.privateMemberDay),
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
        console.log(error);
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
        setTimeout(
          () => SearchSessionSittingApi({ sessionId: formik.values.sessionId }),
          3000
        );
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  // const handleAttendance = (id) => {
  //   navigate(`/notice/manage/manage-session/member-attendence`, {
  //     state: { id },

  //   });
  // };
  const handleAttendance = (id) => {
    const rowData = sittingDays.filter((item) => item.id === id);
    if (rowData.length > 0) {
      navigate(`/notice/manage/manage-session/member-attendence`, {
        state: { id, data: rowData[0] },
      });
    }
  };

  // const handleViewAttendance = (id) => {
  //   navigate(`/notice/manage/manage-session/member-attendence`, {
  //     state: { id, view: true, data: sittingDays },
  //   });
  // };

  const handleViewAttendance = (id) => {
    const rowData = sittingDays.filter((item) => item.id === id);
    if (rowData.length > 0) {
      navigate(`/notice/manage/manage-session/member-attendence`, {
        state: { id, view: true, data: rowData[0] },
      });
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/manage/manage-session-days"}
        title1={"Session Days"}
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
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label class="form-label">Session</label>
                        <select
                          className="form-select"
                          value={formik.values.sessionId}
                          // placeholder={formik.values.sessionid}
                          onChange={(e) => {
                            formik.setFieldValue("sessionId", e.target.value);
                            SearchSessionSittingApi({
                              sessionId: e.target.value,
                            });
                          }}
                          id="sessionId"
                          onBlur={formik.handleBlur}
                        >
                          <option value="" selected disabled>
                            Select
                          </option>

                          {sessions &&
                            sessions.map((item) => (
                              <option value={item.id}>
                                {item.sessionName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-5"></div>
                    <div className="col-4">
                      <div className="mb-3">
                        <button
                          class="btn btn-primary float-end"
                          type="button"
                          onClick={() =>
                            navigate("/notice/manage/view-prorogued-sessions")
                          }
                        >
                          View Prorogued Sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="" style={{ marginTop: "20px" }}>
                  <CustomTable
                    // block={true}
                    data={sittingDays}
                    tableTitle="Session Days List"
                    addBtnText="Add Session Days"
                    handleAdd={() =>
                      navigate("/notice/manage/manage-session-days/addedit")
                    }
                    handleEdit={(item) =>
                      navigate("/notice/manage/manage-session-days/addedit", {
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
                    showAttendance={true}
                    hendleAttendance={(item) => handleAttendance(item.id)}
                    showView={true}
                    handleView={(item) => handleViewAttendance(item.id)}
                    // showAssigned={true}
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

export default ManageSittingsDays;
