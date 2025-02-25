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
import GovernmentBillIntroducedInSenate from "../../../../../../components/CustomComponents/OrderofDay/GovBillSenateOrderofDay";
import GovernmentBillRecievedFromNAOrderOfDay from "../../../../../../components/CustomComponents/OrderofDay/GovBillRecievedFromNA";
import GovernmentFinanceMoneyBill from "../../../../../../components/CustomComponents/OrderofDay/FinanceMoneyBillOrderofDay";
import LGMSMotionUnderRule218OrderofDay from "../../../../../../components/CustomComponents/OrderofDay/MotionUnderRule218";
import LGMSCallingAttentionNoticeOrderOfDay from "../../../../../../components/CustomComponents/OrderofDay/CallingAttentionNotice";
import LGMSResolutionOrderOfDay from "../../../../../../components/CustomComponents/OrderofDay/Resolutions";

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
  const [govIntroducedInSenate, setGovIntroducedInSenate] = useState([]);
  const [goveRecievedFromNA, setGovRecievedFromNA] = useState([]);
  const [govFinanceMoneyBill, setGovFinanceMoneyBill] = useState([]);
  const [motionUnderRule218, setMotionUnderRule218] = useState([]);
  const [callingAttentionNotice, setCallingAttentionNotice] = useState([]);
  const [resolutionOrderOfDay, setResolutionOrderOfDay] = useState([]);

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

        const PrivateRecievedData = data?.content?.filter(
          (item) =>
            item.category ===
            "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY"
        );

        // Ensure we're setting valid data
        if (PrivateRecievedData?.[0]?.data) {
          setPrivateRecievedFromNA(PrivateRecievedData[0].data);
          setIsDataLoaded(true);
        }
        const GovIntroducedData = data?.content?.filter(
          (item) => item.category === "GOVERNMENT BILLS INTRODUCED IN SEANTE"
        );

        // Ensure we're setting valid data
        if (GovIntroducedData?.[0]?.data) {
          setGovIntroducedInSenate(GovIntroducedData[0].data);
          setIsDataLoaded(true);
        }
        const GoveReceivedFromNA = data?.content?.filter(
          (item) =>
            item.category === "GOVERNMENT BILLS RECEIVED FROM NATIONAL ASSEMBLY"
        );

        // Ensure we're setting valid data
        if (GoveReceivedFromNA?.[0]?.data) {
          setGovRecievedFromNA(GoveReceivedFromNA[0].data);
          setIsDataLoaded(true);
        }
        const goveFinanceMoneyBill = data?.content?.filter(
          (item) => item.category === "GOVERNMENT FINANCE/MONEY BILLS"
        );

        // Ensure we're setting valid data
        if (goveFinanceMoneyBill?.[0]?.data) {
          setGovFinanceMoneyBill(goveFinanceMoneyBill[0].data);
          setIsDataLoaded(true);
        }
        const motionRule218 = data?.content?.filter(
          (item) => item.category === "MOTIONS UNDER RULE 218"
        );
        console.log("motionRule218motionRule218..", motionRule218);

        // Ensure we're setting valid data
        if (motionRule218?.length > 0) {
          setMotionUnderRule218(motionRule218[0]?.data);
          setIsDataLoaded(true);
        }
        const motionCallingAttentionNotice = data?.content?.filter(
          (item) => item.category === "Calling Attention Notice"
        );

        // Ensure we're setting valid data
        if (motionCallingAttentionNotice[0]?.data) {
          setCallingAttentionNotice(motionCallingAttentionNotice[0].data);
          setIsDataLoaded(true);
        }
        const resolutions = data?.content?.filter(
          (item) => item.category === "Resolutions"
        );

        // Ensure we're setting valid data
        if (resolutions[0]?.data) {
          setResolutionOrderOfDay(resolutions[0].data);
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
      // setIntroducedPrivateData([]);
      setIsDataLoaded(true);
    }
  }, [location?.state?.id]);

  // useEffect(() => {
  //   if (isMondayCheckBoxChecked) {
  //     setSelectedTabData([
  //       { category: "BILLS TO BE INTRODUCED", data: introducedPrivateData },
  //       {
  //         category:
  //           "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY",
  //         data: privateRecievedFromNA,
  //       },

  //       {
  //         category: "GOVERNMENT BILLS INTRODUCED IN SEANTE",
  //         data: govIntroducedInSenate,
  //       },
  //       {
  //         category: "GOVERNMENT BILLS RECEIVED FROM NATIONAL ASSEMBLY",
  //         data: goveRecievedFromNA,
  //       },
  //       {
  //         category: "GOVERNMENT FINANCE/MONEY BILLS",
  //         data: govFinanceMoneyBill,
  //       },
  //       {
  //         category: "MOTIONS UNDER RULE 218",
  //         data: motionUnderRule218,
  //       },
  //       {
  //         category: "Calling Attention Notice",
  //         data: callingAttentionNotice,
  //       },
  //       {
  //         category: "Resolutions",
  //         data: resolutionOrderOfDay,
  //       },
  //     ]);
  //   } else {
  //     setSelectedTabData([
  //       {
  //         category: "QUESTIONS",
  //         data: [{ id: 1, billTitle: "All Questions will be asked" }],
  //       },
  //       { category: "BILLS TO BE INTRODUCED", data: introducedPrivateData },
  //       {
  //         category:
  //           "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY",
  //         data: privateRecievedFromNA,
  //       },
  //       {
  //         category: "GOVERNMENT BILLS INTRODUCED IN SEANTE",
  //         data: govIntroducedInSenate,
  //       },
  //       {
  //         category: "GOVERNMENT BILLS RECEIVED FROM NATIONAL ASSEMBLY",
  //         data: goveRecievedFromNA,
  //       },
  //       {
  //         category: "GOVERNMENT FINANCE/MONEY BILLS",
  //         data: govFinanceMoneyBill,
  //       },
  //       {
  //         category: "MOTIONS UNDER RULE 218",
  //         data: motionUnderRule218,
  //       },
  //       {
  //         category: "Calling Attention Notice",
  //         data: callingAttentionNotice,
  //       },
  //       {
  //         category: "Resolutions",
  //         data: resolutionOrderOfDay,
  //       },
  //     ]);
  //   }
  // }, [
  //   introducedPrivateData,
  //   isMondayCheckBoxChecked,
  //   privateRecievedFromNA,
  //   govIntroducedInSenate,
  //   goveRecievedFromNA,
  //   govFinanceMoneyBill,
  //   motionUnderRule218,
  //   callingAttentionNotice,
  //   resolutionOrderOfDay,
  // ]);
  useEffect(() => {
    const tabData = [
      { category: "BILLS TO BE INTRODUCED", data: introducedPrivateData },
      {
        category:
          "Legislative BUSINESS BILLS AS PASSED BY THE NATIONAL ASSEMBLY",
        data: privateRecievedFromNA,
      },
      {
        category: "GOVERNMENT BILLS INTRODUCED IN SENATE",
        data: govIntroducedInSenate,
      },
      {
        category: "GOVERNMENT BILLS RECEIVED FROM NATIONAL ASSEMBLY",
        data: goveRecievedFromNA,
      },
      {
        category: "GOVERNMENT FINANCE/MONEY BILLS",
        data: govFinanceMoneyBill,
      },
      {
        category: "MOTIONS UNDER RULE 218",
        data: motionUnderRule218,
      },
      {
        category: "Calling Attention Notice",
        data: callingAttentionNotice,
      },
      {
        category: "Resolutions",
        data: resolutionOrderOfDay,
      },
    ];

    // Filter out categories with empty data arrays
    const filteredTabData = tabData.filter(
      (item) => item.data && item.data.length > 0
    );

    // Add "QUESTIONS" category only if `isMondayCheckBoxChecked` is false
    if (!isMondayCheckBoxChecked) {
      filteredTabData.unshift({
        category: "QUESTIONS",
        data: [{ id: 1, billTitle: "All Questions will be asked" }],
      });
    }

    setSelectedTabData(filteredTabData);
  }, [
    introducedPrivateData,
    isMondayCheckBoxChecked,
    privateRecievedFromNA,
    govIntroducedInSenate,
    goveRecievedFromNA,
    govFinanceMoneyBill,
    motionUnderRule218,
    callingAttentionNotice,
    resolutionOrderOfDay,
  ]);

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
                          style={{ width: "240px" }}
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
                          style={{ width: "240px" }}
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
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Government Introduced in Senate");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Government Introduced in Senate"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Government Introduced in Senate"
                              ? "true"
                              : "false"
                          }
                        >
                          Gov Introduced in Senate
                        </button>
                      </li>

                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Government Received From NA");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Government Received From NA"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Government Received From NA"
                              ? "true"
                              : "false"
                          }
                        >
                          Gov Received From NA
                        </button>
                      </li>

                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Gov Finance/Money Bill");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Gov Finance/Money Bill"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Gov Finance/Money Bill"
                              ? "true"
                              : "false"
                          }
                        >
                          Gov Finance/Money Bill
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
                          setSelectedTab("Motion Under Rule 218");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Motion Under Rule 218"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected={
                            selectedTab === "Motion Under Rule 218"
                              ? "true"
                              : "false"
                          }
                        >
                          Motion Under Rule 218
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Calling Attention Notice");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Calling Attention Notice"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Calling Attention Notice"
                              ? "true"
                              : "false"
                          }
                        >
                          Calling Attention Notice
                        </button>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        onClick={() => {
                          setSelectedTab("Resolution Order of Day");
                        }}
                      >
                        <button
                          type="button"
                          className={
                            selectedTab === "Resolution Order of Day"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          style={{ width: "240px" }}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected={
                            selectedTab === "Resolution Order of Day"
                              ? "true"
                              : "false"
                          }
                        >
                          Resolutions
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* <button
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
                  </button> */}

                  {/* Tab Content Section */}
                  <div className="tab-content" id="ex1-content">
                    <div className="row">
                      <div className="row mt-2 d-flex justify-content-end float-end"></div>
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
                                    Edit={location?.state?.id ? true : false}
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
                            {isDataLoaded && (
                              <PrivateMemberBillRecievedFromNA
                                privateRecievedFromNA={privateRecievedFromNA}
                                setPrivateRecievedFromNA={
                                  setPrivateRecievedFromNA
                                }
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Government Introduced in Senate" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <GovernmentBillIntroducedInSenate
                                govIntroducedInSenate={govIntroducedInSenate}
                                setGovIntroducedInSenate={
                                  setGovIntroducedInSenate
                                }
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Government Received From NA" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <GovernmentBillRecievedFromNAOrderOfDay
                                goveRecievedFromNA={goveRecievedFromNA}
                                setGovRecievedFromNA={setGovRecievedFromNA}
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Gov Finance/Money Bill" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <GovernmentFinanceMoneyBill
                                govFinanceMoneyBill={govFinanceMoneyBill}
                                setGovFinanceMoneyBill={setGovFinanceMoneyBill}
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Motion Under Rule 218" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <LGMSMotionUnderRule218OrderofDay
                                motionUnderRule218={motionUnderRule218}
                                setMotionUnderRule218={setMotionUnderRule218}
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Calling Attention Notice" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <LGMSCallingAttentionNoticeOrderOfDay
                                callingAttentionNotice={callingAttentionNotice}
                                setCallingAttentionNotice={
                                  setCallingAttentionNotice
                                }
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        {selectedTab === "Resolution Order of Day" ? (
                          <div className="mt-3">
                            {isDataLoaded && (
                              <LGMSResolutionOrderOfDay
                                resolutionOrderOfDay={resolutionOrderOfDay}
                                setResolutionOrderOfDay={
                                  setResolutionOrderOfDay
                                }
                                Edit={location?.state?.id ? true : false}
                              />
                            )}
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
