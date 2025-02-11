import React, { useCallback, useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { AuthContext } from "../../../../../../api/AuthContext";

import moment from "moment";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { getSessionSitting } from "../../../../../../api/APIs/Services/ManageQMS.service";
import CKEditorComp from "../../../../../../components/CustomComponents/Editor/CKEditorComp";
import {
  createOrderOfTheDay,
  OrderOfTheDayByID,
  updateOrderOfTheDay,
} from "../../../../../../api/APIs/Services/Legislation.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const LGMSCreateOrderOftheDay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sittingDays, setSittingDays] = useState([]);
  const { sessions } = useContext(AuthContext);
  const [descriptionData, setDescriptionData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const pageSize = 100;

  const formik = useFormik({
    initialValues: {
      sessionId: "",
      sittingId: "",
      sittingLabel: "",
    },
    onSubmit: (values) => {
      // Add your submit logic here
      if (location?.state?.id) {
        hendleUpdateOrderOfTheDay(values);
      } else {
        hendleCreateOrderOfTheDay(values);
      }
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

  //Create
  const hendleCreateOrderOfTheDay = async (values) => {
    const Data = {
      content: descriptionData,
      fkSessionId: values.sessionId,
      sittingId: values.sittingId,
      sittingLabel: values.sittingLabel,
    };
    try {
      const response = await createOrderOfTheDay(Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/lgms/dashboard/order-of-the-day/list");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleUpdateOrderOfTheDay = async (values) => {
    const Data = {
      content: descriptionData,
      fkSessionId: values.sessionId,
      sittingId: values.sittingId,
      sittingLabel: values.sittingLabel,
    };
    try {
      const response = await updateOrderOfTheDay(location.state.id, Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/lgms/dashboard/order-of-the-day/list");
        }, 1000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  //Signal ID Data
  const hendleListOrderOfTheDayBYID = async () => {
    try {
      const response = await OrderOfTheDayByID(location?.state?.id);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        SearchSessionSittingApi({
          sessionId: response?.data?.fkSessionId,
        });
        formik.setValues({
          sessionId: response?.data?.fkSessionId || "",
          sittingId: response?.data?.sittingId || null,
          sittingLabel: response?.data?.sittingLabel || "",
        });
        setDescriptionData(response?.data?.content);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  console.log("formikk", formik.values);

  useEffect(() => {
    if (location?.state?.id) {
      hendleListOrderOfTheDayBYID();
    }
  }, [location?.state?.id]);
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
                    {formik.touched.sessionId && formik.errors.sessionId && (
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
              </div>

              <div className="row">
                <div class="col">
                  <label className="form-label">Order Of The Day Detail</label>
                  <CKEditorComp
                    onChange={(data) => setDescriptionData(data)}
                    value={descriptionData}
                    disabled={false}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LGMSCreateOrderOftheDay;
