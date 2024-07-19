import React, { useCallback, useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../../../../../../api/AuthContext";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import * as Yup from "yup";
import {
  getAllPoliticalParties,
  getSessionSitting,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import moment from "moment";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { searchAttendanceReportByPartyProvince } from "../../../../../../api/APIs/Services/AttendanceReport.service";
import { imagesUrl } from "../../../../../../api/APIs";

const validationSchema = Yup.object({
  sessionId: Yup.string().required("Session is required"),
  // sittingDate: Yup.string().required("Sitting date is required"),
});
const PartywiseAttendenceReports = () => {
  const { sessions, members } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [searchedData, setSearchedData] = useState(null);
  const [sittingDays, setSittingDays] = useState([]);
  const [allparties, setAllParties] = useState([]);

  const pageSize = 100;
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformData = (apiData) => {
    return apiData?.map((item, index) => ({
      id: item?.id,
      session: `${item.session?.sessionName}`,
      sittingDate: moment(item?.sittingDate).format("YYYY/MM/DD"),
      status: item?.status,
    }));
  };
  //  Getting All Parties
  const getAllPartiesApi = useCallback(async () => {
    try {
      const response = await getAllPoliticalParties(0, 100);
      if (response?.success) {
        // const transformedData = transformTonerModelsData(
        //   response?.data?.tonerModels
        // );
        setAllParties(response?.data?.politicalParties);
        setCount(response?.data?.count);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setAllParties]);

  useEffect(() => {
    getAllPartiesApi();
  }, [getAllPartiesApi]);
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
          // showSuccessMessage(response?.message);
          // setCount(response?.data?.count);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, pageSize, setCount]
  );
  const formik = useFormik({
    initialValues: {
      sessionId: "",
      sittingDate: "",
      provinceId: "",
      partyId: "",
      memberId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      SearchedAttendanceReportByPartyProvince(values);
    },
  });

  const SearchedAttendanceReportByPartyProvince = useCallback(
    async (values) => {
      const searchParams = {
        sessionId: values?.sessionId,
        manageSessionId: values?.sittingDate,
        partyName: values?.partyId,
        province: values?.provinceId,
        memberName: values?.memberId,
      };

      try {
        const response =
          await searchAttendanceReportByPartyProvince(searchParams);
        if (response?.success) {
          showSuccessMessage(response?.message);
          if (response?.data?.fileLink) {
            const url = `${imagesUrl}${response?.data?.fileLink}`;
            setSearchedData(url);
          } else {
            searchedData(null);
          }
        }
        // formik.resetForm();
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
        console.log("error", error);
      }
    },
    [setSearchedData]
  );

  const handleReset = () => {
    formik.resetForm();
    setSearchedData(null);
  };

  //   Handle Preview
  const handlePreview = (searchedData) => {
    if (!searchedData) return;

    // Extract the file extension
    const fileExtension = searchedData.split(".").pop().toLowerCase();

    // For simplicity, let's assume we are handling PDF and image files
    if (fileExtension === "pdf") {
      // For PDF files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      // For image files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else {
      // For other file types, you might want to handle them differently (e.g., provide a message that the file type is not supported)
      console.log("Preview not supported for this file type");
    }
  };

  //   Handle Download
  const handleDownload = (fileUrl) => {
    // Check if fileUrl exists
    if (!fileUrl) return;

    // Extract the filename from the fileUrl
    const filename = fileUrl.split("/").pop();

    // Perform the download
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob", // Important for handling binary data like files
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Party-Province wise Reports"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-1">
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">
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
                        {formik.touched.sessionId &&
                          formik.errors.sessionId && (
                            <div className="invalid-feedback">
                              {formik.errors.sessionId}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">Sitting Date</label>
                        <select
                          className={`form-select ${
                            formik.touched.sittingDate &&
                            formik.errors.sittingDate
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.sittingDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="sittingDate"
                          id="sittingDate"
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
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="mb-3">
                        <label class="form-label">Select Province</label>
                        <select
                          id="provinceId"
                          className="form-select"
                          value={formik.values.provinceId}
                          onChange={(e) => {
                            formik.setFieldValue("provinceId", e.target.value);
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select Province
                          </option>

                          <option>{"Khyber Pakhtunkhwa"}</option>
                          <option>{"Punjab"}</option>
                          <option>{"Balochistan"}</option>
                          <option>{"Sindh"}</option>
                          <option>{"Erstwhile FATA"}</option>
                          <option>{"Federal Capital Area Islamabad"}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label class="form-label">Select Party</label>
                        <select
                          id="partyId"
                          className="form-select"
                          value={formik.values.partyId}
                          onChange={(e) => {
                            formik.setFieldValue("partyId", e.target.value);
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select Party
                          </option>
                          {allparties &&
                            allparties?.length > 0 &&
                            allparties.map((party) => (
                              <option value={party?.id}>
                                {party?.partyName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label class="form-label">Member Name</label>
                        <select
                          id="memberId"
                          className="form-select"
                          value={formik.values.memberId}
                          onChange={(e) => {
                            formik.setFieldValue("memberId", e.target.value);
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {members &&
                            members?.length > 0 &&
                            members.map((member) => (
                              <option value={member?.id}>
                                {member?.memberName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col my-2 d-flex justify-content-end">
                      <div className="mt-4">
                        <button class="btn btn-primary mb-3 mx-4" type="submit">
                          Search
                        </button>
                      </div>
                      <div className="mt-4">
                        <button
                          class="btn btn-primary mb-3"
                          type="button"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-12 my-2 d-flex justify-content-around">
                  <div className="mt-4">
                    <button
                      disabled={searchedData && searchedData ? false : true}
                      className="btn btn-primary mb-3"
                      type="button"
                      onClick={() => handlePreview(searchedData)}
                    >
                      Preview
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      disabled={searchedData && searchedData ? false : true}
                      className="btn btn-primary mb-3"
                      type="button"
                      onClick={() => handleDownload(searchedData)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartywiseAttendenceReports;
