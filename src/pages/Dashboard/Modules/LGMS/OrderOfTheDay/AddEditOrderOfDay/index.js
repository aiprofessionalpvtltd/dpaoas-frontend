import React, { useCallback, useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { AuthContext } from "../../../../../../api/AuthContext";
import TimePicker from "react-time-picker";
import moment from "moment";
import { getSessionSitting } from "../../../../../../api/APIs/Services/ManageQMS.service";
import { OrderOfTheDayByID } from "../../../../../../api/APIs/Services/Legislation.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import PrivateMemberSenateBillIntroducedInSenate from "../../../../../../components/CustomComponents/OrderofDay/PrivateMemberSenateBillOrderofDay";

import PDFOrderOfDayModel from "../../../../../../components/CustomComponents/OrderofDay/PDFPreviewModel";
import PrivateMemberBillRecievedFromNA from "../../../../../../components/CustomComponents/OrderofDay/PrivateMemberBillRecievedFromNA/Index";

const LGMSCreateOrderOftheDay = () => {
  const location = useLocation();
  const [sittingDays, setSittingDays] = useState([]);
  const { sessions } = useContext(AuthContext);
  const [descriptionData, setDescriptionData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isMondayCheckBoxChecked, setIsMondayCheckBoxChecked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    "Private Introduced In Senate"
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isBillDataLoaded, setIsBillDataLoded] = useState({
    PrivateRecievedFromNA: false,
  });

  const [count, setCount] = useState(null);
  const [selectedTabData, setSelectedTabData] = useState([]);
  const [introducedPrivateData, setIntroducedPrivateData] = useState([]);
  const [privateRecievedFromNA, setPrivateRecievedFromNA] = useState([]);

  const [formatedData, setFormatedData] = useState("");
  const pageSize = 100;

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const formik = useFormik({
    initialValues: {
      sessionId: "",
      sittingId: "",
      sittingLabel: "",
      isMonday: "",
      startTime: "",
    },
    onSubmit: (values) => {
      // Add your submit logic here
      //   if (location?.state?.id) {
      //     hendleUpdateOrderOfTheDay(values);
      //   } else {
      //     hendleCreateOrderOfTheDay(values);
      //   }
    },
  });

  const transformData = (apiData) => {
    return apiData?.map((item, index) => ({
      id: item?.id,
      session: `${item.session?.sessionName}`,
      sittingDate: moment(item?.sittingDate).format("YYYY/MM/DD"),
      status: item?.status,
    }));
  };

  const SearchSessionSittingApi = useCallback(
    async (values) => {
      const fksessionId = values.sessionId;
      try {
        const response = await getSessionSitting(
          fksessionId,
          currentPage,
          pageSize
        );

        if (response?.success) {
          const transformedData = transformData(
            response?.data?.sessionSittings
          );
          setSittingDays(transformedData);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, pageSize, setCount]
  );

  const getSingleOrderofDayByID = async (id) => {
    try {
      const response = await OrderOfTheDayByID(id);

      if (response?.success) {
        const data = response?.data;
        if (data?.fkSessionId) {
          formik.setFieldValue("sessionId", data?.fkSessionId);
          SearchSessionSittingApi({ sessionId: data?.fkSessionId });
        }
        if (data?.sittingId) {
          formik.setFieldValue("sittingId", data?.sittingId);
        }
        if (data?.sittingDate) {
          formik.setFieldValue("sittingLabel", data?.sittingDate);
          setFormatedData(data?.sittingDate);
        }
        if (data?.sittingTime) {
          formik.setFieldValue("startTime", data?.sittingTime);
        }

        if (data?.isMonday) {
          setIsMondayCheckBoxChecked(data?.isMonday);
        }

        const introducedData = data?.content?.filter(
          (item) => item.category === "BILLS TO BE INTRODUCED"
        );
        // Ensure we're setting valid data
        if (introducedData?.[0]?.data) {
          setIntroducedPrivateData(introducedData[0].data);
          setIsDataLoaded(true);
        }
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message || "Error fetching data");
    }
  };

  useEffect(() => {
    if (location?.state?.id) {
      getSingleOrderofDayByID(location?.state?.id);
    } else {
      setIntroducedPrivateData([]);
      setIsDataLoaded(true);
    }
  }, [location?.state?.id]);

  useEffect(() => {
    if (isMondayCheckBoxChecked) {
      setSelectedTabData([
        { category: "BILLS TO BE INTRODUCED", data: introducedPrivateData },
        {
          category:
            "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY",
          data: privateRecievedFromNA,
        },
        // { category: "Questions", data: Questions }
      ]);
    } else {
      setSelectedTabData([
        {
          category: "QUESTIONS",
          data: [{ id: 1, billTitle: "All Questions will be asked" }],
        },
        { category: "BILLS TO BE INTRODUCED", data: introducedPrivateData },
        {
          category:
            "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY",
          data: privateRecievedFromNA,
        },
        // { category: "Questions", data: Questions }
      ]);
    }
  }, [introducedPrivateData, isMondayCheckBoxChecked, privateRecievedFromNA]);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={
          location?.state?.id ? "Edit Order Of The Day" : "Add Order Of The Day"
        }
      />
      <ToastContainer />
      {showModal && showModal && (
        <PDFOrderOfDayModel
          showModal={showModal}
          selectedTabData={selectedTabData}
          closeModal={closeModal}
          session={formik.values.sessionId}
          formatedData={formatedData}
          startTime={moment(formik.values.startTime, "HH:mm").format("hh:mm A")}
          sittingId={formik?.values.sittingId}
          isMondayCheckBoxChecked={isMondayCheckBoxChecked}
          isView={false}
          isEdit={location?.state?.id ? true : false}
          OrderOfTheDayID={location?.state?.id ? location?.state?.id : null}
        />
      )}
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>
              {location?.state?.id
                ? "Edit Order Of The Day"
                : "Add Order Of The Day"}
            </h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label class="form-label">Select Session</label>
                    <select
                      className={`form-select ${
                        formik.touched.sessionId && formik.errors.sessionId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.sessionId}
                      onChange={(e) => {
                        formik.setFieldValue("sessionId", e.target.value);
                        SearchSessionSittingApi({
                          sessionId: e.target.value,
                        });
                        formik.setFieldValue("sittingId", "");
                        formik.setFieldValue("sittingLabel", "");
                      }}
                      id="sessionId"
                      onBlur={formik.handleBlur}
                    >
                      <option value="" selected disabled hidden>
                        Select Session
                      </option>
                      {sessions &&
                        sessions.length > 0 &&
                        sessions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.sessionName}
                          </option>
                        ))}
                    </select>
                    {formik.touched.sessionId && formik.errors.sessionId && (
                      <div className="invalid-feedback">
                        {formik.errors.sessionId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">Sitting Date</label>
                    <select
                      className={`form-select ${
                        formik.touched.sittingDate && formik.errors.sittingDate
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.sittingId}
                      onChange={(e) => {
                        formik.setFieldValue("sittingId", e.target.value);
                        formik.setFieldValue(
                          "sittingLabel",
                          e.target.options[e.target.selectedIndex].text || ""
                        );
                        setFormatedData(
                          e.target.options[e.target.selectedIndex].text || ""
                        );
                      }}
                      onBlur={formik.handleBlur}
                      name="sittingId"
                      id="sittingId"
                    >
                      <option value="" selected disabled hidden>
                        Select Date
                      </option>
                      {sittingDays &&
                        sittingDays.length > 0 &&
                        sittingDays.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.sittingDate}
                          </option>
                        ))}
                    </select>

                    {formik.touched.sittingDate &&
                      formik.errors.sittingDate && (
                        <div className="invalid-feedback">
                          {formik.errors.sittingDate}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-4">
                  <div class="mb-3">
                    <label class="form-label">Start Time</label>
                    <TimePicker
                      value={formik.values.startTime}
                      clockIcon={null}
                      openClockOnFocus={false}
                      format="hh:mm a"
                      onChange={(time) =>
                        formik.setFieldValue("startTime", time)
                      }
                      className={`form-control`}
                    />
                    {formik.touched.startTime && formik.errors.startTime && (
                      <div className="invalid-feedback">
                        {formik.errors.startTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <div
                    class="form-check"
                    style={{ marginTop: "8px", marginBottom: "15px" }}
                  >
                    <input
                      class={`form-check-input`}
                      type="checkbox"
                      id="isMonday"
                      checked={isMondayCheckBoxChecked}
                      onChange={(e) => {
                        setIsMondayCheckBoxChecked(e.target.checked);
                      }}
                    />
                    <label class="form-check-label" for="isMonday">
                      Is Today Monday ?
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="shadow" style={{ padding: "25px" }}>
                  {/* Tabs Section */}
                  <div className="d-flex justify-content-between align-items-center">
                    <ul
                      className="nav nav-tabs mb-3 mt-3"
                      id="ex1"
                      role="tablist"
                    >
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Private Introduced In Senate");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Private Introduced In Senate"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "250px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            selectedTab === "Private Introduced In Senate"
                              ? "true"
                              : "false"
                          }
                        >
                          Private Introduced In Senate
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Private Received From NA");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Private Received From NA"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "250px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Private Received From NA"
                              ? "true"
                              : "false"
                          }
                        >
                          Private Received From NA
                        </button>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        openModal();
                      }}
                      disabled={
                        !formik.values.sittingId ||
                        !formik.values.startTime ||
                        formik.values.isMonday === undefined
                      }
                    >
                      Preview
                    </button>
                  </div>

                  {/* Tab Content Section */}
                  <div className="tab-content" id="ex1-content">
                    <div className="row">
                      <div className="row mt-2 d-flex justify-content-end float-end"></div>

                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {selectedTab === "FR" && (
                          <>
                            <div className="row">
                              <div className="col-12">
                                <section>"FR Data"</section>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="col-12">
                        {selectedTab === "Private Introduced In Senate" ? (
                          <div>
                            <div className="row mb-5">
                              <div className="col-12">
                                {isDataLoaded && (
                                  <PrivateMemberSenateBillIntroducedInSenate
                                    introducedPrivateData={
                                      introducedPrivateData
                                    }
                                    setIntroducedPrivateData={
                                      setIntroducedPrivateData
                                    }
                                    Edit={true}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Private Received From NA" ? (
                          <div className="mt-3">
                            <PrivateMemberBillRecievedFromNA
                              privateRecievedFromNA={privateRecievedFromNA}
                              setPrivateRecievedFromNA={
                                setPrivateRecievedFromNA
                              }
                              Edit={isBillDataLoaded?.PrivateRecievedFromNA}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LGMSCreateOrderOftheDay;
