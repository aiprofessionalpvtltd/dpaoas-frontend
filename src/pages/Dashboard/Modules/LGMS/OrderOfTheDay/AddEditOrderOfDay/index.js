import React, { useCallback, useContext, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { AuthContext } from "../../../../../../api/AuthContext";

import moment from "moment";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { getSessionSitting } from "../../../../../../api/APIs/Services/ManageQMS.service";
import CKEditorComp from "../../../../../../components/CustomComponents/Editor/CKEditorComp";

const LGMSCreateOrderOftheDay = () => {
  const [sittingDays, setSittingDays] = useState([]);
  const { sessions } = useContext(AuthContext);
  const [descriptionData, setDescriptionData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const pageSize = 100;

  const formik = useFormik({
    initialValues: {
      sessionId: "",
      sittingDate: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
      console.log("Description data:", descriptionData);
      // Add your submit logic here
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
          // showSuccessMessage(response?.message);
          // setCount(response?.data?.count);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, pageSize, setCount]
  );
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={"Create Order Of The Day"}
      />

      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>New Order</h1>
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
